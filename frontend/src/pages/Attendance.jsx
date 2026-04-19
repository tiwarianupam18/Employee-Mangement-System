import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import api from "../services/api";

function Attendance() {
  const [history, setHistory] = useState([]);

  const fetchAttendance = async () => {
    try {
      const res = await api.get("/attendance/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setHistory(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleCheckIn = async () => {
    try {
      const res = await api.post(
        "/attendance/checkin",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(res.data.message);
      fetchAttendance();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleCheckOut = async () => {
    try {
      const res = await api.post(
        "/attendance/checkout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(res.data.message);
      fetchAttendance();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Attendance Module</h1>

      <div className="flex gap-3 mb-6">
        <button
          onClick={handleCheckIn}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Check In
        </button>

        <button
          onClick={handleCheckOut}
          className="bg-red-500 text-black px-4 py-2 rounded"
        >
          Check Out
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-3">My Attendance History</h2>

        {history.map((item) => (
          <div key={item._id} className="border-b py-2 flex justify-between">
            <div>
              <p className="font-bold">{item.date}</p>
              <p className="text-sm text-gray-500">
                In:{" "}
                {item.check_in
                  ? new Date(item.check_in).toLocaleTimeString()
                  : "-"}
              </p>
              <p className="text-sm text-gray-500">
                Out:{" "}
                {item.check_out
                  ? new Date(item.check_out).toLocaleTimeString()
                  : "-"}
              </p>
            </div>

            <div className="text-blue-600 font-bold">
              {item.working_hours
                ? `${item.working_hours.toFixed(2)} hrs`
                : "Pending"}
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default Attendance;
