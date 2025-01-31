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
import { isAuthenticated } from "../utils/middleware.js";

const fileRouter = Router();

fileRouter.get("/new", isAuthenticated, asyncWrapper(displayAddFileForm));

fileRouter.post(
  "/new",
  isAuthenticated,
  upload.single("upload_file"),
  asyncWrapper(addNewFile)
);

fileRouter.get("/:fileId", isAuthenticated, asyncWrapper(displayFileInfo));

fileRouter.get(
  "/:fileId/update",
  isAuthenticated,
  asyncWrapper(displayUpdateFilenameForm)
);

fileRouter.post(
  "/:fileId/update",
  filenameValidator,
  isAuthenticated,
  asyncWrapper(updateFilename)
);

fileRouter.post("/:fileId/delete", isAuthenticated, asyncWrapper(deleteFile));

export default fileRouter;
