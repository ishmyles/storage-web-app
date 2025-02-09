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
    prevFolder: folders.parentId,
  });
};

export const displayFolderContents = async (req, res) => {
  const folder = await getFolderData(req.params.folderId);

  return res.render("folderFileView", {
    currentFolder: folder,
    folders: folder.subfolders,
    files: folder.files,
    prevFolder: folder.parentId,
  });
};

export const displayNewFolderForm = async (req, res) => {
  const parentId = req.params.folderId;

  return res.render("folderFile", {
    title: "Add",
    type: "foldername",
    route: `/folders/${parentId}/new`,
  });
};

export const createNewFolder = async (req, res, next) => {
  const parentId = req.params.folderId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("folderFile", {
      title: "Add",
      type: "foldername",
      route: `/folders/${parentId}/new`,
      prevFolder: parentId,
      errors: errors.array(),
    });
  }

  const input = {
    parentId: parentId,
    name: req.body.foldername,
    ownerId: req.user.username,
  };

  const folder = await createFolder(input);

  if (!folder) return next(Error("There was an issue updating your folder."));
  return res.redirect(`/folders/${folder.id}`);
};

export const displayUpdateFolderForm = async (req, res) => {
  const parentId = req.params.folderId;
  const folder = await getFolderData(parentId);

  return res.render("folderFile", {
    title: "Update",
    type: "foldername",
    route: `/folders/${parentId}/update`,
    foldername: folder.name,
    prevFolder: parentId,
  });
};

export const updateFolderName = async (req, res, next) => {
  const parentId = req.params.folderId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("folderFile", {
      title: "Update",
      type: "foldername",
      route: `/folders/${parentId}/update`,
      errors: errors.array(),
      prevFolder: parentId,
    });
  }

  const input = {
    id: parentId,
    name: req.body.foldername,
  };

  const folder = await updateFolder(input);

  if (!folder) return next(Error("There was an issue updating your folder."));
  return res.redirect(`/folder/${folder.id}`);
};

export const deleteFolder = async (req, res) => {
  await deleteFolderData(req.params.folderId);
  return res.redirect("/folders");
};
