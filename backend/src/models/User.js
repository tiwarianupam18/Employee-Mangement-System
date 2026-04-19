import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, 
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["admin", "manager", "employee"],
      default: "employee", 
    },

    department: {
      type: String,
      default: "",
    },

    branch: {
      type: String,
      default: "",
    },

    designation: {
      type: String,
      default: "",
    },

    joining_date: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    manager_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      default: null,
    },
  },
  {
    timestamps: true, 
  }
);



const User = mongoose.model("User", userSchema);

export default User;