import mongoose from "mongoose";

export const connectDB = async () => {
  const URI = process.env.MONGO_URI;
  if (!URI) throw new Error("MONGO DB credentials not found");

  mongoose.connection.on("disconnect", () => console.warn("MongoDB disconnected"));
  mongoose.connection.on("error", (error) =>
    console.error("MongoDB Error: ", error));

  try {
    await mongoose.connect(URI, {
      dbName: "task-flow",
    });
    console.log(`Database is connected`);
  } catch (error) {
    console.log("MongoDB connection failed: ", error.message);
  }
};
