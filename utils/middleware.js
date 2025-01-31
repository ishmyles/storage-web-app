export const isAuthenticated = (req, res, next) => {
  res.locals.isLoggedIn = req.isAuthenticated();
  if (!res.locals.isLoggedIn) {
    return res.status(302).redirect("/login");
  }
  next();
};
