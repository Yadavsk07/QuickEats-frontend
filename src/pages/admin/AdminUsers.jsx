import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../app/store";
import { fetchAdminUsers, blockUser } from "../../services/admin.service";
import Container from "../../components/layout/Container";

const AdminUsers = () => {
  const navigate = useNavigate();
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }
    fetchAdminUsers()
      .then(setUsers)
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [isAdmin, navigate]);

  const handleBlock = async (userId) => {
    try {
      const updated = await blockUser(userId);
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, isBlocked: updated.isBlocked } : u))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update user");
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
          <h1 className="page-title">Manage Users</h1>
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
          {users.length ? (
            users.map((user) => (
              <div
                key={user._id}
                className="section-card flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-900">{user.name || "No name"}</p>
                  <p className="text-sm text-gray-500">{user.email || user.phone}</p>
                  {user.isBlocked && (
                    <span className="inline-block mt-1 px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-medium">
                      Blocked
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleBlock(user._id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm ${
                    user.isBlocked
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  }`}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-12">No customers yet</p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AdminUsers;
