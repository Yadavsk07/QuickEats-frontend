import { Outlet } from "react-router-dom";
import Header from "./Header";
import BottomNav from "./BottomNav";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 pb-24 md:pb-8">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default AppLayout;
