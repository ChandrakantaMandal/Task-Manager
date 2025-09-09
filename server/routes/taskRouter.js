import express from "express";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import {
  getDashboardData,
  getTaskById,
  updateTask,
  createTask,
  deleteTask,
  updateTaskChecklist,
  updateTaskStatus,
  getTasks,
  getUserDashboardData,
} from "../controllers/taskController.js";

const router = express.Router();

//Task Management Routes
router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);
router.post("/", protect, adminOnly, createTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, adminOnly, deleteTask);
router.patch("/:id/status", protect, updateTaskStatus);
router.patch("/:id/todo", protect, updateTaskChecklist);

export default router;
