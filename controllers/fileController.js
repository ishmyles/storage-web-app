import { validationResult } from "express-validator";

export const displayAddFileForm = (req, res) => {
  // TODO: Get the folderIds for the select options
  // TODO: Validate the owner of the parent folder belongs to the user
  return res.render("folderFile", {
    title: "Add",
    type: "file",
    route: `/files/new`,
  });
};

export const addNewFile = (req, res) => {
  // TODO: Validate the owner of the parent folder belongs to the user
  console.log(req.file);
  if (!req.file) {
    return res.render("folderFile", {
      title: "Add",
      type: "file",
      route: `/files/new`,
      errors: [{ msg: "Attach a file to add" }],
    });
  }
  return res.send("TODO: Add file to cloudinary & save link to DB");
};

export const displayFileInfo = (req, res) =>
  res.send("TODO: Show file meta data");

export const displayUpdateFilenameForm = (req, res) => {
  // const id = getFile(); // TODO: change this to id from DB query
  // if (!id) res.render("notfound");
  return res.render("folderFile", {
    title: "Update",
    type: "filename",
    route: `/files/${req.params.fileId}/update`,
  });
};

export const updateFilename = (req, res) => {
  // TODO: Need to validate the user updating the form is the owner
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("folderFile", {
      title: "Update",
      type: "filename",
      route: `/files/${req.params.fileId}/update`,
      errors: errors.array(),
    });
  }
  return res.send("TODO: Form data to be saved to DB");
};

export const deleteFile = (req, res) => res.send("TODO: Delete file from DB");
