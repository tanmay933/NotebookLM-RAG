import express from "express";
import multer from "multer";

import { uploadPdf } from "../controllers/uploadController.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/",
  upload.single("pdf"),
  uploadPdf
);

export default router;