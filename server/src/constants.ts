import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3001;

export const CLIENT_URL = String(process.env.CLIENT_URL);

export const CLOUDINARYCONFIG = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};
