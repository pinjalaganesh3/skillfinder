import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GOALS = [
  { id: "job",      icon: "💼", title: "Get my first tech job",       desc: "I want to land a job as quickly as possible" },
  { id: "study",    icon: "📚", title: "Learn while I'm still studying", desc: "I'm in college and want to prepare early" },
  { id: "switch",   icon: "🔄", title: "Switch to a tech career",      desc: "I'm from a non-tech background" },
  { id: "improve",  icon: "📈", title: "Grow in my current field",     desc: "I already work in tech but want to level up" },
];

const CAREERS = [
  { id: "software",  icon: "💻", label: "Software Developer",  salary: "₹4–20 LPA" },
  { id: "data",      icon: "📊", label: "Data Analyst",         salary: "₹3–16 LPA" },
  { id: "design",    icon: "🎨", label: "UI/UX Designer",       salary: "₹3–16 LPA" },
  { id: "mobile",    icon: "📱", label: "Mobile Developer",     salary: "₹4–18 LPA" },
  { id: "ai",        icon: "🤖", label: "AI/ML Engineer",       salary: "₹8–40 LPA" },
  { id: "security",  icon: "🔐", label: "Cybersecurity",        salary: "₹4–22 LPA" },
  { id: "cloud",     icon: "☁️", label: "Cloud/DevOps",         salary: "₹7–30 LPA" },
  { id: "notsure",   icon: "🤷", label: "Not sure yet",         salary: "Take the quiz!" },
];

const STEPS = [
  { title: "Welcome!", sub: "Let's set you up in 1 minute" },
  { title: "What's your goal?", sub: "Tell us why you're here" },
  { title: "Which career interests you?", sub: "You can always change this later" },
  { title: "You're all set! 🎉", sub: "Here's your personalised plan" },
];

export default function Onboarding() {
  const [step,   setStep]   = useState(0);
  const [goal,   setGoal]   = useState(null);
  const [career, setCareer] = useState(null);
  const navigate = useNavigate();
  const name = localStorage.getItem("userName") || "there";

  const finish = () => {
    localStorage.setItem("onboardingDone",  "true");
    localStorage.setItem("selectedCareer",  career || "");
    localStorage.setItem("selectedGoal",    goal   || "");
    navigate("/home");
  };

  const progressPct = (step / 3) * 100;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 560 }}>

        {/* Progress bar */}
        {step > 0 && step < 3 && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: "#475569" }}>Step {step} of 2</span>
              <span style={{ fontSize: 12, color: "#f59e0b", fontWeight: 700 }}>{Math.round(progressPct)}%</span>
            </div>
            <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ width: `${progressPct}%`, height: "100%", background: "linear-gradient(90deg,#f59e0b,#f97316)", borderRadius: 10, transition: "width 0.4s ease" }} />
            </div>
          </div>
        )}

        {/* ── STEP 0: Welcome ── */}
        {step === 0 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
            <div className="badge" style={{ marginBottom: 16 }}>Account Created!</div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(24px,4vw,38px)", fontWeight: 800, marginBottom: 14, lineHeight: 1.2 }}>
              Welcome to SkillFinder,<br />
              <span style={{ background: "linear-gradient(90deg,#f59e0b,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {name}! 🚀
              </span>
            </h1>
            <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.8, marginBottom: 12, maxWidth: 420, margin: "0 auto 12px" }}>
              You just made the best decision for your career! Let's take 60 seconds to set up your personal career plan.
            </p>
            <p style={{ color: "#334155", fontSize: 13, marginBottom: 32 }}>
              ✅ Takes 1 minute &nbsp;·&nbsp; 🎯 Personalised just for you &nbsp;·&nbsp; ✏️ Can change anytime
            </p>
            <button onClick={() => setStep(1)} style={{ padding: "14px 40px", fontSize: 16, borderRadius: 12 }}>
              Let's Go! →
            </button>
            <p style={{ marginTop: 14 }}>
              <span onClick={finish} style={{ fontSize: 13, color: "#334155", cursor: "pointer", textDecoration: "underline" }}>
                Skip for now
              </span>
            </p>
          </div>
        )}

        {/* ── STEP 1: Goal ── */}
        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(20px,3.5vw,28px)", fontWeight: 800, marginBottom: 8 }}>
              What's your main goal right now?
            </h2>
            <p style={{ color: "#475569", fontSize: 14, marginBottom: 24 }}>
              This helps us show you the most relevant tools and jobs 👇
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {GOALS.map(g => (
                <div key={g.id} onClick={() => setGoal(g.id)}
                  style={{ padding: "16px 18px", borderRadius: 14, border: `2px solid ${goal === g.id ? "#f59e0b" : "rgba(255,255,255,0.08)"}`, background: goal === g.id ? "rgba(245,158,11,0.08)" : "rgba(255,255,255,0.03)", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 14 }}
                >
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{g.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: goal === g.id ? "#f59e0b" : "#f1f5f9", marginBottom: 3 }}>{g.title}</div>
                    <div style={{ fontSize: 13, color: "#475569" }}>{g.desc}</div>
                  </div>
                  {goal === g.id && <span style={{ marginLeft: "auto", color: "#f59e0b", fontSize: 18 }}>✓</span>}
                </div>
              ))}
            </div>
            <button onClick={() => goal && setStep(2)} disabled={!goal}
              style={{ width: "100%", padding: "13px", fontSize: 15, borderRadius: 12, opacity: goal ? 1 : 0.4 }}>
              Continue →
            </button>
          </div>
        )}

        {/* ── STEP 2: Career Interest ── */}
        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(20px,3.5vw,28px)", fontWeight: 800, marginBottom: 8 }}>
              Which career field interests you?
            </h2>
            <p style={{ color: "#475569", fontSize: 14, marginBottom: 24 }}>
              Don't worry — this is just a starting point. You can explore all fields! 😊
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 10, marginBottom: 24 }}>
              {CAREERS.map(c => (
                <div key={c.id} onClick={() => setCareer(c.id)}
                  style={{ padding: "16px", borderRadius: 14, border: `2px solid ${career === c.id ? "#f59e0b" : "rgba(255,255,255,0.08)"}`, background: career === c.id ? "rgba(245,158,11,0.08)" : "rgba(255,255,255,0.03)", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 12 }}
                >
                  <span style={{ fontSize: 24 }}>{c.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: career === c.id ? "#f59e0b" : "#f1f5f9" }}>{c.label}</div>
                    <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{c.salary}</div>
                  </div>
                  {career === c.id && <span style={{ color: "#f59e0b" }}>✓</span>}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: "12px", fontSize: 14, background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)" }}>
                ← Back
              </button>
              <button onClick={() => career && setStep(3)} disabled={!career}
                style={{ flex: 2, padding: "12px", fontSize: 14, borderRadius: 12, opacity: career ? 1 : 0.4 }}>
                Almost Done →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Done ── */}
        {step === 3 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎯</div>
            <div className="badge" style={{ marginBottom: 14 }}>You're all set!</div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(22px,4vw,34px)", fontWeight: 800, marginBottom: 14 }}>
              Your Career Plan is Ready! 🚀
            </h2>
            <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.75, marginBottom: 28, maxWidth: 400, margin: "0 auto 28px" }}>
              Based on your answers, here's exactly what to do next:
            </p>

            {/* Personalised next steps */}
            <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 16, padding: "20px 24px", marginBottom: 24, textAlign: "left" }}>
              {[
                { icon: "1️⃣", text: career === "notsure" ? "Take the Career Quiz to find your perfect path" : `Explore the ${CAREERS.find(c=>c.id===career)?.label} career guide` },
                { icon: "2️⃣", text: "Follow your step-by-step learning roadmap" },
                { icon: "3️⃣", text: "Practice mock interviews to get job-ready" },
                { icon: "4️⃣", text: "Search and save jobs to apply when ready" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12, fontSize: 14, color: "#94a3b8" }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{s.icon}</span>
                  <span>{s.text}</span>
                </div>
              ))}
            </div>

            <button onClick={finish} style={{ width: "100%", padding: "14px", fontSize: 15, borderRadius: 12 }}>
              🚀 Go to My Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
