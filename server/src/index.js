import express, { json } from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./utils/db.js";
import { rateLimit } from 'express-rate-limit';
import authRouter from "./routes/auth.route.js";
import taskRouter from "./routes/task.route.js"

const app = express();

const PORT = process.env.PORT;

app.use(json({limit:"5mb"}));
app.use(cookieParser());
app.use(cors({
    origin: [process.env.CLIENT_URL],
    methods:["PUT", "DELETE", "POST", "GET"],
    credentials:true
}));
const limit = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	message: 'Too many requests from this IP, please try again later.'
})
app.use(limit);


app.use("/auth", authRouter);
app.use("/task", taskRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running at the PORT: ${PORT}`);
    connectDB();
});
