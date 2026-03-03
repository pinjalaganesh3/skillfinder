import { useState, useRef, useEffect } from "react";

const ROLES = [
  { id: "frontend", label: "💻 Frontend Developer", color: "#6366f1",
    questions: [
      "Explain the difference between var, let, and const in JavaScript.",
      "What is the virtual DOM in React and why does it improve performance?",
      "How does CSS Flexbox differ from CSS Grid? When would you use each?",
      "What are React hooks? Name 3 hooks and explain what they do.",
      "Explain what an API is and how you would fetch data from one in React.",
    ]},
  { id: "data", label: "📊 Data Analyst", color: "#0891b2",
    questions: [
      "What is the difference between a LEFT JOIN and an INNER JOIN in SQL?",
      "Explain what a normal distribution is and why it matters in data analysis.",
      "What steps would you take to clean a dataset that has missing values?",
      "What is the difference between supervised and unsupervised machine learning?",
      "How would you explain a complex data insight to a non-technical manager?",
    ]},
  { id: "design", label: "🎨 UI/UX Designer", color: "#e11d48",
    questions: [
      "What is the difference between UI and UX? Give an example of each.",
      "Walk me through your design process from brief to final product.",
      "How do you handle negative feedback on a design you worked hard on?",
      "What is a user persona and how does it influence design decisions?",
      "Explain the concept of visual hierarchy and how you apply it in your work.",
    ]},
  { id: "mobile", label: "📱 Mobile Developer", color: "#059669",
    questions: [
      "What is the difference between Flutter and React Native?",
      "Explain the widget tree concept in Flutter.",
      "What is state management and why is it important in mobile apps?",
      "How do you handle API calls and loading states in a mobile app?",
      "What are the key differences between Android and iOS development?",
    ]},
];

const TIME_LIMIT = 120;

function scoreAnswer(answer) {
  const words = answer.trim().split(/\s+/).filter(Boolean).length;
  const hasExample = /example|instance|like|such as|for instance/i.test(answer);
  const hasExplain = /because|therefore|which means|this means|so that/i.test(answer);
  const clarity    = words >= 40 ? 3 : words >= 20 ? 2 : 1;
  const depth      = hasExplain ? 3 : 2;
  const examples   = hasExample ? 3 : 1;
  const overall    = Math.round((clarity + depth + examples) / 3 * 10) / 10;
  return {
    clarity,
    depth,
    examples,
    overall,
    feedback:
      words < 20   ? "Too short! Try to explain in more detail — at least 3–4 sentences." :
      !hasExample  ? "Good start! Try adding a real example to make your answer stronger." :
      !hasExplain  ? "Nice! Add a reason or explanation to show deeper understanding." :
                     "Great answer! Clear, detailed, and well-explained. 🌟",
  };
}

export default function MockInterview() {
  const [stage,    setStage]    = useState("intro");   // intro | role | interview | result
  const [role,     setRole]     = useState(null);
  const [qIndex,   setQIndex]   = useState(0);
  const [answer,   setAnswer]   = useState("");
  const [answers,  setAnswers]  = useState([]);
  const [scores,   setScores]   = useState([]);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const timerRef = useRef(null);

  useEffect(() => {
    if (stage === "interview") {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { handleNext(true); return TIME_LIMIT; }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [stage, qIndex]);

  const handleNext = (auto = false) => {
    clearInterval(timerRef.current);
    const finalAnswer = auto ? answer || "(No answer given)" : answer || "(No answer given)";
    const score = scoreAnswer(finalAnswer);
    const newScores  = [...scores, score];
    const newAnswers = [...answers, { q: role.questions[qIndex], a: finalAnswer, score }];
    if (qIndex < role.questions.length - 1) {
      setScores(newScores);
      setAnswers(newAnswers);
      setQIndex(qIndex + 1);
      setAnswer("");
      setTimeLeft(TIME_LIMIT);
    } else {
      setScores(newScores);
      setAnswers(newAnswers);
      setStage("result");
    }
  };

  const avgScore = scores.length ? (scores.reduce((a, b) => a + b.overall, 0) / scores.length).toFixed(1) : 0;
  const timerColor = timeLeft <= 30 ? "#ef4444" : timeLeft <= 60 ? "#f59e0b" : "#4ade80";

  // ── INTRO ──
  if (stage === "intro") {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ maxWidth: 540, textAlign: "center" }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>🤖</div>
          <div className="badge" style={{ marginBottom: 14 }}>AI Mock Interview</div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(22px,4vw,36px)", fontWeight: 800, marginBottom: 14, lineHeight: 1.2 }}>
            Practice Real Interview Questions
          </h1>
          <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.75, marginBottom: 28, maxWidth: 420, margin: "0 auto 28px" }}>
            Pick a job role, answer 5 real interview questions, and get instant AI feedback on your answers. Practice as many times as you want!
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "20px 22px", marginBottom: 28, textAlign: "left" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>How it works:</p>
            {["Choose your job role", "Answer 5 real interview questions", "You get 2 minutes per question", "AI scores your answer and gives feedback", "See your full results at the end"].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "#94a3b8" }}>
                <span style={{ color: "#f59e0b", fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                {s}
              </div>
            ))}
          </div>

          <button onClick={() => setStage("role")} style={{ padding: "13px 36px", fontSize: 15, borderRadius: 12 }}>
            Choose a Role to Start →
          </button>
        </div>
      </div>
    );
  }

  // ── ROLE SELECT ──
  if (stage === "role") {
    return (
      <div style={{ maxWidth: 640, margin: "60px auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(20px,3.5vw,30px)", fontWeight: 800, marginBottom: 8 }}>
            Which role are you interviewing for?
          </h2>
          <p style={{ color: "#475569", fontSize: 14 }}>Pick the one closest to your goal — you can always come back and try others.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 12 }}>
          {ROLES.map(r => (
            <div
              key={r.id}
              onClick={() => { setRole(r); setStage("interview"); setQIndex(0); setAnswer(""); setAnswers([]); setScores([]); setTimeLeft(TIME_LIMIT); }}
              style={{ padding: "20px 22px", borderRadius: 14, border: `1px solid ${r.color}30`, background: `${r.color}08`, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = r.color; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${r.color}30`; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{r.label.split(" ")[0]}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#f1f5f9", marginBottom: 4 }}>{r.label.slice(r.label.indexOf(" ") + 1)}</div>
              <div style={{ fontSize: 12, color: "#475569" }}>5 questions · 2 min each</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <span onClick={() => setStage("intro")} style={{ fontSize: 13, color: "#475569", cursor: "pointer" }}>← Back</span>
        </div>
      </div>
    );
  }

  // ── INTERVIEW ──
  if (stage === "interview") {
    const progress = ((qIndex) / role.questions.length) * 100;
    const mins = Math.floor(timeLeft / 60);
    const secs = String(timeLeft % 60).padStart(2, "0");
    return (
      <div style={{ maxWidth: 680, margin: "40px auto", padding: "0 20px" }}>

        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>Question {qIndex + 1} / {role.questions.length}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: `${timerColor}15`, border: `1px solid ${timerColor}40`, borderRadius: 30, padding: "5px 14px" }}>
            <span style={{ fontSize: 14 }}>⏱️</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: timerColor, fontFamily: "monospace" }}>{mins}:{secs}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 10, marginBottom: 28, overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg,#f59e0b,#f97316)", borderRadius: 10, transition: "width 0.4s" }} />
        </div>

        {/* Role badge */}
        <div style={{ fontSize: 12, color: "#475569", fontWeight: 600, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: role.color }}>●</span> {role.label}
        </div>

        {/* Question */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "20px 22px", marginBottom: 20 }}>
          <p style={{ fontSize: 12, color: "#475569", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Question:</p>
          <p style={{ fontSize: 17, fontWeight: 600, color: "#f1f5f9", lineHeight: 1.6 }}>{role.questions[qIndex]}</p>
        </div>

        {/* Answer box */}
        <p style={{ fontSize: 12, color: "#475569", marginBottom: 8 }}>💡 Tip: Aim for 3–5 sentences. Use examples to score higher.</p>
        <textarea
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          rows={6}
          style={{ width: "100%", resize: "vertical", fontFamily: "'Inter',sans-serif", padding: "14px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#f1f5f9", fontSize: 14, lineHeight: 1.7, outline: "none", marginBottom: 14 }}
          onFocus={e => e.target.style.borderColor = "#f59e0b"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#334155" }}>{answer.trim().split(/\s+/).filter(Boolean).length} words</span>
          <button onClick={() => handleNext()} disabled={!answer.trim()} style={{ padding: "11px 28px", fontSize: 14, borderRadius: 12 }}>
            {qIndex < role.questions.length - 1 ? "Next Question →" : "Finish Interview →"}
          </button>
        </div>
      </div>
    );
  }

  // ── RESULT ──
  return (
    <div style={{ maxWidth: 680, margin: "40px auto", padding: "0 20px 60px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 54, marginBottom: 12 }}>
          {avgScore >= 2.5 ? "🌟" : avgScore >= 1.8 ? "👍" : "💪"}
        </div>
        <div className="badge" style={{ marginBottom: 12 }}>Interview Complete</div>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(22px,3.5vw,32px)", fontWeight: 800, marginBottom: 8 }}>
          Your Score: <span style={{ color: avgScore >= 2.5 ? "#4ade80" : avgScore >= 1.8 ? "#f59e0b" : "#f97316" }}>{avgScore} / 3.0</span>
        </h2>
        <p style={{ color: "#64748b", fontSize: 14 }}>
          {avgScore >= 2.5 ? "Excellent performance! You're interview-ready 🎉" :
           avgScore >= 1.8 ? "Good effort! Practice a bit more and you'll nail it." :
           "Keep practicing! Review the tips below to improve."}
        </p>
      </div>

      {/* Per-question breakdown */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
        {answers.map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "18px 20px" }}>
            <p style={{ fontSize: 12, color: "#475569", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>Q{i + 1}</p>
            <p style={{ fontSize: 14, color: "#94a3b8", marginBottom: 12, lineHeight: 1.6 }}>{item.q}</p>

            {/* Score bars */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
              {[["Clarity", item.score.clarity], ["Depth", item.score.depth], ["Examples", item.score.examples]].map(([label, val]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: val >= 3 ? "#4ade80" : val >= 2 ? "#f59e0b" : "#f97316" }}>{val}/3</div>
                  <div style={{ fontSize: 11, color: "#475569" }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Feedback */}
            <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#94a3b8" }}>
              💡 {item.score.feedback}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => { setStage("role"); setAnswers([]); setScores([]); }} style={{ flex: 1, padding: "12px", fontSize: 14 }}>
          🔄 Try Again
        </button>
        <button onClick={() => setStage("intro")} style={{ flex: 1, padding: "12px", fontSize: 14, background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)" }}>
          ← Back to Start
        </button>
      </div>
    </div>
  );
}
