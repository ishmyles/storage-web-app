import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import signupController from "./routes/signupRouter.js";
import loginController from "./routes/loginRouter.js";
import folderRouter from "./routes/folderRouter.js";
import fileRouter from "./routes/fileRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const _PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/login", loginController);
app.use("/signup", signupController);
app.use("/folders", folderRouter);
app.use("/files", fileRouter);

app.get("/", (req, res) => res.render("index"));

app.get("*", (req, res) => res.send("404 Error: File not found"));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error: Something went wrong!");
});

app.listen(_PORT, () => console.log(`Server now listening at port ${_PORT}`));
