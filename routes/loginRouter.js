import { Router } from "express";
import asyncWrapper from "express-async-handler";
import passport from "passport";
import { displayLoginForm, loginUser } from "../controllers/loginController.js";
import { loginValidator } from "../utils/formvalidators.js";

const loginController = Router();

loginController.get("/", displayLoginForm);

loginController.post(
  "/",
  loginValidator,
  asyncWrapper(loginUser),
  passport.authenticate("local", {
    successRedirect: "/folders",
    failureRedirect: "/login",
  })
);

export default loginController;
