import { Router } from "express";
import asyncWrapper from "express-async-handler";
import {
  createNewFolder,
  deleteFolder,
  displayFolderContents,
  displayNewFolderForm,
  displayUpdateFolderForm,
  displayUserFolders,
  updateFolderName,
} from "../controllers/folderController.js";
import { foldernameValidator } from "../utils/formvalidators.js";
import { isAuthenticated } from "../utils/middleware.js";

const folderRouter = Router();

folderRouter.get("/", isAuthenticated, asyncWrapper(displayUserFolders));

folderRouter.get(
  "/:folderId",
  isAuthenticated,
  asyncWrapper(displayFolderContents)
);

folderRouter.get(
  "/:folderId/new",
  isAuthenticated,
  asyncWrapper(displayNewFolderForm)
);

folderRouter.post(
  "/:folderId/new",
  foldernameValidator,
  isAuthenticated,
  asyncWrapper(createNewFolder)
);

folderRouter.get(
  "/:folderId/update",
  isAuthenticated,
  asyncWrapper(displayUpdateFolderForm)
);

folderRouter.post(
  "/:folderId/update",
  foldernameValidator,
  isAuthenticated,
  asyncWrapper(updateFolderName)
);

folderRouter.post(
  "/:folderId/delete",
  isAuthenticated,
  asyncWrapper(deleteFolder)
);

export default folderRouter;
