import { Router } from "express";
import asyncWrapper from "express-async-handler";
import {
  addNewFile,
  deleteFile,
  displayAddFileForm,
  displayFileInfo,
  displayUpdateFilenameForm,
  updateFilename,
} from "../controllers/fileController.js";

const fileRouter = Router();

fileRouter.get("/new", asyncWrapper(displayAddFileForm));

fileRouter.post("/new", asyncWrapper(addNewFile));

fileRouter.get("/:fileId", asyncWrapper(displayFileInfo));

fileRouter.get("/:fileId/update", asyncWrapper(displayUpdateFilenameForm));

fileRouter.post("/:fileId/update", asyncWrapper(updateFilename));

fileRouter.post("/:fileId/delete", asyncWrapper(deleteFile));

export default fileRouter;
