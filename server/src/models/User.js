import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    password: {
      type: String,
      required: function () {
        return this.authProvider === "local" || this.authProvider === "both";
      },
      validate: {
        validator: function (password) {
          return (
            (this.authProvider === "google" && password.length === 0) ||
            (password.length >= 8 && password.length <= 128)
          );
        },
        message: "Password must be between 8 and 128 characters.",
      },
      default: "", // hidden from queries by default
    },
    avatar: {
      type: String,
      default: "",
      trim: true, // remove the whitespaces from the starting and ending
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // optional, but unique when present
      default: "",
    },
    authProvider: {
      type: String,
      enum: ["local", "google", "both"],
      default: "local",
    },
  },
  {
    timestamps: true, // auto-manages createdAt + updatedAt
  },
);

const User = mongoose.model("User", userSchema);
export default User;
