import { Router } from "express";
import asyncWrapper from "express-async-handler";
import {
  displaySignupForm,
  signupUser,
} from "../controllers/signupController.js";
import { signupValidator } from "../utils/formvalidators.js";

const signupController = Router();

signupController.get("/", displaySignupForm);

signupController.post("/", signupValidator, asyncWrapper(signupUser));

export default signupController;
