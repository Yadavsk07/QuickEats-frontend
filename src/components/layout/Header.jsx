import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../app/store";
import useCartStore from "../../app/cart.store";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const cartCount = useCartStore((s) => s.items).reduce((sum, i) => sum + i.qty, 0);

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-40 border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center max-w-6xl">
        <Link to="/" className="text-xl font-bold text-orange-600 hover:text-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg tracking-tight">
          QuickEats
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">
            Home
          </Link>
          <Link to="/menu" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">
            Menu
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">
            Contact
          </Link>
          <Link to="/faqs" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">
            FAQs
          </Link>
          {!isAdmin && (
            <Link to="/cart" className="relative inline-flex items-center gap-1.5 text-gray-600 hover:text-orange-600 transition-colors font-medium">
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="min-w-[22px] h-[22px] flex items-center justify-center bg-orange-500 text-white text-xs font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          )}
          {isAuthenticated ? (
            <>
              {isAdmin ? (
                <>
                  <Link to="/admin" className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                    Admin
                  </Link>
                  <Link to="/profile" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/orders" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">
                    Orders
                  </Link>
                  <Link to="/profile" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">
                    Profile
                  </Link>
                </>
              )}
              <button
                onClick={() => {
                  useAuthStore.getState().logout();
                  navigate("/");
                }}
                className="text-gray-600 hover:text-red-600 transition-colors font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors">
              Login
            </Link>
          )}
        </nav>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white p-4 space-y-2">
          <Link to="/" className="block py-2 text-gray-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/menu" className="block py-2 text-gray-600" onClick={() => setIsMenuOpen(false)}>Menu</Link>
          {!isAdmin && (
            <Link to="/cart" className="flex items-center justify-between py-2 text-gray-600" onClick={() => setIsMenuOpen(false)}>
              Cart
              {cartCount > 0 && <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>}
            </Link>
          )}
          <Link to="/contact" className="block py-2 text-gray-600" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <Link to="/faqs" className="block py-2 text-gray-600" onClick={() => setIsMenuOpen(false)}>FAQs</Link>
          {isAuthenticated && (
            isAdmin ? (
              <>
                <Link to="/admin" className="block py-2 text-orange-600 font-semibold" onClick={() => setIsMenuOpen(false)}>Admin</Link>
                <Link to="/profile" className="block py-2 text-gray-600" onClick={() => setIsMenuOpen(false)}>Profile</Link>
              </>
            ) : (
              <>
                <Link to="/orders" className="block py-2 text-gray-600" onClick={() => setIsMenuOpen(false)}>Orders</Link>
                <Link to="/profile" className="block py-2 text-gray-600" onClick={() => setIsMenuOpen(false)}>Profile</Link>
              </>
            )
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
