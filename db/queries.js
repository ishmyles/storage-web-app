import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const _SALT = Number(process.env.SALT);

const prisma = new PrismaClient();

export const createUser = async ({ username, password }) => {
  bcrypt.hash(password, _SALT, async (err, hash) => {
    if (err) throw Error("Something went wrong signing you up.");

    await prisma.user.create({
      data: {
        username: username,
        password: hash,
      },
    });
  });
};
