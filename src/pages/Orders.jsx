import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMyOrders } from "../services/order.service";
import Container from "../components/layout/Container";
import useAuthStore from "../app/store";

const statusColors = {
  accepted: "bg-orange-100 text-orange-700",
  preparing: "bg-blue-100 text-blue-700",
  ready: "bg-green-100 text-green-700",
  collected: "bg-gray-100 text-gray-700",
  cancelled: "bg-red-100 text-red-700"
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchMyOrders()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 pb-24">
        <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center text-5xl mb-6">📦</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h2>
        <p className="text-gray-600 mb-8 text-center max-w-sm">
          Place your first order and pick it up when ready
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="px-8 py-4 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Order Now
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 min-h-screen bg-gray-50/50">
      <Container className="py-6">
        <h1 className="page-title mb-6">My Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              onClick={() => navigate(`/orders/${order._id}`)}
              className="section-card cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-900">
                    Order #{order.orderNumber || order._id?.slice(-6)}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${
                    statusColors[order.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-600">
                  {order.items?.length || 0} items
                </span>
                <span className="font-bold text-orange-600">₹{order.totalAmount}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Orders;
