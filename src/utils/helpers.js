// Default placeholder for menu/food images
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400";

// Returns a valid image URL or fallback (avoids ERR_INVALID_URL from malformed data: URLs)
export const getImageUrl = (url, fallback = FALLBACK_IMAGE) => {
  if (!url || typeof url !== "string" || url.trim() === "") return fallback;
  if (url.startsWith("data:") && !url.startsWith("data:image/")) return fallback;
  if (url === "data:;base64," || url === "data:;base64,=") return fallback;
  return url;
};

// Helper functions
export const formatPrice = (price) => {
  return `₹${price.toFixed(2)}`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-IN');
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
};

export const validatePincode = (pincode) => {
  const re = /^[0-9]{6}$/;
  return re.test(pincode);
};

export const truncateText = (text, length) => {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  }
  return text;
};

export const calculateDeliveryCharge = (subtotal) => {
  if (subtotal > 500) {
    return 0;
  }
  return 50;
};

export const calculateTax = (subtotal) => {
  return Math.round(subtotal * 0.05);
};

export const calculateTotal = (subtotal) => {
  const tax = calculateTax(subtotal);
  const delivery = calculateDeliveryCharge(subtotal);
  return subtotal + tax + delivery;
};
