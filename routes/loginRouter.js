import { Router } from "express";
import asyncWrapper from "express-async-handler";
import { displayLoginForm, loginUser } from "../controllers/loginController.js";

const loginController = Router();

loginController.get("/", displayLoginForm);

loginController.post("/", asyncWrapper(loginUser));

export default loginController;
