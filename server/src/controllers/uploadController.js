import { v4 as uuidv4 } from "uuid";

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import loadPDF from "../utils/pdfLoader.js";

import { storeChunksInQdrant } from "../services/vectorStoreService.js";

export const uploadPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "PDF file is required",
      });
    }

    const documentId = uuidv4();

    const docs = await loadPDF(req.file.buffer);

    const splitter =
      new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

    const chunks =
      await splitter.splitDocuments(docs);

    await storeChunksInQdrant(
      chunks,
      documentId,
      req.file.originalname
    );

    return res.status(200).json({
      message: "PDF uploaded successfully",
      documentId,
      chunksStored: chunks.length,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to upload PDF",
    });
  }
};