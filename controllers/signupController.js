import { validationResult } from "express-validator";
import { createUser } from "../db/queries.js";

export const displaySignupForm = (req, res) =>
  res.render("loginSignup", { title: "Sign up", route: "/signup" });

export const signupUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("loginSignup", {
      title: "Sign up",
      route: "/signup",
      errors: errors.array(),
    });
  } else {
    try {
      await createUser(req.body);
    } catch (err) {
      next(err);
    }

    return res.status(302).redirect("/login");
  }
};
