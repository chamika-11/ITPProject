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
            placeholder="Enter Your Medical Question..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          ></textarea>
          
          <button
                type="submit"
                className="submit-btn"
                disabled={loading}
                style={{
                  background: loading ? '#90caf9' : '#1e88e5',
                  color: 'white',
                  padding: '12px',
                  fontSize: '1rem',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background 0.3s ease, transform 0.2s ease',
                  transform: loading ? 'none' : 'scale(1.05)',
                }}
              >
            {loading ? "Generating..." : "Submit"}
          </button>
        </form>


        {response && (
              <div
                className="response-box"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '24px 32px',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                  maxWidth: '800px',
                  margin: '20px auto',
                  fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  border: '1px solid #e0e0e0',
                  ':hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
                  },
                  '@media (max-width: 768px)': {
                    padding: '16px 20px',
                  },
                }}
              >
                <p
                  className="response-text"
                  style={{
                    color: '#333',
                    fontSize: '18px',
                    lineHeight: '1.6',
                    textAlign: 'left',
                    fontWeight: '400',
                    marginBottom: '0',
                  }}
                >
                  {response}
                </p>
              </div>
            )}


      </div>
    </div>
  );
}
