import express from "express";
import "./utils/env.js";
import cookieParser from "cookie-parser";
import connectDB from "./db/connection.js";
import ProductsRouter from "./routes/products.js";
import UsersRouter from "./routes/users.js";
import passport from "./config/passport.js";
import {
  helmetMiddleware,
  corsMiddleware,
  apiLimiter,
} from "./middlewares/security.js";
import { compressionMiddleware } from "./middlewares/compression.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(compressionMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use("/api", apiLimiter);
app.use(passport.initialize());

app.use("/api/products", ProductsRouter);
app.use("/api/users", UsersRouter);

app.listen(PORT, () => {
  console.log("server has started");
  connectDB(process.env.CONNECTION_STRING);
});
