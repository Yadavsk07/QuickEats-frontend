import Button from '../common/Button';
import { getImageUrl } from '../../utils/helpers';

export const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex gap-4 py-4 border-b">
      <img
        src={getImageUrl(item.imageUrl || item.image, 'https://via.placeholder.com/100x100')}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-600 text-sm">₹{item.price} x {item.quantity}</p>
        <p className="text-blue-600 font-semibold">₹{item.price * item.quantity}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          −
        </button>
        <span className="px-2 py-1">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>
        <Button
          variant="danger"
          onClick={() => onRemove(item.id)}
          className="text-sm"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
