import type { Request, Response } from "express";
import FileModel from "../models/file.model";
import { uploadOnCloudinary } from "../utils/cloudinary";

export const uploadFile = async (request: Request, response: Response) => {
  try {
    const filePath = request.file?.path;
    if (!filePath) throw Error("filepath is null");

    const uploadedFile = await uploadOnCloudinary(filePath);

    const fileObj = {
      path: uploadedFile?.url,
      name: request.file?.originalname,
    };
    const newFile = await FileModel.create(fileObj);
    await newFile.save();

    return response.status(200).json({
      path: uploadedFile?.url,
      name: newFile.name,
    });
  } catch (error: any) {
    console.log("❌ERROR ", error.message);
    return response.status(500).json({ error: error.message });
  }
};
