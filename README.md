# NotebookLM RAG

A simple RAG (Retrieval-Augmented Generation) application inspired by Google NotebookLM where users can upload PDF documents and ask natural language questions grounded in the uploaded document.

---

# Features

- Upload PDF documents
- Extract and chunk document text
- Retrieve relevant chunks based on user query
- Generate grounded answers using an LLM
- Simple React frontend
- Node.js + Express backend

---

# Tech Stack

## Frontend
- React
- Vite
- Axios

## Backend
- Node.js
- Express
- Multer
- LangChain
- OpenRouter API

---

# RAG Pipeline

The application follows a complete Retrieval-Augmented Generation pipeline:

1. PDF Upload
2. Text Extraction
3. Chunking using RecursiveCharacterTextSplitter
4. Chunk Storage
5. Retrieval using similarity-based scoring
6. LLM Response Generation using retrieved context

---

# Chunking Strategy

The project uses LangChain's RecursiveCharacterTextSplitter to split documents into manageable chunks before retrieval.

This improves:
- retrieval accuracy
- context management
- grounded response quality

---

# Demo Screenshot

![NotebookLM RAG Demo](./screenshots/home.png)

---

# Project Structure

```bash
notebooklm-rag/
│
├── client/
├── server/
├── screenshots/
└── README.md
```

---

# Setup Instructions

## Clone Repository

```bash
git clone <your-github-repo>
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Backend Setup

```bash
cd server
npm install
npm run dev
```

---

# Environment Variables

Create a `.env` file inside `server/`

```env
PORT=8000
OPENROUTER_API_KEY=your_api_key
```

---

# API Routes

## Upload PDF

```http
POST /api/upload
```

Uploads and processes PDF document.

---

## Ask Question

```http
POST /api/chat
```

Request Body:

```json
{
  "question": "What is expected in the assignment?"
}
```

---

# Sample Questions

- What is expected in the assignment?
- What are the submission requirements?
- What is the marking scheme?
- Explain the RAG pipeline.

---

# Future Improvements

- Real vector database integration using Qdrant
- Semantic embeddings
- Chat history
- Multiple document support
- Authentication

---

# Author

Tanmay Mittal