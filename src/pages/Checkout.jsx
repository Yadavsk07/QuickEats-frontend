import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../app/cart.store";
import useAuthStore from "../app/store";
import { createOrder } from "../services/order.service";
import {
  createPaymentOrder,
  verifyPayment
} from "../services/payment.service";
import Container from "../components/layout/Container";

const PICKUP_SLOTS = [
  "15 mins",
  "30 mins",
  "45 mins",
  "1 hour",
  "1.5 hours",
  "2 hours"
];

/** Format phone for Razorpay prefill: +919876543210 */
function formatContact(phone) {
  if (!phone || typeof phone !== "string") return undefined;
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) return undefined;
  if (digits.length === 10) return "+91" + digits;
  return digits.startsWith("91") ? "+" + digits : "+91" + digits;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  const [pickupTime, setPickupTime] = useState("30 mins");
  const [orderNotes, setOrderNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("online");

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      const order = await createOrder(items, {
        pickupTime,
        orderNotes,
        paymentMethod
      });

      if (paymentMethod === "cash") {
        clearCart();
        navigate(`/orders/${order._id}`);
        return;
      }

      const payment = await createPaymentOrder(order._id);

      const amountPaise = Math.round(Number(payment.amount) * 100);
      const prefill = {};
      if (user?.name) prefill.name = user.name;
      if (user?.email) prefill.email = user.email;
      const contact = formatContact(user?.phone);
      if (contact) prefill.contact = contact;

      const options = {
        key: payment.key,
        amount: amountPaise,
        currency: "INR",
        name: "QuickEats",
        description: "Food Order Payment",
        order_id: payment.razorpayOrderId,
        prefill: Object.keys(prefill).length ? prefill : undefined,
        method: prefill.email && (prefill.contact || prefill.name) ? "card" : undefined,
        config: {
          display: {
            preferences: { show_default_blocks: true }
          }
        },
        handler: async function (response) {
          try {
            await verifyPayment({
              paymentId: payment.paymentId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            });
            clearCart();
            const orderId = order._id;
            window.location.href = `${window.location.origin}/orders/${orderId}?payment=success`;
          } catch (verifyErr) {
            alert(verifyErr.response?.data?.message || "Payment verification failed. Contact support with your order ID.");
          }
        }
      };

      if (!window.Razorpay) {
        alert("Payment gateway is loading. Please try again in a moment.");
        setLoading(false);
        return;
      }
      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        setLoading(false);
        const reason = response?.error?.description || response?.error?.reason || "";
        const msg = reason
          ? `Payment failed: ${reason}. Your order is saved; you can pay at pickup or retry.`
          : "Payment failed or was cancelled. Your order is saved; you can pay at pickup or retry.";
        alert(msg);
      });

      rzp.on("dismiss", function () {
        setLoading(false);
      });

      rzp.open();
    } catch (err) {
      alert(err.response?.data?.message || "Order failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || !items.length) {
    if (!items.length) navigate("/cart");
    return null;
  }

  return (
    <div className="pb-24 md:pb-12 min-h-[70vh] bg-gray-50/50">
      <Container className="py-6">
        <h1 className="page-title mb-6">Checkout</h1>

        <div className="grid md:grid-cols-[1fr_340px] gap-8 md:gap-8 md:items-start">
        <div className="space-y-6">
          <div className="section-card">
            <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>
            {items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between text-sm py-2 border-b border-gray-100 last:border-0"
              >
                <span>
                  {item.name} × {item.qty}
                  {item.instructions && (
                    <span className="block text-gray-500 text-xs mt-0.5">
                      {item.instructions}
                    </span>
                  )}
                </span>
                <span className="font-medium">₹{item.price * item.qty}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-gray-900 mt-4 pt-4 border-t border-gray-200">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
          </div>

          <div className="section-card">
            <h2 className="font-semibold text-gray-900 mb-4">Pickup Time</h2>
            <select
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            >
              {PICKUP_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  Ready in {slot}
                </option>
              ))}
            </select>
          </div>

          <div className="section-card">
            <h2 className="font-semibold text-gray-900 mb-4">Order Notes</h2>
            <textarea
              placeholder="Any special requests for your order?"
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
              rows={3}
            />
          </div>

          <div className="section-card">
            <h2 className="font-semibold text-gray-900 mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors has-checked:border-orange-500 has-checked:bg-orange-50">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                  className="w-4 h-4 text-orange-500"
                />
                <span className="font-medium">Pay Online (UPI / Card)</span>
              </label>
              {paymentMethod === "online" && (
                <div className="text-sm text-amber-700 bg-amber-50 rounded-lg px-4 py-2 border border-amber-200 space-y-1">
                  <p><strong>Test mode:</strong></p>
                  <p><strong>Card:</strong> <code className="bg-amber-100 px-1 rounded">5267 3181 8797 5449</code>, any future expiry (e.g. 12/30), any 3-digit CVV. Click Pay, then on the next screen click <strong>Success</strong> (and enter any OTP if asked).</p>
                  <p><strong>UPI:</strong> <code className="bg-amber-100 px-1 rounded">success@razorpay</code></p>
                </div>
              )}
              <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors has-checked:border-orange-500 has-checked:bg-orange-50">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                  className="w-4 h-4 text-orange-500"
                />
                <span className="font-medium">Cash at Counter</span>
              </label>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 md:sticky md:top-24 md:bottom-auto z-10 p-4 bg-white border-t border-gray-200 md:border md:rounded-2xl md:shadow-md md:mx-0">
          <div className="max-w-md md:max-w-none">
            <button
              disabled={loading}
              onClick={handlePlaceOrder}
              className="w-full py-4 rounded-xl bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
            >
              {loading ? "Processing..." : paymentMethod === "cash" ? "Place Order" : "Pay Now"}
            </button>
          </div>
        </div>
        </div>
      </Container>
    </div>
  );
};

export default Checkout;
