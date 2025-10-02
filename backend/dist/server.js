import 'reflect-metadata';
import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/ErrorHandlers.js';
import qs from 'qs';
//Importing routes
import authRouter from './routes/authRouter.js';
import adminRouter from './routes/adminRouter.js';
import userRouter from './routes/userRouter.js';
dotenv.config();
const PORT = process.env.PORT;
connectDB();
const app = express();
app.set("query parser", (str) => qs.parse(str));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log('Server is Running On Port : ', PORT);
});
//# sourceMappingURL=server.js.map