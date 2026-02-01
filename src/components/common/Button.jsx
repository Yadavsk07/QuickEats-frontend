const Button = ({ children, loading, variant = "primary", className = "", ...props }) => {
  const variants = {
    primary: "bg-orange-500 text-white hover:bg-orange-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
  };

  return (
    <button
      {...props}
      disabled={loading}
      className={`px-4 py-2 rounded-lg font-semibold disabled:opacity-50 transition-colors ${variants[variant]} ${className}`}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;
