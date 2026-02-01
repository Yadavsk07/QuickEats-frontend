const CategoryTabs = ({ categories, active, onChange }) => {
  return (
    <div className="flex gap-3 overflow-x-auto py-3 px-2 bg-white sticky top-0 z-10">
      <button
        onClick={() => onChange("ALL")}
        className={`px-4 py-1 rounded-full text-sm whitespace-nowrap ${
          active === "ALL"
            ? "bg-primary text-white"
            : "bg-gray-200"
        }`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-1 rounded-full text-sm whitespace-nowrap ${
            active === cat
              ? "bg-primary text-white"
              : "bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
