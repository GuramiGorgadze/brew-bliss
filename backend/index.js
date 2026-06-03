import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db/connection.js";
import ProductsRouter from "./routes/products.js";
import UsersRouter from "./routes/users.js";
import {
  helmetMiddleware,
  corsMiddleware,
  apiLimiter,
} from "./middlewares/security.js";
import { compressionMiddleware } from "./middlewares/compression.js";

dotenv.config();

const app = express();

app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(compressionMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use("/api", apiLimiter);

app.use("/api/products", ProductsRouter);
app.use("/api/users", UsersRouter);

app.listen(3000, () => {
  console.log("server has started");
  connectDB(process.env.CONNECTION_STRING);
});
