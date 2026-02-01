import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMenu } from "../services/menu.service";
import useAuthStore from "../app/store";
import Container from "../components/layout/Container";
import { getImageUrl } from "../utils/helpers";

const Home = () => {
  const [popularItems, setPopularItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    fetchMenu()
      .then((data) => setPopularItems(Array.isArray(data) ? data.slice(0, 6) : []))
      .catch(() => setPopularItems([]))
      .finally(() => setLoading(false));
  }, []);

  const isOpen = () => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    if (day === 0) return false;
    return hour >= 8 && hour < 22;
  };

  const openStatus = isOpen();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-amber-700 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        <Container className="relative py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-sm font-semibold mb-5 tracking-wide uppercase">
              QuickEats
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-5 tracking-tight">
              Order Ahead.
              <br />
              <span className="text-amber-100 drop-shadow-sm">Skip the Queue.</span>
            </h1>
            <p className="text-lg md:text-xl text-orange-100 mb-10 max-w-lg leading-relaxed">
              Pre-order from QuickEats. Pick up when ready—no waiting, no crowds.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-orange-600 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Order Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/60 text-white font-semibold hover:bg-white/15 transition-colors"
              >
                Find Us
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Operating Status */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <Container className="py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                className={`w-3.5 h-3.5 rounded-full animate-pulse ${
                  openStatus ? "bg-emerald-500" : "bg-red-500"
                }`}
              />
              <span className="font-semibold text-gray-800">
                {openStatus ? "We're Open" : "Currently Closed"}
              </span>
              <span className="text-sm text-gray-500">
                {openStatus ? "8:00 AM – 10:00 PM" : "Opens tomorrow 8:00 AM"}
              </span>
            </div>
            <Link
              to="/menu"
              className="text-orange-600 font-semibold hover:text-orange-700 hover:underline transition-colors"
            >
              View Menu →
            </Link>
          </div>
        </Container>
      </section>

      {/* Popular Items */}
      <section className="py-14 md:py-20 bg-gray-50/50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              Popular Picks
            </h2>
            <p className="text-gray-600 text-lg">
              Our most loved items, ready for pickup
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-gray-200/80 rounded-2xl h-56" />
              ))}
            </div>
          ) : popularItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularItems.map((item) => (
                <Link
                  key={item._id}
                  to="/menu"
                  className="group block bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all border border-gray-100 relative"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                    <img
                      src={getImageUrl(item.imageUrl)}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.isVeg && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-semibold z-10 shadow">
                        Veg
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors text-lg">
                      {item.name}
                    </h3>
                    <p className="text-orange-600 font-bold mt-1.5 text-lg">₹{item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-gray-600 mb-4">No menu items yet</p>
              <Link to="/menu" className="text-orange-600 font-semibold hover:underline">
                Browse Menu
              </Link>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
            >
              View Full Menu
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA Banner */}
      <section className="py-16 md:py-20 bg-gray-900 text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">
              Ready to skip the queue?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              {isAuthenticated
                ? "Browse the QuickEats menu and place your order for pickup."
                : "Create an account to start ordering. It only takes a minute."}
            </p>
            <Link
              to={isAuthenticated ? "/menu" : "/register"}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors shadow-lg"
            >
              {isAuthenticated ? "Order Now" : "Get Started"}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
