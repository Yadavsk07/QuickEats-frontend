import Button from '../common/Button';

export const CartSummary = ({ items, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.05);
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + deliveryCharge;

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (5%)</span>
          <span>₹{tax}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span className={deliveryCharge === 0 ? 'text-green-600' : ''}>
            ₹{deliveryCharge} {deliveryCharge === 0 && '(Free)'}
          </span>
        </div>
      </div>
      <div className="border-t pt-2 mb-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>
      <Button
        variant="primary"
        onClick={onCheckout}
        className="w-full"
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartSummary;
