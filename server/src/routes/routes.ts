import { Router } from "express";
import { uploadFile } from "../controllers/fileUpload.controller";
import { upload } from "../utils/upload";

const router = Router();

router.post("/upload", upload.single("file"), uploadFile);

export default router;
