import express from "express";
import {
  registerUser,
  loginUser,
  getToken,
  getUser,
  updateAddress
} from "../controllers/users.js";

const UsersRouter = express.Router();

UsersRouter.post("/register", registerUser);
UsersRouter.post("/login", loginUser);
UsersRouter.post("/get-token", getToken);
UsersRouter.get("/get", getUser);
UsersRouter.put("/address", updateAddress);

export default UsersRouter;
