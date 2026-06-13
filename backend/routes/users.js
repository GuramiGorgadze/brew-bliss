import express from "express";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";
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
  newsletter,
  forgotPasswordUser,
  resetPasswordUser,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
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
UsersRouter.get("/wishlist", getWishlist);
UsersRouter.post("/wishlist/add", addToWishlist);
UsersRouter.post("/wishlist/remove", removeFromWishlist);
UsersRouter.post("/contact", contact);
UsersRouter.post("/newsletter", newsletter);
UsersRouter.post("/forgot", forgotPasswordUser);
UsersRouter.post("/reset", resetPasswordUser);

UsersRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

UsersRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    session: false,
  }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.redirect("http://localhost:5173/account");
  },
);

export default UsersRouter;
