import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import api from "../services/api";

function Employees() {
  const [employees, setEmployees] = useState([]);

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    branch: "",
    designation: "",
  });

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
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(`/employees/${editId}`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        alert("Employee updated");
        setEditId(null);
      } else {
        await api.post("/employees", form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        alert("Employee added");
      }

      // reset form
      setForm({
        name: "",
        email: "",
        department: "",
        branch: "",
        designation: "",
      });

      fetchEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Employee deleted");
      fetchEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (emp) => {
    setEditId(emp._id);

    setForm({
      name: emp.name,
      email: emp.email,
      department: emp.department,
      branch: emp.branch,
      designation: emp.designation,
    });
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Employee Management</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-3 mb-6 bg-white p-4 rounded shadow"
      >
        <input
          name="name"
          value={form.name}
          placeholder="Name"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="department"
          value={form.department}
          placeholder="Department"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="branch"
          value={form.branch}
          placeholder="Branch"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="designation"
          value={form.designation}
          placeholder="Designation"
          onChange={handleChange}
          className="border p-2"
        />

        <button className="col-span-2 bg-blue-600 text-white p-2">
          {editId ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        {employees.map((emp) => (
          <div key={emp._id} className="flex justify-between border-b py-2">
            <div>
              <p className="font-bold">{emp.name}</p>
              <p className="text-sm text-gray-500">{emp.email}</p>
              <p className="text-xs text-gray-400">
                {emp.department} | {emp.branch}
              </p>
            </div>

            <div className="flex gap-5 items-center">
              <button
                onClick={() => handleEdit(emp)}
                className="bg-cyan-300 mx-5 px-2 py-1 text-red"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(emp._id)}
                className="bg-red-500 ml-3 px-2 py-1 text-white"
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

export default Employees;
