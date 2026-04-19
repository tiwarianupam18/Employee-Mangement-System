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
```
