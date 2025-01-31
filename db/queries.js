import db from "./poolConnection.js";
import bcrypt from "bcryptjs";

const _SALT = Number(process.env.SALT);

export const createUser = async ({ username, password }) => {
  bcrypt.hash(password, _SALT, async (err, hash) => {
    if (err) throw Error("Something went wrong signing you up.");

    await db.query(
      `
        INSERT INTO Users (username, password) 
        VALUES ($1, $2);`,
      [username, hash]
    );
  });
};
