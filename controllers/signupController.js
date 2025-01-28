import { validationResult } from "express-validator";

export const displaySignupForm = (req, res) =>
  res.render("loginSignup", { title: "Sign up", route: "/signup" });

export const signupUser = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("loginSignup", {
      title: "Sign up",
      route: "/signup",
      errors: errors.array(),
    });
  } else {
    return res.send("TODO: Form input saved to DB");
  }
};
