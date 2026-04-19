import Leave from "../models/Leave.js";


export const applyLeave = async (req, res) => {
  try {
    const employee_id = req.user._id;

    const { from_date, to_date, reason } = req.body;

   
    if (!from_date || !to_date || !reason) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

   
    const leave = await Leave.create({
      employee_id,
      from_date,
      to_date,
      reason,
      status: "pending",
    });

    res.status(201).json({
      message: "Leave applied successfully",
      leave,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


export const approveLeave = async (req, res) => {
    try {
      const leaveId = req.params.id;
  
      const leave = await Leave.findById(leaveId);
  
      if (!leave) {
        return res.status(404).json({
          message: "Leave not found",
        });
      }
  
    
      if (leave.status !== "pending") {
        return res.status(400).json({
          message: "Leave already processed",
        });
      }
  
      leave.status = "approved";
      await leave.save();
  
      res.status(200).json({
        message: "Leave approved successfully",
        leave,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  };

  export const rejectLeave = async (req, res) => {
    try {
      const leaveId = req.params.id;
  
      const leave = await Leave.findById(leaveId);
  
      if (!leave) {
        return res.status(404).json({
          message: "Leave not found",
        });
      }
  
      if (leave.status !== "pending") {
        return res.status(400).json({
          message: "Leave already processed",
        });
      }
  
      leave.status = "rejected";
      await leave.save();
  
      res.status(200).json({
        message: "Leave rejected successfully",
        leave,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  };

 
export const getLeaves = async (req, res) => {
    try {
      const user = req.user;
  
      let filter = {};
  
      // 🔴 Employee → only own leaves
      if (user.role === "employee") {
        filter.employee_id = user._id;
      }
  
     
  
      const leaves = await Leave.find(filter)
        .populate("employee_id", "name email department")
        .sort({ createdAt: -1 });
  
      res.status(200).json({
        message: "Leaves fetched successfully",
        data: leaves,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  };