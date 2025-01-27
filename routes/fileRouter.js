import { Router } from "express";
import {
  addNewFile,
  deleteFile,
  displayAddFileForm,
  displayFileInfo,
  displayUpdateFilenameForm,
  updateFilename,
} from "../controllers/fileController.js";

const fileRouter = Router();

fileRouter.get("/new", displayAddFileForm);

fileRouter.post("/new", addNewFile);

fileRouter.get("/:fileId", displayFileInfo);

fileRouter.get("/:fileId/update", displayUpdateFilenameForm);

fileRouter.post("/:fileId/update", updateFilename);

fileRouter.post("/:fileId/delete", deleteFile);

export default fileRouter;
