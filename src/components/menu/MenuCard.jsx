import useCartStore from "../../app/cart.store";
import { getImageUrl } from "../../utils/helpers";

const MenuCard = ({ item }) => {
  const addItem = useCartStore((state) => state.addItem);
  const isAvailable = item.isAvailable !== false;

  return (
    <div className="bg-white rounded-2xl shadow-sm flex gap-4 p-4 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="relative flex-shrink-0">
        <img
          src={getImageUrl(item.imageUrl, "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200")}
          alt={item.name}
          className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover"
        />
        {item.isVeg && (
          <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-green-600 text-white text-xs font-medium">
            Veg
          </span>
        )}
        {!isAvailable && (
          <div className="absolute inset-0 bg-gray-900/50 rounded-xl flex items-center justify-center">
            <span className="text-white text-xs font-bold">Unavailable</span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-2">
          <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
          <span className="font-bold text-orange-600 flex-shrink-0">₹{item.price}</span>
        </div>

        {item.description && (
          <p className="text-sm text-gray-500 line-clamp-2 mt-0.5">
            {item.description}
          </p>
        )}

        <button
          onClick={() => isAvailable && addItem(item)}
          disabled={!isAvailable}
          className={`mt-3 px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
            isAvailable
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isAvailable ? "Add +" : "Unavailable"}
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
