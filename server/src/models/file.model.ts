import { Schema, model } from "mongoose";

const fileSchema = new Schema({
  path: { type: String, required: true },
  name: { type: String, required: true },
  downloadCount: { type: Number, required: true, default: 0 },
});

const FileModel = model("file", fileSchema);

export default FileModel;
