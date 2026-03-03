import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SKILLS = [
  { name: "Python",          category: "Software",  demand: 98, growth: 22,  salary: "₹6–22 LPA",  icon: "🐍" },
  { name: "JavaScript",      category: "Software",  demand: 94, growth: 8,   salary: "₹5–18 LPA",  icon: "💛" },
  { name: "React.js",        category: "Software",  demand: 89, growth: 15,  salary: "₹5–20 LPA",  icon: "⚛️" },
  { name: "TypeScript",      category: "Software",  demand: 82, growth: 28,  salary: "₹6–22 LPA",  icon: "🔷" },
  { name: "Node.js",         category: "Software",  demand: 78, growth: 10,  salary: "₹5–18 LPA",  icon: "🟢" },
  { name: "Java",            category: "Software",  demand: 75, growth: 3,   salary: "₹5–20 LPA",  icon: "☕" },
  { name: "SQL",             category: "Data",      demand: 91, growth: 5,   salary: "₹4–16 LPA",  icon: "🗄️" },
  { name: "Python (Data)",   category: "Data",      demand: 95, growth: 20,  salary: "₹6–25 LPA",  icon: "📊" },
  { name: "Power BI",        category: "Data",      demand: 72, growth: 18,  salary: "₹4–14 LPA",  icon: "📈" },
  { name: "Excel",           category: "Data",      demand: 80, growth: 2,   salary: "₹3–10 LPA",  icon: "📋" },
  { name: "Machine Learning",category: "AI / ML",   demand: 88, growth: 30,  salary: "₹8–28 LPA",  icon: "🤖" },
  { name: "LLM / GenAI",     category: "AI / ML",   demand: 85, growth: 120, salary: "₹12–40 LPA", icon: "✨" },
  { name: "PyTorch",         category: "AI / ML",   demand: 72, growth: 38,  salary: "₹9–30 LPA",  icon: "🔥" },
  { name: "Figma",           category: "Design",    demand: 86, growth: 25,  salary: "₹3–16 LPA",  icon: "🎨" },
  { name: "Webflow",         category: "Design",    demand: 50, growth: 35,  salary: "₹4–16 LPA",  icon: "🌊" },
  { name: "Flutter",         category: "Mobile",    demand: 75, growth: 30,  salary: "₹4–18 LPA",  icon: "📱" },
  { name: "React Native",    category: "Mobile",    demand: 70, growth: 15,  salary: "₹5–20 LPA",  icon: "📲" },
  { name: "AWS",             category: "Cloud",     demand: 90, growth: 20,  salary: "₹8–30 LPA",  icon: "☁️" },
  { name: "Docker",          category: "Cloud",     demand: 82, growth: 22,  salary: "₹7–25 LPA",  icon: "🐳" },
  { name: "Kubernetes",      category: "Cloud",     demand: 72, growth: 28,  salary: "₹9–30 LPA",  icon: "⚙️" },
  { name: "Ethical Hacking", category: "Security",  demand: 68, growth: 25,  salary: "₹5–22 LPA",  icon: "🛡️" },
  { name: "Network Security",category: "Security",  demand: 65, growth: 18,  salary: "₹5–20 LPA",  icon: "🔐" },
];

const CATEGORIES = ["All", "Software", "Data", "AI / ML", "Design", "Mobile", "Cloud", "Security"];

function getHeatColor(demand) {
  if (demand >= 90) return { bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.3)",  text: "#ef4444",  label: "🔥 Very Hot" };
  if (demand >= 75) return { bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.3)", text: "#f97316",  label: "Hot" };
  if (demand >= 60) return { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)", text: "#f59e0b",  label: "Good" };
  return               { bg: "rgba(96,165,250,0.08)",  border: "rgba(96,165,250,0.2)",  text: "#60a5fa",  label: "Moderate" };
}

export default function SkillsHeatmap() {
  const [category, setCategory] = useState("All");
  const [sort,     setSort]     = useState("demand");
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const filtered = SKILLS
    .filter(s => category === "All" || s.category === category)
    .sort((a, b) => sort === "growth" ? b.growth - a.growth : b.demand - a.demand);

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ padding: "44px 20px 36px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="badge" style={{ marginBottom: 14 }}>📊 Job Market Data</div>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(24px,4vw,42px)", fontWeight: 800, marginBottom: 12 }}>
          Skills <span style={{ background: "linear-gradient(90deg,#f59e0b,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Demand Heatmap</span>
        </h1>
        <p style={{ color: "#475569", fontSize: 15, maxWidth: 460, margin: "0 auto" }}>
          See which tech skills are most in demand in the job market. Click any skill to see full details.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px 60px" }}>

        {/* Quick Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 12, marginBottom: 28 }}>
          {[
            { icon: "🎯", label: "Skills Tracked", value: SKILLS.length },
            { icon: "🔥", label: "Hottest Skill",   value: "LLM / GenAI" },
            { icon: "📈", label: "Fastest Growing", value: "+120% YoY" },
            { icon: "💰", label: "Top Salary",       value: "₹40 LPA" },
          ].map(s => (
            <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "18px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 800, color: "#f59e0b" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#475569", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: "6px 14px", borderRadius: 30, fontSize: 12, fontWeight: 700,
                  background: category === cat ? "linear-gradient(135deg,#f59e0b,#f97316)" : "rgba(255,255,255,0.04)",
                  color: category === cat ? "#0a0a0a" : "#475569",
                  border: `1px solid ${category === cat ? "transparent" : "rgba(255,255,255,0.08)"}`,
                  cursor: "pointer", transition: "all 0.2s",
                  boxShadow: "none", transform: "none"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[["demand","By Demand"], ["growth","By Growth"]].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSort(key)}
                style={{
                  padding: "6px 14px", borderRadius: 30, fontSize: 12, fontWeight: 700,
                  background: sort === key ? "linear-gradient(135deg,#f59e0b,#f97316)" : "rgba(255,255,255,0.04)",
                  color: sort === key ? "#0a0a0a" : "#475569",
                  border: `1px solid ${sort === key ? "transparent" : "rgba(255,255,255,0.08)"}`,
                  cursor: "pointer", transition: "all 0.2s",
                  boxShadow: "none", transform: "none"
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 12 }}>
          {filtered.map((skill, i) => {
            const heat = getHeatColor(skill.demand);
            const isSelected = selected?.name === skill.name;
            return (
              <div
                key={skill.name}
                onClick={() => setSelected(isSelected ? null : skill)}
                style={{
                  background: isSelected ? heat.bg : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isSelected ? heat.border : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 14, padding: "18px 16px", cursor: "pointer",
                  transition: "all 0.2s",
                  animation: `fadeUp 0.3s ease ${i * 30}ms both`
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = heat.border; e.currentTarget.style.background = heat.bg; }}
                onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}}
              >
                {/* Icon + demand */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 24 }}>{skill.icon}</span>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: heat.text }}>{skill.demand}%</div>
                    <div style={{ fontSize: 11, color: "#4ade80", fontWeight: 700 }}>+{skill.growth}% ↑</div>
                  </div>
                </div>

                {/* Name */}
                <div style={{ fontWeight: 700, fontSize: 14, color: "#f1f5f9", marginBottom: 4 }}>{skill.name}</div>

                {/* Category */}
                <div style={{ fontSize: 11, color: "#475569", marginBottom: 10 }}>{skill.category}</div>

                {/* Demand bar */}
                <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ width: `${skill.demand}%`, height: "100%", background: heat.text, borderRadius: 10, transition: "width 0.6s ease" }} />
                </div>

                {/* Heat label */}
                <div style={{ fontSize: 11, color: heat.text, marginTop: 6, fontWeight: 600 }}>{heat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Selected Skill Detail */}
        {selected && (
          <div style={{
            position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
            background: "#111", border: `1px solid ${getHeatColor(selected.demand).border}`,
            borderRadius: 18, padding: "20px 24px",
            width: "min(480px, 92vw)", zIndex: 100,
            boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
            animation: "fadeUp 0.25s ease"
          }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 28 }}>{selected.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 17 }}>{selected.name}</div>
                  <div style={{ fontSize: 12, color: "#475569" }}>{selected.category}</div>
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8", border: "none", borderRadius: 8, padding: "4px 10px", fontSize: 13, boxShadow: "none", transform: "none" }}>✕</button>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
              {[
                { label: "Demand",  value: `${selected.demand}%`,  color: "#f59e0b" },
                { label: "Growth",  value: `+${selected.growth}%`, color: "#4ade80" },
                { label: "Salary",  value: selected.salary,         color: "#60a5fa" },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "12px 8px", textAlign: "center" }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#475569", marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => navigate(`/jobs?search=${selected.name}`)} style={{ flex: 1, padding: "10px", fontSize: 13 }}>
                💼 Find Jobs
              </button>
              <button onClick={() => navigate("/roadmap")} style={{ flex: 1, padding: "10px", fontSize: 13, background: "rgba(255,255,255,0.06)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)" }}>
                🗺️ Learn This
              </button>
            </div>
          </div>
        )}

        {/* Legend */}
        <div style={{ marginTop: 28, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "16px 20px" }}>
          <p style={{ fontSize: 12, color: "#475569", fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>How to read this:</p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[
              ["#ef4444", "🔥 Very Hot — 90%+ demand"],
              ["#f97316", "Hot — 75–89% demand"],
              ["#f59e0b", "Good — 60–74% demand"],
              ["#60a5fa", "Moderate — below 60%"],
            ].map(([color, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "#64748b" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
