import { useEffect, useState, useMemo } from "react";
import { fetchMenu } from "../services/menu.service";
import CategoryTabs from "../components/menu/CategoryTabs";
import MenuList from "../components/menu/MenuList";
import Container from "../components/layout/Container";
import Loader from "../components/common/Loader";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [category, setCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [vegFilter, setVegFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await fetchMenu();
        setMenu(Array.isArray(data) ? data : []);
      } catch (err) {
        setMenu([]);
      } finally {
        setLoading(false);
      }
    };
    loadMenu();
  }, []);

  const categories = useMemo(() => {
    const names = menu
      .map((item) => (item.category?.name || item.category || ""))
      .filter(Boolean);
    return [...new Set(names)];
  }, [menu]);

  const filteredMenu = useMemo(() => {
    return menu.filter((item) => {
      const catName = item.category?.name || item.category || "";
      const matchesCategory = category === "ALL" || catName === category;
      const matchesSearch =
        !search ||
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase());
      const matchesVeg =
        vegFilter === "ALL" ||
        (vegFilter === "VEG" && item.isVeg) ||
        (vegFilter === "NONVEG" && !item.isVeg);
      return matchesCategory && matchesSearch && matchesVeg;
    });
  }, [menu, category, search, vegFilter]);

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="pb-24">
      <div className="bg-white sticky top-0 z-10 shadow-sm border-b border-gray-100">
        <Container className="py-4">
          <h1 className="page-title mb-4">Menu</h1>

          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex gap-2 mb-2">
            {["ALL", "VEG", "NONVEG"].map((v) => (
              <button
                key={v}
                onClick={() => setVegFilter(v)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  vegFilter === v
                    ? "bg-green-600 text-white"
                    : v === "VEG"
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : v === "NONVEG"
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {v === "NONVEG" ? "Non-Veg" : v}
              </button>
            ))}
          </div>
        </Container>
      </div>

      <CategoryTabs
        categories={categories}
        active={category}
        onChange={setCategory}
      />

      <Container>
        <MenuList items={filteredMenu} />
      </Container>
    </div>
  );
};

export default Menu;
