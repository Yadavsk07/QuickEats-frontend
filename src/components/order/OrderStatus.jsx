import Badge from '../common/Badge';

export const OrderStatus = ({ order }) => {
  const statusConfig = {
    pending: { variant: 'warning', label: 'Pending' },
    confirmed: { variant: 'primary', label: 'Confirmed' },
    preparing: { variant: 'primary', label: 'Preparing' },
    ready: { variant: 'success', label: 'Ready' },
    out_for_delivery: { variant: 'primary', label: 'Out for Delivery' },
    delivered: { variant: 'success', label: 'Delivered' },
    cancelled: { variant: 'danger', label: 'Cancelled' },
  };

  const config = statusConfig[order.status] || { variant: 'gray', label: 'Unknown' };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold">Order #{order.id}</h3>
          <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <Badge variant={config.variant}>{config.label}</Badge>
      </div>
      <div className="text-sm text-gray-600">
        <p>Total: <span className="font-semibold text-lg">₹{order.total}</span></p>
        <p>Items: {order.items?.length || 0}</p>
      </div>
    </div>
  );
};

export default OrderStatus;
