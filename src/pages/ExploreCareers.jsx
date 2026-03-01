import { useState } from "react";
import { useNavigate } from "react-router-dom";

const fields = [
  {
    id: "software", icon: "💻", title: "Software Development",
    color: "#6366f1", gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    tagline: "Build the digital world — apps, systems, and everything in between.",
    description: "Software developers design, code, test, and maintain programs that run on computers and mobile devices. It's a creative and logical discipline where you turn ideas into real, working products. The field spans web apps, desktop software, embedded systems, and more.",
    skills: ["JavaScript / Python / Java", "Data Structures & Algorithms", "Version Control (Git)", "System Design", "Testing & Debugging"],
    roadmap: [
      { step: 1, title: "Learn a Programming Language", desc: "Start with Python or JavaScript — both are beginner-friendly and in high demand.", icon: "🐣" },
      { step: 2, title: "Understand Core CS Concepts", desc: "Data structures, algorithms, and problem solving are the backbone of every developer.", icon: "🧠" },
      { step: 3, title: "Build Projects", desc: "Create real projects: a to-do app, a personal website, a small game.", icon: "🔨" },
      { step: 4, title: "Learn Frameworks & Tools", desc: "React for frontend, Node/Django for backend. Learn Git and deployment basics.", icon: "⚙️" },
      { step: 5, title: "Contribute & Network", desc: "Open source, hackathons, GitHub portfolio. Get noticed and keep learning.", icon: "🌐" },
      { step: 6, title: "Land Your First Role", desc: "Junior developer, internship, or freelance. Gain real-world experience.", icon: "🚀" },
    ],
    jobs: [
      { title: "Frontend Developer", salary: "₹4–12 LPA", level: "Entry–Mid" },
      { title: "Backend Developer", salary: "₹5–15 LPA", level: "Entry–Mid" },
      { title: "Full Stack Developer", salary: "₹6–20 LPA", level: "Mid–Senior" },
      { title: "DevOps Engineer", salary: "₹8–22 LPA", level: "Mid–Senior" },
      { title: "Software Architect", salary: "₹18–40 LPA", level: "Senior" },
    ],
  },
  {
    id: "data", icon: "📊", title: "Data Science & Analytics",
    color: "#0891b2", gradient: "linear-gradient(135deg, #0891b2, #0284c7)",
    tagline: "Turn raw data into decisions that shape the future.",
    description: "Data scientists and analysts collect, clean, analyze, and visualize data to help organizations make smarter decisions. The field blends statistics, programming, and domain knowledge. If you love uncovering hidden patterns and telling stories with numbers, this is your path.",
    skills: ["Python / R", "SQL & Databases", "Statistics & Probability", "Machine Learning", "Data Visualization (Tableau, Power BI)"],
    roadmap: [
      { step: 1, title: "Master Math & Stats", desc: "Learn probability, statistics, and linear algebra — the language of data.", icon: "📐" },
      { step: 2, title: "Learn Python & SQL", desc: "Python for analysis (pandas, NumPy), SQL for querying databases.", icon: "🐍" },
      { step: 3, title: "Explore Data Visualization", desc: "Tools like Matplotlib, Seaborn, Tableau. Make your findings clear.", icon: "📈" },
      { step: 4, title: "Study Machine Learning", desc: "scikit-learn, regression, classification, clustering — understand the models.", icon: "🤖" },
      { step: 5, title: "Work on Real Datasets", desc: "Kaggle competitions, public datasets. Solve actual problems end-to-end.", icon: "🗃️" },
      { step: 6, title: "Build Your Portfolio", desc: "Document projects on GitHub/Notion. Present insights clearly like a pro.", icon: "🎯" },
    ],
    jobs: [
      { title: "Data Analyst", salary: "₹3–10 LPA", level: "Entry–Mid" },
      { title: "Business Intelligence Analyst", salary: "₹5–14 LPA", level: "Mid" },
      { title: "Data Scientist", salary: "₹8–25 LPA", level: "Mid–Senior" },
      { title: "ML Engineer", salary: "₹10–30 LPA", level: "Mid–Senior" },
      { title: "Chief Data Officer", salary: "₹30–60 LPA", level: "Senior" },
    ],
  },
  {
    id: "design", icon: "🎨", title: "UI/UX Design",
    color: "#e11d48", gradient: "linear-gradient(135deg, #e11d48, #db2777)",
    tagline: "Design experiences that people love to use.",
    description: "UI/UX designers craft the look, feel, and flow of digital products. UI focuses on visual design — layouts, colors, typography. UX focuses on research and usability — understanding what users need and designing around them. Together, they make products intuitive and beautiful.",
    skills: ["Figma / Adobe XD", "Design Principles", "User Research", "Wireframing & Prototyping", "Accessibility Standards"],
    roadmap: [
      { step: 1, title: "Learn Design Fundamentals", desc: "Color theory, typography, layout, spacing — the building blocks of great design.", icon: "🎭" },
      { step: 2, title: "Master Figma", desc: "The industry standard for UI design. Learn components, auto layout, and prototyping.", icon: "🖌️" },
      { step: 3, title: "Understand Users", desc: "User research, personas, empathy mapping. Design starts with understanding people.", icon: "👥" },
      { step: 4, title: "Build a Portfolio", desc: "Redesign existing apps, design concept projects. Show your process.", icon: "📁" },
      { step: 5, title: "Learn Basic Code", desc: "HTML/CSS basics help you communicate better with developers.", icon: "🔗" },
      { step: 6, title: "Get Feedback & Iterate", desc: "Share with communities (Dribbble, Behance, ADPlist). Criticism makes you better.", icon: "🔄" },
    ],
    jobs: [
      { title: "UI Designer", salary: "₹3–9 LPA", level: "Entry–Mid" },
      { title: "UX Researcher", salary: "₹4–12 LPA", level: "Mid" },
      { title: "Product Designer", salary: "₹6–20 LPA", level: "Mid–Senior" },
      { title: "Design Lead", salary: "₹15–35 LPA", level: "Senior" },
      { title: "Head of Design", salary: "₹25–50 LPA", level: "Senior" },
    ],
  },
  {
    id: "mobile", icon: "📱", title: "Mobile Development",
    color: "#059669", gradient: "linear-gradient(135deg, #059669, #0d9488)",
    tagline: "Create apps that live in people's pockets.",
    description: "Mobile developers build apps for iOS and Android. You can go native (Swift for iOS, Kotlin for Android) or cross-platform (Flutter, React Native) to build once and deploy on both. Mobile development combines UI design, performance optimization, and platform-specific APIs.",
    skills: ["Flutter / React Native", "Swift / Kotlin", "REST APIs & Firebase", "UI Components", "App Store Deployment"],
    roadmap: [
      { step: 1, title: "Choose Your Path", desc: "Cross-platform (Flutter/React Native) for faster start. Native for deep platform expertise.", icon: "🗺️" },
      { step: 2, title: "Learn the Language", desc: "Dart for Flutter, JavaScript for React Native, Swift/Kotlin for native.", icon: "📚" },
      { step: 3, title: "Build UI Components", desc: "Understand layouts, navigation, gestures, and animations for mobile.", icon: "📐" },
      { step: 4, title: "Connect to Backend & APIs", desc: "Firebase, REST APIs, local storage. Make your app dynamic with real data.", icon: "🔌" },
      { step: 5, title: "Test on Real Devices", desc: "Emulators are good. Real devices are better. Test across screen sizes.", icon: "📲" },
      { step: 6, title: "Publish Your App", desc: "Deploy to Google Play or App Store. Going live is a huge milestone.", icon: "🏆" },
    ],
    jobs: [
      { title: "Junior App Developer", salary: "₹3–8 LPA", level: "Entry" },
      { title: "Flutter Developer", salary: "₹5–15 LPA", level: "Mid" },
      { title: "iOS Developer", salary: "₹6–18 LPA", level: "Mid–Senior" },
      { title: "Android Developer", salary: "₹6–18 LPA", level: "Mid–Senior" },
      { title: "Mobile Tech Lead", salary: "₹18–40 LPA", level: "Senior" },
    ],
  },
  {
    id: "cybersecurity", icon: "🔐", title: "Cybersecurity",
    color: "#d97706", gradient: "linear-gradient(135deg, #d97706, #b45309)",
    tagline: "Defend systems and fight digital threats on the front lines.",
    description: "Cybersecurity professionals protect organizations from hackers, data breaches, and malicious attacks. The field includes ethical hacking (penetration testing), network security, incident response, and compliance. It's one of the fastest-growing fields in tech.",
    skills: ["Networking Fundamentals", "Linux & Command Line", "Ethical Hacking Tools", "Cryptography", "SIEM & Threat Analysis"],
    roadmap: [
      { step: 1, title: "Build Your Foundation", desc: "Networking (TCP/IP, DNS), operating systems (especially Linux), and security fundamentals.", icon: "🏗️" },
      { step: 2, title: "Get Certified", desc: "CompTIA Security+, CEH, or Google's Cybersecurity Certificate — respected entry points.", icon: "📜" },
      { step: 3, title: "Learn Ethical Hacking", desc: "Kali Linux, Wireshark, Metasploit. Practice on HackTheBox, TryHackMe.", icon: "🕵️" },
      { step: 4, title: "Understand Defense", desc: "Firewalls, SIEM systems, incident response. Know how to attack to know how to defend.", icon: "🛡️" },
      { step: 5, title: "Specialize", desc: "Cloud security, malware analysis, digital forensics, SOC analyst. Find your niche.", icon: "🔍" },
      { step: 6, title: "Build a Reputation", desc: "Bug bounties, CTF competitions, open-source security tools.", icon: "⭐" },
    ],
    jobs: [
      { title: "SOC Analyst", salary: "₹3–9 LPA", level: "Entry" },
      { title: "Penetration Tester", salary: "₹6–18 LPA", level: "Mid" },
      { title: "Security Engineer", salary: "₹8–22 LPA", level: "Mid–Senior" },
      { title: "Cloud Security Architect", salary: "₹15–35 LPA", level: "Senior" },
      { title: "CISO", salary: "₹30–70 LPA", level: "Senior" },
    ],
  },
  {
    id: "ai", icon: "🤖", title: "AI & Machine Learning",
    color: "#7c3aed", gradient: "linear-gradient(135deg, #7c3aed, #6d28d9)",
    tagline: "Build intelligent systems that learn, reason, and create.",
    description: "AI and ML engineers build systems that can learn from data, recognize patterns, and make decisions. From recommendation engines to large language models, this field is at the bleeding edge of technology. It requires strong math, programming, and deep curiosity.",
    skills: ["Python & PyTorch/TensorFlow", "Linear Algebra & Calculus", "Deep Learning", "NLP / Computer Vision", "Cloud ML Platforms"],
    roadmap: [
      { step: 1, title: "Math First", desc: "Linear algebra, calculus, probability — don't skip this. It's the engine under the hood.", icon: "∑" },
      { step: 2, title: "Python & Libraries", desc: "NumPy, pandas, matplotlib, scikit-learn. The toolkit every ML practitioner uses.", icon: "🐍" },
      { step: 3, title: "Classical ML", desc: "Regression, decision trees, SVMs, clustering. Understand algorithms before deep learning.", icon: "📉" },
      { step: 4, title: "Deep Learning", desc: "Neural networks, CNNs, RNNs. PyTorch or TensorFlow. Train your first model.", icon: "🧬" },
      { step: 5, title: "Pick a Specialty", desc: "NLP, Computer Vision, Reinforcement Learning, Generative AI — go deep.", icon: "🎯" },
      { step: 6, title: "Research & Deploy", desc: "Read papers, replicate results, deploy models. The field moves fast — stay curious.", icon: "🚀" },
    ],
    jobs: [
      { title: "ML Engineer", salary: "₹8–20 LPA", level: "Entry–Mid" },
      { title: "NLP Engineer", salary: "₹10–25 LPA", level: "Mid" },
      { title: "AI Research Scientist", salary: "₹15–40 LPA", level: "Senior" },
      { title: "Computer Vision Engineer", salary: "₹10–30 LPA", level: "Mid–Senior" },
      { title: "AI Product Manager", salary: "₹18–45 LPA", level: "Senior" },
    ],
  },
];

export default function ExploreCareers() {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const field = fields.find((f) => f.id === selected);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: "50px 20px 40px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 13, letterSpacing: "0.15em", color: "#facc15", fontWeight: 700, marginBottom: 10, textTransform: "uppercase" }}>
          ✦ Career Explorer
        </div>
        <h1 style={{ fontSize: "clamp(26px, 5vw, 44px)", fontWeight: 800, color: "white", margin: "0 0 12px" }}>
          Explore Industries & Careers
        </h1>
        <p style={{ color: "#94a3b8", maxWidth: 520, margin: "0 auto", fontSize: 15, lineHeight: 1.6 }}>
          Understand how industries work, learn the roadmap step-by-step, and discover jobs that match your interests.
        </p>
      </div>

      {/* Field Selector */}
      <div style={{ background: "rgba(255,255,255,0.15)", padding: "30px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 16, color: "#1e293b" }}>
            Select a field to explore →
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 14 }}>
            {fields.map((f) => (
              <div
                key={f.id}
                onClick={() => {
                  setSelected(f.id);
                  setActiveTab("overview");
                  setTimeout(() => document.getElementById("field-detail")?.scrollIntoView({ behavior: "smooth" }), 60);
                }}
                style={{
                  background: selected === f.id ? f.gradient : "white",
                  borderRadius: 14,
                  padding: "18px 12px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  transform: selected === f.id ? "translateY(-3px)" : "none",
                  boxShadow: selected === f.id ? `0 10px 30px ${f.color}50` : "0 4px 12px rgba(0,0,0,0.08)",
                  border: `2px solid ${selected === f.id ? "transparent" : "#e2e8f0"}`,
                }}
              >
                <div style={{ fontSize: 30, marginBottom: 8 }}>{f.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: selected === f.id ? "white" : "#1e293b", lineHeight: 1.3 }}>
                  {f.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Field Detail */}
      {field && (
        <div id="field-detail" style={{ maxWidth: 1100, margin: "30px auto 60px", padding: "0 20px", animation: "fadeSlide 0.35s ease" }}>
          {/* Hero Banner */}
          <div style={{
            background: field.gradient, borderRadius: 20,
            padding: "32px 36px", marginBottom: 22,
            display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
            boxShadow: `0 16px 50px ${field.color}35`
          }}>
            <div style={{ fontSize: 56 }}>{field.icon}</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: "white", margin: "0 0 6px" }}>{field.title}</h2>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, margin: 0 }}>{field.tagline}</p>
            </div>
            <button
              onClick={() => navigate(`/jobs?search=${field.id}`)}
              style={{
                background: "rgba(255,255,255,0.25)", border: "2px solid rgba(255,255,255,0.5)",
                color: "white", padding: "10px 20px", borderRadius: 10,
                cursor: "pointer", fontWeight: 700, fontSize: 13,
                backdropFilter: "blur(10px)", whiteSpace: "nowrap"
              }}
            >
              Browse Jobs →
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
            {[
              { key: "overview", label: "📖 About" },
              { key: "roadmap", label: "🗺️ Roadmap" },
              { key: "jobs", label: "💼 Jobs" }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  padding: "10px 22px", borderRadius: 30,
                  border: `2px solid ${activeTab === key ? field.color : "#cbd5e1"}`,
                  background: activeTab === key ? field.gradient : "white",
                  color: activeTab === key ? "white" : "#475569",
                  cursor: "pointer", fontWeight: 700, fontSize: 13,
                  boxShadow: activeTab === key ? `0 4px 16px ${field.color}40` : "none",
                  transition: "all 0.2s"
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Tab: About */}
          {activeTab === "overview" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              <div style={{ background: "white", borderRadius: 16, padding: 26, boxShadow: "0 8px 24px rgba(0,0,0,0.08)", gridColumn: "1 / -1" }}>
                <h3 style={{ marginBottom: 12, color: "#0f172a" }}>About {field.title}</h3>
                <p style={{ color: "#475569", lineHeight: 1.8, fontSize: 15 }}>{field.description}</p>
              </div>
              <div style={{ background: "white", borderRadius: 16, padding: 26, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
                <h3 style={{ marginBottom: 16, color: "#0f172a" }}>🛠️ Key Skills to Learn</h3>
                {field.skills.map((skill, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: field.gradient, flexShrink: 0 }} />
                    <span style={{ color: "#334155", fontSize: 14 }}>{skill}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "white", borderRadius: 16, padding: 26, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
                <h3 style={{ marginBottom: 16, color: "#0f172a" }}>📊 Career Snapshot</h3>
                {[
                  { label: "Avg. Salary", value: field.jobs[2]?.salary || "Competitive" },
                  { label: "Demand Level", value: "High Demand 🔥" },
                  { label: "Entry Role", value: field.jobs[0]?.title },
                  { label: "Senior Role", value: field.jobs[field.jobs.length - 1]?.title },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9", paddingBottom: 10, marginBottom: 10 }}>
                    <span style={{ color: "#64748b", fontSize: 13 }}>{label}</span>
                    <span style={{ color: field.color, fontWeight: 700, fontSize: 13 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Roadmap */}
          {activeTab === "roadmap" && (
            <div style={{ background: "white", borderRadius: 16, padding: 32, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
              <h3 style={{ color: "#0f172a", marginBottom: 28, fontSize: 18 }}>Step-by-Step Path to {field.title}</h3>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 27, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${field.color}, transparent)` }} />
                {field.roadmap.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 20, paddingBottom: i < field.roadmap.length - 1 ? 30 : 0 }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: "50%",
                      background: field.gradient,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 20, flexShrink: 0,
                      boxShadow: `0 0 16px ${field.color}40`, zIndex: 1
                    }}>
                      {step.icon}
                    </div>
                    <div style={{ paddingTop: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                        <span style={{ background: field.color + "18", color: field.color, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>
                          STEP {step.step}
                        </span>
                        <h4 style={{ color: "#0f172a", margin: 0, fontSize: 15 }}>{step.title}</h4>
                      </div>
                      <p style={{ color: "#64748b", margin: 0, fontSize: 14, lineHeight: 1.6 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Jobs */}
          {activeTab === "jobs" && (
            <div>
              <div style={{ background: "white", borderRadius: 16, padding: 26, boxShadow: "0 8px 24px rgba(0,0,0,0.08)", marginBottom: 14 }}>
                <h3 style={{ color: "#0f172a", marginBottom: 18, fontSize: 18 }}>💼 Career Paths in {field.title}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {field.jobs.map((job, i) => (
                    <div
                      key={i}
                      onClick={() => navigate(`/jobs?search=${job.title}`)}
                      style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "14px 18px", borderRadius: 12,
                        background: "#f8fafc", border: `1px solid #e2e8f0`,
                        cursor: "pointer", transition: "all 0.2s", flexWrap: "wrap", gap: 10
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = field.color; e.currentTarget.style.background = "#f0f4ff"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#f8fafc"; }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: field.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                          {field.icon}
                        </div>
                        <div>
                          <div style={{ color: "#0f172a", fontWeight: 700, fontSize: 14 }}>{job.title}</div>
                          <div style={{ color: "#94a3b8", fontSize: 12 }}>{job.level}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <span style={{ color: field.color, fontWeight: 700, fontSize: 14 }}>{job.salary}</span>
                        <span style={{ color: "#94a3b8", fontSize: 13 }}>Find Jobs →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => navigate(`/jobs?search=${field.id}`)}
                style={{
                  width: "100%", padding: "14px", borderRadius: 12,
                  background: field.gradient, border: "none",
                  color: "white", fontWeight: 700, fontSize: 15,
                  cursor: "pointer", boxShadow: `0 6px 24px ${field.color}40`
                }}
              >
                See All Live {field.title} Jobs →
              </button>
            </div>
          )}
        </div>
      )}

      {!field && (
        <div style={{ textAlign: "center", padding: "40px 20px 80px", color: "#475569" }}>
          <div style={{ fontSize: 48, marginBottom: 14 }}>☝️</div>
          <p style={{ fontSize: 16, color: "#1e293b" }}>Select a field above to explore the full career path</p>
        </div>
      )}

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
