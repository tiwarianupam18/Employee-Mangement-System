import { getUser } from "../utils/auth";

function Navbar() {
  const user = getUser();

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <h1 className="font-bold">Dashboard</h1>

      <div className="flex gap-4 items-center">
        <span>{user?.name}</span>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
