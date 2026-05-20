import express from "express";
import { registerUser, loginUser } from "../controllers/users.js";

const UsersRouter = express.Router()

UsersRouter.post('/register', registerUser)
UsersRouter.post('/login', loginUser)

export default UsersRouter