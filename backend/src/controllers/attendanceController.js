import Attendance from "../models/Attendance.js";


export const checkIn = async (req, res) => {
  try {
    const employee_id = req.user._id;

    const today = new Date().toISOString().split("T")[0];

   
    let record = await Attendance.findOne({
      employee_id,
      date: today,
    });

    
    if (record && record.check_in) {
      return res.status(400).json({
        message: "Already checked in today",
      });
    }

    if (!record) {
      record = await Attendance.create({
        employee_id,
        date: today,
        check_in: new Date(),
      });
    } else {
      record.check_in = new Date();
      await record.save();
    }

    res.status(200).json({
      message: "Check-in successful",
      record,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
export const checkOut = async (req, res) => {
    try {
      const employee_id = req.user._id;
      const today = new Date().toISOString().split("T")[0];
  
      const record = await Attendance.findOne({
        employee_id,
        date: today,
      });
  
      
      if (!record || !record.check_in) {
        return res.status(400).json({
          message: "Cannot checkout before check-in",
        });
      }
  
      if (record.check_out) {
        return res.status(400).json({
          message: "Already checked out today",
        });
      }
  
      record.check_out = new Date();
  
      const diff =
        new Date(record.check_out) - new Date(record.check_in);
  
      record.working_hours = diff / (1000 * 60 * 60);
  
      await record.save();
  
      res.status(200).json({
        message: "Check-out successful",
        record,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  };

  export const getMyAttendance = async (req, res) => {
    try {
      const employee_id = req.user._id;
  
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      const skip = (page - 1) * limit;
  
      let filter = { employee_id };
  
      if (req.query.startDate && req.query.endDate) {
        filter.date = {
          $gte: req.query.startDate,
          $lte: req.query.endDate,
        };
      }
  
      const records = await Attendance.find(filter)
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit);
  
  
      const total = await Attendance.countDocuments(filter);
  
      res.status(200).json({
        message: "Attendance history fetched",
        page,
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        data: records,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  };