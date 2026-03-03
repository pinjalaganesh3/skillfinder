import { useState } from "react";
import { supabase } from "../supabaseClient";

const CAREER_KEYWORDS = {
  "Software Developer": ["javascript", "react", "python", "java", "node", "html", "css", "typescript", "vue", "angular", "git", "api"],
  "Data Analyst":       ["sql", "python", "excel", "tableau", "power bi", "analytics", "pandas", "statistics", "numpy"],
  "UI/UX Designer":     ["figma", "adobe", "photoshop", "ui", "ux", "wireframe", "prototype", "canva", "sketch", "design"],
  "Mobile Developer":   ["flutter", "react native", "android", "ios", "swift", "kotlin", "dart", "firebase"],
  "Cybersecurity":      ["security", "network", "firewall", "linux", "kali", "penetration", "ethical hacking", "encryption"],
  "AI/ML Engineer":     ["machine learning", "deep learning", "tensorflow", "pytorch", "nlp", "neural", "ai", "sklearn"],
};

function analyzeResume(text) {
  const lower = text.toLowerCase();
  const scores = {};
  for (const [field, keywords] of Object.entries(CAREER_KEYWORDS)) {
    scores[field] = keywords.filter(kw => lower.includes(kw)).length;
  }
  return Object.entries(scores).sort((a, b) => b[1] - a[1]).filter(([, s]) => s > 0).slice(0, 3);
}

export default function ResumeUpload() {
  const [file,     setFile]     = useState(null);
  const [text,     setText]     = useState("");
  const [results,  setResults]  = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const handleFile = (f) => {
    if (!f) return;
    if (f.type !== "application/pdf" && !f.name.endsWith(".txt")) {
      setError("Please upload a PDF or TXT file.");
      return;
    }
    setError("");
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setText(e.target.result);
    reader.readAsText(f);
  };

  const analyze = async () => {
    if (!text.trim()) { setError("No text found. Try a .txt resume file."); return; }
    setLoading(true);
    const matches = analyzeResume(text);
    setTimeout(() => {
      setResults(matches.length > 0 ? matches : null);
      if (matches.length === 0) setError("Couldn't detect career keywords. Try adding your skills clearly.");
      setLoading(false);
    }, 1200);
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "44px 20px 60px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ fontSize: 52, marginBottom: 14 }}>📄</div>
        <div className="badge" style={{ marginBottom: 14 }}>Resume Analyzer</div>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(22px,4vw,34px)", fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>
          Find Out Which Career Fits Your Resume
        </h1>
        <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>
          Upload your resume and we'll scan it for tech keywords to suggest the best career paths for you.
        </p>
      </div>

      {/* How it works */}
      {!results && (
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "18px 20px", marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>How it works:</p>
          {["Upload your resume (PDF or TXT)", "We scan it for tech keywords and skills", "Get matched to top career paths", "See what to learn next"].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14, color: "#64748b", marginBottom: 8 }}>
              <span style={{ color: "#f59e0b", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>→</span>
              {s}
            </div>
          ))}
        </div>
      )}

      {/* Upload area */}
      {!results && (
        <>
          <div
            onClick={() => document.getElementById("resume-input").click()}
            onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
            onDragOver={e => e.preventDefault()}
            style={{ border: "2px dashed rgba(245,158,11,0.25)", borderRadius: 14, padding: "36px 20px", textAlign: "center", cursor: "pointer", background: "rgba(255,255,255,0.02)", transition: "all 0.2s", marginBottom: 16 }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(245,158,11,0.5)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(245,158,11,0.25)"}
          >
            <div style={{ fontSize: 36, marginBottom: 10 }}>📁</div>
            <p style={{ color: "#f1f5f9", fontWeight: 600, marginBottom: 6, fontSize: 15 }}>
              {file ? `✅ ${file.name}` : "Click to upload or drag & drop your resume"}
            </p>
            <p style={{ color: "#475569", fontSize: 13 }}>Supports PDF and TXT files</p>
          </div>
          <input id="resume-input" type="file" accept=".pdf,.txt" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />

          {error && <div className="auth-error" style={{ marginBottom: 14 }}>⚠️ {error}</div>}

          {file && (
            <button onClick={analyze} disabled={loading} style={{ width: "100%", padding: "13px", fontSize: 15, borderRadius: 12 }}>
              {loading ? "⏳ Analyzing your resume..." : "🔍 Analyze My Resume"}
            </button>
          )}
        </>
      )}

      {/* Results */}
      {results && (
        <div>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 44, marginBottom: 10 }}>🎯</div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Your Career Matches</h2>
            <p style={{ color: "#64748b", fontSize: 14 }}>Based on the skills and keywords found in your resume:</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
            {results.map(([career, score], i) => (
              <div key={career} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${i === 0 ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.08)"}`, borderRadius: 14, padding: "18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {i === 0 && <span style={{ fontSize: 18 }}>🥇</span>}
                    {i === 1 && <span style={{ fontSize: 18 }}>🥈</span>}
                    {i === 2 && <span style={{ fontSize: 18 }}>🥉</span>}
                    <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 16, color: i === 0 ? "#f59e0b" : "#f1f5f9" }}>{career}</span>
                  </div>
                  <span style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>{score} keyword{score !== 1 ? "s" : ""} found</span>
                </div>
                <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ width: `${Math.min(score * 15, 100)}%`, height: "100%", background: i === 0 ? "linear-gradient(90deg,#f59e0b,#f97316)" : "rgba(255,255,255,0.2)", borderRadius: 10, transition: "width 0.6s ease" }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 12, padding: "16px 18px", marginBottom: 24 }}>
            <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7 }}>
              💡 <strong style={{ color: "#f59e0b" }}>Top match: {results[0][0]}</strong> — Your resume shows the most relevant keywords for this field. Explore the roadmap to strengthen your skills further!
            </p>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => { setFile(null); setText(""); setResults(null); setError(""); }} style={{ flex: 1, padding: "11px", fontSize: 14, background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)" }}>
              Upload Different Resume
            </button>
            <button onClick={() => window.location.href = "/explore"} style={{ flex: 1, padding: "11px", fontSize: 14 }}>
              Explore Careers →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
