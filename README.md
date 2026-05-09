# NotebookLM RAG

A full-stack Retrieval-Augmented Generation (RAG) application inspired by Google NotebookLM.

Users can upload PDF documents and interact with them through natural language conversations powered by semantic retrieval and grounded LLM responses.

---

# Live Demo

Frontend:  
https://notebook-lm-rag-yiki.vercel.app

---

# Features

- PDF document upload and processing
- Semantic document chunking
- Embedding generation for retrieval
- Persistent vector storage using Qdrant Cloud
- Context-aware semantic search
- Grounded answer generation using LLMs
- Serverless-compatible architecture
- Simple and responsive React frontend

---

# Tech Stack

## Frontend
- React
- Vite
- Axios

## Application Services
- Node.js
- Express
- Multer
- LangChain
- HuggingFace Inference API
- Qdrant Vector Database
- OpenRouter API

---

# System Architecture

```text
PDF Upload
    ↓
Text Extraction
    ↓
Semantic Chunking
    ↓
Embedding Generation
    ↓
Vector Storage
    ↓
Semantic Retrieval
    ↓
Grounded LLM Response
```

---

# RAG Pipeline

The application implements a complete Retrieval-Augmented Generation workflow:

1. PDF ingestion
2. Text extraction and preprocessing
3. Recursive semantic chunking
4. Embedding generation
5. Persistent vector indexing
6. Semantic similarity retrieval
7. Context-grounded answer generation

---

# Engineering Highlights

- Stateless architecture optimized for serverless deployment
- Persistent vector memory using Qdrant Cloud
- Semantic retrieval using dense vector embeddings
- Multi-document isolation support
- Cloud-compatible PDF processing pipeline
- Retrieval-grounded response generation to reduce hallucinations

---

# Deployment Architecture

The application is fully deployed using modern cloud infrastructure.

## Frontend Hosting
- Vercel

## API Infrastructure
- Vercel Serverless Functions

## Vector Database
- Qdrant Cloud

---

# Demo Screenshot

![NotebookLM RAG Demo](./screenshots/home.png)

---

# Project Structure

```bash
notebooklm-rag/
│
├── client/
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│
├── screenshots/
│
└── README.md
```

---

# Setup Instructions

## Clone Repository

```bash
git clone https://github.com/tanmay933/NotebookLM-RAG.git
```

---

# Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# Application Setup

```bash
cd server
npm install
npm run dev
```

---

# Environment Variables

Create a `.env` file inside the application directory and configure the required credentials for:

- LLM provider
- Embedding provider
- Vector database connection

---

# API Endpoints

## Upload Document

```http
POST /api/upload
```

Processes PDF documents and stores semantic vectors.

---

## Ask Questions

```http
POST /api/chat
```

Generates grounded answers using semantic retrieval and contextual response generation.

---

# Example Questions

- What are the requirements of the assignment?
- Explain the RAG pipeline.
- What technologies are used in the project?
- What is the marking scheme?
- What is expected in the submission?

---

# Engineering Challenges Solved

- Serverless PDF processing on cloud infrastructure
- Stateless retrieval architecture
- Persistent semantic vector storage
- AI workload deployment optimization
- Semantic context retrieval pipeline
- Multi-provider AI infrastructure integration

---

# Future Improvements

- Streaming responses
- Chat history persistence
- Multi-document conversations
- Source citation highlighting
- Improved UI/UX
- Authentication and user sessions
- Advanced reranking pipeline

---

# Author

Tanmay Mittal