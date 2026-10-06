import { createTask, deleteTask, updateTask, getAllTask } from "../controllers/task.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import express from "express";

const router = express.Router();

router.post("/create-task",authMiddleware, createTask);
router.delete("/delete-task/:id",authMiddleware, deleteTask);
router.put("/update-task/:id", authMiddleware, updateTask);
router.get("/get-all-tasks", authMiddleware, getAllTask);


export default router;