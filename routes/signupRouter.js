import { Router } from "express";
import asyncWrapper from "express-async-handler";
import {
  displaySignupForm,
  signupUser,
} from "../controllers/signupController.js";

const signupController = Router();

signupController.get("/", displaySignupForm);

signupController.post("/", asyncWrapper(signupUser));

export default signupController;
