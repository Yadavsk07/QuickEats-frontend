import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../app/store";
import { fetchDashboard } from "../../services/admin.service";
import Container from "../../components/layout/Container";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }
    fetchDashboard()
      .then(setData)
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  const stats = [
    { label: "Total Orders", value: data?.totalOrders || 0, color: "bg-orange-500" },
    { label: "Today's Orders", value: data?.todayOrders || 0, color: "bg-blue-500" },
    { label: "Total Revenue", value: `₹${data?.totalRevenue ?? 0}`, color: "bg-green-600" },
    { label: "Today's Revenue", value: `₹${data?.todayRevenue ?? 0}`, color: "bg-green-500" },
    { label: "Customers", value: data?.totalUsers || 0, color: "bg-purple-500" },
    { label: "Menu Items", value: data?.totalMenuItems || 0, color: "bg-amber-500" }
  ];

  return (
    <div className="pb-24 min-h-screen bg-gray-50/50">
      <Container className="py-6">
        <h1 className="page-title mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className={`${s.color} text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow`}>
              <p className="text-sm opacity-90">{s.label}</p>
              <p className="text-2xl font-bold mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="section-card">
            <h2 className="font-semibold text-gray-900 mb-4">Orders by Status</h2>
            <div className="space-y-2">
              {data?.ordersByStatus &&
                Object.entries(data.ordersByStatus).map(([status, count]) => (
                  <div key={status} className="flex justify-between text-sm">
                    <span className="capitalize text-gray-600">{status}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="section-card">
            <h2 className="font-semibold text-gray-900 mb-4">Recent Orders</h2>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {data?.recentOrders?.length ? (
                data.recentOrders.map((o) => (
                  <div
                    key={o._id}
                    onClick={() => navigate(`/admin/orders/${o._id}`)}
                    className="flex justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <span className="text-sm font-medium">#{o.orderNumber || o._id?.slice(-6)}</span>
                    <span className="text-sm text-gray-600">₹{o.totalAmount}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No orders yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/admin/orders")}
            className="px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
          >
            Manage Orders
          </button>
          <button
            onClick={() => navigate("/admin/menu")}
            className="px-6 py-3 rounded-xl border-2 border-orange-500 text-orange-600 font-semibold hover:bg-orange-50 transition-colors"
          >
            Manage Menu
          </button>
          <button
            onClick={() => navigate("/admin/users")}
            className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            Manage Users
          </button>
        </div>
      </Container>
    </div>
  );
};

export default AdminDashboard;
