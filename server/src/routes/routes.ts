import { Router } from "express";
import { uploadFile, downloadFile } from "../controllers/FileController";
import upload from "../utils/upload";

const router = Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/file/:fileId", downloadFile);

export default router;
