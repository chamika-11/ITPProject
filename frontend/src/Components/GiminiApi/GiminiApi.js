import { useState } from "react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("http://localhost:5000/api/prompt-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.success) {
        setResponse(data.response);
      } else {
        setResponse("Error: " + data.error);
      }
    } catch (err) {
      setResponse("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="prompt-box">
        <h1 className="prompt-title">Gemini AI Assistant</h1>
        <form onSubmit={handleSubmit} className="prompt-form">
          <textarea
            className="prompt-textarea"
            rows="4"
            placeholder="Enter your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Generating..." : "Submit"}
          </button>
        </form>
        {response && (
          <div className="response-box">
            <p className="response-text">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
