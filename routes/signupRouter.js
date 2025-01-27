import { Router } from "express";
import {
  displaySignupForm,
  signupUser,
} from "../controllers/signupController.js";

const signupController = Router();

signupController.get("/", displaySignupForm);

signupController.post("/", signupUser);

export default signupController;
