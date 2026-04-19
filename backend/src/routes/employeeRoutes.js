import express from "express";
import { createEmployee,getEmployees,updateEmployee ,deleteEmployee   } from "../controllers/employeeController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/employees",
  protect,
  authorizeRoles("admin", "manager"),
  createEmployee
);
router.get(
    "/employees",
    protect,
    authorizeRoles("admin", "manager"),
    getEmployees
  );
  router.put(
    "/employees/:id",
    protect,
    authorizeRoles("admin", "manager"),
    updateEmployee
  );
  router.delete(
    "/employees/:id",
    protect,
    authorizeRoles("admin", "manager"),
    deleteEmployee
  );
  

export default router;