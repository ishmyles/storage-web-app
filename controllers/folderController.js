import { validationResult } from "express-validator";
import {
  createFolder,
  deleteFolderData,
  getFolderData,
  getUserFolders,
  updateFolder,
} from "../db/queries.js";

export const displayUserFolders = async (req, res) => {
  const folders = await getUserFolders(req.user.username);

  return res.render("folderFileView", {
    folders: folders,
  });
};

export const displayFolderContents = async (req, res) => {
  const folder = await getFolderData(req.params.folderId);

  return res.render("folderFileView", {
    folders: folder.subfolders,
    files: folder.files,
  });
};

export const displayNewFolderForm = async (req, res) => {
  return res.render("folderFile", {
    title: "Add",
    type: "foldername",
    route: `/folders/${req.params.folderId}/new`,
  });
};

export const createNewFolder = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("folderFile", {
      title: "Add",
      type: "foldername",
      route: `/folders/${req.params.folderId}/new`,
      errors: errors.array(),
    });
  }

  const input = {
    parentId: req.params.folderId,
    name: req.body.foldername,
    ownerId: req.user.username,
  };
  // TODO: return folderId to render page
  console.log(input);
  await createFolder(input);
  return res.send("TODO: Form input to be saved to DB");
};

export const displayUpdateFolderForm = async (req, res) => {
  const folder = await getFolderData(req.params.folderId);

  return res.render("folderFile", {
    title: "Update",
    type: "foldername",
    route: `/folders/${req.params.folderId}/update`,
    foldername: folder.name,
  });
};

export const updateFolderName = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("folderFile", {
      title: "Update",
      type: "foldername",
      route: `/folders/${req.params.folderId}/update`,
      errors: errors.array(),
    });
  }

  const input = {
    id: req.params.folderId,
    name: req.body.foldername,
  };

  await updateFolder(input);
  return res.send("TODO: Form input to change folder name");
};

export const deleteFolder = async (req, res) => {
  await deleteFolderData(req.params.id);
  res.send("TODO: Delete folder from DB");
};
