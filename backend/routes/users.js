import express from "express";
import {
  registerUser,
  loginUser,
  getToken,
  getUser,
  updateAddress,
} from "../controllers/users.js";
import { authLimiter } from "../middlewares/security.js";

const UsersRouter = express.Router();

UsersRouter.post("/register", authLimiter, registerUser);
UsersRouter.post("/login", authLimiter, loginUser);
UsersRouter.post("/get-token", getToken);
UsersRouter.get("/get", getUser);
UsersRouter.put("/address", updateAddress);

export default UsersRouter;
