import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { sendOtp, resetPassword } from "../../services/auth.service";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      await sendOtp({ identifier });
      setSent(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e?.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    setResetLoading(true);
    try {
      await resetPassword({ identifier, otp, newPassword });
      alert("Password reset successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reset password");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:ring-offset-2 transition-shadow">
        <span className="block text-center text-orange-600 font-bold text-sm uppercase tracking-wide mb-2">QuickEats</span>
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">Forgot Password</h2>
        <p className="text-gray-500 text-center mb-6">
          {sent ? "Enter the OTP sent to your email and set a new password" : "Enter your email to receive OTP"}
        </p>

        {!sent ? (
          <form onSubmit={handleSendOtp}>
            <Input
              label="Email (to receive OTP)"
              name="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. your@email.com"
              required
            />
            <Button type="submit" loading={loading}>
              Send OTP
            </Button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <Input
              label="OTP"
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              required
            />
            <Input
              label="New Password"
              name="newPassword"
              type="password"
              placeholder="Min 6 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" loading={resetLoading} className="w-full">
              Reset Password
            </Button>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="w-full text-center text-sm text-gray-500 hover:text-orange-600"
            >
              Use a different email
            </button>
          </form>
        )}

        <div className="text-center mt-4 text-sm text-gray-600">
          <Link to="/login" className="text-orange-600 font-medium hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
