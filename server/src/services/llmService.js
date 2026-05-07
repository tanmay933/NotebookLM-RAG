import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const askLLM = async (question, chunks) => {
  const context = chunks
    .map((chunk) => chunk.pageContent)
    .join("\n\n");

  const response = await client.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `
You are a PDF assistant.

Only answer from the provided context.

If answer is not present in context, say:
"I could not find this information in the uploaded document."

Context:
${context}
`,
      },
      {
        role: "user",
        content: question,
      },
    ],
  });

  return response.choices[0].message.content;
};

export default askLLM;