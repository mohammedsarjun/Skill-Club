import "reflect-metadata";
import express from 'express'
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors"
import sendEmailOtp from "./utils/sendOtp.js";

//Importing routes
import authRouter from './routes/authRouter.js';

dotenv.config();
const PORT=process.env.PORT

connectDB()
const app =express()

app.use(express.json())

app.use(cors({
  origin: "http://localhost:3000"
}));


sendEmailOtp("sarjunsarjunms77@gmail.com","1234")
app.use("/api/auth",authRouter)

app.listen(PORT,()=>{
    console.log("Server is Running On Port : ",PORT)
})