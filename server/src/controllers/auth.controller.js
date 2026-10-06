import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { emailTemplate } from "../utils/emailTemplate.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateToken } from "../utils/generateToken.js";
import { verifyGoogleToken } from "../utils/verifyGoogleToken.js";
import { imagekit } from "../utils/imagekitCredentials.js";

export const signup = async (req, res) => {
  try {
    const { fullName, password } = req.body;
    const email = req.body.email?.trim();

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All credentials are required." });
    }

    if (fullName.trim().length < 2 || fullName.trim().length > 100) {
      return res
        .status(400)
        .json({ message: "Full name must be 2-100 characters." });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 8 || password.length > 128) {
      return res
        .status(400)
        .json({ message: "Password must be between 8 and 128 characters." });
    }

    let user;

    user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      user = await User.create({
        fullName: fullName.trim(),
        email,
        password: hashedPassword,
      });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ message: "User already exists." });
      }
      throw err;
    }

    await sendEmail(email, emailTemplate(fullName)).catch((err) =>
      console.error("Verification email failed:", err),
    );

    const token = generateToken(user._id, res);
    return res.status(201).json({
      message: "User Registered Successfully",
      user: { id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (error) {
    console.log("Error in signup controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email.trim() || !password.trim()) {
    return res.status(400).json({ message: "All credentials are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, res);
    return res.status(200).json({
      message: "Logged in Successfully",
      user: { id: user._id, fullName: user.fullName, email: user.email },
      token: token,
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "Google credential is required." });
    }

    let payload;
    try {
      payload = await verifyGoogleToken(credential);
    } catch (error) {
      console.error("Google token verification failed:", error);
      return res.status(401).json({ message: "Invalid Google token" });
    }

    const { sub: googleId, email, name, picture } = payload;

    let user = await User.findOne({ $or: [{ googleId }, { email }] });
    let isNewUser = false;

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = user.authProvider === "local" ? "both" : "google";
        await user.save();
      }
    } else {
      isNewUser = true;
      user = await User.create({           // ← don't forget await
        fullName: name,
        email,
        avatar: picture || "",             // ← schema field is `avatar`, not `avatarUrl`
        googleId,
        authProvider: "google",
      });

      try {
        await sendEmail(email, emailTemplate(name));
      } catch (e) {
        console.error("Verification email failed:", e);
      }
    }

    const isSignup = {
      message: "Account created with Google successfully",
      signup: true
    }

    const isLogin = {
      message: "Logged in with Google successfully",
      login: true
    }

    const token = generateToken(user._id, res);
    return res.status(isNewUser ? 201 : 200).json({
      messageInfo: isNewUser
        ? isSignup
        : isLogin,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error("Error in googleAuth controller:", error);
    return res.status(500).json({ message: "Google authentication failed" });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};


export const updateProfile = async (req, res) => {
  try {
    const { avatar } = req.body;
    if (!avatar) {
      return res.status(400).json({ message: "Profile picture is required." });
    }

    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not found." });
    }

    // ImageKit requires both `file` and `fileName`
    const ikResponse = await imagekit.upload({
      file: avatar,
      fileName: `avatar_${userId}_${Date.now()}`,
      folder: "/task-flow",
    });

    // Await the query and pass { returnDocument: 'after' } (or { new: true })
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: ikResponse.url },
      { returnDocument: "after", runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Upload error in updateProfile:", error);
    return res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};