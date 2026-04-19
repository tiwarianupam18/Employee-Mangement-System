import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-4 bg-gray-100 flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
