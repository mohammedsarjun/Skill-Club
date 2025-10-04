import 'reflect-metadata';
import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/ErrorHandlers.js';
import AppError from './utils/AppError.js';
import sendEmailOtp from './utils/sendOtp.js';
import passport from './config/passport.js';
import qs from 'qs';
//Importing routes
import authRouter from './routes/authRouter.js';
import adminRouter from './routes/adminRouter.js';
import userRouter from './routes/userRouter.js';
import axios from 'axios';
import freelancerRouter from './routes/freelancerRouter.js';
import clientRouter from './routes/clientRouter.js';
dotenv.config();
const PORT = process.env.PORT;

connectDB();
const app = express();

app.set("query parser", (str: string) => qs.parse(str));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use('/api/auth', authRouter);

app.use('/api/admin', adminRouter);

app.use('/api/user', userRouter);

app.use('/api/freelancer', freelancerRouter);

app.use('/api/client',clientRouter)

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server is Running On Port : ', PORT);
});
