import { useNavigate } from "react-router-dom";
import useCartStore from "../app/cart.store";
import Container from "../components/layout/Container";
import { getImageUrl } from "../utils/helpers";

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, clearCart, updateItemQty, updateInstructions } = useCartStore();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  if (!items.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-gray-50/50 pb-24">
        <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center text-5xl mb-6">🛒</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-8 text-center max-w-sm">
          Browse our menu and add items. Your cart is saved—even after refresh or when you log back in.
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 md:pb-12 min-h-[70vh] bg-gray-50/50">
      <Container className="py-6">
        <h1 className="page-title mb-6">Your Cart</h1>

        <div className="grid md:grid-cols-[1fr_320px] gap-8 md:gap-8 md:items-start">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="section-card hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                <img
                  src={getImageUrl(item.imageUrl, "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100")}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <span className="font-bold text-orange-600">₹{item.price * item.qty}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">₹{item.price} each</p>

                  <textarea
                    placeholder="Special instructions (e.g., no onions)"
                    value={item.instructions || ""}
                    onChange={(e) => updateInstructions(item._id, e.target.value)}
                    className="mt-2 w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
                    rows={2}
                  />

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => updateItemQty(item._id, item.qty - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors font-bold text-gray-600"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold">{item.qty}</span>
                      <button
                        onClick={() => updateItemQty(item._id, item.qty + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors font-bold text-gray-600"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-20 left-0 right-0 md:sticky md:top-24 md:bottom-auto z-10">
          <div className="bg-white border-t border-gray-200 shadow-lg md:rounded-2xl md:border md:shadow-md p-6 mx-4 md:mx-0">
            <h3 className="font-semibold text-gray-900 mb-3 md:mb-4">Order Summary</h3>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Subtotal ({itemCount} items)</span>
              <span className="font-semibold text-gray-900">₹{subtotal}</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full py-4 rounded-xl bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 transition-colors mt-4"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
