import multer from "multer";
import { storage } from "../config/cloudinary.js";

// LOCAL STORAGE

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, process.env.STORAGE_FOLDER);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

const upload = multer({
  storage: storage,
});

export default upload;
