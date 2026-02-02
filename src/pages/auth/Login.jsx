import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { loginUser } from "../../services/auth.service";
import useAuthStore from "../../app/store";
import socket from "../../app/socket";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuthStore();

  const [form, setForm] = useState({
    identifier: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser(form);
      auth.login(data.user, data.token);
      socket.connect();
      socket.emit("join", data.user.id);
      navigate(data.user.role === "admin" ? "/admin" : "/menu");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 via-amber-50 to-orange-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:ring-offset-2 transition-shadow"
      >
        <span className="block text-center text-orange-600 font-bold text-sm uppercase tracking-wide mb-2">QuickEats</span>
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-6">Sign in to place your order</p>

        <Input
          label="Email or Phone"
          name="identifier"
          value={form.identifier}
          onChange={handleChange}
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <Button loading={loading}>Login</Button>

        <div className="text-center mt-4 text-sm">
          <Link to="/forgot-password" className="text-orange-600 font-medium hover:underline">
            Forgot Password?
          </Link>
        </div>

        <div className="text-center mt-2 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-orange-600 font-medium hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
