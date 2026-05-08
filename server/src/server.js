import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import uploadRoutes from "./routes/uploadRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("NotebookLM RAG Backend Running");
});

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT}`
    );
  });
}

export default app;