import express from "express";
import multer from "multer";

import loadPDF from "../utils/pdfLoader.js";
import chunkDocs from "../services/chunkService.js";
import { saveChunks } from "../services/retrievalService.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    const docs = await loadPDF(req.file.path);

    const chunks = await chunkDocs(docs);

    saveChunks(chunks);

    res.json({
      message: "PDF uploaded and processed successfully",
      totalChunks: chunks.length,
      preview: chunks[0].pageContent,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error processing PDF",
    });
  }
});

export default router;