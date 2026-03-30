import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleStatus,
  searchTasks,
} from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/status", toggleStatus);
router.get("/search", searchTasks);

export default router;