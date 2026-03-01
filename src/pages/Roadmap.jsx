import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ROADMAPS = {
  software: {
    title: "💻 Software Developer",
    color: "#6366f1",
    gradient: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    duration: "6–12 months to first job",
    phases: [
      {
        phase: "Phase 1", title: "Foundation", duration: "4–6 weeks",
        items: [
          { done: false, text: "Learn how computers & the internet work (basics)" },
          { done: false, text: "Choose a language: Python (easier) or JavaScript (web)" },
          { done: false, text: "Practice: variables, loops, functions, conditionals" },
          { done: false, text: "Complete FreeCodeCamp or CS50 (free online)" },
        ]
      },
      {
        phase: "Phase 2", title: "Core Skills", duration: "6–8 weeks",
        items: [
          { done: false, text: "Data structures: arrays, objects, lists" },
          { done: false, text: "Git & GitHub — version control is essential" },
          { done: false, text: "Build 3 small projects (calculator, todo app, quiz)" },
          { done: false, text: "Learn HTML & CSS for web (if doing frontend)" },
        ]
      },
      {
        phase: "Phase 3", title: "Frameworks", duration: "8–10 weeks",
        items: [
          { done: false, text: "Frontend: Learn React.js — industry standard" },
          { done: false, text: "Backend: Learn Node.js or Django (Python)" },
          { done: false, text: "Learn REST APIs — how apps communicate" },
          { done: false, text: "Build a full-stack project (frontend + backend)" },
        ]
      },
      {
        phase: "Phase 4", title: "Job Ready", duration: "4–6 weeks",
        items: [
          { done: false, text: "Deploy your projects (Netlify, Vercel, Render — free)" },
          { done: false, text: "Build a GitHub portfolio with 3–5 good projects" },
          { done: false, text: "Write a clean resume (use Flowcv.io)" },
          { done: false, text: "Apply on LinkedIn, Internshala, Wellfound" },
        ]
      },
    ]
  },
  data: {
    title: "📊 Data Scientist",
    color: "#0891b2",
    gradient: "linear-gradient(135deg,#0891b2,#0284c7)",
    duration: "8–14 months to first job",
    phases: [
      {
        phase: "Phase 1", title: "Math & Python", duration: "6–8 weeks",
        items: [
          { done: false, text: "Statistics basics: mean, median, variance, probability" },
          { done: false, text: "Learn Python: pandas, NumPy, matplotlib" },
          { done: false, text: "Practice SQL for data querying" },
          { done: false, text: "Do Google's free Data Analytics Certificate" },
        ]
      },
      {
        phase: "Phase 2", title: "Data Analysis", duration: "6–8 weeks",
        items: [
          { done: false, text: "EDA (Exploratory Data Analysis) on real datasets" },
          { done: false, text: "Data visualization with Seaborn, Plotly" },
          { done: false, text: "Dashboards with Tableau or Power BI (free tier)" },
          { done: false, text: "Work on 2 Kaggle datasets" },
        ]
      },
      {
        phase: "Phase 3", title: "Machine Learning", duration: "8–12 weeks",
        items: [
          { done: false, text: "Learn scikit-learn: regression, classification, clustering" },
          { done: false, text: "Model evaluation: accuracy, confusion matrix, F1" },
          { done: false, text: "Build an end-to-end ML project" },
          { done: false, text: "Participate in a Kaggle competition" },
        ]
      },
      {
        phase: "Phase 4", title: "Job Ready", duration: "4–6 weeks",
        items: [
          { done: false, text: "Create a Kaggle or GitHub portfolio of 3+ projects" },
          { done: false, text: "Write a data-focused resume with project metrics" },
          { done: false, text: "Apply on Naukri, LinkedIn, Analytics Vidhya Jobs" },
          { done: false, text: "Prepare for SQL & stats interview questions" },
        ]
      },
    ]
  },
  design: {
    title: "🎨 UI/UX Designer",
    color: "#e11d48",
    gradient: "linear-gradient(135deg,#e11d48,#db2777)",
    duration: "5–9 months to first job",
    phases: [
      {
        phase: "Phase 1", title: "Design Basics", duration: "4–6 weeks",
        items: [
          { done: false, text: "Learn color theory, typography, layout grids" },
          { done: false, text: "Study 10 well-designed apps — analyze why they work" },
          { done: false, text: "Install Figma (free) and do beginner tutorials" },
          { done: false, text: "Complete Google UX Design Certificate (Coursera)" },
        ]
      },
      {
        phase: "Phase 2", title: "Figma Mastery", duration: "6–8 weeks",
        items: [
          { done: false, text: "Components, variants, auto layout in Figma" },
          { done: false, text: "Create wireframes for 2 app concepts" },
          { done: false, text: "Learn interactive prototyping in Figma" },
          { done: false, text: "Study Material Design & Apple HIG guidelines" },
        ]
      },
      {
        phase: "Phase 3", title: "UX Research", duration: "4–6 weeks",
        items: [
          { done: false, text: "User personas, empathy mapping, user journeys" },
          { done: false, text: "Conduct 3 user interviews for a concept app" },
          { done: false, text: "A/B testing basics and usability testing" },
          { done: false, text: "Design a full redesign case study (existing app)" },
        ]
      },
      {
        phase: "Phase 4", title: "Job Ready", duration: "3–5 weeks",
        items: [
          { done: false, text: "Build Behance / Dribbble portfolio with 3 case studies" },
          { done: false, text: "Document your design process (not just the final UI)" },
          { done: false, text: "Apply on LinkedIn, Internshala, AngelList" },
          { done: false, text: "Prepare for portfolio presentation & design critique" },
        ]
      },
    ]
  },
};

export default function Roadmap() {
  const [selected, setSelected] = useState("software");
  const [checked, setChecked] = useState({});
  const navigate = useNavigate();

  const roadmap = ROADMAPS[selected];

  const toggleCheck = (phaseIdx, itemIdx) => {
    const key = `${selected}-${phaseIdx}-${itemIdx}`;
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalItems = roadmap.phases.reduce((acc, p) => acc + p.items.length, 0);
  const doneItems = roadmap.phases.reduce((acc, p, pi) =>
    acc + p.items.filter((_, ii) => checked[`${selected}-${pi}-${ii}`]).length, 0);
  const pct = Math.round((doneItems / totalItems) * 100);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#0f172a,#1e293b)", padding: "44px 20px 36px", textAlign: "center", color: "white" }}>
        <div style={{ fontSize: 13, letterSpacing: "0.15em", color: "#facc15", fontWeight: 700, marginBottom: 10, textTransform: "uppercase" }}>🗺️ Interactive Roadmap</div>
        <h1 style={{ fontSize: "clamp(24px,4vw,42px)", fontWeight: 800, margin: "0 0 10px" }}>Your Learning Roadmap</h1>
        <p style={{ color: "#94a3b8", fontSize: 15 }}>Check off tasks as you complete them and track your progress</p>
      </div>

      <div style={{ maxWidth: 800, margin: "30px auto 60px", padding: "0 20px" }}>
        {/* Field Selector */}
        <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
          {Object.entries(ROADMAPS).map(([key, r]) => (
            <button
              key={key}
              onClick={() => setSelected(key)}
              style={{
                padding: "10px 22px", borderRadius: 30,
                background: selected === key ? r.gradient : "white",
                color: selected === key ? "white" : "#475569",
                border: `2px solid ${selected === key ? "transparent" : "#e2e8f0"}`,
                cursor: "pointer", fontWeight: 700, fontSize: 14,
                boxShadow: selected === key ? `0 4px 16px ${r.color}40` : "none",
                transition: "all 0.2s"
              }}
            >
              {r.title}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div style={{ background: "white", borderRadius: 16, padding: "24px 28px", marginBottom: 24, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontWeight: 700, color: "#0f172a" }}>Overall Progress</span>
            <span style={{ fontWeight: 800, color: roadmap.color }}>{pct}% Complete</span>
          </div>
          <div style={{ height: 10, background: "#f1f5f9", borderRadius: 10 }}>
            <div style={{
              height: "100%", borderRadius: 10,
              background: roadmap.gradient,
              width: `${pct}%`, transition: "width 0.4s ease"
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ fontSize: 13, color: "#64748b" }}>{doneItems} of {totalItems} tasks done</span>
            <span style={{ fontSize: 13, color: "#64748b" }}>⏱ {roadmap.duration}</span>
          </div>
        </div>

        {/* Phases */}
        {roadmap.phases.map((phase, pi) => {
          const phaseDone = phase.items.filter((_, ii) => checked[`${selected}-${pi}-${ii}`]).length;
          return (
            <div key={pi} style={{ background: "white", borderRadius: 16, padding: "24px 28px", marginBottom: 16, boxShadow: "0 8px 24px rgba(0,0,0,0.07)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 12,
                    background: roadmap.gradient,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontWeight: 800, fontSize: 14, flexShrink: 0
                  }}>
                    {pi + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: roadmap.color, fontWeight: 700, letterSpacing: "0.1em" }}>{phase.phase}</div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: "#0f172a" }}>{phase.title}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, color: "#64748b" }}>⏱ {phase.duration}</span>
                  <span style={{
                    background: phaseDone === phase.items.length ? "#dcfce7" : "#f1f5f9",
                    color: phaseDone === phase.items.length ? "#16a34a" : "#64748b",
                    padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700
                  }}>
                    {phaseDone}/{phase.items.length}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {phase.items.map((item, ii) => {
                  const isChecked = checked[`${selected}-${pi}-${ii}`];
                  return (
                    <div
                      key={ii}
                      onClick={() => toggleCheck(pi, ii)}
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "12px 16px", borderRadius: 10, cursor: "pointer",
                        background: isChecked ? "#f0fdf4" : "#f8fafc",
                        border: `1px solid ${isChecked ? "#86efac" : "#e2e8f0"}`,
                        transition: "all 0.2s"
                      }}
                    >
                      <div style={{
                        width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                        background: isChecked ? roadmap.gradient : "white",
                        border: `2px solid ${isChecked ? roadmap.color : "#cbd5e1"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 13, color: "white", fontWeight: 800
                      }}>
                        {isChecked ? "✓" : ""}
                      </div>
                      <span style={{
                        fontSize: 14, color: isChecked ? "#16a34a" : "#334155",
                        textDecoration: isChecked ? "line-through" : "none",
                        fontWeight: isChecked ? 400 : 500
                      }}>
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {pct === 100 && (
          <div style={{ background: "linear-gradient(135deg,#facc15,#f97316)", borderRadius: 16, padding: "30px", textAlign: "center", color: "#1e293b" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Roadmap Complete!</h3>
            <p style={{ fontSize: 15, marginBottom: 20 }}>Amazing work! You're now ready to start applying for jobs.</p>
            <button onClick={() => navigate(`/jobs?search=${selected}`)} style={{ background: "#0f172a", color: "white", border: "none" }}>
              Find Jobs Now →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
