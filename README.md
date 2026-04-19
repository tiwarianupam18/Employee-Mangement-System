# 🧑‍💼 Employee Shift Scheduling & Attendance Management System (MERN Stack)

A full-stack role-based Employee Management System built using the MERN stack.  
It supports employee management, shift scheduling, attendance tracking, and leave management with JWT authentication.

---

## 🚀 Features

### 🔐 Authentication & Roles

- JWT-based login system
- 3 Roles:
  - Admin (Full access)
  - Manager (Manage employees, shifts, leaves)
  - Employee (Attendance & leave application)
- Role-based dashboard and UI

---

### 👨‍💼 Employee Management

- Add / Update / Delete employees
- View employee list
- Fields:
  - name
  - email
  - department
  - branch
  - designation
  - joining_date
  - status
  - manager_id

---

### 📅 Shift Management

- Create / Update / Delete shifts
- Assign shifts to employees
- Prevent overlapping shifts (backend validation)
- Fields:
  - employee_id
  - shift_date
  - start_time
  - end_time
  - branch
  - status

---

### ⏱️ Attendance System

- Check-in / Check-out system
- Auto working hours calculation
- Attendance history view
- Prevent multiple check-ins / invalid checkout

---

### 🏖️ Leave Management

- Apply leave (Employee)
- Approve / Reject leave (Admin/Manager)
- View leave requests
- Status tracking (Pending / Approved / Rejected)

---

## 🧑‍💻 Tech Stack

### Backend:

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### Frontend:

- React.js
- Tailwind CSS
- Axios
- React Router

---

## ⚙️ Installation Guide

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/employee-system.git
cd employee-system


2️⃣ Backend Setup
cd backend
npm install
npm start

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
🔐 Environment Variables

Create .env file in backend:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development


🔑 Role System (Important)
Employee role → created via registration (default)
Admin role → manually created in database or seed script
Manager role → assigned manually by Admin
Role is stored inside JWT token and used for access control
📡 API Endpoints
Auth
POST /api/register
POST /api/login
Employees
GET /api/employees
POST /api/employees
PUT /api/employees/:id
DELETE /api/employees/:id
Shifts
GET /api/shifts
POST /api/shifts
PUT /api/shifts/:id
DELETE /api/shifts/:id
Attendance
POST /api/attendance/checkin
POST /api/attendance/checkout
GET /api/attendance/me
Leaves
GET /api/leaves
POST /api/leaves
PUT /api/leaves/:id/approve
PUT /api/leaves/:id/reject



📂 Project Structure

employee-system/
│
├── backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   │    └── db.js
│   │   │
│   │   ├── controllers/
│   │   │    ├── authController.js
│   │   │    ├── employeeController.js
│   │   │    ├── shiftController.js
│   │   │    ├── attendanceController.js
│   │   │    └── leaveController.js
│   │   │
│   │   ├── middleware/
│   │   │    ├── authMiddleware.js
│   │   │
│   │   ├── models/
│   │   │    ├── User.js
│   │   │    ├── Employee.js
│   │   │    ├── Shift.js
│   │   │    ├── Attendance.js
│   │   │    └── Leave.js
│   │   │
│   │   ├── routes/
│   │   │    ├── authRoutes.js
│   │   │    ├── employeeRoutes.js
│   │   │    ├── shiftRoutes.js
│   │   │    ├── attendanceRoutes.js
│   │   │    └── leaveRoutes.js
│   │   │
│   │   ├── utils/
│   │   │    └── generateToken.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── .gitignore
│
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │    ├── Navbar.jsx
│   │   │    ├── Sidebar.jsx
│   │   │
│   │   ├── layout/
│   │   │    └── MainLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │    ├── Login.jsx
│   │   │    ├── Register.jsx
│   │   │    ├── Dashboard.jsx
│   │   │    ├── Employees.jsx
│   │   │    ├── Shifts.jsx
│   │   │    ├── Attendance.jsx
│   │   │    └── Leaves.jsx
│   │   │
│   │   ├── services/
│   │   │    └── api.js
│   │   │
│   │   ├── utils/
│   │   │    └── auth.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── .gitignore
│
│
├── README.md
└── .gitignore
```
