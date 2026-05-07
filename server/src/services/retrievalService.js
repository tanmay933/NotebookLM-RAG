const documents = [];

export const saveChunks = (chunks) => {
  documents.length = 0;

  chunks.forEach((chunk) => {
    documents.push(chunk);
  });
};

export const retrieveChunks = (query) => {
  const words = query.toLowerCase().split(" ");

  const scoredChunks = documents.map((doc) => {
    const text = doc.pageContent.toLowerCase();

    let score = 0;

    words.forEach((word) => {
      if (text.includes(word)) {
        score++;
      }
    });

    return {
      doc,
      score,
    };
  });

  return scoredChunks
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.doc);
};