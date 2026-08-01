import { useState } from "react";
import "./App.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

function App() {
  const [message, setMessage] = useState(
    "Click the button to contact the Flask backend."
  );
  const [loading, setLoading] = useState(false);

  async function contactBackend() {
    try {
      setLoading(true);
      setMessage("Connecting...");

      const response = await fetch(`${API_URL}/api/message`);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage(`Connection failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <p className="label">FULL-STACK DEPLOYMENT DEMO</p>

      <h1>React and Flask</h1>

      <p className="description">
        React is deployed on Vercel and Flask is deployed on Render.
      </p>

      <section className="result">
        <strong>Backend response</strong>
        <p>{message}</p>
      </section>

      <button onClick={contactBackend} disabled={loading}>
        {loading ? "Connecting..." : "Contact Flask Backend"}
      </button>

      <small>API URL: {API_URL}</small>
    </main>
  );
}

export default App;