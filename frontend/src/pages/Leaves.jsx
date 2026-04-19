import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import api from "../services/api";

function Leaves() {
  const [leaves, setLeaves] = useState([]);

  const [form, setForm] = useState({
    from_date: "",
    to_date: "",
    reason: "",
  });

  const fetchLeaves = async () => {
    try {
      const res = await api.get("/leaves", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setLeaves(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/leaves", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Leave applied");
      setForm({
        from_date: "",
        to_date: "",
        reason: "",
      });

      fetchLeaves();
    } catch (err) {
      console.log(err);
    }
  };

  const approveLeave = async (id) => {
    try {
      await api.put(
        `/leaves/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Leave approved");
      fetchLeaves();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectLeave = async (id) => {
    try {
      await api.put(
        `/leaves/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Leave rejected");
      fetchLeaves();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Leave Management</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-3 mb-6 bg-white p-4 rounded shadow"
      >
        <input
          type="date"
          name="from_date"
          value={form.from_date}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="date"
          name="to_date"
          value={form.to_date}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="text"
          name="reason"
          value={form.reason}
          placeholder="Reason"
          onChange={handleChange}
          className="border p-2 col-span-2"
        />

        <button className="col-span-2 bg-blue-600 text-white p-2">
          Apply Leave
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        {leaves.map((leave) => (
          <div
            key={leave._id}
            className="border-b py-3 flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{leave.employee_id?.name}</p>

              <p className="text-sm text-gray-500">
                {leave.from_date} → {leave.to_date}
              </p>

              <p className="text-xs text-gray-400">{leave.reason}</p>

              <p className="text-sm font-semibold">Status: {leave.status}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => approveLeave(leave._id)}
                className="bg-green-600 text-white px-2 py-1"
              >
                Approve
              </button>

              <button
                onClick={() => rejectLeave(leave._id)}
                className="bg-red-500 text-white px-2 py-1"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default Leaves;
