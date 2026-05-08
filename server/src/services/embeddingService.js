import "dotenv/config";

import { HfInference } from "@huggingface/inference";

const client = new HfInference(process.env.HF_API_KEY);

export const generateEmbedding = async (text) => {
  try {
    const embedding = await client.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: text,
    });

    return embedding;
  } catch (error) {
    console.error("Embedding Error:", error);

    throw new Error("Failed to generate embedding");
  }
};