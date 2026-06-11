import Users from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  sendResetPasswordMail,
  sendContactMail,
  sendNewsletterMail,
} from "../utils/mailSender.js";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "An account with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(
      password + process.env.BCRYPT_PEPPER,
      11,
    );

    const newUser = new Users({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const newUserData = returnAllExceptPassword(newUser);

    res.status(200).json({ data: newUserData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      password + process.env.BCRYPT_PEPPER,
      user.password,
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const newUserData = returnAllExceptPassword(user);
    return res.status(200).json({ data: newUserData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ data: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ err: "Something went wrong" });
  }
};

export const getToken = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ err: "Not authenticated" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err)
        return res
          .status(400)
          .json({ err: "Session expired, please log in again" });
      return res.status(200).json({ data: token });
    });
  } catch (err) {
    return res.status(500).json({ err: "Something went wrong" });
  }
};

export const getUser = async (req, res) => {
  try {
    const token = req.header("Authorization");

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.id;

    const userData = await Users.findById(userId).select("-password");

    return res.status(200).json({ data: userData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Something went wrong" });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const updatedUser = await Users.findByIdAndUpdate(
      decoded.id,
      { address: req.body },
      { new: true },
    ).select("-password");

    return res.status(200).json({ data: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { productId, variantSize, quantity } = req.body;

    const user = await Users.findById(decoded.id);

    const existingItem = user.cart.find(
      (item) =>
        item.productId === productId && item.variantSize === variantSize,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId, variantSize, quantity });
    }

    await user.save();
    return res.status(200).json({ data: user.cart });
  } catch (err) {
    return res.status(500).json({ err: "Something went wrong" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { productId, variantSize } = req.body;

    const user = await Users.findByIdAndUpdate(
      decoded.id,
      { $pull: { cart: { productId, variantSize } } },
      { new: true },
    ).select("-password");

    return res.status(200).json({ data: user.cart });
  } catch (err) {
    return res.status(500).json({ err: "Something went wrong" });
  }
};

export const getCart = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await Users.findById(decoded.id).populate({
      path: "cart.productId",
      model: "Product",
      select: "title image variants tags",
    });

    return res.status(200).json({ data: user.cart });
  } catch (err) {
    return res.status(500).json({ err: "Something went wrong" });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { productId, variantSize, quantity } = req.body;

    const user = await Users.findById(decoded.id);

    const item = user.cart.find(
      (item) =>
        item.productId.toString() === productId &&
        item.variantSize === variantSize,
    );

    if (!item) {
      return res.status(404).json({ err: "Cart item not found" });
    }

    item.quantity = Math.max(1, quantity);
    await user.save();

    return res.status(200).json({ data: user.cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Something went wrong" });
  }
};

export const contact = async (req, res) => {
  try {
    const { email, message } = req.body;
    await sendContactMail(email, message);
    return res.status(200).json({ data: "Message sent successfully" });
  } catch (err) {
    return res.status(500).json({ err: "Something went wrong" });
  }
};

export const newsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    await sendNewsletterMail(email);
    return res
      .status(200)
      .json({ data: "Successfully subscribed to newsletter" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Something went wrong" });
  }
};

export const forgotPasswordUser = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await Users.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ err: "No account found with that email" });
    }

    const access_token = jwt.sign(
      { id: user._id },
      process.env.JWT_RESET_PASS_SECRET_KEY,
      { expiresIn: "15m" },
    );
    const url = `http://localhost:5173/reset-password/${access_token}`;

    await sendResetPasswordMail(email, url);

    return res.status(200).json({ data: "Reset link sent to your email" });
  } catch (err) {
    console.error("forgotPasswordUser error:", err);
    return res.status(500).json({ err: "Something went wrong" });
  }
};

export const resetPasswordUser = async (req, res) => {
  try {
    const { password } = req.body;
    const token = req.header("Authorization");

    const decoded = jwt.verify(token, process.env.JWT_RESET_PASS_SECRET_KEY);
    const userId = decoded.id;

    const hashedPassword = await bcrypt.hash(
      password + process.env.BCRYPT_PEPPER,
      11,
    );

    await Users.findOneAndUpdate(
      { _id: userId },
      {
        password: hashedPassword,
      },
    );

    return res.status(200).json({ data: "Password updated successfully" });
  } catch (err) {
    return res.status(500).json({ err: "Something went wrong" });
  }
};

//helper functions
const returnAllExceptPassword = (user) => {
  const { password, ...safeUser } = user._doc || user;
  return safeUser;
};
