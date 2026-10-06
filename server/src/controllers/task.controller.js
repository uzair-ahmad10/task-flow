import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, category, priority } = req.body;

    if (!title || !status || !category || !priority) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = req.user;

    const task = await Task.create({
      userID: user._id,
      title,
      description,
      status,
      category,
      priority,
    });

    res.status(201).json({
      message: "Task created successfully.",
      task,
    });
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

import mongoose from "mongoose";

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const task = await Task.findOneAndDelete({
      _id: id,
      userID: req.user._id, // ownership enforced
    });

    if (!task) {
      return res.status(404).json({ message: "Task does not exist" });
    }

    return res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error("Delete task error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, category, priority } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const task = await Task.findOne({ _id: id, userID: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    // ── Detect changed fields ─────────────────────────────
    const changes = {};
    if (title !== undefined && title !== task.title) changes.title = title;
    if (description !== undefined && description !== task.description)
      changes.description = description;
    if (status !== undefined && status !== task.status) changes.status = status;
    if (category !== undefined && category !== task.category)
      changes.category = category;
    if (priority !== undefined && priority !== task.priority)
      changes.priority = priority;

    if (Object.keys(changes).length === 0) {
      return res.status(200).json({ message: "No changes detected", task });
    }

    Object.assign(task, changes);
    await task.save();

    return res.status(200).json({
      message: "Task updated successfully",
      changedFields: Object.keys(changes), // optional, useful for debugging
      task,
    });
  } catch (error) {
    console.error("Update task error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find tasks belonging to this user only
    const allTasks = await Task.find({ userID: user._id });

    return res.status(200).json({
      message: "Tasks have been fetched successfully.",
      tasks: allTasks,
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};