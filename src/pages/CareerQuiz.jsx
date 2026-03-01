import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QUESTIONS = [
  {
    q: "What do you enjoy doing most?",
    options: [
      { text: "Building & fixing things with code", scores: { software: 3, mobile: 2 } },
      { text: "Analyzing numbers and finding patterns", scores: { data: 3, ai: 2 } },
      { text: "Designing beautiful visuals and layouts", scores: { design: 3 } },
      { text: "Protecting systems from hackers", scores: { cybersecurity: 3 } },
    ],
  },
  {
    q: "Which subject did you enjoy most in school?",
    options: [
      { text: "Mathematics / Statistics", scores: { data: 3, ai: 2 } },
      { text: "Computer Science / Programming", scores: { software: 3, mobile: 2 } },
      { text: "Art / Graphics / Media", scores: { design: 3 } },
      { text: "Electronics / Networking", scores: { cybersecurity: 3, mobile: 1 } },
    ],
  },
  {
    q: "What kind of projects excite you?",
    options: [
      { text: "Making a mobile app people use daily", scores: { mobile: 3, software: 1 } },
      { text: "Creating dashboards that explain data", scores: { data: 3, ai: 1 } },
      { text: "Redesigning a confusing website to be cleaner", scores: { design: 3 } },
      { text: "Setting up a secure network for a company", scores: { cybersecurity: 3 } },
    ],
  },
  {
    q: "How do you prefer to work?",
    options: [
      { text: "Logic-based, solving puzzles step by step", scores: { software: 2, ai: 2, cybersecurity: 1 } },
      { text: "Creative, visual, expressing ideas", scores: { design: 3 } },
      { text: "Research and experimentation", scores: { ai: 3, data: 2 } },
      { text: "Action-oriented, testing and breaking things", scores: { cybersecurity: 3, mobile: 1 } },
    ],
  },
  {
    q: "What is your dream outcome?",
    options: [
      { text: "Build an app used by millions", scores: { mobile: 3, software: 2 } },
      { text: "Work at a top tech company as a scientist", scores: { ai: 3, data: 2 } },
      { text: "Become a lead designer at a startup", scores: { design: 3 } },
      { text: "Protect major companies from cyber attacks", scores: { cybersecurity: 3 } },
    ],
  },
];

const RESULTS = {
  software: {
    title: "💻 Software Developer",
    desc: "You love building things with code! A software developer role — frontend, backend, or full stack — suits your analytical and creative mindset perfectly.",
    skills: ["JavaScript / Python", "React or Node.js", "Git & GitHub", "Problem Solving"],
    explore: "software",
  },
  data: {
    title: "📊 Data Scientist / Analyst",
    desc: "You think in numbers and patterns. A career in data science will let you turn raw information into decisions that shape businesses.",
    skills: ["Python & SQL", "Statistics", "Tableau / Power BI", "Machine Learning basics"],
    explore: "data",
  },
  design: {
    title: "🎨 UI/UX Designer",
    desc: "You have a sharp eye for beauty and usability. A design career will let you shape how millions of people experience digital products.",
    skills: ["Figma", "Color Theory", "User Research", "Prototyping"],
    explore: "design",
  },
  mobile: {
    title: "📱 Mobile App Developer",
    desc: "You want your work in people's hands! Mobile development with Flutter or React Native will let you ship apps to millions of users.",
    skills: ["Flutter / React Native", "Dart or JavaScript", "Firebase", "App Store Publishing"],
    explore: "mobile",
  },
  cybersecurity: {
    title: "🔐 Cybersecurity Specialist",
    desc: "You think like a hacker — in the best way. Cybersecurity is one of the most in-demand and exciting fields, and you're built for it.",
    skills: ["Networking basics", "Linux", "Ethical Hacking", "Security Certifications"],
    explore: "cybersecurity",
  },
  ai: {
    title: "🤖 AI / ML Engineer",
    desc: "You want to push the boundaries of what machines can do. AI & ML engineering puts you at the cutting edge of the entire tech world.",
    skills: ["Python", "Math & Statistics", "TensorFlow / PyTorch", "Deep Learning"],
    explore: "ai",
  },
};

export default function CareerQuiz() {
  const [step, setStep] = useState(0); // 0 = intro
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const currentQ = step > 0 && step <= QUESTIONS.length ? QUESTIONS[step - 1] : null;
  const progress = step === 0 ? 0 : Math.round(((step - 1) / QUESTIONS.length) * 100);

  const handleAnswer = (option) => {
    const newAnswers = { ...answers };
    for (const [field, score] of Object.entries(option.scores)) {
      newAnswers[field] = (newAnswers[field] || 0) + score;
    }
    setAnswers(newAnswers);

    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      // Calculate result
      const sorted = Object.entries(newAnswers).sort((a, b) => b[1] - a[1]);
      setResult(sorted[0][0]);
      setStep(QUESTIONS.length + 1);
    }
  };

  const reset = () => { setStep(0); setAnswers({}); setResult(null); };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: "40px 20px",
        textAlign: "center",
        color: "white"
      }}>
        <div style={{ fontSize: 13, letterSpacing: "0.15em", color: "#facc15", fontWeight: 700, marginBottom: 10, textTransform: "uppercase" }}>
          🎯 Career Quiz
        </div>
        <h1 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, margin: "0 0 10px" }}>
          What Career Is Right For You?
        </h1>
        <p style={{ color: "#94a3b8", fontSize: 15 }}>5 quick questions to find your perfect tech career path</p>
      </div>

      <div style={{ maxWidth: 680, margin: "40px auto 60px", padding: "0 20px" }}>

        {/* INTRO */}
        {step === 0 && (
          <div style={{ background: "white", borderRadius: 20, padding: 40, boxShadow: "0 12px 40px rgba(0,0,0,0.1)", textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🎯</div>
            <h2 style={{ fontSize: 26, color: "#0f172a", marginBottom: 12 }}>Ready to find your path?</h2>
            <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.7, marginBottom: 30 }}>
              Answer 5 short questions and we'll match you to the tech career that suits your personality, interests, and goals. It takes less than 2 minutes.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 30 }}>
              {["💻 Software", "📊 Data", "🎨 Design", "📱 Mobile", "🔐 Security", "🤖 AI"].map(f => (
                <span key={f} style={{ background: "#f1f5f9", color: "#475569", padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>{f}</span>
              ))}
            </div>
            <button onClick={() => setStep(1)} style={{ padding: "14px 40px", fontSize: 16, fontWeight: 800 }}>
              Start Quiz →
            </button>
          </div>
        )}

        {/* QUESTION */}
        {currentQ && (
          <div style={{ background: "white", borderRadius: 20, padding: "36px 32px", boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}>
            {/* Progress */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>Question {step} of {QUESTIONS.length}</span>
                <span style={{ fontSize: 13, color: "#facc15", fontWeight: 700 }}>{progress}% done</span>
              </div>
              <div style={{ height: 6, background: "#f1f5f9", borderRadius: 10 }}>
                <div style={{
                  height: "100%", borderRadius: 10,
                  background: "linear-gradient(90deg, #facc15, #f97316)",
                  width: `${progress}%`, transition: "width 0.4s ease"
                }} />
              </div>
            </div>

            <h2 style={{ fontSize: 20, color: "#0f172a", marginBottom: 24, lineHeight: 1.4 }}>
              {currentQ.q}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {currentQ.options.map((opt, i) => (
                <div
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  style={{
                    padding: "16px 20px", borderRadius: 12,
                    border: "2px solid #e2e8f0", cursor: "pointer",
                    fontSize: 15, color: "#1e293b", fontWeight: 500,
                    transition: "all 0.2s", background: "#fafafa"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#facc15"; e.currentTarget.style.background = "#fffbeb"; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#fafafa"; e.currentTarget.style.transform = "none"; }}
                >
                  <span style={{ marginRight: 12, fontSize: 18 }}>{["A", "B", "C", "D"][i]}.</span>
                  {opt.text}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESULT */}
        {result && RESULTS[result] && (
          <div>
            <div style={{ background: "white", borderRadius: 20, padding: "40px 32px", boxShadow: "0 12px 40px rgba(0,0,0,0.1)", textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 70, marginBottom: 16 }}>{RESULTS[result].title.split(" ")[0]}</div>
              <div style={{ display: "inline-block", background: "linear-gradient(90deg,#facc15,#f97316)", color: "#1e293b", padding: "6px 20px", borderRadius: 30, fontWeight: 800, fontSize: 14, marginBottom: 16 }}>
                YOUR MATCH
              </div>
              <h2 style={{ fontSize: 26, color: "#0f172a", marginBottom: 14 }}>{RESULTS[result].title}</h2>
              <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 28px" }}>
                {RESULTS[result].desc}
              </p>

              <div style={{ background: "#f8fafc", borderRadius: 14, padding: "20px 24px", marginBottom: 28, textAlign: "left" }}>
                <h4 style={{ color: "#0f172a", marginBottom: 14 }}>🛠️ Skills to start learning:</h4>
                {RESULTS[result].skills.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "linear-gradient(90deg,#facc15,#f97316)", flexShrink: 0 }} />
                    <span style={{ color: "#334155", fontSize: 14 }}>{s}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => navigate(`/explore?field=${RESULTS[result].explore}`)} style={{ padding: "12px 24px" }}>
                  🧭 Explore This Career
                </button>
                <button onClick={() => navigate(`/jobs?search=${RESULTS[result].explore}`)} style={{ padding: "12px 24px", background: "white", color: "#1e293b", border: "2px solid #e2e8f0" }}>
                  💼 Find Jobs
                </button>
                <button onClick={reset} style={{ padding: "12px 24px", background: "#f1f5f9", color: "#475569" }}>
                  🔄 Retake Quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
