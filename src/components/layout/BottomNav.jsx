import { Link, useLocation } from "react-router-dom";
import useCartStore from "../../app/cart.store";
import useAuthStore from "../../app/store";

const customerNavItems = [
  { to: "/", icon: "🏠", label: "Home" },
  { to: "/menu", icon: "🍔", label: "Menu" },
  { to: "/cart", icon: "🛒", label: "Cart" },
  { to: "/orders", icon: "📦", label: "Orders" },
  { to: "/profile", icon: "👤", label: "Profile" }
];

const adminNavItems = [
  { to: "/", icon: "🏠", label: "Home" },
  { to: "/admin", icon: "📊", label: "Dashboard" },
  { to: "/admin/orders", icon: "📦", label: "Orders" },
  { to: "/admin/menu", icon: "🍔", label: "Menu" },
  { to: "/admin/users", icon: "👥", label: "Users" }
];

const BottomNav = () => {
  const location = useLocation();
  const cartItems = useCartStore((s) => s.items);
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const navItems = isAdmin ? adminNavItems : customerNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40 shadow-lg">
      <div className="flex justify-around">
        {navItems.map(({ to, icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex-1 py-3 text-center hover:bg-gray-50 transition-colors relative ${
              location.pathname === to ? "text-orange-600 font-semibold" : "text-gray-600"
            }`}
          >
            <div className="text-xl relative inline-block">
              {icon}
              {to === "/cart" && !isAdmin && cartItems.length > 0 && (
                <span className="absolute -top-1 -right-3 min-w-[18px] h-[18px] flex items-center justify-center bg-orange-500 text-white text-xs font-bold rounded-full px-1">
                  {cartItems.reduce((sum, i) => sum + i.qty, 0)}
                </span>
              )}
            </div>
            <span className="block text-xs mt-0.5">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
