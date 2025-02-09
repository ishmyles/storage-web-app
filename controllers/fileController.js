import { validationResult } from "express-validator";
import {
  createFile,
  deleteFileData,
  getFileData,
  updateFile,
} from "../db/queries.js";

export const displayAddFileForm = async (req, res) => {
  const { folderId } = req.params;

  return res.render("folderFile", {
    title: "Add",
    type: "file",
    route: `/files/${folderId}/new`,
    prevFolder: folderId,
  });
};

export const addNewFile = async (req, res, next) => {
  const { folderId } = req.params;
  const { originalname, size, path, mimetype } = req.file;
  const { username } = req.user;

  if (!req.file) {
    return res.render("folderFile", {
      title: "Add",
      type: "file",
      route: `/files/${folderId}/new`,
      errors: [{ msg: "Attach a file to add" }],
      prevFolder: folderId,
    });
  }

  const input = {
    name: originalname.split(".")[0],
    fileType: mimetype.split("/")[1],
    size: size,
    filePath: path,
    folderId: folderId,
    ownerId: username,
  };

  const file = await createFile(input);

  if (!file) return next(Error("Something went wrong creating your file."));
  return res.redirect(`/files/${file.id}`);
};

export const displayFileInfo = async (req, res, next) => {
  const { fileId } = req.params;
  const fileData = await getFileData(fileId);

  if (!fileData) return next(Error("File not found!"));

  return res.render("fileInfo", {
    file: fileData,
    prevFolder: fileData.folderId,
  });
};

export const displayUpdateFilenameForm = async (req, res, next) => {
  const { fileId } = req.params;
  const fileData = await getFileData(fileId);

  if (!fileData) return next(Error("File not found!"));

  return res.render("folderFile", {
    title: "Update",
    type: "filename",
    route: `/files/${req.params.fileId}/update`,
    filename: fileData.name,
    prevFolder: fileData.folderId,
  });
};

export const updateFilename = async (req, res, next) => {
  const { fileId } = req.params;
  const { filename } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const { fileId } = req.params;
    const fileData = await getFileData(fileId);

    return res.render("folderFile", {
      title: "Update",
      type: "filename",
      route: `/files/${req.params.fileId}/update`,
      errors: errors.array(),
      filename: fileData.name,
      prevFolder: fileData.folderId,
    });
  }
  const file = await updateFile(fileId, filename);

  if (!file) return next(Error("The was a problem updating your file."));
  return res.redirect(`/files/${file.id}`);
};

export const deleteFile = async (req, res, next) => {
  const file = await deleteFileData(req.params.fileId);

  if (!file) return next(Error("The was a problem deleting your file."));
  return res.redirect(`/folders/${file.parentId}`);
};

export const downloadFile = async (req, res, next) => {
  const { fileId } = req.params;

  const file = await getFileData(fileId);

  if (!file) return next(Error("Error retrieving file."));
  return res.download(file.filePath, `download.${file.fileType}`);
};
