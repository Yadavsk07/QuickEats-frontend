import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/layout/Container";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import useAuthStore from "../app/store";
import { fetchProfile, updateProfile, changePassword } from "../services/user.service";

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, login, logout } = useAuthStore();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchProfile()
      .then((data) => {
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || ""
        });
        const token = useAuthStore.getState().token;
        if (token) login({ ...user, ...data }, token);
      })
      .catch(() => {});
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await updateProfile(formData);
      login({ ...user, ...data }, useAuthStore.getState().token);
      setIsEditing(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    setPasswordLoading(true);
    try {
      await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      setShowChangePassword(false);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      alert("Password changed successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="pb-24 min-h-screen bg-gray-50/50">
      <Container className="py-6">
        <h1 className="page-title mb-6">Profile</h1>

        <div className="section-card mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
            <Button
              variant={isEditing ? "secondary" : "primary"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                label="Phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <Button variant="primary" className="w-full" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Full Name</label>
                <p className="text-lg font-medium text-gray-900">{formData.name || "Not set"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="text-lg font-medium text-gray-900">{formData.email || "Not set"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Phone</label>
                <p className="text-lg font-medium text-gray-900">{formData.phone || "Not set"}</p>
              </div>
            </div>
          )}
        </div>

        <div className="section-card mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order History</h2>
          <button
            onClick={() => navigate("/orders")}
            className="w-full py-3 rounded-xl border-2 border-orange-500 text-orange-600 font-semibold hover:bg-orange-50 transition-colors"
          >
            View Orders
          </button>
        </div>

        <div className="section-card mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Change Password</h2>
          {showChangePassword ? (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))
                }
                required
              />
              <Input
                label="New Password"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))
                }
                required
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))
                }
                required
              />
              <div className="flex gap-2">
                <Button type="submit" variant="primary" disabled={passwordLoading}>
                  {passwordLoading ? "Changing..." : "Change Password"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowChangePassword(false);
                    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <Button variant="primary" onClick={() => setShowChangePassword(true)}>
              Change Password
            </Button>
          )}
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="w-full py-3 rounded-xl border-2 border-red-500 text-red-600 font-semibold hover:bg-red-50 transition-colors"
        >
          Logout
        </button>
      </Container>
    </div>
  );
};

export default Profile;
