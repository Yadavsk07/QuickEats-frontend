import MenuCard from "./MenuCard";

const MenuList = ({ items }) => {
  if (!items.length) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No items found
      </p>
    );
  }

  return (
    <div className="space-y-4 p-3">
      {items.map((item) => (
        <MenuCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default MenuList;
