import express from "express";
import {
  registerUser,
  loginUser,
  getToken,
  getUser,
  updateAddress,
  logoutUser,
  addToCart,
  removeFromCart,
  getCart,
  updateCartQuantity,
  contact,
  newsletter
} from "../controllers/users.js";
import { authLimiter } from "../middlewares/security.js";

const UsersRouter = express.Router();

UsersRouter.post("/register", authLimiter, registerUser);
UsersRouter.post("/login", authLimiter, loginUser);
UsersRouter.post("/logout", authLimiter, logoutUser);
UsersRouter.post("/get-token", getToken);
UsersRouter.get("/get", getUser);
UsersRouter.put("/address", updateAddress);
UsersRouter.get("/cart", getCart);
UsersRouter.post("/cart/add", addToCart);
UsersRouter.post("/cart/remove", removeFromCart);
UsersRouter.put("/cart/update", updateCartQuantity);
UsersRouter.post("/contact", contact);
UsersRouter.post("/newsletter", newsletter);

export default UsersRouter;
