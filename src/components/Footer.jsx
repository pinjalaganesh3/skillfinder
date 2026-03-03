import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px 20px", marginTop: "auto" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, color: "#475569", marginBottom: 12 }}>
          🚀 <span style={{ color: "#f59e0b" }}>SkillFinder</span> — Built for students who refuse to be overlooked 💪
        </p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
          {[
            ["/quiz",      "🎯 Career Quiz"],
            ["/explore",   "🧭 Explore Careers"],
            ["/jobs",      "💼 Find Jobs"],
            ["/courses",   "🎓 Free Courses"],
            ["/planner",   "📅 Study Planner"],
            ["/interview", "🤖 Mock Interview"],
            ["/saved",     "⭐ Saved Jobs"],
            ["/about",     "ℹ️ About"],
          ].map(([path, label]) => (
            <Link key={path} to={path} style={{ fontSize: 12, color: "#334155", textDecoration: "none", padding: "3px 10px", borderRadius: 20, transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#f59e0b"}
              onMouseLeave={e => e.currentTarget.style.color = "#334155"}>
              {label}
            </Link>
          ))}
        </div>
        <p style={{ fontSize: 11, color: "#1e293b" }}>Free forever · No ads · Made with ❤️ for students</p>
      </div>
    </footer>
  );
}
