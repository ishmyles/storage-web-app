import { getFolderOwner } from "../db/queries.js";

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
