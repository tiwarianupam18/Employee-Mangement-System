import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employee_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    check_in: {
      type: Date,
      default: null,
    },

    check_out: {
      type: Date,
      default: null,
    },

    working_hours: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

attendanceSchema.index({ employee_id: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);