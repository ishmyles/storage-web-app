import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const _SALT = Number(process.env.SALT);

const prisma = new PrismaClient();

export const createUser = async ({ username, password }) => {
  bcrypt.hash(password, _SALT, async (err, hash) => {
    if (err) throw Error("Something went wrong signing you up.");

    // await prisma.user.create({
    //   data: {
    //     username: username,
    //     password: hash,
    //   },
    // });

    await prisma.folder.create({
      data: {
        name: "root",
        owner: {
          create: {
            username: username,
            password: hash,
          },
        },
      },
    });
  });
};

export const getUserFolders = async (username) => {
  const folders = await prisma.folder.findMany({
    where: {
      ownerId: username,
    },
  });
  return folders;
};

export const getFolderOwner = async (folderId) => {
  const folder = await prisma.folder.findUnique({
    where: {
      id: folderId,
    },
  });

  return folder ? folder.ownerId : null;
};

export const createFolder = async ({ parentId, name, ownerId }) => {
  const folder = await prisma.folder.create({
    data: {
      name: name,
      parentId: parentId,
      ownerId: ownerId,
    },
  });
  console.log(folder);
};

export const updateFolder = async ({ id, name }) => {
  const folder = await prisma.folder.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });
  console.log(folder);
};

export const getFolderData = async (id) => {
  const folder = await prisma.folder.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      parentId: true,
      subfolders: true,
      files: true,
      ownerId: true,
    },
  });

  return folder;
};

export const deleteFolderData = async (id) => {
  const folder = await prisma.folder.delete({
    where: {
      id: id,
    },
  });
  console.log(folder);
};

export const createFile = async ({
  name,
  fileType,
  size,
  filePath,
  folderId,
  ownerId,
}) => {
  const file = await prisma.file.create({
    data: {
      name: name,
      fileType: fileType,
      size: size,
      filePath: filePath,
      folderId: folderId,
      ownerId: ownerId,
    },
  });

  return file;
};

export const getFileData = async (id) => {
  const file = await prisma.file.findUnique({
    where: {
      id: id,
    },
  });

  return file;
};

export const updateFile = async (id, updatedName) => {
  const file = await prisma.file.update({
    where: {
      id: id,
    },
    data: {
      name: updatedName,
    },
  });
  console.log(file);
  return file;
};

export const getFileOwner = async (id) => {
  const file = await prisma.file.findUnique({
    where: {
      id: id,
    },
  });

  return file ? file.ownerId : null;
};

export const deleteFileData = async (id) => {
  const file = await prisma.file.delete({
    where: {
      id: id,
    },
  });

  return file.parentId;
};
