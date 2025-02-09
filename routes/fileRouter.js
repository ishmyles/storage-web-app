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
import {
  isAuthenticated,
  isFileOwner,
  isFolderOwner,
} from "../utils/middleware.js";

const fileRouter = Router();

fileRouter.get(
  "/:fileId",
  isAuthenticated,
  isFileOwner,
  asyncWrapper(displayFileInfo)
);

fileRouter.get(
  "/:folderId/new",
  isAuthenticated,
  isFolderOwner,
  asyncWrapper(displayAddFileForm)
);

fileRouter.post(
  "/:folderId/new",
  isAuthenticated,
  isFolderOwner,
  upload.single("upload_file"),
  asyncWrapper(addNewFile)
);

fileRouter.get(
  "/:fileId/update",
  isAuthenticated,
  isFileOwner,
  asyncWrapper(displayUpdateFilenameForm)
);

fileRouter.post(
  "/:fileId/update",
  filenameValidator,
  isAuthenticated,
  isFileOwner,
  asyncWrapper(updateFilename)
);

fileRouter.post(
  "/:fileId/delete",
  isAuthenticated,
  isFileOwner,
  asyncWrapper(deleteFile)
);

export default fileRouter;
