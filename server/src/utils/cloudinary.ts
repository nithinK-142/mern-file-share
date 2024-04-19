import { v2 as cloudinary, UploadApiOptions } from "cloudinary";
import fs from "fs";
import { CLOUDINARYCONFIG } from "../constants";

cloudinary.config(CLOUDINARYCONFIG);

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;

    const expirationTime = Math.floor(Date.now() / 1000) + 60;

    const uploadOptions: UploadApiOptions = {
      resource_type: "auto",
      expiration: expirationTime,
    };

    const response = await cloudinary.uploader.upload(
      localFilePath,
      uploadOptions
    );
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error: any) {
    fs.unlinkSync(localFilePath);
    console.log("❌ERROR ", error.message);
    return null;
  }
};

export { uploadOnCloudinary };
