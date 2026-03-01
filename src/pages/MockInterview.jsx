import { useState, useRef, useEffect } from "react";

const ROLES = [
  {
    id: "frontend",
    label: "💻 Frontend Developer",
    color: "#6366f1",
    questions: [
      "Explain the difference between var, let, and const in JavaScript.",
      "What is the virtual DOM in React and why does it improve performance?",
      "How does CSS Flexbox differ from CSS Grid? When would you use each?",
      "What are React hooks? Name 3 hooks and explain what they do.",
      "Explain what an API is and how you would fetch data from one in React.",
    ],
  },
  {
    id: "data",
    label: "📊 Data Analyst",
    color: "#0891b2",
    questions: [
      "What is the difference between a LEFT JOIN and an INNER JOIN in SQL?",
      "Explain what a normal distribution is and why it matters in data analysis.",
      "What steps would you take to clean a dataset that has missing values?",
      "What is the difference between supervised and unsupervised machine learning?",
      "How would you explain a complex data insight to a non-technical manager?",
    ],
  },
  {
    id: "design",
    label: "🎨 UI/UX Designer",
    color: "#e11d48",
    questions: [
      "What is the difference between UI and UX? Give an example of each.",
      "Walk me through your design process from brief to final product.",
      "How do you handle negative feedback on a design you worked hard on?",
      "What is a user persona and how does it influence design decisions?",
      "Explain the concept of visual hierarchy and how you apply it in your work.",
    ],
  },
  {
    id: "mobile",
    label: "📱 Mobile Developer",
    color: "#059669",
    questions: [
      "What are the key differences between Flutter and React Native?",
      "Explain the widget tree concept in Flutter.",
      "How do you handle state management in a mobile app?",
      "What strategies do you use to optimize mobile app performance?",
      "How do you test your mobile app before publishing to the app store?",
    ],
  },
  {
    id: "cyber",
    label: "🔐 Cybersecurity",
    color: "#d97706",
    questions: [
      "What is the difference between authentication and authorization?",
      "Explain what SQL injection is and how to prevent it.",
      "What is a firewall and how does it protect a network?",
      "Describe the difference between symmetric and asymmetric encryption.",
      "What steps would you take if you discovered a data breach at your company?",
    ],
  },
];

const CRITERIA = [
  { key: "relevance", label: "Relevance", desc: "Did you actually answer the question?" },
  { key: "clarity", label: "Clarity", desc: "Was your answer easy to understand?" },
  { key: "depth", label: "Depth", desc: "Did you go beyond surface-level?" },
  { key: "confidence", label: "Confidence", desc: "Did you sound sure of yourself?" },
];

function scoreAnswer(answer, question) {
  const words = answer.trim().split(/\s+/).filter(Boolean);
  const len = words.length;

  // Heuristic scoring — realistic, not always perfect
  let relevance = 40;
  let clarity = 40;
  let depth = 40;
  let confidence = 40;

  // Length scoring
  if (len >= 60) { relevance += 25; depth += 25; }
  else if (len >= 35) { relevance += 15; depth += 10; }
  else if (len >= 15) { relevance += 5; }

  // Technical keyword bonus based on role
  const qLower = question.toLowerCase();
  const aLower = answer.toLowerCase();
  const techWords = ["because","however","for example","such as","means","allows","used to","difference","important","when","how","why","instead","better","performance","efficient"];
  const matchCount = techWords.filter(w => aLower.includes(w)).length;
  clarity += Math.min(matchCount * 4, 20);
  confidence += Math.min(matchCount * 2, 15);

  // Sentence structure bonus
  const sentences = answer.split(/[.!?]+/).filter(s => s.trim().length > 5);
  if (sentences.length >= 3) { clarity += 10; depth += 5; }
  if (sentences.length >= 5) { depth += 10; }

  // Specific answer check
  if (aLower.includes("example") || aLower.includes("instance") || aLower.includes("like")) {
    depth += 10; clarity += 5;
  }

  // Cap at 100
  relevance = Math.min(relevance, 100);
  clarity = Math.min(clarity, 100);
  depth = Math.min(depth, 100);
  confidence = Math.min(confidence, 100);

  const overall = Math.round((relevance + clarity + depth + confidence) / 4);

  // Generate feedback
  const feedbacks = [];
  if (len < 20) feedbacks.push("⚠️ Your answer is too short. In a real interview, elaborate more — aim for at least 3–4 sentences.");
  if (len >= 20 && len < 40) feedbacks.push("💡 Good start, but add a specific example or use case to strengthen your answer.");
  if (len >= 40) feedbacks.push("✅ Good length! You gave a detailed response.");
  if (!aLower.includes("example") && !aLower.includes("like") && !aLower.includes("such as")) {
    feedbacks.push("💡 Tip: Always back up your answer with a real-world example — it impresses interviewers.");
  }
  if (aLower.includes("i think") || aLower.includes("i believe") || aLower.includes("maybe")) {
    feedbacks.push("⚠️ Avoid phrases like 'I think' or 'maybe' — speak with confidence even if uncertain.");
  }
  if (sentences.length >= 3) feedbacks.push("✅ Well-structured answer with multiple points.");
  if (overall >= 80) feedbacks.push("🌟 Excellent answer! You'd likely pass this question in a real interview.");
  else if (overall >= 60) feedbacks.push("👍 Solid answer. With a bit more detail you'd nail it.");
  else feedbacks.push("📚 This needs more work. Practice explaining this concept out loud until it feels natural.");

  return { relevance, clarity, depth, confidence, overall, feedbacks };
}

export default function MockInterview() {
  const [phase, setPhase] = useState("select"); // select | briefing | interview | result
  const [role, setRole] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [scores, setScores] = useState([]);
  const [currentScore, setCurrentScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120);
  const [timerActive, setTimerActive] = useState(false);
  const [allFeedback, setAllFeedback] = useState([]);
  const timerRef = useRef(null);
  const textareaRef = useRef(null);

  const selectedRole = ROLES.find(r => r.id === role);
  const currentQ = selectedRole?.questions[qIndex];
  const totalQ = selectedRole?.questions.length || 5;

  // Timer
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && timerActive) {
      handleSubmitAnswer();
    }
    return () => clearTimeout(timerRef.current);
  }, [timerActive, timeLeft]);

  const startInterview = () => {
    setQIndex(0);
    setScores([]);
    setAllFeedback([]);
    setAnswer("");
    setCurrentScore(null);
    setTimeLeft(120);
    setTimerActive(true);
    setPhase("interview");
  };

  const handleSubmitAnswer = () => {
    clearTimeout(timerRef.current);
    setTimerActive(false);
    const result = scoreAnswer(answer, currentQ);
    setCurrentScore(result);
    setScores(prev => [...prev, result.overall]);
    setAllFeedback(prev => [...prev, { q: currentQ, a: answer, ...result }]);
  };

  const handleNext = () => {
    if (qIndex + 1 >= totalQ) {
      setPhase("result");
    } else {
      setQIndex(i => i + 1);
      setAnswer("");
      setCurrentScore(null);
      setTimeLeft(120);
      setTimerActive(true);
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  };

  const totalScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const grade = totalScore >= 85 ? { label: "Excellent 🌟", color: "#16a34a" }
    : totalScore >= 70 ? { label: "Good 👍", color: "#0891b2" }
    : totalScore >= 55 ? { label: "Average 📚", color: "#d97706" }
    : { label: "Needs Work 💪", color: "#e11d48" };

  const timerColor = timeLeft <= 20 ? "#e11d48" : timeLeft <= 40 ? "#d97706" : "#16a34a";
  const timerPct = (timeLeft / 120) * 100;

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "white", fontFamily: "'Poppins', sans-serif" }}>

      {/* ── HEADER ── */}
      <div style={{ background: "linear-gradient(135deg,#1e293b,#0f172a)", padding: "40px 20px 32px", textAlign: "center", borderBottom: "1px solid #1e293b" }}>
        <div style={{ fontSize: 12, letterSpacing: "0.2em", color: "#facc15", fontWeight: 700, marginBottom: 10, textTransform: "uppercase" }}>🤖 AI-Powered</div>
        <h1 style={{ fontSize: "clamp(24px,4vw,42px)", fontWeight: 900, margin: "0 0 10px", background: "linear-gradient(90deg,#fff,#facc15)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Mock Interview Room
        </h1>
        <p style={{ color: "#64748b", fontSize: 15 }}>Real questions. Instant AI scoring. Live feedback. Get hired.</p>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "36px 20px 60px" }}>

        {/* ── ROLE SELECT ── */}
        {phase === "select" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6, color: "#f1f5f9" }}>Choose Your Interview Role</h2>
            <p style={{ color: "#475569", fontSize: 14, marginBottom: 28 }}>You'll get 5 real interview questions. Answer them like it's the actual interview.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {ROLES.map(r => (
                <div
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  style={{
                    padding: "20px 24px", borderRadius: 16, cursor: "pointer",
                    border: `2px solid ${role === r.id ? r.color : "#1e293b"}`,
                    background: role === r.id ? `${r.color}18` : "#1e293b",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={e => { if (role !== r.id) e.currentTarget.style.borderColor = r.color + "60"; }}
                  onMouseLeave={e => { if (role !== r.id) e.currentTarget.style.borderColor = "#1e293b"; }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: "#f1f5f9" }}>{r.label}</div>
                    <div style={{ fontSize: 13, color: "#475569", marginTop: 3 }}>5 questions · 2 min per question</div>
                  </div>
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%",
                    border: `2px solid ${role === r.id ? r.color : "#334155"}`,
                    background: role === r.id ? r.color : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, flexShrink: 0
                  }}>
                    {role === r.id ? "✓" : ""}
                  </div>
                </div>
              ))}
            </div>
            {role && (
              <button
                onClick={() => setPhase("briefing")}
                style={{
                  marginTop: 24, width: "100%", padding: "16px",
                  background: `linear-gradient(90deg, ${selectedRole.color}, #facc15)`,
                  border: "none", borderRadius: 14, color: "#0f172a",
                  fontWeight: 900, fontSize: 16, cursor: "pointer",
                  boxShadow: `0 8px 30px ${selectedRole.color}50`
                }}
              >
                Start Interview as {selectedRole.label} →
              </button>
            )}
          </div>
        )}

        {/* ── BRIEFING ── */}
        {phase === "briefing" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <div style={{ background: "#1e293b", borderRadius: 20, padding: "36px 32px", border: `1px solid ${selectedRole.color}40` }}>
              <div style={{ fontSize: 48, textAlign: "center", marginBottom: 16 }}>🎯</div>
              <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: "center", marginBottom: 24, color: "#f1f5f9" }}>Before You Begin</h2>
              {[
                { icon: "📋", text: `You'll answer 5 ${selectedRole.label} interview questions` },
                { icon: "⏱️", text: "You have 2 minutes per question — timer counts down live" },
                { icon: "🤖", text: "AI scores your answer on Relevance, Clarity, Depth & Confidence" },
                { icon: "💬", text: "You'll get specific feedback on how to improve each answer" },
                { icon: "🏆", text: "Final score and grade revealed at the end" },
              ].map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{tip.icon}</span>
                  <span style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.6 }}>{tip.text}</span>
                </div>
              ))}
              <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                <button onClick={() => setPhase("select")} style={{ flex: 1, padding: "14px", background: "#334155", color: "#94a3b8", border: "none", borderRadius: 12, fontWeight: 700, cursor: "pointer" }}>
                  ← Change Role
                </button>
                <button
                  onClick={startInterview}
                  style={{
                    flex: 2, padding: "14px",
                    background: `linear-gradient(90deg, ${selectedRole.color}, #facc15)`,
                    border: "none", borderRadius: 12,
                    color: "#0f172a", fontWeight: 900, fontSize: 16, cursor: "pointer"
                  }}
                >
                  I'm Ready — Start! 🚀
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── INTERVIEW ── */}
        {phase === "interview" && currentQ && (
          <div style={{ animation: "fadeUp 0.35s ease" }}>
            {/* Progress */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 13, color: "#475569", fontWeight: 600 }}>Question {qIndex + 1} of {totalQ}</span>
              <span style={{ fontSize: 13, color: selectedRole.color, fontWeight: 700 }}>{selectedRole.label}</span>
            </div>
            <div style={{ height: 5, background: "#1e293b", borderRadius: 10, marginBottom: 28 }}>
              <div style={{ height: "100%", borderRadius: 10, background: `linear-gradient(90deg, ${selectedRole.color}, #facc15)`, width: `${((qIndex) / totalQ) * 100}%`, transition: "width 0.5s ease" }} />
            </div>

            {/* Timer */}
            {!currentScore && (
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, background: "#1e293b", padding: "14px 20px", borderRadius: 14, border: `1px solid ${timerColor}30` }}>
                <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
                  <svg width="52" height="52" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="26" cy="26" r="22" fill="none" stroke="#334155" strokeWidth="4" />
                    <circle cx="26" cy="26" r="22" fill="none" stroke={timerColor} strokeWidth="4"
                      strokeDasharray={`${2 * Math.PI * 22}`}
                      strokeDashoffset={`${2 * Math.PI * 22 * (1 - timerPct / 100)}`}
                      style={{ transition: "stroke-dashoffset 1s linear, stroke 0.5s" }}
                    />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: timerColor }}>
                    {timeLeft}s
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "#f1f5f9", fontWeight: 700 }}>{timeLeft <= 20 ? "⚠️ Time running out!" : timeLeft <= 40 ? "⏳ Wrap up your answer" : "⏱️ Time remaining"}</div>
                  <div style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>Answer will auto-submit when timer hits 0</div>
                </div>
              </div>
            )}

            {/* Question */}
            <div style={{ background: "#1e293b", borderRadius: 16, padding: "24px 28px", marginBottom: 20, border: `1px solid ${selectedRole.color}30` }}>
              <div style={{ fontSize: 11, color: selectedRole.color, fontWeight: 700, letterSpacing: "0.12em", marginBottom: 10, textTransform: "uppercase" }}>Interview Question</div>
              <p style={{ fontSize: 18, color: "#f1f5f9", lineHeight: 1.6, margin: 0, fontWeight: 600 }}>{currentQ}</p>
            </div>

            {/* Answer box */}
            {!currentScore && (
              <>
                <textarea
                  ref={textareaRef}
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  placeholder="Type your answer here... Speak as if you're in a real interview. Be clear, specific, and confident."
                  style={{
                    width: "100%", minHeight: 160, padding: "18px 20px",
                    background: "#1e293b", border: "2px solid #334155",
                    borderRadius: 14, color: "#f1f5f9", fontSize: 15, lineHeight: 1.7,
                    resize: "vertical", outline: "none", fontFamily: "'Poppins', sans-serif",
                    boxSizing: "border-box", transition: "border-color 0.2s"
                  }}
                  onFocus={e => e.target.style.borderColor = selectedRole.color}
                  onBlur={e => e.target.style.borderColor = "#334155"}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6, marginBottom: 16 }}>
                  <span style={{ fontSize: 12, color: "#475569" }}>{answer.trim().split(/\s+/).filter(Boolean).length} words</span>
                  <span style={{ fontSize: 12, color: answer.trim().split(/\s+/).filter(Boolean).length >= 35 ? "#16a34a" : "#475569" }}>
                    {answer.trim().split(/\s+/).filter(Boolean).length >= 35 ? "✓ Good length" : "Aim for 35+ words"}
                  </span>
                </div>
                <button
                  onClick={handleSubmitAnswer}
                  disabled={answer.trim().length < 5}
                  style={{
                    width: "100%", padding: "15px",
                    background: answer.trim().length >= 5 ? `linear-gradient(90deg, ${selectedRole.color}, #facc15)` : "#334155",
                    border: "none", borderRadius: 12,
                    color: answer.trim().length >= 5 ? "#0f172a" : "#475569",
                    fontWeight: 900, fontSize: 15, cursor: answer.trim().length >= 5 ? "pointer" : "not-allowed",
                    transition: "all 0.2s"
                  }}
                >
                  Submit Answer & Get AI Score →
                </button>
              </>
            )}

            {/* Score Result */}
            {currentScore && (
              <div style={{ animation: "fadeUp 0.4s ease" }}>
                <div style={{ background: "#1e293b", borderRadius: 16, padding: "28px", border: "1px solid #334155", marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <h3 style={{ margin: 0, color: "#f1f5f9", fontSize: 18 }}>🤖 AI Score</h3>
                    <div style={{
                      fontSize: 36, fontWeight: 900,
                      color: currentScore.overall >= 80 ? "#facc15" : currentScore.overall >= 60 ? "#0891b2" : "#e11d48"
                    }}>
                      {currentScore.overall}<span style={{ fontSize: 16, color: "#475569" }}>/100</span>
                    </div>
                  </div>

                  {/* Score bars */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
                    {CRITERIA.map(c => (
                      <div key={c.key}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                          <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{c.label}</span>
                          <span style={{ fontSize: 12, color: selectedRole.color, fontWeight: 700 }}>{currentScore[c.key]}%</span>
                        </div>
                        <div style={{ height: 6, background: "#334155", borderRadius: 10 }}>
                          <div style={{
                            height: "100%", borderRadius: 10,
                            background: `linear-gradient(90deg, ${selectedRole.color}, #facc15)`,
                            width: `${currentScore[c.key]}%`, transition: "width 0.8s ease"
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Feedback */}
                  <div style={{ background: "#0f172a", borderRadius: 12, padding: "16px 18px" }}>
                    <div style={{ fontSize: 12, color: "#facc15", fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>AI Feedback</div>
                    {currentScore.feedbacks.map((f, i) => (
                      <p key={i} style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6, margin: "0 0 8px" }}>{f}</p>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  style={{
                    width: "100%", padding: "15px",
                    background: `linear-gradient(90deg, ${selectedRole.color}, #facc15)`,
                    border: "none", borderRadius: 12,
                    color: "#0f172a", fontWeight: 900, fontSize: 15, cursor: "pointer"
                  }}
                >
                  {qIndex + 1 >= totalQ ? "See Final Results 🏆" : `Next Question (${qIndex + 2}/${totalQ}) →`}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── FINAL RESULT ── */}
        {phase === "result" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            {/* Score card */}
            <div style={{ background: "#1e293b", borderRadius: 20, padding: "40px 32px", textAlign: "center", marginBottom: 20, border: `1px solid ${grade.color}30` }}>
              <div style={{ fontSize: 64, marginBottom: 12 }}>
                {totalScore >= 85 ? "🌟" : totalScore >= 70 ? "🏆" : totalScore >= 55 ? "📚" : "💪"}
              </div>
              <div style={{ fontSize: 13, color: "#475569", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Your Final Score</div>
              <div style={{ fontSize: 72, fontWeight: 900, color: grade.color, lineHeight: 1 }}>{totalScore}</div>
              <div style={{ fontSize: 14, color: "#475569", marginBottom: 12 }}>out of 100</div>
              <div style={{ display: "inline-block", background: `${grade.color}20`, color: grade.color, padding: "8px 24px", borderRadius: 30, fontWeight: 800, fontSize: 16, marginBottom: 20 }}>
                {grade.label}
              </div>
              <p style={{ color: "#64748b", fontSize: 14, maxWidth: 420, margin: "0 auto" }}>
                {totalScore >= 85 ? "Outstanding! You're ready for real interviews. Start applying now." :
                  totalScore >= 70 ? "Great performance! A little more practice and you'll ace it." :
                  totalScore >= 55 ? "Decent effort. Focus on giving more detailed, example-driven answers." :
                  "Keep practicing! Use the Roadmap page to build your knowledge, then come back."}
              </p>
            </div>

            {/* Per-question review */}
            <h3 style={{ color: "#f1f5f9", fontSize: 18, marginBottom: 16 }}>📝 Question-by-Question Review</h3>
            {allFeedback.map((item, i) => (
              <div key={i} style={{ background: "#1e293b", borderRadius: 16, padding: "22px 24px", marginBottom: 12, border: "1px solid #334155" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                  <span style={{ fontSize: 13, color: selectedRole.color, fontWeight: 700 }}>Q{i + 1}</span>
                  <span style={{ fontSize: 15, fontWeight: 800, color: item.overall >= 70 ? "#facc15" : "#e11d48" }}>{item.overall}/100</span>
                </div>
                <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, margin: "0 0 8px" }}><strong style={{ color: "#f1f5f9" }}>Q:</strong> {item.q}</p>
                {item.a && <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6, margin: "0 0 10px", fontStyle: "italic" }}><strong style={{ color: "#475569" }}>Your answer:</strong> "{item.a.slice(0, 120)}{item.a.length > 120 ? "..." : ""}"</p>}
                <div style={{ fontSize: 13, color: "#475569" }}>{item.feedbacks[0]}</div>
              </div>
            ))}

            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <button onClick={() => { setPhase("select"); setRole(null); }} style={{ flex: 1, padding: "14px", background: "#334155", color: "#94a3b8", border: "none", borderRadius: 12, fontWeight: 700, cursor: "pointer" }}>
                🔄 Try Again
              </button>
              <button onClick={() => window.location.href = "/roadmap"} style={{ flex: 1, padding: "14px", background: "linear-gradient(90deg,#facc15,#f97316)", border: "none", borderRadius: 12, color: "#0f172a", fontWeight: 900, cursor: "pointer" }}>
                📚 Study Roadmap →
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
