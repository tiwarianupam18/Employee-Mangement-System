import { getUser } from "../utils/auth";
import { Link } from "react-router-dom";

function Sidebar() {
  const user = getUser();

  return (
    <div className="w-64 bg-blue-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">EMS System</h2>

      <p className="mb-4 text-sm">Role: {user?.role}</p>

      <ul className="space-y-3">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        {(user?.role === "admin" || user?.role === "manager") && (
          <>
            <li>
              <Link to="/employees">Employees</Link>
            </li>
            <li>
              <Link to="/shifts">Shifts</Link>
            </li>
          </>
        )}

        <li>
          <Link to="/attendance">Attendance</Link>
        </li>
        <li>
          <Link to="/leaves">Leaves</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
