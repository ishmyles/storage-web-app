import { Router } from "express";
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

folderRouter.get("/", displayUserFolders);

folderRouter.get("/:folderId", displayFolderContents);

folderRouter.get("/:folderId/new", displayNewFolderForm);

folderRouter.post("/:folderId/new", createNewFolder);

folderRouter.get("/:folderId/update", displayUpdateFolderForm);

folderRouter.post("/:folderId/update", updateFolderName);

folderRouter.post("/:folderId/delete", deleteFolder);

export default folderRouter;
