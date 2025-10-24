import 'reflect-metadata';
import express from 'express';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/error-handlers-middleware';
import qs from 'qs';
//Importing routes
import authRouter from './routes/auth-router';
import adminRouter from './routes/admin-router';
import userRouter from './routes/user-router';
import freelancerRouter from './routes/freelancer-router';
import clientRouter from './routes/client-router';
import morgan from 'morgan';
import { appLogger, accessLogStream } from './utils/logger';
dotenv.config();
const PORT = process.env.PORT;

connectDB();
const app = express();

// HTTP request logging
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined', { stream: accessLogStream }));
} else {
  app.use(morgan('dev'));
}

app.set('query parser', (str: string) => qs.parse(str));
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

app.use('/api/client', clientRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  appLogger.info(`Server is running on port: ${PORT}`);
});
