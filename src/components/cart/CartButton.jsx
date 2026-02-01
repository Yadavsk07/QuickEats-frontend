import { useNavigate } from "react-router-dom";
import useCartStore from "../../app/cart.store";

const CartButton = () => {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);

  if (!items.length) return null;

  return (
    <button
      onClick={() => navigate("/cart")}
      className="fixed bottom-4 right-4 bg-primary text-white px-6 py-3 rounded-full shadow-lg"
    >
      View Cart ({items.length})
    </button>
  );
};

export default CartButton;
