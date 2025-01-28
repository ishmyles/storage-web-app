import { validationResult } from "express-validator";

export const displayLoginForm = (req, res) =>
  res.render("loginSignup", { title: "Login", route: "/login" });

export const loginUser = (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.render("loginSignup", {
      title: "Login",
      route: "/login",
      errors: error.array(),
    });
  }

  return res.send("TODO: Form input to be used w/ session & passport");
};
