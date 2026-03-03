import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { path: "/home",      label: "🏠 Home",          desc: "Start here" },
  { path: "/quiz",      label: "🎯 Career Quiz",    desc: "Find your path" },
  { path: "/explore",   label: "🧭 Explore",        desc: "Career fields" },
  { path: "/jobs",      label: "💼 Find Jobs",       desc: "Search jobs" },
  { path: "/saved",     label: "⭐ Saved Jobs",      desc: "Your tracker" },
  { path: "/courses",   label: "🎓 Free Courses",    desc: "Learn free" },
  { path: "/roadmap",   label: "🗺️ Roadmap",         desc: "Learning plan" },
  { path: "/planner",   label: "📅 Study Planner",   desc: "Daily goals" },
  { path: "/interview", label: "🤖 Interview",       desc: "Practice now" },
  { path: "/heatmap",   label: "🔥 Skills",          desc: "Market demand" },
  { path: "/dashboard", label: "📊 Dashboard",       desc: "Your profile" },
  { path: "/upload",    label: "📄 Resume",          desc: "Analyze resume" },
];

export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [open, setOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 500, background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 20px", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link to={isLoggedIn ? "/home" : "/"} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 20 }}>🚀</span>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 17, fontWeight: 800, background: "linear-gradient(90deg,#f59e0b,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            SkillFinder
          </span>
        </Link>

        {isLoggedIn ? (
          <>
            {/* Desktop nav - scrollable */}
            <div style={{ display: "flex", alignItems: "center", gap: 1, overflowX: "auto", msOverflowStyle: "none", scrollbarWidth: "none", flex: 1, margin: "0 12px" }} className="desktop-nav">
              {NAV_ITEMS.map(item => {
                const active = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}
                    style={{ fontSize: 12, fontWeight: active ? 700 : 500, color: active ? "#f59e0b" : "#64748b", textDecoration: "none", padding: "5px 9px", borderRadius: 8, background: active ? "rgba(245,158,11,0.1)" : "transparent", transition: "all 0.2s", whiteSpace: "nowrap", flexShrink: 0 }}
                    onMouseEnter={e => { if (!active) { e.currentTarget.style.color = "#f1f5f9"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "transparent"; }}}>
                    {item.label}
                  </Link>
                );
              })}
              <span onClick={handleLogout} style={{ fontSize: 12, color: "#334155", padding: "5px 9px", borderRadius: 8, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#ef4444"}
                onMouseLeave={e => e.currentTarget.style.color = "#334155"}>
                Logout
              </span>
            </div>

            {/* Mobile hamburger */}
            <button onClick={() => setOpen(o => !o)} className="mobile-menu-btn"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#f1f5f9", padding: "6px 12px", fontSize: 18, borderRadius: 8, display: "none", flexShrink: 0, boxShadow: "none", transform: "none" }}>
              {open ? "✕" : "☰"}
            </button>
          </>
        ) : (
          <div style={{ display: "flex", gap: 8 }}>
            <Link to="/"       style={{ fontSize: 13, color: "#94a3b8", textDecoration: "none", padding: "6px 14px", borderRadius: 8, background: "rgba(255,255,255,0.05)" }}>Login</Link>
            <Link to="/signup" style={{ fontSize: 13, color: "#0a0a0a", textDecoration: "none", padding: "6px 14px", borderRadius: 8, background: "linear-gradient(135deg,#f59e0b,#f97316)", fontWeight: 700 }}>Sign Up</Link>
          </div>
        )}
      </div>

      {/* Mobile dropdown */}
      {open && isLoggedIn && (
        <div style={{ background: "#0d0d0d", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "10px 16px 14px", display: "flex", flexDirection: "column", gap: 2, maxHeight: "80vh", overflowY: "auto" }}>
          {NAV_ITEMS.map(item => (
            <Link key={item.path} to={item.path} onClick={() => setOpen(false)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 10, textDecoration: "none", background: location.pathname === item.path ? "rgba(245,158,11,0.1)" : "transparent", color: location.pathname === item.path ? "#f59e0b" : "#94a3b8", fontSize: 14, fontWeight: 600, transition: "all 0.15s" }}>
              <span>{item.label}</span>
              <span style={{ fontSize: 11, color: "#334155" }}>{item.desc}</span>
            </Link>
          ))}
          <div onClick={handleLogout} style={{ padding: "10px 12px", color: "#ef4444", fontSize: 14, fontWeight: 600, cursor: "pointer", borderRadius: 10 }}>
            🚪 Logout
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
