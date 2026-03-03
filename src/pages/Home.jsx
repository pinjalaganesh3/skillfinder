import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllJobs } from "../services/jobService";

const STUDENT_SCENARIOS = [
  { emoji: "🎓", text: "Just graduated and don't know where to start?" },
  { emoji: "📚", text: "Still studying and want to plan ahead?" },
  { emoji: "😕", text: "Confused between Python, React, or Figma?" },
  { emoji: "💼", text: "Applied everywhere but no callbacks?" },
];

const STEPS = [
  {
    step: "1", icon: "🎯", color: "#f59e0b", path: "/quiz",
    title: "Find Your Career",
    simple: "Don't know what to do? Start here!",
    desc: "Answer 5 fun questions and we'll tell you exactly which tech career matches your personality. Takes only 2 minutes!"
  },
  {
    step: "2", icon: "🧭", color: "#6366f1", path: "/explore",
    title: "Learn About It",
    simple: "Understand your career before you start",
    desc: "See exactly what the job is, what skills you need, how much money you'll earn, and how long it takes to get there."
  },
  {
    step: "3", icon: "🗺️", color: "#0891b2", path: "/roadmap",
    title: "Follow the Plan",
    simple: "Know exactly what to do next",
    desc: "A simple checklist — tick each step as you complete it. No more confusion about what to learn next!"
  },
  {
    step: "4", icon: "💼", color: "#16a34a", path: "/jobs",
    title: "Apply for Jobs",
    simple: "Real jobs from India & worldwide",
    desc: "Search thousands of real job listings from 3 sources. Filter by skill or role and apply directly."
  },
];

const TOOLS = [
  { icon: "🤖", title: "Practice Interviews",   simple: "Get ready before the real thing",    desc: "Answer real interview questions, get scored, and improve your answers. Free, unlimited practice.", path: "/interview", color: "#6366f1" },
  { icon: "🔥", title: "Skills in Demand",      simple: "Know what to learn to get hired fast", desc: "See which skills companies are hiring for the most right now — with salary info.", path: "/heatmap",   color: "#ef4444" },
  { icon: "📄", title: "Analyze Your Resume",   simple: "Find out if your resume is job-ready",  desc: "Upload your resume and we'll tell you which career path your skills match best.", path: "/upload",    color: "#0891b2" },
  { icon: "📊", title: "Your Dashboard",        simple: "Everything in one place",              desc: "Your profile, saved data, and personalized job picks all in one spot.", path: "/dashboard", color: "#059669" },
];

const HOT_SKILLS = ["Python", "React", "SQL", "Figma", "Flutter", "AWS", "Java", "Machine Learning"];

export default function Home() {
  const navigate = useNavigate();
  const [search,   setSearch]   = useState("");
  const [jobs,     setJobs]     = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [searched, setSearched] = useState(false);
  const name = localStorage.getItem("userName") || "";

  const doSearch = async (term) => {
    if (!term?.trim()) return;
    setLoading(true); setSearched(true); setSearch(term);
    const results = await fetchAllJobs(term);
    setJobs(results.slice(0, 6));
    setLoading(false);
  };

  return (
    <div>

      {/* ── HERO ── */}
      <div style={{ padding: "52px 20px 44px", textAlign: "center", background: "radial-gradient(ellipse at 50% -10%, rgba(245,158,11,0.08) 0%, transparent 60%)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

        {/* Personalized greeting */}
        <div className="badge" style={{ marginBottom: 20, fontSize: 13 }}>
          {name ? `👋 Hey ${name}! Ready to grow today?` : "👋 Hey! Welcome to SkillFinder"}
        </div>

        <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(26px,5vw,52px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 16, maxWidth: 660, margin: "0 auto 16px" }}>
          Not Sure What to Do After College?<br />
          <span style={{ background: "linear-gradient(90deg,#f59e0b,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            We'll Help You Figure It Out 🚀
          </span>
        </h1>

        <p style={{ color: "#64748b", fontSize: 16, maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.8 }}>
          SkillFinder is made for students like you — whether you're still studying or just graduated. Find your career, learn the skills, and get hired. All free.
        </p>

        {/* Student scenarios */}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10, maxWidth: 680, margin: "0 auto 32px" }}>
          {STUDENT_SCENARIOS.map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 30, padding: "7px 16px", fontSize: 13, color: "#64748b", display: "flex", alignItems: "center", gap: 7 }}>
              <span>{s.emoji}</span> <span>{s.text}</span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
          <button onClick={() => navigate("/quiz")} style={{ padding: "13px 30px", fontSize: 15, borderRadius: 12 }}>
            🎯 Find My Career Path
          </button>
          <button onClick={() => navigate("/jobs")} style={{ padding: "13px 30px", fontSize: 15, borderRadius: 12, background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)" }}>
            💼 Browse Jobs
          </button>
        </div>

        {/* Search bar */}
        <div style={{ maxWidth: 560, margin: "0 auto 16px", display: "flex", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "5px 5px 5px 18px" }}>
          <input
            type="text"
            placeholder="Search jobs — e.g. Python Developer, Data Analyst..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === "Enter" && doSearch(search)}
            style={{ flex: 1, border: "none", background: "transparent", outline: "none", boxShadow: "none", margin: 0, fontSize: 14, color: "#f1f5f9", padding: "8px 0" }}
          />
          <button onClick={() => doSearch(search)} style={{ padding: "10px 20px", borderRadius: 10, fontSize: 13, flexShrink: 0 }}>Search</button>
        </div>

        {/* Hot skill chips */}
        <div style={{ display: "flex", justifyContent: "center", gap: 7, flexWrap: "wrap", maxWidth: 560, margin: "0 auto" }}>
          <span style={{ fontSize: 12, color: "#334155", alignSelf: "center" }}>🔥 Trending:</span>
          {HOT_SKILLS.map(s => (
            <span key={s} onClick={() => doSearch(s)}
              style={{ padding: "4px 12px", borderRadius: 30, fontSize: 12, fontWeight: 600, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#64748b", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#f59e0b"; e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
            >{s}</span>
          ))}
        </div>
      </div>

      {/* ── JOB RESULTS ── */}
      {(loading || searched) && (
        <div style={{ maxWidth: 1100, margin: "28px auto", padding: "0 20px" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "36px", color: "#475569", fontSize: 15 }}>
              ⏳ Searching jobs for you...
            </div>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <p style={{ color: "#64748b", fontSize: 14 }}>Found <strong style={{ color: "#f1f5f9" }}>{jobs.length}</strong> jobs for <strong style={{ color: "#f59e0b" }}>"{search}"</strong></p>
                <button onClick={() => navigate(`/jobs?search=${search}`)} style={{ padding: "7px 16px", fontSize: 13 }}>See All →</button>
              </div>
              <div className="job-grid">
                {jobs.map((job, i) => {
                  const c = { Adzuna: { color: "#4ade80", emoji: "🇮🇳" }, Remotive: { color: "#60a5fa", emoji: "🌍" }, Jooble: { color: "#f59e0b", emoji: "🔎" } };
                  const src = c[job.source] || c.Remotive;
                  return (
                    <div key={job.id || i} className="job-card">
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                          <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#f59e0b", fontSize: 16 }}>
                            {job.company?.[0]?.toUpperCase() || "?"}
                          </div>
                          <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: `rgba(${src.color === "#4ade80" ? "74,222,128" : src.color === "#60a5fa" ? "96,165,250" : "245,158,11"},0.1)`, color: src.color, border: `1px solid ${src.color}30` }}>{src.emoji} {job.source}</span>
                        </div>
                        <h4 style={{ fontSize: 14, marginBottom: 8 }}>{job.title}</h4>
                        <p style={{ fontSize: 12, color: "#64748b" }}>🏢 {job.company}</p>
                        <p style={{ fontSize: 12, color: "#64748b" }}>📍 {job.location}</p>
                        {job.salary && <p style={{ fontSize: 12, color: "#4ade80", fontWeight: 700 }}>💰 {job.salary}</p>}
                      </div>
                      <a href={job.url} target="_blank" rel="noopener noreferrer" style={{ marginTop: 12 }}>Apply Now →</a>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── 4 STEPS ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 20px 44px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div className="badge" style={{ marginBottom: 14 }}>🗺️ Where Do I Start?</div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 800, marginBottom: 10 }}>
            Your Simple 4-Step Plan to Get Hired
          </h2>
          <p style={{ color: "#475569", fontSize: 15, maxWidth: 420, margin: "0 auto" }}>
            Follow these steps one by one — even if you have zero experience right now.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 14 }}>
          {STEPS.map((s, i) => (
            <div key={i} onClick={() => navigate(s.path)}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "24px 20px", cursor: "pointer", transition: "all 0.25s", position: "relative" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = `${s.color}50`; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.boxShadow = `0 12px 40px ${s.color}15`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ position: "absolute", top: 14, right: 14, width: 26, height: 26, borderRadius: "50%", background: `${s.color}20`, border: `1px solid ${s.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: s.color }}>
                {s.step}
              </div>
              <div style={{ fontSize: 34, marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: s.color, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{s.simple}</div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 17, fontWeight: 800, marginBottom: 8, color: "#f1f5f9" }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, marginBottom: 14 }}>{s.desc}</p>
              <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>Go →</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOTIVATIONAL STRIP ── */}
      <div style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.12)", margin: "0 20px", borderRadius: 16, padding: "28px 32px", textAlign: "center", maxWidth: 1060, marginLeft: "auto", marginRight: "auto" }}>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(16px,2.5vw,22px)", fontWeight: 800, marginBottom: 8 }}>
          💡 You don't need experience to start. You need direction.
        </h3>
        <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 20px" }}>
          Thousands of students got their first tech job with zero experience by following a clear plan. SkillFinder gives you that plan — for free.
        </p>
        <button onClick={() => navigate("/quiz")} style={{ padding: "12px 28px", fontSize: 14, borderRadius: 12 }}>
          🎯 Take the Free Career Quiz
        </button>
      </div>

      {/* ── MORE TOOLS ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "52px 20px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div className="badge" style={{ marginBottom: 12 }}>🛠️ More Free Tools</div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(20px,3vw,30px)", fontWeight: 800, marginBottom: 8 }}>
            Everything You Need to Get Hired
          </h2>
          <p style={{ color: "#475569", fontSize: 14, maxWidth: 380, margin: "0 auto" }}>
            All free. No subscription. No catch.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px,1fr))", gap: 14 }}>
          {TOOLS.map((f, i) => (
            <div key={i} onClick={() => navigate(f.path)}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "22px 20px", cursor: "pointer", transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = `${f.color}40`; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
            >
              <span style={{ fontSize: 30, display: "block", marginBottom: 10 }}>{f.icon}</span>
              <div style={{ fontSize: 11, fontWeight: 700, color: f.color, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>{f.simple}</div>
              <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: "#f1f5f9", marginBottom: 6 }}>{f.title}</h4>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, marginBottom: 10 }}>{f.desc}</p>
              <span style={{ fontSize: 12, color: f.color, fontWeight: 600 }}>Open →</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
