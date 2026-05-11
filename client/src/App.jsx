import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);

  const [documentId, setDocumentId] =
    useState("");

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] = useState("");

  const [loading, setLoading] =
    useState(false);

  const uploadPDF = async () => {
    if (!file) {
      alert("Please select a PDF");

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("pdf", file);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        formData
      );

      setDocumentId(
        response.data.documentId
      );

      alert("PDF Uploaded Successfully");
    } catch (error) {
      console.log(error);

      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  const askQuestion = async () => {
    if (!question) {
      alert("Please enter a question");

      return;
    }

    if (!documentId) {
      alert("Please upload a PDF first");

      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chat`,
        {
          question,
          documentId,
        }
      );

      setAnswer(response.data.answer);
    } catch (error) {
      console.log(error);

      alert("Error generating answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a, #1e1b4b, #312e81)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        fontFamily:
          "'Inter', 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "850px",
          background:
            "rgba(255,255,255,0.08)",
          backdropFilter: "blur(14px)",
          border:
            "1px solid rgba(255,255,255,0.15)",
          borderRadius: "24px",
          padding: "40px",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.35)",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "10px",
            fontWeight: "700",
          }}
        >
          NotebookLM RAG
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            marginBottom: "35px",
            fontSize: "1.05rem",
          }}
        >
          Upload PDFs and chat with your
          documents using AI-powered
          semantic retrieval.
        </p>

        <div
          style={{
            background:
              "rgba(255,255,255,0.06)",
            padding: "25px",
            borderRadius: "18px",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              marginBottom: "18px",
              fontSize: "1.3rem",
            }}
          >
            Upload Document
          </h2>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
            style={{
              marginBottom: "18px",
              color: "white",
            }}
          />

          <br />

          <button
            onClick={uploadPDF}
            style={{
              background:
                "linear-gradient(135deg, #8b5cf6, #6366f1)",
              color: "white",
              border: "none",
              padding:
                "12px 24px",
              borderRadius: "12px",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Upload PDF
          </button>

          {documentId && (
            <p
              style={{
                marginTop: "15px",
                color: "#86efac",
                fontWeight: "600",
              }}
            >
              PDF Ready for Questions
            </p>
          )}
        </div>

        <div
          style={{
            background:
              "rgba(255,255,255,0.06)",
            padding: "25px",
            borderRadius: "18px",
          }}
        >
          <h2
            style={{
              marginBottom: "18px",
              fontSize: "1.3rem",
            }}
          >
            Ask Questions
          </h2>

          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <input
              type="text"
              placeholder="Ask something about the document..."
              value={question}
              onChange={(e) =>
                setQuestion(
                  e.target.value
                )
              }
              style={{
                flex: 1,
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                outline: "none",
                fontSize: "1rem",
                background:
                  "rgba(255,255,255,0.12)",
                color: "white",
              }}
            />

            <button
              onClick={askQuestion}
              style={{
                background:
                  "linear-gradient(135deg, #06b6d4, #3b82f6)",
                color: "white",
                border: "none",
                padding:
                  "14px 22px",
                borderRadius: "12px",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Ask
            </button>
          </div>

          {loading && (
            <p
              style={{
                marginTop: "18px",
                color: "#93c5fd",
              }}
            >
              AI is thinking...
            </p>
          )}

          {answer && (
            <div
              style={{
                marginTop: "28px",
                background:
                  "rgba(255,255,255,0.08)",
                padding: "24px",
                borderRadius: "16px",
                border:
                  "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <h3
                style={{
                  marginBottom: "14px",
                  color: "#c4b5fd",
                }}
              >
                AI Answer
              </h3>

              <p
                style={{
                  lineHeight: "1.7",
                  color: "#e2e8f0",
                }}
              >
                {answer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;