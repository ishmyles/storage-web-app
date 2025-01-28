import { body } from "express-validator";

export const signupValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Must enter a username")
    .custom(async (value) => {
      // TODO: query db to see if username exists & fail validator if it does
      if (!value) {
        return Promise.reject();
      } else {
        return Promise.resolve();
      }
    })
    .withMessage("Username already taken"),
  body("password").notEmpty().withMessage("Must enter a password"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Must confirm your password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("Passwords must match"),
];

export const loginValidator = [
  body("username").notEmpty().withMessage("Must enter a username"),
  body("password")
    .notEmpty()
    .withMessage("Must enter a password")
    .custom(async (value) => {
      // TODO: query db to see if username matches password & fail validator if it doesn't
      if (!value) {
        return Promise.reject();
      } else {
        return Promise.resolve();
      }
    })
    .withMessage("Incorrect username or password"),
];

export const foldernameValidator = [
  body("foldername")
    .trim()
    .notEmpty()
    .withMessage("Must enter the new folder name")
    .custom(async (value) => {
      //TODO: check to see if folder name already exists & fail validation if it does
      return Promise.resolve();
    })
    .withMessage("Folder name already exists"),
];

export const filenameValidator = [
  body("filename")
    .trim()
    .notEmpty()
    .withMessage("Must enter the new file name")
    .custom(async (value) => {
      //TODO: check to see if file name already exists & fail validation if it does
      return Promise.resolve();
    })
    .withMessage("File name already exists"),
];
