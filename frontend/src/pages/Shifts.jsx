import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import api from "../services/api";

function Shifts() {
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    employee_id: "",
    shift_date: "",
    start_time: "",
    end_time: "",
    branch: "",
  });

  const [editId, setEditId] = useState(null);

  const fetchShifts = async () => {
    try {
      const res = await api.get("/shifts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setShifts(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setEmployees(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchShifts();
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(`/shifts/${editId}`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        alert("Shift updated");
        setEditId(null);
      } else {
        await api.post("/shifts", form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        alert("Shift created");
      }

      setForm({
        employee_id: "",
        shift_date: "",
        start_time: "",
        end_time: "",
        branch: "",
      });

      fetchShifts();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/shifts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Shift deleted");
      fetchShifts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (shift) => {
    setEditId(shift._id);

    setForm({
      employee_id: shift.employee_id?._id,
      shift_date: shift.shift_date,
      start_time: shift.start_time,
      end_time: shift.end_time,
      branch: shift.branch,
    });
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Shift Management</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-3 mb-6 bg-white p-4 rounded shadow"
      >
        {/* Employee Dropdown */}
        <select
          name="employee_id"
          value={form.employee_id}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="shift_date"
          value={form.shift_date}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="time"
          name="start_time"
          value={form.start_time}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="time"
          name="end_time"
          value={form.end_time}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="text"
          name="branch"
          value={form.branch}
          placeholder="Branch"
          onChange={handleChange}
          className="border p-2"
        />

        <button className="col-span-2 bg-blue-600 text-white p-2">
          {editId ? "Update Shift" : "Create Shift"}
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        {shifts.map((shift) => (
          <div key={shift._id} className="flex justify-between border-b py-2">
            <div>
              <p className="font-bold">{shift.employee_id?.name}</p>

              <p className="text-sm text-gray-500">
                {shift.shift_date} | {shift.start_time} - {shift.end_time}
              </p>

              <p className="text-xs text-gray-400">{shift.branch}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(shift)}
                className="bg-yellow-500 px-2 py-1 text-white"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(shift._id)}
                className="bg-red-500 px-2 py-1 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default Shifts;
