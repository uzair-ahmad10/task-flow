import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      trim: true,
      default: "A task to be completed and checked off from the list.",
    },

    status: {
      type: String,
      enum: ["Pending", "Progress", "Completed"],
      default: "Pending",
      required: true
    },

    category: {
      type: String,
      default: "General",
      required: true
    },

    priority: {
      type: String,
      default: "High",
      enum: ["Low", "Medium", "High"],
      required: true
    },
  },

  { timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
