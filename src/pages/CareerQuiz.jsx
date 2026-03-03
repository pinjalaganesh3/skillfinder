import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QUESTIONS = [
  {
    q: "What do you enjoy doing most?",
    hint: "Pick the one that feels most like you — there's no wrong answer!",
    options: [
      { text: "🔨 Building & fixing things with code", scores: { software: 3, mobile: 2 } },
      { text: "📊 Analyzing numbers and finding patterns", scores: { data: 3, ai: 2 } },
      { text: "🎨 Designing beautiful visuals and layouts", scores: { design: 3 } },
      { text: "🛡️ Protecting systems from hackers", scores: { cybersecurity: 3 } },
    ],
  },
  {
    q: "Which subject did you enjoy most?",
    hint: "Think back to what you actually liked — not what you were best at.",
    options: [
      { text: "📐 Mathematics / Statistics", scores: { data: 3, ai: 2 } },
      { text: "💻 Computer Science / Programming", scores: { software: 3, mobile: 2 } },
      { text: "🖌️ Art / Graphics / Media", scores: { design: 3 } },
      { text: "⚡ Electronics / Networking", scores: { cybersecurity: 3, mobile: 1 } },
    ],
  },
  {
    q: "What kind of work excites you?",
    hint: "Imagine your ideal work day — what are you doing?",
    options: [
      { text: "🌐 Building websites and apps people use every day", scores: { software: 3, mobile: 2 } },
      { text: "🔍 Finding hidden insights in messy data", scores: { data: 3, ai: 2 } },
      { text: "✏️ Designing things that look great and feel easy to use", scores: { design: 3 } },
      { text: "🔐 Hunting for security vulnerabilities and fixing them", scores: { cybersecurity: 3 } },
    ],
  },
  {
    q: "What's your comfort level with coding?",
    hint: "Be honest! Everyone starts somewhere.",
    options: [
      { text: "🚀 I love coding and want to do it full time", scores: { software: 3, ai: 1 } },
      { text: "📈 I'm okay with some coding for analysis", scores: { data: 3, ai: 2 } },
      { text: "🎭 I prefer creativity over coding", scores: { design: 3 } },
      { text: "🛠️ I like technical work but not just coding", scores: { cybersecurity: 3, mobile: 1 } },
    ],
  },
  {
    q: "What's your dream impact?",
    hint: "What do you want people to say about your work?",
    options: [
      { text: "🌟 I built the app millions of people use", scores: { software: 2, mobile: 3 } },
      { text: "🧠 I made smart decisions from data", scores: { data: 3, ai: 2 } },
      { text: "💡 I made this product so much easier to use", scores: { design: 3 } },
      { text: "🔒 I kept the company safe from hackers", scores: { cybersecurity: 3 } },
    ],
  },
];

const RESULTS = {
  software: {
    title: "💻 Software Developer",
    color: "#6366f1",
    desc: "You love building things! You'd thrive as a software or web developer — creating apps and systems that people actually use every day.",
    skills: ["JavaScript or Python", "React or Node.js", "Git & GitHub", "Problem Solving"],
    salary: "₹4–20 LPA",
    path: "/explore",
  },
  data: {
    title: "📊 Data Analyst",
    color: "#0891b2",
    desc: "You think in patterns and numbers. Data analysis is perfect for you — turning raw data into insights that help businesses make smart decisions.",
    skills: ["SQL", "Python (Pandas)", "Excel", "Power BI or Tableau"],
    salary: "₹3–16 LPA",
    path: "/explore",
  },
  design: {
    title: "🎨 UI/UX Designer",
    color: "#e11d48",
    desc: "You care about how things look AND feel. UI/UX design is where creativity meets technology — making products beautiful and easy to use.",
    skills: ["Figma", "User Research", "Color & Typography", "Prototyping"],
    salary: "₹3–16 LPA",
    path: "/explore",
  },
  ai: {
    title: "🤖 AI / ML Engineer",
    color: "#7c3aed",
    desc: "You want to build the future! AI and machine learning is the fastest growing field in tech right now — and the highest paying.",
    skills: ["Python", "Statistics", "TensorFlow or PyTorch", "Data Handling"],
    salary: "₹8–40 LPA",
    path: "/explore",
  },
  cybersecurity: {
    title: "🔐 Cybersecurity Analyst",
    color: "#d97706",
    desc: "You think like a detective! Cybersecurity is all about protecting systems — one of the most in-demand fields in tech.",
    skills: ["Linux", "Networking Basics", "Ethical Hacking", "Security Tools"],
    salary: "₹4–22 LPA",
    path: "/explore",
  },
  mobile: {
    title: "📱 Mobile App Developer",
    color: "#059669",
    desc: "You want your work on people's phones! Mobile development lets you build apps that people carry with them everywhere.",
    skills: ["Flutter or React Native", "Dart or JavaScript", "Firebase", "App Design"],
    salary: "₹4–18 LPA",
    path: "/explore",
  },
};

export default function CareerQuiz() {
  const [step,    setStep]    = useState(-1); // -1 = intro
  const [answers, setAnswers] = useState([]);
  const [result,  setResult]  = useState(null);
  const navigate = useNavigate();

  const handleAnswer = (scores) => {
    const newAnswers = [...answers, scores];
    if (step < QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setStep(step + 1);
    } else {
      // Calculate result
      const totals = {};
      for (const scoreObj of newAnswers) {
        for (const [key, val] of Object.entries(scoreObj)) {
          totals[key] = (totals[key] || 0) + val;
        }
      }
      const best = Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
      setResult(RESULTS[best] || RESULTS.software);
    }
  };

  // ── INTRO SCREEN ──
  if (step === -1) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ maxWidth: 520, textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>🎯</div>
          <div className="badge" style={{ marginBottom: 16 }}>2 Minute Quiz</div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(24px,4vw,38px)", fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
            Which Tech Career is Right for You?
          </h1>
          <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.75, marginBottom: 12 }}>
            Not sure where to start in tech? This quick 5-question quiz will match you to the best career path based on your personality and interests.
          </p>
          <p style={{ color: "#475569", fontSize: 13, marginBottom: 32 }}>
            ✅ 5 simple questions &nbsp;·&nbsp; ⏱️ Takes 2 minutes &nbsp;·&nbsp; 🎯 Personalized result
          </p>
          <button onClick={() => setStep(0)} style={{ padding: "14px 36px", fontSize: 16, borderRadius: 12 }}>
            Start the Quiz →
          </button>
          <p style={{ marginTop: 16, fontSize: 12, color: "#334155" }}>No signup needed · Completely free</p>
        </div>
      </div>
    );
  }

  // ── RESULT SCREEN ──
  if (result) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ maxWidth: 540, width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
            <div className="badge" style={{ marginBottom: 14 }}>Your Career Match</div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(22px,4vw,34px)", fontWeight: 800, color: result.color, marginBottom: 14 }}>
              {result.title}
            </h2>
            <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.7, maxWidth: 420, margin: "0 auto" }}>
              {result.desc}
            </p>
          </div>

          {/* Skills needed */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "20px 22px", marginBottom: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Skills to Learn</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {result.skills.map(s => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </div>

          {/* Salary */}
          <div style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)", borderRadius: 12, padding: "14px 18px", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>💰</span>
            <div>
              <p style={{ fontSize: 12, color: "#475569", marginBottom: 2 }}>Average Salary in India</p>
              <p style={{ fontSize: 17, fontWeight: 800, color: "#4ade80" }}>{result.salary}</p>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => navigate("/explore")} style={{ flex: 1, padding: "12px", fontSize: 14 }}>
              🧭 Explore This Career →
            </button>
            <button onClick={() => navigate("/roadmap")} style={{ flex: 1, padding: "12px", fontSize: 14, background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)" }}>
              🗺️ See Roadmap
            </button>
          </div>

          <p style={{ textAlign: "center", marginTop: 16 }}>
            <span onClick={() => { setStep(-1); setAnswers([]); setResult(null); }} style={{ fontSize: 13, color: "#475569", cursor: "pointer", textDecoration: "underline" }}>
              Retake quiz
            </span>
          </p>
        </div>
      </div>
    );
  }

  // ── QUESTION SCREEN ──
  const q = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ maxWidth: 560, width: "100%" }}>

        {/* Progress */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>Question {step + 1} of {QUESTIONS.length}</span>
            <span style={{ fontSize: 13, color: "#f59e0b", fontWeight: 700 }}>{Math.round(progress)}% done</span>
          </div>
          <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg,#f59e0b,#f97316)", borderRadius: 10, transition: "width 0.4s ease" }} />
          </div>
        </div>

        {/* Question */}
        <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(18px,3vw,26px)", fontWeight: 800, marginBottom: 8, lineHeight: 1.3 }}>{q.q}</h2>
        <p style={{ color: "#475569", fontSize: 14, marginBottom: 22 }}>{q.hint}</p>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map((opt, i) => (
            <div
              key={i}
              onClick={() => handleAnswer(opt.scores)}
              style={{ padding: "16px 18px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", cursor: "pointer", fontSize: 15, fontWeight: 500, color: "#94a3b8", transition: "all 0.2s", lineHeight: 1.5 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#f59e0b"; e.currentTarget.style.color = "#f1f5f9"; e.currentTarget.style.background = "rgba(245,158,11,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
            >
              {opt.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
