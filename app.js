import express from "express";
import passport from "passport";
import expressSession from "express-session";
import connectPgSimple from "connect-pg-simple";
import path from "path";
import { fileURLToPath } from "url";

import signupController from "./routes/signupRouter.js";
import loginController from "./routes/loginRouter.js";
import folderRouter from "./routes/folderRouter.js";
import fileRouter from "./routes/fileRouter.js";
import db from "./db/poolConnection.js";
import passportConfig from "./config/passport.js";
import { isAuthenticated } from "./utils/middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pgSession = connectPgSimple(expressSession);

const app = express();
const _PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

passportConfig(passport);

app.use(
  expressSession({
    store: new pgSession({
      pool: db,
      tableName: "UserSession",
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  })
);

app.use(passport.authenticate("session"));

app.use("/login", loginController);
app.use("/signup", signupController);
app.use("/folders", folderRouter);
app.use("/files", fileRouter);

app.get("/", isAuthenticated, (req, res) => res.render("index"));

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.clearCookie("sid", { path: "/" });
    return res.status(302).redirect("/");
  });
});

app.get("*", (req, res) => res.send("404 Error: File not found"));

app.use((err, req, res, next) => {
  console.error(err);
  if (err.message) return res.status(500).send(err.message);
  return res.status(500).send("Internal Server Error: Something went wrong!");
});

app.listen(_PORT, () => console.log(`Server now listening at port ${_PORT}`));
