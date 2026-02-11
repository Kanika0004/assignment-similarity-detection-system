import { useState } from "react";
import { compareAssignments } from "./services/api";
import "./index.css";

export default function App() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!file1 || !file2) {
      alert("Upload both assignments");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await compareAssignments([file1, file2]);

      if (data.warning) {
        setResult({
          score: "N/A",
          risk: "Unreadable (OCR Failed)",
          type: "warning"
        });
      } else {
        const r = data.comparisons[0];
        setResult({
          score: r.similarity + "%",
          risk: r.interpretation,
          type: r.interpretation.includes("Highly")
            ? "high"
            : r.interpretation.includes("Moderately")
            ? "medium"
            : "low"
        });
      }
    } catch {
      alert("Backend connection failed");
    }

    setLoading(false);
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Assignment Similarity Analyzer</h1>
        <p className="subtitle">
          Analyze similarity between assignments using AI + OCR
        </p>

        <div className="upload-grid">
          <input type="file" accept="application/pdf" onChange={(e) => setFile1(e.target.files[0])} />
          <input type="file" accept="application/pdf" onChange={(e) => setFile2(e.target.files[0])} />
        </div>

        <button onClick={analyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Similarity"}
        </button>

        {result && (
          <div className={`result ${result.type}`}>
            <h2>Result</h2>
            <p><strong>Similarity Score:</strong> {result.score}</p>
            <p><strong>Risk Level:</strong> {result.risk}</p>
          </div>
        )}
      </div>
    </div>
  );
}
