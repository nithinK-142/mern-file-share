import type { Request, Response } from "express";
import File from "../models/db";

export const uploadFile = async (request: Request, response: Response) => {
  const fileObj = {
    path: request.file?.path,
    name: request.file?.originalname,
  };

  try {
    const newFile = await File.create(fileObj);
    await newFile.save();
    return response.status(200).json({
      path: `${process.env.CLIENT_URL}/file/${newFile._id}`,
      name: newFile.name,
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({ error: error.message });
  }
};

export const downloadFile = async (request: Request, response: Response) => {
  const id = request.params.fileId;
  console.log(id);
  try {
    const file = await File.findById(id);

    if (!file) {
      return response.status(500).json({ error: "file not found!" });
    }

    file.downloadCount++;

    await file.save();
    response.download(file.path, file.name);
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({ error: error.message });
  }
};
