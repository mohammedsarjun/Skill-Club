import "reflect-metadata";
import express from 'express';
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./middlewares/ErrorHandlers.js";
//Importing routes
import authRouter from './routes/authRouter.js';
import adminRouter from "./routes/adminRouter.js";
dotenv.config();
const PORT = process.env.PORT;
connectDB();
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log("Server is Running On Port : ", PORT);
});
//# sourceMappingURL=server.js.map