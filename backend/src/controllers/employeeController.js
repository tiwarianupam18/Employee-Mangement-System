import User from "../models/User.js";


export const createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      department,
      branch,
      designation,
      manager_id,
    } = req.body;
l
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        message: "Employee already exists with this email",
      });
    }

   
    const employee = await User.create({
      name,
      email,
      password: "default123", 
      role: "employee",
      department,
      branch,
      designation,
      manager_id,
      status: "active",
      joining_date: new Date(),
    });

    res.status(201).json({
      message: "Employee created successfully",
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


export const getEmployees = async (req, res) => {
    try {
      
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      const skip = (page - 1) * limit;
  
      const employees = await User.find({ role: "employee" })
        .select("-password")
        .skip(skip)
        .limit(limit);
  
      const total = await User.countDocuments({ role: "employee" });
  
      res.status(200).json({
        message: "Employees fetched successfully",
        page,
        totalPages: Math.ceil(total / limit),
        totalEmployees: total,
        data: employees,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  };

 
export const updateEmployee = async (req, res) => {
    try {
      const employeeId = req.params.id;
  

      const employee = await User.findById(employeeId);
  
      if (!employee || employee.role !== "employee") {
        return res.status(404).json({
          message: "Employee not found",
        });
      }
  
    
      const updatedData = {
        name: req.body.name || employee.name,
        department: req.body.department || employee.department,
        branch: req.body.branch || employee.branch,
        designation: req.body.designation || employee.designation,
        status: req.body.status || employee.status,
        manager_id: req.body.manager_id || employee.manager_id,
      };
  
      
      const updatedEmployee = await User.findByIdAndUpdate(
        employeeId,
        updatedData,
        { new: true } // return updated document
      ).select("-password");
  
      res.status(200).json({
        message: "Employee updated successfully",
        employee: updatedEmployee,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  };


export const deleteEmployee = async (req, res) => {
    try {
      const employeeId = req.params.id;
  
      
      const employee = await User.findById(employeeId);
  
      if (!employee || employee.role !== "employee") {
        return res.status(404).json({
          message: "Employee not found",
        });
      }
  
      
      await User.findByIdAndDelete(employeeId);
  
      res.status(200).json({
        message: "Employee deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  };