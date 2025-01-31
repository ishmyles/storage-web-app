import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import db from "../db/poolConnection.js";

const LocalStrategy = Strategy;

const verify = async (username, password, done) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM Users WHERE username = $1;",
      [username]
    );

    const user = rows[0];

    if (!user)
      return done(null, false, { message: "Incorrect username or password." });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return done(null, false, { message: "Incorrect password." });

    return done(null, user);
  } catch (err) {
    return done(null, false, { message: "Error trying to log in." });
  }
};

export default (passport) => {
  const strategy = new LocalStrategy(verify);

  passport.use(strategy);

  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser(async (username, done) => {
    try {
      const { rows } = await db.query(
        "SELECT username FROM Users WHERE username = $1",
        [username]
      );
      const user = rows[0];

      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
