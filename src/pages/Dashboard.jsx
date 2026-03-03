import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { fetchIndianJobs, fetchRemoteJobs } from "../services/jobService";

const QUICK_ACTIONS = [
  { icon: "🎯", label: "Career Quiz",       sub: "Find your path",        path: "/quiz",      color: "#f59e0b" },
  { icon: "🧭", label: "Explore Careers",   sub: "Learn about your field", path: "/explore",   color: "#6366f1" },
  { icon: "🗺️", label: "My Roadmap",        sub: "Track your progress",   path: "/roadmap",   color: "#0891b2" },
  { icon: "🤖", label: "Mock Interview",    sub: "Practice questions",    path: "/interview", color: "#7c3aed" },
  { icon: "🔥", label: "Skills Demand",     sub: "What's hot to learn",   path: "/heatmap",   color: "#ef4444" },
  { icon: "📄", label: "Resume Analyzer",   sub: "Check your resume",     path: "/upload",    color: "#059669" },
];

export default function Dashboard() {
  const [indiaJobs,    setIndiaJobs]    = useState([]);
  const [globalJobs,   setGlobalJobs]   = useState([]);
  const [loadingIndia,  setLoadingIndia]  = useState(true);
  const [loadingGlobal, setLoadingGlobal] = useState(true);
  const [studentData,  setStudentData]  = useState(null);
  const navigate = useNavigate();

  const email     = localStorage.getItem("userEmail")         || "";
  const savedName = localStorage.getItem("userName")          || "";
  const savedQual = localStorage.getItem("userQualification") || "";

  useEffect(() => {
    const fetchProfile = async () => {
      if (!email) return;
      const { data } = await supabase.from("students").select("*").eq("email", email).single();
      if (data) {
        setStudentData(data);
        localStorage.setItem("userName",          data.name         || "");
        localStorage.setItem("userQualification", data.qualification || "");
      }
    };
    const loadJobs = async () => {
      const [india, global] = await Promise.all([fetchIndianJobs("developer"), fetchRemoteJobs("developer")]);
      setIndiaJobs(india.slice(0, 6));   setLoadingIndia(false);
      setGlobalJobs(global.slice(0, 6)); setLoadingGlobal(false);
    };
    fetchProfile(); loadJobs();
  }, []);

  const displayName = studentData?.name || savedName || email.split("@")[0] || "Student";
  const displayQual = studentData?.qualification || savedQual;

  // Time-based greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px 60px" }}>

      {/* ── WELCOME CARD ── */}
      <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 18, padding: "28px 32px", marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontSize: 13, color: "#f59e0b", fontWeight: 700, marginBottom: 6 }}>{greeting}! ☀️</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(20px,3vw,28px)", fontWeight: 800, marginBottom: 8 }}>
              Welcome back, {displayName}! 👋
            </h2>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 4 }}>📧 {email}</p>
            {displayQual && <p style={{ color: "#64748b", fontSize: 14, marginBottom: 4 }}>🎓 {displayQual}</p>}
            <p style={{ color: "#475569", fontSize: 13, marginTop: 10 }}>
              Your personalized job picks are ready below. Keep going — you're closer than you think! 💪
            </p>
          </div>

          {/* Progress nudge */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "18px 20px", minWidth: 200, textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🚀</div>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Ready to level up?</p>
            <p style={{ fontSize: 12, color: "#475569", marginBottom: 14 }}>Practice makes perfect!</p>
            <button onClick={() => navigate("/interview")} style={{ padding: "9px 18px", fontSize: 13, width: "100%" }}>
              Start Mock Interview
            </button>
          </div>
        </div>
      </div>

      {/* ── QUICK ACTIONS ── */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 14, color: "#94a3b8" }}>
          ⚡ Quick Actions
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))", gap: 10 }}>
          {QUICK_ACTIONS.map((a, i) => (
            <div key={i} onClick={() => navigate(a.path)}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "16px 14px", cursor: "pointer", transition: "all 0.2s", textAlign: "center" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${a.color}40`; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
            >
              <div style={{ fontSize: 26, marginBottom: 7 }}>{a.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#f1f5f9", marginBottom: 3 }}>{a.label}</div>
              <div style={{ fontSize: 11, color: "#475569" }}>{a.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── JOBS IN INDIA ── */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "24px", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 16, paddingLeft: 12, borderLeft: "3px solid #4ade80", color: "#f1f5f9" }}>
              🇮🇳 Jobs in India
            </h3>
            <p style={{ fontSize: 12, color: "#475569", marginTop: 4, paddingLeft: 16 }}>Live listings from Adzuna — updated daily</p>
          </div>
          <button onClick={() => navigate("/jobs?search=developer")} style={{ padding: "7px 14px", fontSize: 12 }}>See More →</button>
        </div>
        {loadingIndia && <p style={{ color: "#475569", fontSize: 14 }}>⏳ Loading jobs from India...</p>}
        {!loadingIndia && indiaJobs.length === 0 && (
          <p style={{ color: "#64748b", fontSize: 14 }}>Couldn't load right now. <a href="https://www.adzuna.in" target="_blank" rel="noreferrer" style={{ color: "#f59e0b" }}>Browse on Adzuna →</a></p>
        )}
        <div className="job-grid">
          {indiaJobs.map((job, i) => (
            <div key={job.id || i} className="job-card">
              <div>
                <h4>{job.title}</h4>
                <p>🏢 {job.company}</p>
                <p>📍 {job.location}</p>
                {job.salary && <p style={{ color: "#4ade80", fontWeight: 700 }}>💰 {job.salary}</p>}
              </div>
              <a href={job.url} target="_blank" rel="noreferrer">Apply Now →</a>
            </div>
          ))}
        </div>
      </div>

      {/* ── REMOTE JOBS ── */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "24px", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 16, paddingLeft: 12, borderLeft: "3px solid #60a5fa", color: "#f1f5f9" }}>
              🌍 Remote Jobs Worldwide
            </h3>
            <p style={{ fontSize: 12, color: "#475569", marginTop: 4, paddingLeft: 16 }}>Work from home — companies from around the world</p>
          </div>
          <button onClick={() => navigate("/jobs?search=remote developer")} style={{ padding: "7px 14px", fontSize: 12 }}>See More →</button>
        </div>
        {loadingGlobal && <p style={{ color: "#475569", fontSize: 14 }}>⏳ Loading remote jobs...</p>}
        {!loadingGlobal && globalJobs.length === 0 && (
          <p style={{ color: "#64748b", fontSize: 14 }}>Couldn't load right now. <a href="https://remotive.com" target="_blank" rel="noreferrer" style={{ color: "#f59e0b" }}>Browse on Remotive →</a></p>
        )}
        <div className="job-grid">
          {globalJobs.map((job, i) => (
            <div key={job.id || i} className="job-card">
              <div>
                <h4>{job.title}</h4>
                <p>🏢 {job.company}</p>
                <p>📍 {job.location}</p>
                {job.skills?.length > 0 && <span className="tag">{job.skills[0]}</span>}
              </div>
              <a href={job.url} target="_blank" rel="noreferrer">Apply Now →</a>
            </div>
          ))}
        </div>
      </div>

      {/* ── SEARCH BY SKILL ── */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "22px 24px" }}>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 6, paddingLeft: 12, borderLeft: "3px solid #f59e0b", color: "#f1f5f9" }}>
          🔍 Search by Career Field
        </h3>
        <p style={{ fontSize: 13, color: "#475569", marginBottom: 14, paddingLeft: 16 }}>Tap any field to find matching jobs instantly</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { label: "💻 Software Dev",  search: "software developer" },
            { label: "📊 Data Analyst",  search: "data analyst" },
            { label: "🎨 UI/UX Design",  search: "ui ux designer" },
            { label: "📱 Mobile Dev",    search: "flutter developer" },
            { label: "🔐 Cybersecurity", search: "cybersecurity" },
            { label: "🤖 AI / ML",       search: "machine learning" },
            { label: "☁️ Cloud/DevOps",  search: "devops cloud" },
          ].map(item => (
            <button key={item.search} onClick={() => navigate(`/jobs?search=${encodeURIComponent(item.search)}`)}
              style={{ padding: "8px 16px", fontSize: 13, borderRadius: 30, boxShadow: "none", transform: "none" }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
