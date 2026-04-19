import express from "express";
import { applyLeave, approveLeave,
    rejectLeave,getLeaves  } from "../controllers/leaveController.js";
import { protect,authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/leaves", protect, applyLeave);

// APPROVE
router.put(
    "/leaves/:id/approve",
    protect,
    authorizeRoles("admin", "manager"),
    approveLeave
  );
  
  // REJECT
  router.put(
    "/leaves/:id/reject",
    protect,
    authorizeRoles("admin", "manager"),
    rejectLeave
  );
  router.get("/leaves", protect, getLeaves);

export default router;