import { Router } from "express";
import asyncWrapper from "express-async-handler";
import { displayLoginForm, loginUser } from "../controllers/loginController.js";
import { loginValidator } from "../utils/formvalidators.js";

const loginController = Router();

loginController.get("/", displayLoginForm);

loginController.post("/", loginValidator, asyncWrapper(loginUser));

export default loginController;
