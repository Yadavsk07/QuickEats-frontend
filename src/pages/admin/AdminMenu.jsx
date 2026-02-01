import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../app/store";
import { fetchAdminMenu, toggleMenuItem, createMenuItem } from "../../services/admin.service";
import Container from "../../components/layout/Container";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { getImageUrl } from "../../utils/helpers";

const initialForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  isVeg: true,
  isAvailable: true,
  imageUrl: ""
};

const AdminMenu = () => {
  const navigate = useNavigate();
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const [data, setData] = useState({ items: [], categories: [] });
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [submitLoading, setSubmitLoading] = useState(false);

  const loadMenu = () => {
    setLoading(true);
    fetchAdminMenu()
      .then(setData)
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }
    loadMenu();
  }, [isAdmin, navigate]);

  const handleToggle = async (itemId) => {
    try {
      const updated = await toggleMenuItem(itemId);
      setData((prev) => ({
        ...prev,
        items: prev.items.map((i) =>
          i._id === itemId ? { ...i, isAvailable: updated.isAvailable } : i
        )
      }));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update");
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("Item name is required");
      return;
    }
    const priceNum = Number(form.price);
    if (Number.isNaN(priceNum) || priceNum < 0) {
      alert("Enter a valid price");
      return;
    }
    if (!form.category) {
      alert("Please select a category");
      return;
    }
    setSubmitLoading(true);
    try {
      const created = await createMenuItem({
        name: form.name.trim(),
        description: form.description.trim() || undefined,
        price: priceNum,
        category: form.category,
        isVeg: form.isVeg,
        isAvailable: form.isAvailable,
        imageUrl: form.imageUrl.trim() || undefined
      });
      setData((prev) => ({ ...prev, items: [created, ...prev.items] }));
      setForm(initialForm);
      setAddModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add item");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (!isAdmin) return null;
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  const items = data.items || [];
  const categories = data.categories || [];

  return (
    <div className="pb-24 min-h-screen bg-gray-50/50">
      <Container className="py-6">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <h1 className="page-title">Manage Menu</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setAddModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
            >
              + Add new item
            </button>
            <button
              onClick={() => navigate("/admin")}
              className="text-orange-600 font-medium hover:underline"
            >
              ← Dashboard
            </button>
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          Add new items or toggle availability. New items appear on the menu for customers.
        </p>

        <Modal
          isOpen={addModalOpen}
          onClose={() => !submitLoading && setAddModalOpen(false)}
          title="Add new menu item"
          size="lg"
        >
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <Input
              label="Item name *"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Margherita Pizza"
              required
            />
            <Input
              label="Description"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Short description (optional)"
            />
            <Input
              label="Price (₹) *"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              placeholder="0"
              required
            />
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {categories.length === 0 && (
                <p className="text-amber-600 text-xs mt-1">No categories yet. Run the backend seed script to create categories.</p>
              )}
            </div>
            <Input
              label="Image URL"
              value={form.imageUrl}
              onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
              placeholder="https://... (optional)"
            />
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isVeg}
                  onChange={(e) => setForm((f) => ({ ...f, isVeg: e.target.checked }))}
                  className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-sm font-medium">Vegetarian</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isAvailable}
                  onChange={(e) => setForm((f) => ({ ...f, isAvailable: e.target.checked }))}
                  className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-sm font-medium">Available</span>
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" loading={submitLoading}>
                Add item
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => !submitLoading && setAddModalOpen(false)}
                disabled={submitLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>

        <div className="space-y-4">
          {items.length ? (
            items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 flex gap-4 items-center"
              >
                <img
                  src={getImageUrl(item.imageUrl, "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80")}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${
                      item.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>
                <button
                  onClick={() => handleToggle(item._id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm ${
                    item.isAvailable
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {item.isAvailable ? "Disable" : "Enable"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-12">No menu items. Run the seed script.</p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AdminMenu;
