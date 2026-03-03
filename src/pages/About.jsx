import { useNavigate } from "react-router-dom";

const FEATURES = [
  { icon: "🎯", title: "Career Quiz",        desc: "Answer 5 simple questions and discover which tech career suits your personality and interests." },
  { icon: "🧭", title: "Explore Careers",    desc: "Detailed guides for 6 tech fields — what they do, skills needed, salary ranges and more." },
  { icon: "🗺️", title: "Learning Roadmap",   desc: "Step-by-step learning plans with checkboxes so you always know what to do next." },
  { icon: "💼", title: "Live Job Search",     desc: "Real jobs from 3 sources — Adzuna, Remotive and Jooble — India + worldwide." },
  { icon: "🤖", title: "Mock Interview",      desc: "Practice with real interview questions, get timed, and receive AI feedback instantly." },
  { icon: "🔥", title: "Skills Heatmap",      desc: "Visual chart showing which tech skills are most in demand and what salary they pay." },
  { icon: "📄", title: "Resume Analyzer",     desc: "Upload your resume and get matched to career paths based on your existing skills." },
  { icon: "💬", title: "SkillBot Chatbot",    desc: "Ask any career question and get instant answers — available on every page." },
];

export default function About() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ padding: "52px 20px 44px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.05) 0%, transparent 65%)" }}>
        <div className="badge" style={{ marginBottom: 16 }}>ℹ️ About SkillFinder</div>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(26px,4.5vw,46px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 16, maxWidth: 600, margin: "0 auto 16px" }}>
          Built for Students Who Want to Break Into Tech
        </h1>
        <p style={{ color: "#64748b", fontSize: 16, maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.75 }}>
          SkillFinder is a free platform that helps students in India and worldwide discover tech careers, learn the right skills, and find real jobs — all in one place.
        </p>

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          {[["6+", "Career Fields"], ["3", "Job Sources"], ["Free", "Always"], ["AI", "Powered"]].map(([val, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 28, fontWeight: 800, background: "linear-gradient(90deg,#f59e0b,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{val}</div>
              <div style={{ fontSize: 12, color: "#475569", fontWeight: 600 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 20px 60px" }}>

        {/* Mission */}
        <div style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 16, padding: "28px 32px", marginBottom: 48, textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Our Mission</h2>
          <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
            Many students want to get into tech but don't know where to start. SkillFinder removes the confusion — we show you exactly which career fits you, what to learn, and where to apply. No experience needed to begin.
          </p>
        </div>

        {/* Features */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(20px,3vw,30px)", fontWeight: 800, marginBottom: 8 }}>Everything on SkillFinder</h2>
          <p style={{ color: "#475569", fontSize: 14 }}>All tools are completely free to use</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 14, marginBottom: 48 }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px 18px" }}>
              <span style={{ fontSize: 26, display: "block", marginBottom: 10 }}>{f.icon}</span>
              <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 6, color: "#f1f5f9" }}>{f.title}</h4>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "24px 28px", marginBottom: 40 }}>
          <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "#f1f5f9" }}>Built With</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["React.js", "Vite", "Supabase", "Adzuna API", "Remotive API", "Jooble API", "Netlify"].map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <button onClick={() => navigate("/quiz")} style={{ padding: "13px 36px", fontSize: 15, borderRadius: 12, marginRight: 12 }}>
            🎯 Take Career Quiz
          </button>
          <button onClick={() => navigate("/jobs")} style={{ padding: "13px 36px", fontSize: 15, borderRadius: 12, background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)" }}>
            💼 Browse Jobs
          </button>
        </div>
      </div>
    </div>
  );
}
