import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const authMiddleware =  async (req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.status(400).json({message: "User is not Authenticated."})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.userId);

    if(!req.user){
        return res.status(404).json({message: "User not found."})
    }

    next();
}