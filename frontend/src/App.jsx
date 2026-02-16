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
      alert("Please upload both assignments");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await compareAssignments([file1, file2]);
      setResult(data.comparisons[0]);
    } catch {
      alert("Backend connection failed");
    }

    setLoading(false);
  };

  /* -------------------- Helpers -------------------- */

  const riskClass = result?.risk.includes("High")
    ? "high"
    : result?.risk.includes("Moderate")
      ? "medium"
      : "low";

  const getColorClass = (value) => {
    if (value >= 80) return "risk-high";
    if (value >= 50) return "risk-medium";
    return "risk-low";
  };

  const getInterpretation = (breakdown, risk) => {
    const notes = [];

    if (breakdown.stylometry >= 85) {
      notes.push(
        "Writing style similarity is very high, suggesting the same author or strong stylistic influence.",
      );
    }

    if (breakdown.semantic >= 70 && breakdown.semantic > breakdown.content) {
      notes.push(
        "Semantic similarity exceeds direct content overlap, indicating paraphrasing rather than copy-paste.",
      );
    }

    if (breakdown.metadata < 50) {
      notes.push(
        "Low metadata similarity reduces the likelihood of direct document reuse.",
      );
    }

    let conclusion =
      "Low likelihood of plagiarism. Similarities may be structural or coincidental.";

    if (risk.includes("Moderate")) {
      conclusion =
        "Moderate plagiarism risk. Similarities are likely due to paraphrasing or shared source material.";
    }

    if (risk.includes("High")) {
      conclusion =
        "High plagiarism risk. Strong evidence of copied or closely rewritten content.";
    }

    return { notes, conclusion };
  };

  /* -------------------- Render -------------------- */

  return (
    <div className="page">
      <h1 className="title">Assignment Similarity Checker</h1>

      {/* Upload Card */}
      <div className="card">
        <label className="file-label">
          Assignment 1
          <input type="file" onChange={(e) => setFile1(e.target.files[0])} />
        </label>

        <label className="file-label">
          Assignment 2
          <input type="file" onChange={(e) => setFile2(e.target.files[0])} />
        </label>

        <button className="primary-btn" onClick={analyze} disabled={loading}>
          {loading ? "Analyzing…" : "Compare Assignments"}
        </button>
      </div>

      {/* Result Section */}
      {result && (
        <>
          {/* Summary Card */}
          <div className={`card result-card ${riskClass}`}>
            <div className="result-header">
              <div>
                <div className="score">{result.similarity}%</div>
                <div className="muted">Overall Similarity</div>
              </div>

              <span className={`risk-badge ${riskClass}`}>{result.risk}</span>
            </div>

            <hr />

            {/* Breakdown */}
            <div className="breakdown-list">
              {Object.entries(result.breakdown).map(([key, value]) => (
                <div key={key} className="breakdown-row">
                  <div className="breakdown-header">
                    <span className="metric-name">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                    <span className="metric-percent">{value}%</span>
                  </div>

                  <div className="metric-line">
                    <div
                      className={`metric-fill ${getColorClass(value)}`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interpretation Card */}
          <div className="card interpretation-card">
            <h3 className="interpretation-title">Plagiarism Interpretation</h3>

            <ul className="interpretation-list">
              {getInterpretation(result.breakdown, result.risk).notes.map(
                (note, index) => (
                  <li key={index}>{note}</li>
                ),
              )}
            </ul>

            <div className={`interpretation-summary ${riskClass}`}>
              {getInterpretation(result.breakdown, result.risk).conclusion}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
