import express from "express";

import { retrieveChunks } from "../services/retrievalService.js";
import askLLM from "../services/llmService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    const chunks = retrieveChunks(question);

    const answer = await askLLM(question, chunks);

    res.json({
      answer,
      sources: chunks.map((chunk) => ({
        page: chunk.metadata.pageNumber,
      })),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error generating answer",
    });
  }
});

export default router;