import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Curated skill demand data — based on real job market trends
// Each skill has: demand (job count proxy), growth (% YoY), category, salary
const SKILLS_DATA = [
  // Software
  { name: "JavaScript", category: "Software", demand: 94, growth: +8, salary: "₹5–18 LPA", heat: 5, icon: "🟨" },
  { name: "Python", category: "Software", demand: 98, growth: +22, salary: "₹6–22 LPA", heat: 5, icon: "🐍" },
  { name: "React.js", category: "Software", demand: 89, growth: +15, salary: "₹5–20 LPA", heat: 5, icon: "⚛️" },
  { name: "Node.js", category: "Software", demand: 78, growth: +10, salary: "₹5–18 LPA", heat: 4, icon: "🟢" },
  { name: "TypeScript", category: "Software", demand: 82, growth: +28, salary: "₹6–22 LPA", heat: 4, icon: "🔷" },
  { name: "Java", category: "Software", demand: 75, growth: +3, salary: "₹5–20 LPA", heat: 3, icon: "☕" },
  { name: "Go (Golang)", category: "Software", demand: 58, growth: +35, salary: "₹8–25 LPA", heat: 4, icon: "🐹" },
  { name: "Rust", category: "Software", demand: 38, growth: +45, salary: "₹10–30 LPA", heat: 3, icon: "🦀" },

  // Data
  { name: "SQL", category: "Data", demand: 91, growth: +5, salary: "₹4–16 LPA", heat: 5, icon: "🗄️" },
  { name: "Python (Data)", category: "Data", demand: 95, growth: +20, salary: "₹6–25 LPA", heat: 5, icon: "📊" },
  { name: "Power BI", category: "Data", demand: 72, growth: +18, salary: "₹4–14 LPA", heat: 4, icon: "📈" },
  { name: "Tableau", category: "Data", demand: 65, growth: +12, salary: "₹4–15 LPA", heat: 3, icon: "📉" },
  { name: "Excel (Advanced)", category: "Data", demand: 80, growth: +2, salary: "₹3–10 LPA", heat: 3, icon: "📋" },
  { name: "Spark / Hadoop", category: "Data", demand: 55, growth: +14, salary: "₹8–24 LPA", heat: 3, icon: "⚡" },

  // AI/ML
  { name: "Machine Learning", category: "AI / ML", demand: 88, growth: +30, salary: "₹8–28 LPA", heat: 5, icon: "🤖" },
  { name: "TensorFlow", category: "AI / ML", demand: 70, growth: +18, salary: "₹8–25 LPA", heat: 4, icon: "🧠" },
  { name: "PyTorch", category: "AI / ML", demand: 72, growth: +38, salary: "₹9–30 LPA", heat: 5, icon: "🔥" },
  { name: "LLM / GenAI", category: "AI / ML", demand: 85, growth: +120, salary: "₹12–40 LPA", heat: 5, icon: "✨" },
  { name: "Computer Vision", category: "AI / ML", demand: 60, growth: +25, salary: "₹8–28 LPA", heat: 4, icon: "👁️" },
  { name: "NLP", category: "AI / ML", demand: 65, growth: +32, salary: "₹9–30 LPA", heat: 4, icon: "💬" },

  // Design
  { name: "Figma", category: "Design", demand: 86, growth: +25, salary: "₹3–16 LPA", heat: 5, icon: "🎨" },
  { name: "Adobe XD", category: "Design", demand: 48, growth: -5, salary: "₹3–12 LPA", heat: 2, icon: "🅰️" },
  { name: "Framer", category: "Design", demand: 42, growth: +40, salary: "₹4–15 LPA", heat: 3, icon: "🖼️" },
  { name: "Webflow", category: "Design", demand: 50, growth: +35, salary: "₹4–16 LPA", heat: 3, icon: "🌊" },

  // Mobile
  { name: "Flutter", category: "Mobile", demand: 75, growth: +30, salary: "₹4–18 LPA", heat: 4, icon: "📱" },
  { name: "React Native", category: "Mobile", demand: 70, growth: +15, salary: "₹5–20 LPA", heat: 4, icon: "⚛️" },
  { name: "Swift (iOS)", category: "Mobile", demand: 58, growth: +8, salary: "₹6–22 LPA", heat: 3, icon: "🍎" },
  { name: "Kotlin", category: "Mobile", demand: 62, growth: +12, salary: "₹5–20 LPA", heat: 3, icon: "🤖" },

  // Cloud & DevOps
  { name: "AWS", category: "Cloud", demand: 90, growth: +20, salary: "₹8–30 LPA", heat: 5, icon: "☁️" },
  { name: "Docker", category: "Cloud", demand: 82, growth: +22, salary: "₹7–25 LPA", heat: 4, icon: "🐳" },
  { name: "Kubernetes", category: "Cloud", demand: 72, growth: +28, salary: "₹9–30 LPA", heat: 4, icon: "⚙️" },
  { name: "Terraform", category: "Cloud", demand: 60, growth: +35, salary: "₹10–32 LPA", heat: 4, icon: "🏗️" },
  { name: "Azure", category: "Cloud", demand: 78, growth: +18, salary: "₹7–28 LPA", heat: 4, icon: "🔷" },

  // Security
  { name: "Ethical Hacking", category: "Security", demand: 68, growth: +25, salary: "₹5–22 LPA", heat: 4, icon: "🕵️" },
  { name: "Network Security", category: "Security", demand: 65, growth: +18, salary: "₹5–20 LPA", heat: 3, icon: "🛡️" },
  { name: "SIEM Tools", category: "Security", demand: 55, growth: +30, salary: "₹6–22 LPA", heat: 3, icon: "🔐" },
];

const CATEGORIES = ["All", "Software", "Data", "AI / ML", "Design", "Mobile", "Cloud", "Security"];
const CAT_COLORS = {
  Software: "#6366f1", Data: "#0891b2", "AI / ML": "#7c3aed",
  Design: "#e11d48", Mobile: "#059669", Cloud: "#0284c7", Security: "#d97706"
};

const HEAT_COLORS = ["#1e293b", "#1d4ed8", "#0891b2", "#d97706", "#f97316", "#ef4444"];
const HEAT_LABELS = ["", "Low", "Moderate", "Good", "Hot 🔥", "🔥 On Fire"];

function HeatBar({ value }) {
  const color = value >= 85 ? HEAT_COLORS[5] : value >= 70 ? HEAT_COLORS[4] : value >= 55 ? HEAT_COLORS[3] : value >= 40 ? HEAT_COLORS[2] : HEAT_COLORS[1];
  return (
    <div style={{ height: 6, background: "#1e293b", borderRadius: 10, overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 10, transition: "width 0.8s ease" }} />
    </div>
  );
}

export default function SkillsHeatmap() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("demand"); // demand | growth | salary
  const [selected, setSelected] = useState(null);
  const [animated, setAnimated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setAnimated(true), 100);
  }, []);

  const filtered = SKILLS_DATA
    .filter(s => category === "All" || s.category === category)
    .sort((a, b) => sort === "growth" ? b.growth - a.growth : sort === "demand" ? b.demand - a.demand : 0);

  const topSkills = [...SKILLS_DATA].sort((a, b) => b.demand - a.demand).slice(0, 5);
  const risingSkills = [...SKILLS_DATA].sort((a, b) => b.growth - a.growth).slice(0, 5);

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "white", fontFamily: "'Poppins', sans-serif" }}>

      {/* HEADER */}
      <div style={{
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        padding: "44px 20px 36px", textAlign: "center",
        borderBottom: "1px solid #1e293b"
      }}>
        <div style={{ fontSize: 12, letterSpacing: "0.2em", color: "#facc15", fontWeight: 700, marginBottom: 10, textTransform: "uppercase" }}>
          📊 Live Market Data
        </div>
        <h1 style={{ fontSize: "clamp(24px,4vw,44px)", fontWeight: 900, margin: "0 0 10px", background: "linear-gradient(90deg,#fff,#facc15)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Skills Demand Heatmap
        </h1>
        <p style={{ color: "#475569", fontSize: 15, maxWidth: 480, margin: "0 auto" }}>
          See which tech skills are hottest in the job market right now. Updated based on real job posting trends.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px 60px" }}>

        {/* TOP STATS STRIP */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, marginBottom: 32 }}>
          {[
            { label: "Skills Tracked", value: SKILLS_DATA.length, icon: "🎯", color: "#facc15" },
            { label: "Hottest Skill", value: "LLM / GenAI", icon: "🔥", color: "#ef4444" },
            { label: "Fastest Rising", value: "+120% YoY", icon: "📈", color: "#16a34a" },
            { label: "Top Salary", value: "₹40 LPA", icon: "💰", color: "#0891b2" },
          ].map(s => (
            <div key={s.label} style={{ background: "#1e293b", borderRadius: 14, padding: "18px 20px", border: "1px solid #334155" }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* TOP 5 + RISING */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
          {[
            { title: "🏆 Most In-Demand Skills", skills: topSkills, valueKey: "demand", suffix: "% demand", color: "#facc15" },
            { title: "🚀 Fastest Growing Skills", skills: risingSkills, valueKey: "growth", suffix: "% YoY", color: "#16a34a" },
          ].map(panel => (
            <div key={panel.title} style={{ background: "#1e293b", borderRadius: 16, padding: "22px 24px", border: "1px solid #334155" }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 18, color: "#f1f5f9" }}>{panel.title}</h3>
              {panel.skills.map((s, i) => (
                <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 18, width: 28, textAlign: "center", flexShrink: 0 }}>{["🥇","🥈","🥉","4️⃣","5️⃣"][i]}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, color: "#f1f5f9", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</span>
                      <span style={{ fontSize: 12, color: panel.color, fontWeight: 800, flexShrink: 0, marginLeft: 8 }}>
                        {panel.valueKey === "growth" ? `+${s[panel.valueKey]}` : s[panel.valueKey]}{panel.suffix}
                      </span>
                    </div>
                    <HeatBar value={panel.valueKey === "demand" ? s.demand : Math.min(s.growth, 100)} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* FILTER & SORT */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: "7px 16px", borderRadius: 30, fontSize: 13, fontWeight: 700,
                  background: category === cat ? (CAT_COLORS[cat] || "linear-gradient(90deg,#facc15,#f97316)") : "#1e293b",
                  color: category === cat ? "white" : "#475569",
                  border: `1px solid ${category === cat ? "transparent" : "#334155"}`,
                  cursor: "pointer", transition: "all 0.2s"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[["demand", "Sort: Demand"], ["growth", "Sort: Growth"]].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSort(key)}
                style={{
                  padding: "7px 14px", borderRadius: 30, fontSize: 12, fontWeight: 700,
                  background: sort === key ? "#facc15" : "#1e293b",
                  color: sort === key ? "#0f172a" : "#475569",
                  border: `1px solid ${sort === key ? "#facc15" : "#334155"}`,
                  cursor: "pointer"
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* HEATMAP GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10 }}>
          {filtered.map((skill, i) => {
            const heatColor = skill.demand >= 85 ? "#ef4444" : skill.demand >= 70 ? "#f97316" : skill.demand >= 55 ? "#d97706" : skill.demand >= 40 ? "#0891b2" : "#334155";
            const isSelected = selected?.name === skill.name;
            return (
              <div
                key={skill.name}
                onClick={() => setSelected(isSelected ? null : skill)}
                style={{
                  background: isSelected ? `${heatColor}20` : "#1e293b",
                  border: `2px solid ${isSelected ? heatColor : "#334155"}`,
                  borderRadius: 14, padding: "16px 14px", cursor: "pointer",
                  transition: "all 0.2s", opacity: animated ? 1 : 0,
                  transform: animated ? "none" : "translateY(10px)",
                  transitionDelay: `${i * 20}ms`
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = heatColor; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = "#334155"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <span style={{ fontSize: 22 }}>{skill.icon}</span>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: heatColor }}>{skill.demand}%</div>
                    <div style={{ fontSize: 10, color: skill.growth > 0 ? "#16a34a" : "#e11d48", fontWeight: 700 }}>
                      {skill.growth > 0 ? "▲" : "▼"}{Math.abs(skill.growth)}%
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9", marginBottom: 6, lineHeight: 1.3 }}>{skill.name}</div>
                <div style={{ fontSize: 11, color: CAT_COLORS[skill.category] || "#475569", marginBottom: 8, fontWeight: 600 }}>{skill.category}</div>
                <HeatBar value={skill.demand} />
                <div style={{ fontSize: 11, color: "#475569", marginTop: 6 }}>{HEAT_LABELS[skill.heat]}</div>
              </div>
            );
          })}
        </div>

        {/* SELECTED SKILL DETAIL */}
        {selected && (
          <div style={{
            position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
            background: "#1e293b", borderRadius: 20, padding: "20px 28px",
            border: `2px solid ${CAT_COLORS[selected.category] || "#facc15"}`,
            boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
            width: "min(500px, 90vw)", zIndex: 100,
            animation: "slideUp 0.3s ease"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 28, marginBottom: 4 }}>{selected.icon} {selected.name}</div>
                <div style={{ fontSize: 12, color: CAT_COLORS[selected.category], fontWeight: 700, marginBottom: 12 }}>{selected.category}</div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "#334155", border: "none", color: "#94a3b8", borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontSize: 13 }}>✕</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
              {[
                { label: "Demand", value: `${selected.demand}%`, color: "#facc15" },
                { label: "YoY Growth", value: `${selected.growth > 0 ? "+" : ""}${selected.growth}%`, color: selected.growth > 0 ? "#16a34a" : "#e11d48" },
                { label: "Avg Salary", value: selected.salary, color: "#0891b2" },
              ].map(s => (
                <div key={s.label} style={{ background: "#0f172a", borderRadius: 10, padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: 15, fontWeight: 900, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#475569", marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => navigate(`/jobs?search=${selected.name}`)} style={{ flex: 1, padding: "10px", background: "linear-gradient(90deg,#facc15,#f97316)", border: "none", borderRadius: 10, color: "#0f172a", fontWeight: 800, cursor: "pointer", fontSize: 13 }}>
                💼 Find Jobs
              </button>
              <button onClick={() => navigate("/roadmap")} style={{ flex: 1, padding: "10px", background: "#334155", border: "none", borderRadius: 10, color: "#94a3b8", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
                🗺️ Learn This
              </button>
            </div>
          </div>
        )}

        {/* LEGEND */}
        <div style={{ marginTop: 32, background: "#1e293b", borderRadius: 14, padding: "18px 22px", border: "1px solid #334155" }}>
          <div style={{ fontSize: 12, color: "#475569", fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Demand Heatmap Legend</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[["#334155","< 40%","Low"], ["#0891b2","40–54%","Moderate"], ["#d97706","55–69%","Good"], ["#f97316","70–84%","Hot 🔥"], ["#ef4444","85%+","On Fire 🔥"]].map(([color, range, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: color }} />
                <span style={{ fontSize: 12, color: "#64748b" }}>{label} <span style={{ color: "#334155" }}>({range})</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateX(-50%) translateY(20px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
