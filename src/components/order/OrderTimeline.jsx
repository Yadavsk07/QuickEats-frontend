const STEPS = [
  { key: "accepted", label: "Accepted" },
  { key: "preparing", label: "Preparing" },
  { key: "ready", label: "Ready for Pickup" },
  { key: "collected", label: "Collected" }
];

const OrderTimeline = ({ status }) => {
  const currentIndex = STEPS.findIndex((s) => s.key === status);
  const isCancelled = status === "cancelled";

  if (isCancelled) {
    return (
      <div className="py-6 text-center">
        <span className="inline-block px-4 py-2 rounded-xl bg-red-100 text-red-700 font-semibold">
          Order Cancelled
        </span>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="flex justify-between relative">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-0" />
        {STEPS.map((step, index) => {
          const isCompleted = currentIndex > index;
          const isCurrent = currentIndex === index;
          const isPending = currentIndex < index;

          return (
            <div key={step.key} className="flex flex-col items-center flex-1 relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isCurrent
                    ? "bg-orange-500 text-white ring-4 ring-orange-200"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {isCompleted ? "✓" : index + 1}
              </div>
              <p
                className={`text-xs mt-2 font-medium text-center ${
                  isCurrent ? "text-orange-600" : isCompleted ? "text-green-600" : "text-gray-500"
                }`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;
