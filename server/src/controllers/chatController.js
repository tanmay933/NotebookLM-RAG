import {
  retrieveChunksFromQdrant,
} from "../services/vectorStoreService.js";

import askLLM from "../services/llmService.js";

export const chatWithPdf = async (req, res) => {
  try {
    const { question, documentId } = req.body;

    if (!question || !documentId) {
      return res.status(400).json({
        message: "Question and documentId are required",
      });
    }

    const chunks = await retrieveChunksFromQdrant(
      question,
      documentId
    );

    console.log(chunks);
    
    const answer = await askLLM(question, chunks);

    return res.status(200).json({
      answer,
      sources: chunks.map((chunk) => ({
        page: chunk.pageNumber,
      })),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error generating answer",
    });
  }
};