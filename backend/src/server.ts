import "reflect-metadata";
import express from 'express'
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/ErrorHandlers.js";
import AppError from "./utils/AppError.js";
import sendEmailOtp from "./utils/sendOtp.js";
import passport from './config/passport.js';

//Importing routes
import authRouter from './routes/authRouter.js';
import adminRouter from "./routes/adminRouter.js";
import userRouter from "./routes/userRouter.js";
import axios from "axios";
dotenv.config();
const PORT=process.env.PORT

connectDB()
const app =express()





app.use(express.json())
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000",
    credentials: true,   
}));




app.use("/api/auth",authRouter)

app.use("/api/admin",adminRouter)

app.use("/api/user",userRouter)

app.use(errorHandler);

app.listen(PORT,()=>{
    console.log("Server is Running On Port : ",PORT)
})