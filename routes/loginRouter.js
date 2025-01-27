import { Router } from "express";
import { displayLoginForm, loginUser } from "../controllers/loginController.js";

const loginController = Router();

loginController.get("/", displayLoginForm);

loginController.post("/", loginUser);

export default loginController;
