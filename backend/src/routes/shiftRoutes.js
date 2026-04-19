import express from "express";
import { createShift,getShifts,updateShift,deleteShift } from "../controllers/shiftController.js";
import { protect, authorizeRoles, } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/shifts",
  protect,
  authorizeRoles("admin", "manager"),
  createShift
);

router.get(
    "/shifts",
    protect,
    authorizeRoles("admin", "manager"),
    getShifts
  );
  router.put(
    "/shifts/:id",
    protect,
    authorizeRoles("admin", "manager"),
    updateShift
  );
  router.delete(
    "/shifts/:id",
    protect,
    authorizeRoles("admin", "manager"),
    deleteShift
  );
export default router;