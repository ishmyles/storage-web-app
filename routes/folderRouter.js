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
import { isAuthenticated, isFolderOwner } from "../utils/middleware.js";

const folderRouter = Router();

folderRouter.get("/", isAuthenticated, asyncWrapper(displayUserFolders));

folderRouter.get(
  "/:folderId",
  isAuthenticated,
  isFolderOwner,
  asyncWrapper(displayFolderContents)
);

folderRouter.get(
  "/:folderId/new",
  isAuthenticated,
  isFolderOwner,
  asyncWrapper(displayNewFolderForm)
);

folderRouter.post(
  "/:folderId/new",
  foldernameValidator,
  isAuthenticated,
  isFolderOwner,
  asyncWrapper(createNewFolder)
);

folderRouter.get(
  "/:folderId/update",
  isAuthenticated,
  isFolderOwner,
  asyncWrapper(displayUpdateFolderForm)
);

folderRouter.post(
  "/:folderId/update",
  foldernameValidator,
  isAuthenticated,
  isFolderOwner,
  asyncWrapper(updateFolderName)
);

folderRouter.post(
  "/:folderId/delete",
  isAuthenticated,
  isFolderOwner,
  asyncWrapper(deleteFolder)
);

export default folderRouter;
