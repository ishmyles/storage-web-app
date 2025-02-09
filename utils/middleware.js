import { getFileOwner, getFolderOwner } from "../db/queries.js";

export const isAuthenticated = (req, res, next) => {
  res.locals.isLoggedIn = req.isAuthenticated();
  if (!res.locals.isLoggedIn) {
    return res.status(302).redirect("/login");
  }
  next();
};

export const isFolderOwner = async (req, res, next) => {
  const folderOwner = await getFolderOwner(req.params.folderId);

  if (folderOwner !== req.user.username) {
    return res.status(302).redirect("/folders");
  }
  next();
};

export const isFileOwner = async (req, res, next) => {
  const fileOwner = await getFileOwner(req.params.fileId);

  if (fileOwner !== req.user.username) {
    return res.status(404).redirect("/404NotFound");
  }

  next();
};
