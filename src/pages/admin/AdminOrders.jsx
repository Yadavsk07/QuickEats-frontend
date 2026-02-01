import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../app/store";
import { fetchAdminOrders, updateOrderStatus } from "../../services/admin.service";
import Container from "../../components/layout/Container";

const STATUS_OPTIONS = ["accepted", "preparing", "ready", "collected", "cancelled"];

const AdminOrders = () => {
  const navigate = useNavigate();
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }
    fetchAdminOrders()
      .then(setOrders)
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [isAdmin, navigate]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updated = await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: updated.status } : o))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  if (!isAdmin) return null;
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  return (
    <div className="pb-24 min-h-screen bg-gray-50/50">
      <Container className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="page-title">Manage Orders</h1>
          <button
            onClick={() => navigate("/admin")}
            className="text-orange-600 font-medium hover:underline flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Dashboard
          </button>
        </div>

        <div className="space-y-4">
          {orders.length ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="section-card"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-gray-900">
                      Order #{order.orderNumber || order._id?.slice(-6)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.user?.name} • {order.user?.phone || order.user?.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span className="font-bold text-orange-600">₹{order.totalAmount}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-600">Status:</span>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium focus:ring-2 focus:ring-orange-500"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Order items ({order.items?.length || 0})
                  </p>
                  <ul className="space-y-1.5">
                    {order.items?.length ? (
                      order.items.map((line, idx) => (
                        <li
                          key={line._id || line.menuItem?._id || idx}
                          className="text-sm text-gray-700 flex justify-between items-start gap-2"
                        >
                          <span>
                            <span className="font-medium">
                              {line.name || line.menuItem?.name || "Item"}
                            </span>
                            {line.quantity > 1 && (
                              <span className="text-gray-500"> × {line.quantity}</span>
                            )}
                            {line.instructions && (
                              <span className="block text-gray-500 text-xs mt-0.5">
                                Note: {line.instructions}
                              </span>
                            )}
                          </span>
                          <span className="text-gray-600 whitespace-nowrap">
                            ₹{(line.price * (line.quantity || 1)).toFixed(0)}
                          </span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500 text-sm">No items in this order</li>
                    )}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-12">No orders yet</p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AdminOrders;
