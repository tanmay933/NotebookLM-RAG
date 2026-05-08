import { v4 as uuidv4 } from "uuid";

import { qdrant } from "../config/qdrant.js";

import { generateEmbedding } from "./embeddingService.js";

export const storeChunksInQdrant = async (
  chunks,
  documentId,
  filename
) => {
  const points = [];

  for (const chunk of chunks) {
    const embedding = await generateEmbedding(
      chunk.pageContent
    );

    points.push({
      id: uuidv4(),
      vector: embedding,
      payload: {
        documentId,
        text: chunk.pageContent,
        pageNumber:
          chunk.metadata?.loc?.pageNumber || 1,
        filename,
      },
    });
  }

  await qdrant.upsert(
    process.env.QDRANT_COLLECTION,
    {
      wait: true,
      points,
    }
  );

  return true;
};

export const retrieveChunksFromQdrant = async (
  query,
  documentId
) => {
  const queryEmbedding =
    await generateEmbedding(query);

  const searchResult = await qdrant.search(
    process.env.QDRANT_COLLECTION,
    {
      vector: queryEmbedding,
      limit: 3,
      filter: {
        must: [
          {
            key: "documentId",
            match: {
              value: documentId,
            },
          },
        ],
      },
    }
  );

  return searchResult.map(
    (result) => result.payload
  );
};