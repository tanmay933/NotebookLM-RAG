import {
  retrieveChunksFromQdrant,
} from "../services/vectorStoreService.js";

import askLLM from "../services/llmService.js";

export const chatWithPdf = async (
  req,
  res
) => {
  try {
    const { question, documentId } =
      req.body;

    if (!question || !documentId) {
      return res.status(400).json({
        message:
          "Question and documentId are required",
      });
    }

    const chunks =
      await retrieveChunksFromQdrant(
        question,
        documentId
      );

    console.log(chunks);

    if (
      !chunks.length ||
      chunks[0].score < 0.10
    ) {
      return res.status(200).json({
        answer:
          "Insufficient relevant context found in the uploaded document.",
        correctiveRAG: true,
      });
    }

    const answer = await askLLM(
      question,
      chunks
    );

    return res.status(200).json({
      answer,
      correctiveRAG: true,
      retrievalScore:
        chunks[0].score,
      sources: chunks.map(
        (chunk) => ({
          page: chunk.pageNumber,
          score: chunk.score,
        })
      ),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message:
        "Error generating answer",
    });
  }
};