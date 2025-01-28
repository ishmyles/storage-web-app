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

const folderRouter = Router();

folderRouter.get("/", asyncWrapper(displayUserFolders));

folderRouter.get("/:folderId", asyncWrapper(displayFolderContents));

folderRouter.get("/:folderId/new", asyncWrapper(displayNewFolderForm));

folderRouter.post("/:folderId/new", asyncWrapper(createNewFolder));

folderRouter.get("/:folderId/update", asyncWrapper(displayUpdateFolderForm));

folderRouter.post("/:folderId/update", asyncWrapper(updateFolderName));

folderRouter.post("/:folderId/delete", asyncWrapper(deleteFolder));

export default folderRouter;
