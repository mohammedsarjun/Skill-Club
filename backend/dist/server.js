import "reflect-metadata";
import express from 'express';
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
//Importing routes
import authRouter from './routes/authRouter.js';
dotenv.config();
const PORT = process.env.PORT;
connectDB();
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));
app.use("/api/auth", authRouter);
app.post("/api/admin/categories", (req, res) => {
    console.log(req.body);
});
// app.use("/api/admin",adminRouter)
app.listen(PORT, () => {
    console.log("Server is Running On Port : ", PORT);
});
//# sourceMappingURL=server.js.map