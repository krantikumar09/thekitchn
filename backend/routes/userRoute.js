import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.get("/get", getUser);

export default userRoute;
