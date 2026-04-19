import Shift from "../models/Shift.js";
import User from "../models/User.js";


export const createShift = async (req, res) => {
  try {
    const {
      employee_id,
      shift_date,
      start_time,
      end_time,
      branch,
    } = req.body;

    
    const employee = await User.findById(employee_id);

    if (!employee || employee.role !== "employee") {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

 
    if (employee.status !== "active") {
      return res.status(400).json({
        message: "Inactive employee cannot be assigned shift",
      });
    }

    
    const existingShift = await Shift.findOne({
      employee_id,
      shift_date,
      $or: [
        {
          start_time: { $lt: end_time },
          end_time: { $gt: start_time },
        },
      ],
    });

    if (existingShift) {
      return res.status(400).json({
        message: "Shift overlap detected",
      });
    }

    const shift = await Shift.create({
      employee_id,
      shift_date,
      start_time,
      end_time,
      branch,
    });

    res.status(201).json({
      message: "Shift created successfully",
      shift,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


export const getShifts = async (req, res) => {
  try {
    // 🔴 pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

   
    const shifts = await Shift.find()
      .populate("employee_id", "name email department designation")
      .sort({ createdAt: -1 }) // latest first
      .skip(skip)
      .limit(limit);


    const total = await Shift.countDocuments();

    res.status(200).json({
      message: "Shifts fetched successfully",
      page,
      totalPages: Math.ceil(total / limit),
      totalShifts: total,
      data: shifts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};



export const updateShift = async (req, res) => {
  try {
    const shiftId = req.params.id;

    // 🔴 1. Find shift
    const shift = await Shift.findById(shiftId);

    if (!shift) {
      return res.status(404).json({
        message: "Shift not found",
      });
    }

   
    const employee = await User.findById(shift.employee_id);

    if (!employee || employee.status !== "active") {
      return res.status(400).json({
        message: "Inactive employee cannot have shift updated",
      });
    }

    
    const newStart = req.body.start_time || shift.start_time;
    const newEnd = req.body.end_time || shift.end_time;
    const newDate = req.body.shift_date || shift.shift_date;

   
    const overlap = await Shift.findOne({
      employee_id: shift.employee_id,
      shift_date: newDate,
      _id: { $ne: shiftId }, // exclude current shift
      $or: [
        {
          start_time: { $lt: newEnd },
          end_time: { $gt: newStart },
        },
      ],
    });

    if (overlap) {
      return res.status(400).json({
        message: "Shift overlap detected",
      });
    }

    const updatedShift = await Shift.findByIdAndUpdate(
      shiftId,
      {
        shift_date: newDate,
        start_time: newStart,
        end_time: newEnd,
        branch: req.body.branch || shift.branch,
        status: req.body.status || shift.status,
      },
      { new: true }
    ).populate("employee_id", "name email");

    res.status(200).json({
      message: "Shift updated successfully",
      shift: updatedShift,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteShift = async (req, res) => {
  try {
    const shiftId = req.params.id;

   
    const shift = await Shift.findById(shiftId);

    if (!shift) {
      return res.status(404).json({
        message: "Shift not found",
      });
    }

   
    await Shift.findByIdAndDelete(shiftId);

    res.status(200).json({
      message: "Shift deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};