import express from "express";
import { checkIn, checkOut,getMyAttendance  } from "../controllers/attendanceController.js";
import { protect,authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/attendance/checkin",
    protect,
    authorizeRoles("employee"),
    checkIn
  );
router.post("/attendance/checkout", protect, checkOut);router.post(
    "/attendance/checkout",
    protect,
    authorizeRoles("employee"),
    checkOut
  );
  router.get("/attendance/me", protect, getMyAttendance);
export default router;