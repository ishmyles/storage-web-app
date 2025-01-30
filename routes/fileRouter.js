import { Router } from "express";
import asyncWrapper from "express-async-handler";
import upload from "../utils/multerUpload.js";
import {
  addNewFile,
  deleteFile,
  displayAddFileForm,
  displayFileInfo,
  displayUpdateFilenameForm,
  updateFilename,
} from "../controllers/fileController.js";
import { filenameValidator } from "../utils/formvalidators.js";

const fileRouter = Router();

fileRouter.get("/new", asyncWrapper(displayAddFileForm));

fileRouter.post("/new", upload.single("upload_file"), asyncWrapper(addNewFile));

fileRouter.get("/:fileId", asyncWrapper(displayFileInfo));

fileRouter.get("/:fileId/update", asyncWrapper(displayUpdateFilenameForm));

fileRouter.post(
  "/:fileId/update",
  filenameValidator,
  asyncWrapper(updateFilename)
);

fileRouter.post("/:fileId/delete", asyncWrapper(deleteFile));

export default fileRouter;
