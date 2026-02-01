import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import socket from "../app/socket";
import useAuthStore from "../app/store";
import useCartStore from "../app/cart.store";
import { fetchOrderById } from "../services/order.service";
import OrderTimeline from "../components/order/OrderTimeline";
import Container from "../components/layout/Container";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const addItem = useCartStore((s) => s.addItem);
  const paymentSuccess = location.state?.paymentSuccess || new URLSearchParams(location.search).get("payment") === "success";

  useEffect(() => {
    fetchOrderById(id).then(setOrder);

    socket.connect();
    socket.on("notification", (data) => {
      if (data.type === "order" || data.orderId === id) {
        fetchOrderById(id).then(setOrder);
      }
    });
    socket.on("orderStatusUpdate", (data) => {
      if (data.orderId === id) {
        fetchOrderById(id).then(setOrder);
      }
    });

    return () => {
      socket.off("notification");
      socket.off("orderStatusUpdate");
    };
  }, [id]);

  const handleReorder = () => {
    if (!order?.items?.length) return;
    order.items.forEach((item) => {
      const menuItem = item.menuItem || item;
      const id = menuItem?._id || menuItem;
      for (let i = 0; i < item.quantity; i++) {
        addItem(
          {
            _id: id,
            name: item.name,
            price: item.price,
            imageUrl: menuItem?.imageUrl
          },
          item.instructions
        );
      }
    });
    navigate("/cart");
  };

  if (!order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  return (
    <div className="pb-24 min-h-screen bg-gray-50/50">
      <Container className="py-6">
        {paymentSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 font-medium flex items-center gap-2">
            <span className="text-2xl">✓</span>
            Payment successful. Your order is confirmed.
          </div>
        )}
        <div className="section-card mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="page-title text-2xl md:text-3xl">
                Order #{order.orderNumber || order._id?.slice(-6)}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <span
              className={`px-4 py-1.5 rounded-xl font-semibold text-sm capitalize ${
                order.status === "ready"
                  ? "bg-green-100 text-green-700"
                  : order.status === "collected"
                  ? "bg-gray-100 text-gray-700"
                  : order.status === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {order.status}
            </span>
          </div>

          {order.status !== "cancelled" && (
            <div className="bg-orange-50 rounded-xl p-4 mb-4 border border-orange-100">
              <p className="text-sm font-medium text-orange-800">Pickup Token</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                #{order.orderNumber || order._id?.slice(-6).toUpperCase()}
              </p>
              <p className="text-xs text-orange-600 mt-1">
                Show this number when collecting your order
              </p>
            </div>
          )}

          <OrderTimeline status={order.status} />
        </div>

        <div className="section-card mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Items</h2>
          {order.items?.map((item, idx) => (
            <div
              key={item.menuItem?._id || idx}
              className="flex justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div>
                <span className="font-medium text-gray-900">{item.name} × {item.quantity}</span>
                {item.instructions && (
                  <p className="text-sm text-gray-500 mt-0.5">{item.instructions}</p>
                )}
              </div>
              <span className="font-semibold text-gray-900">₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-gray-900 mt-4 pt-4 border-t border-gray-200">
            <span>Total</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>

        {order.status === "ready" && (
          <div className="bg-green-50 rounded-2xl p-6 text-center border border-green-100 mb-6">
            <p className="text-2xl mb-2">🎉</p>
            <p className="font-bold text-green-800 text-lg">Your order is ready!</p>
            <p className="text-green-700 mt-1">Please collect it at the counter</p>
          </div>
        )}

        {order.status !== "cancelled" && order.items?.length > 0 && (
          <button
            onClick={handleReorder}
            className="w-full py-4 rounded-xl border-2 border-orange-500 text-orange-600 font-bold hover:bg-orange-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Reorder
          </button>
        )}

        <button
          onClick={() => navigate("/orders")}
          className="w-full py-3 mt-3 text-gray-600 font-medium hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Orders
        </button>
      </Container>
    </div>
  );
};

export default OrderDetails;
