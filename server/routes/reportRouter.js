import express from "express";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import {exportTasksReport,exportUsersReport,exportMyTasksReport} from "../controllers/reportController.js"


const router = express.Router();


router.get("/export/tasks",protect,adminOnly,exportTasksReport);//Export all tasks as Excel/PDF (Admin only)
router.get("/export/my-tasks",protect,exportMyTasksReport);//Export user's own tasks (Users)
router.get("/export/users",protect,adminOnly,exportUsersReport);//Export user task report (Admin only)

export default router;