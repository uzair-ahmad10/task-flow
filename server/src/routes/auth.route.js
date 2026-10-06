import express from "express";
import {signup, login, logout, googleAuth, updateProfile} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.put("/update-profile", authMiddleware, updateProfile);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/google", googleAuth);


// check user is authenticated or not 
router.get("/check", authMiddleware, (req, res) => res.status(200).json(req.user));

export default router;