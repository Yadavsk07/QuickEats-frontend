import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { registerUser } from "../../services/auth.service";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    emailOrPhone: "",
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
      const isEmail = form.emailOrPhone.includes("@");
      await registerUser({
        name: form.name,
        email: isEmail ? form.emailOrPhone : "",
        phone: !isEmail ? form.emailOrPhone : "",
        password: form.password
      });
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:ring-offset-2 transition-shadow"
      >
        <span className="block text-center text-orange-600 font-bold text-sm uppercase tracking-wide mb-2">QuickEats</span>
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">
          Create Account
        </h2>
        <p className="text-gray-500 text-center mb-6">Join QuickEats to order ahead and skip the queue</p>

        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Email or Phone"
          name="emailOrPhone"
          value={form.emailOrPhone}
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

        <Button loading={loading}>Register</Button>

        <div className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-600 font-semibold hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
