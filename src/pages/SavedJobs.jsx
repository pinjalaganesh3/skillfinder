import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const STATUS_OPTIONS = [
  { id: "saved",     label: "⭐ Saved",        color: "#f59e0b", bg: "rgba(245,158,11,0.1)"  },
  { id: "applied",   label: "📤 Applied",       color: "#60a5fa", bg: "rgba(96,165,250,0.1)"  },
  { id: "interview", label: "🤝 Interview",     color: "#a78bfa", bg: "rgba(167,139,250,0.1)" },
  { id: "offer",     label: "🎉 Got Offer!",    color: "#4ade80", bg: "rgba(74,222,128,0.1)"  },
  { id: "rejected",  label: "❌ Not Selected",  color: "#f87171", bg: "rgba(248,113,113,0.1)" },
];

export default function SavedJobs() {
  const [jobs,   setJobs]   = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    setJobs(saved);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = jobs.map(j => j.id === id ? { ...j, status: newStatus } : j);
    setJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
  };

  const removeJob = (id) => {
    const updated = jobs.filter(j => j.id !== id);
    setJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
  };

  const filtered = filter === "all" ? jobs : jobs.filter(j => j.status === filter);

  // Stats
  const stats = {
    total:     jobs.length,
    applied:   jobs.filter(j => j.status === "applied").length,
    interview: jobs.filter(j => j.status === "interview").length,
    offer:     jobs.filter(j => j.status === "offer").length,
  };

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "36px 20px 60px" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div className="badge" style={{ marginBottom: 12 }}>🔔 Job Tracker</div>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(22px,3.5vw,32px)", fontWeight: 800, marginBottom: 8 }}>
          Saved Jobs & Applications
        </h1>
        <p style={{ color: "#64748b", fontSize: 14 }}>
          Track every job you've saved, applied to, or interviewed for — all in one place.
        </p>
      </div>

      {/* Stats strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginBottom: 24 }}>
        {[
          { label: "Total Saved",  value: stats.total,     icon: "⭐", color: "#f59e0b" },
          { label: "Applied",      value: stats.applied,   icon: "📤", color: "#60a5fa" },
          { label: "Interviews",   value: stats.interview, icon: "🤝", color: "#a78bfa" },
          { label: "Offers",       value: stats.offer,     icon: "🎉", color: "#4ade80" },
        ].map(s => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "16px", textAlign: "center" }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "#475569", marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        <button onClick={() => setFilter("all")}
          style={{ padding: "6px 16px", borderRadius: 30, fontSize: 12, fontWeight: 700, background: filter === "all" ? "linear-gradient(135deg,#f59e0b,#f97316)" : "rgba(255,255,255,0.04)", color: filter === "all" ? "#0a0a0a" : "#475569", border: `1px solid ${filter === "all" ? "transparent" : "rgba(255,255,255,0.08)"}`, boxShadow: "none", transform: "none" }}>
          All ({jobs.length})
        </button>
        {STATUS_OPTIONS.map(s => (
          <button key={s.id} onClick={() => setFilter(s.id)}
            style={{ padding: "6px 16px", borderRadius: 30, fontSize: 12, fontWeight: 700, background: filter === s.id ? s.bg : "rgba(255,255,255,0.04)", color: filter === s.id ? s.color : "#475569", border: `1px solid ${filter === s.id ? s.color + "50" : "rgba(255,255,255,0.08)"}`, boxShadow: "none", transform: "none" }}>
            {s.label} ({jobs.filter(j => j.status === s.id).length})
          </button>
        ))}
      </div>

      {/* Empty state */}
      {jobs.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "rgba(255,255,255,0.02)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⭐</div>
          <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>No saved jobs yet!</h3>
          <p style={{ color: "#475569", fontSize: 14, marginBottom: 20 }}>
            Go to the Jobs page and click "Save Job" on any listing to track it here.
          </p>
          <button onClick={() => navigate("/jobs")} style={{ padding: "11px 28px", fontSize: 14 }}>
            💼 Browse Jobs →
          </button>
        </div>
      )}

      {/* Job cards */}
      {filtered.length === 0 && jobs.length > 0 && (
        <div style={{ textAlign: "center", padding: "40px", color: "#475569" }}>
          No jobs with this status yet.
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map(job => {
          const statusInfo = STATUS_OPTIONS.find(s => s.id === job.status) || STATUS_OPTIONS[0];
          return (
            <div key={job.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "18px 20px", transition: "all 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>

                {/* Job info */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#f59e0b", fontSize: 14, flexShrink: 0 }}>
                      {job.company?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: "#f1f5f9", marginBottom: 2 }}>{job.title}</h4>
                      <p style={{ fontSize: 12, color: "#64748b" }}>🏢 {job.company} · 📍 {job.location}</p>
                    </div>
                  </div>
                  {job.salary && <span style={{ fontSize: 12, color: "#4ade80", fontWeight: 700 }}>💰 {job.salary}</span>}
                  <p style={{ fontSize: 11, color: "#334155", marginTop: 6 }}>Saved on {new Date(job.savedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                </div>

                {/* Status + actions */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                  {/* Current status badge */}
                  <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: statusInfo.bg, color: statusInfo.color, border: `1px solid ${statusInfo.color}30` }}>
                    {statusInfo.label}
                  </span>

                  {/* Status selector */}
                  <select
                    value={job.status}
                    onChange={e => updateStatus(job.id, e.target.value)}
                    style={{ padding: "5px 10px", borderRadius: 8, fontSize: 12, background: "#111", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", width: "auto", margin: 0 }}
                  >
                    {STATUS_OPTIONS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>

                  {/* Apply & Remove buttons */}
                  <div style={{ display: "flex", gap: 6 }}>
                    {job.url && (
                      <a href={job.url} target="_blank" rel="noopener noreferrer"
                        style={{ padding: "5px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700, background: "linear-gradient(135deg,#f59e0b,#f97316)", color: "#0a0a0a", textDecoration: "none" }}>
                        Apply →
                      </a>
                    )}
                    <button onClick={() => removeJob(job.id)}
                      style={{ padding: "5px 12px", borderRadius: 8, fontSize: 12, background: "rgba(248,113,113,0.1)", color: "#f87171", border: "1px solid rgba(248,113,113,0.2)", boxShadow: "none", transform: "none" }}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {jobs.length > 0 && (
        <div style={{ marginTop: 28, background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.12)", borderRadius: 12, padding: "14px 18px" }}>
          <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>
            💡 <strong style={{ color: "#f59e0b" }}>Tip:</strong> Update the status as you progress — from Saved → Applied → Interview → Offer. This helps you keep track of where you stand with each company!
          </p>
        </div>
      )}
    </div>
  );
}
