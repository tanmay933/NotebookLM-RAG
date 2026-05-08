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

      setDocumentId(response.data.documentId);

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
        padding: "40px",
        fontFamily: "Arial",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <h1>NotebookLM RAG</h1>

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <button
          onClick={uploadPDF}
          style={{
            marginLeft: "10px",
          }}
        >
          Upload PDF
        </button>
      </div>

      {documentId && (
        <p>
          PDF Ready for Questions
        </p>
      )}

      <div>
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          style={{
            width: "70%",
            padding: "10px",
          }}
        />

        <button
          onClick={askQuestion}
          style={{
            marginLeft: "10px",
            padding: "10px",
          }}
        >
          Ask
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {answer && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
          }}
        >
          <h3>Answer</h3>

          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;