import { validationResult } from "express-validator";

export const displayUserFolders = (req, res) =>
  res.send("TODO: Show all folders associated with user");

export const displayFolderContents = (req, res) =>
  res.send("TODO: Show folder content");

export const displayNewFolderForm = (req, res) => {
  // TODO: Verify the owner folderId is the current user
  return res.render("folderFile", {
    title: "Add",
    type: "foldername",
    route: `/folders/${req.params.folderId}/new`,
  });
};

export const createNewFolder = (req, res) => {
  // TODO: Verify that the owner of the folderId
  // in the params matches the current user
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("folderFile", {
      title: "Add",
      type: "foldername",
      route: `/folders/${req.params.folderId}/new`,
      errors: errors.array(),
    });
  }
  return res.send("TODO: Form input to be saved to DB");
};

export const displayUpdateFolderForm = (req, res) => {
  // TODO: Verify the owner folderId is the current user
  return res.render("folderFile", {
    title: "Update",
    type: "foldername",
    route: `/folders/${req.params.folderId}/update`,
  });
};

export const updateFolderName = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("folderFile", {
      title: "Update",
      type: "foldername",
      route: `/folders/${req.params.folderId}/update`,
      errors: errors.array(),
    });
  }
  return res.send("TODO: Form input to change folder name");
};

export const deleteFolder = (req, res) =>
  res.send("TODO: Delete folder from DB");
