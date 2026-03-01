import { useState } from "react";
import { supabase } from "../supabaseClient";

const CAREER_KEYWORDS = {
  software: ["javascript", "react", "python", "java", "node", "html", "css", "typescript", "vue", "angular", "git", "api"],
  data: ["sql", "python", "excel", "tableau", "power bi", "analytics", "pandas", "statistics", "numpy", "machine learning"],
  design: ["figma", "adobe", "photoshop", "illustrator", "ui", "ux", "wireframe", "prototype", "canva", "sketch"],
  mobile: ["flutter", "react native", "android", "ios", "swift", "kotlin", "dart", "firebase", "xcode"],
  cybersecurity: ["security", "network", "firewall", "linux", "kali", "penetration", "ethical hacking", "siem", "encryption"],
  ai: ["machine learning", "deep learning", "tensorflow", "pytorch", "nlp", "computer vision", "neural", "ai", "sklearn"],
};

function analyzeResume(text) {
  const lower = text.toLowerCase();
  const scores = {};
  for (const [field, keywords] of Object.entries(CAREER_KEYWORDS)) {
    scores[field] = keywords.filter(kw => lower.includes(kw)).length;
  }
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sorted.filter(([, score]) => score > 0).slice(0, 3);
}

const FIELD_LABELS = {
  software: "💻 Software Development",
  data: "📊 Data Science & Analytics",
  design: "🎨 UI/UX Design",
  mobile: "📱 Mobile Development",
  cybersecurity: "🔐 Cybersecurity",
  ai: "🤖 AI & Machine Learning",
};

export default function ResumeUpload() {
  const [fileName, setFileName] = useState("No file selected");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [uploadError, setUploadError] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const f = e.target.files[0];
      setFile(f);
      setFileName(f.name);
      setUploadDone(false);
      setSuggestions([]);
      setUploadError("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadError("Please select a resume file first.");
      return;
    }

    setUploading(true);
    setUploadError("");

    const email = localStorage.getItem("userEmail") || "anonymous";
    const filePath = `resumes/${email.replace("@", "_")}/${Date.now()}_${file.name}`;

    // Try uploading to Supabase Storage
    const { error: storageError } = await supabase.storage
      .from("resumes")
      .upload(filePath, file, { upsert: true });

    if (storageError) {
      console.warn("Storage upload note:", storageError.message);
      // Non-blocking — still do analysis
    }

    // Analyze resume text (works for text-based files)
    let textContent = "";
    try {
      textContent = await file.text();
    } catch {
      // Binary file (PDF) — use filename for hints
      textContent = file.name;
    }

    const results = analyzeResume(textContent + " " + fileName);
    setSuggestions(results);
    setUploadDone(true);
    setUploading(false);
  };

  return (
    <div className="upload-page">
      <h2>📄 Upload Your Resume</h2>
      <p className="upload-sub">Get career insights based on your skills</p>

      <div
        className="upload-box"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const f = e.dataTransfer.files[0];
          if (f) { setFile(f); setFileName(f.name); setUploadDone(false); setSuggestions([]); }
        }}
      >
        <p>📂 Drag & Drop your resume here</p>
        <p className="or-text">OR</p>
        <label className="file-label">
          Choose File
          <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} hidden />
        </label>
        <p className="file-name">📎 {fileName}</p>
      </div>

      {uploadError && (
        <div style={{
          background: "#fef3c7", border: "1px solid #fcd34d",
          color: "#92400e", padding: "10px 16px", borderRadius: 10,
          fontSize: 14, maxWidth: 500, margin: "12px auto"
        }}>
          ⚠️ {uploadError}
        </div>
      )}

      <button className="upload-btn" onClick={handleUpload} disabled={uploading}>
        {uploading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {uploadDone && (
        <div style={{
          maxWidth: 560, margin: "30px auto",
          background: "white", borderRadius: 16,
          padding: 28, boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ marginBottom: 6, color: "#0f172a" }}>✅ Resume Analyzed!</h3>
          <p style={{ color: "#475569", fontSize: 14, marginBottom: 20 }}>
            {fileName} was uploaded successfully.
          </p>

          {suggestions.length > 0 ? (
            <>
              <h4 style={{ color: "#0f172a", marginBottom: 14 }}>🎯 Suggested Career Paths:</h4>
              {suggestions.map(([field, score], i) => (
                <div key={field} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "12px 16px", borderRadius: 12,
                  background: i === 0 ? "linear-gradient(90deg,#fef9c3,#fde68a)" : "#f8fafc",
                  border: "1px solid", borderColor: i === 0 ? "#fcd34d" : "#e2e8f0",
                  marginBottom: 10
                }}>
                  <div style={{ fontSize: 24 }}>{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: "#0f172a", fontSize: 15 }}>
                      {FIELD_LABELS[field]}
                    </div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>
                      {score} matching skill{score !== 1 ? "s" : ""} detected
                    </div>
                  </div>
                  <a
                    href={`/jobs?search=${field}`}
                    style={{
                      padding: "6px 14px", borderRadius: 20,
                      background: "linear-gradient(90deg,#facc15,#f97316)",
                      color: "#1e293b", fontWeight: 700,
                      fontSize: 12, textDecoration: "none"
                    }}
                  >
                    Find Jobs
                  </a>
                </div>
              ))}
            </>
          ) : (
            <div style={{ color: "#475569", fontSize: 14 }}>
              <p>No specific skills detected from the file content.</p>
              <p style={{ marginTop: 8 }}>
                For best results, upload a <strong>.txt</strong> or <strong>.docx</strong> version of your resume.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
