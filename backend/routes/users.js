import express from "express";
import { registerUser, loginUser, getToken, getUser } from "../controllers/users.js";

const UsersRouter = express.Router()

UsersRouter.post('/register', registerUser)
UsersRouter.post('/login', loginUser)
UsersRouter.post('/get-token', getToken)
UsersRouter.get('/get', getUser)

export default UsersRouter