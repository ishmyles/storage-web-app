import { v2 } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

export const cloudinary = v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "StorageApp",
    allowed_formats: ["jpeg", "jpg", "png"],
  },
});
