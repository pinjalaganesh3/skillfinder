import { useState } from "react";
import { useNavigate } from "react-router-dom";

const COURSES = {
  software: {
    label: "💻 Software Development",
    color: "#6366f1",
    intro: "Start with Python or JavaScript — both are beginner-friendly and have tons of free resources.",
    courses: [
      { name: "CS50 by Harvard",          platform: "edX",          level: "Beginner",     duration: "12 weeks", tag: "⭐ Most Popular", url: "https://cs50.harvard.edu/x/", desc: "The best intro to Computer Science in the world. Completely free!" },
      { name: "The Odin Project",          platform: "Free Website", level: "Beginner",     duration: "Self-paced", tag: "🔥 Highly Rated", url: "https://www.theodinproject.com/", desc: "Full web development curriculum from zero to job-ready. Free forever." },
      { name: "freeCodeCamp",              platform: "freeCodeCamp", level: "Beginner",     duration: "Self-paced", tag: "✅ Certification", url: "https://www.freecodecamp.org/", desc: "Learn HTML, CSS, JavaScript, React and more. Get free certifications." },
      { name: "Python for Everybody",      platform: "Coursera",     level: "Beginner",     duration: "8 months",  tag: "🎓 Certificate",  url: "https://www.coursera.org/specializations/python", desc: "Best Python course for beginners. Audit for free!" },
      { name: "JavaScript.info",           platform: "Free Website", level: "Beginner",     duration: "Self-paced", tag: "📖 Reference",   url: "https://javascript.info/", desc: "The most complete free JavaScript textbook online." },
      { name: "Full Stack Open",           platform: "Helsinki Uni", level: "Intermediate", duration: "Self-paced", tag: "🏆 Free Cert",   url: "https://fullstackopen.com/en/", desc: "Learn React, Node.js, MongoDB and more. Free University course." },
    ]
  },
  data: {
    label: "📊 Data Science & Analytics",
    color: "#0891b2",
    intro: "SQL and Python are your best starting points. Learn to work with real data from day one.",
    courses: [
      { name: "Google Data Analytics",    platform: "Coursera",     level: "Beginner",     duration: "6 months",  tag: "⭐ Best for Jobs", url: "https://www.coursera.org/professional-certificates/google-data-analytics", desc: "Industry-recognised certificate. Audit individual courses for free." },
      { name: "SQL for Data Science",      platform: "Coursera",     level: "Beginner",     duration: "4 weeks",   tag: "🎯 Must Learn",   url: "https://www.coursera.org/learn/sql-for-data-science", desc: "Learn SQL from scratch — the #1 skill every data job needs." },
      { name: "Kaggle Learn",              platform: "Kaggle",       level: "Beginner",     duration: "Self-paced", tag: "✅ Free Cert",    url: "https://www.kaggle.com/learn", desc: "Free short courses on Python, SQL, ML and data viz. Takes hours not months." },
      { name: "Data Analysis with Python", platform: "freeCodeCamp", level: "Beginner",     duration: "Self-paced", tag: "✅ Free Cert",    url: "https://www.freecodecamp.org/learn/data-analysis-with-python/", desc: "Learn NumPy, Pandas and Matplotlib — the core data tools." },
      { name: "Statistics for Data Science", platform: "Khan Academy", level: "Beginner",  duration: "Self-paced", tag: "📖 Free",         url: "https://www.khanacademy.org/math/statistics-probability", desc: "Free statistics lessons — essential for understanding data." },
    ]
  },
  design: {
    label: "🎨 UI/UX Design",
    color: "#e11d48",
    intro: "Learn Figma first — it's the industry standard and completely free to use.",
    courses: [
      { name: "Google UX Design Certificate", platform: "Coursera",     level: "Beginner", duration: "6 months",  tag: "⭐ Industry Cert", url: "https://www.coursera.org/professional-certificates/google-ux-design", desc: "Google's official UX course. Highly respected by employers. Audit free!" },
      { name: "Figma for Beginners",           platform: "Figma",        level: "Beginner", duration: "4 videos",  tag: "🔥 Start Here",    url: "https://www.figma.com/resources/learn-design/", desc: "Official free tutorials from Figma itself. Best place to start." },
      { name: "Design for Developers",         platform: "Frontend Masters", level: "Beginner", duration: "5 hours", tag: "🎓 Free Trial",   url: "https://frontendmasters.com/courses/design-for-developers/", desc: "Learn color, typography and layout principles." },
      { name: "Interaction Design Foundation", platform: "IDF",          level: "Beginner", duration: "Self-paced", tag: "📖 Deep Learning", url: "https://www.interaction-design.org/", desc: "Most comprehensive free UX resource online. Thousands of articles." },
      { name: "Canva Design School",           platform: "Canva",        level: "Beginner", duration: "Self-paced", tag: "✅ Free",          url: "https://www.canva.com/designschool/", desc: "Free design lessons for beginners — build confidence fast." },
    ]
  },
  mobile: {
    label: "📱 Mobile Development",
    color: "#059669",
    intro: "Flutter is the best cross-platform choice — one codebase for Android and iOS.",
    courses: [
      { name: "Flutter Development Bootcamp",  platform: "Udemy",        level: "Beginner", duration: "28 hours",  tag: "⭐ Best Flutter",  url: "https://www.udemy.com/course/flutter-bootcamp-with-dart/", desc: "Angela Yu's complete Flutter course. Often on sale for ₹400!" },
      { name: "Flutter Official Docs & Codelabs", platform: "Flutter",  level: "Beginner", duration: "Self-paced", tag: "📖 Official",      url: "https://docs.flutter.dev/codelabs", desc: "Free official Flutter tutorials. Build real apps step by step." },
      { name: "React Native Tutorial",          platform: "Reactnative.dev", level: "Beginner", duration: "Self-paced", tag: "📖 Free",       url: "https://reactnative.dev/docs/getting-started", desc: "Official free guide if you already know React." },
      { name: "Android Development",            platform: "Google",       level: "Beginner", duration: "Self-paced", tag: "🎓 Free",         url: "https://developer.android.com/courses", desc: "Google's official free Android development courses." },
    ]
  },
  ai: {
    label: "🤖 AI / Machine Learning",
    color: "#7c3aed",
    intro: "Python and math are your foundation. Start with ML basics before going deep into AI.",
    courses: [
      { name: "Machine Learning by Andrew Ng",  platform: "Coursera",     level: "Beginner",     duration: "3 months",  tag: "⭐ World's Best",  url: "https://www.coursera.org/specializations/machine-learning-introduction", desc: "The most famous ML course in the world. Created by AI legend Andrew Ng." },
      { name: "fast.ai",                         platform: "fast.ai",      level: "Intermediate", duration: "7 lessons",  tag: "🔥 Practical",     url: "https://www.fast.ai/", desc: "Learn deep learning in a practical, top-down approach. Completely free." },
      { name: "Kaggle Intro to ML",              platform: "Kaggle",       level: "Beginner",     duration: "3 hours",   tag: "✅ Free Cert",     url: "https://www.kaggle.com/learn/intro-to-machine-learning", desc: "Best first step into ML — short, practical and free." },
      { name: "Deep Learning Specialization",    platform: "Coursera",     level: "Advanced",     duration: "5 months",  tag: "🏆 Deep Dive",     url: "https://www.coursera.org/specializations/deep-learning", desc: "Learn neural networks, CNN, RNN. Audit free!" },
      { name: "Google ML Crash Course",          platform: "Google",       level: "Beginner",     duration: "15 hours",  tag: "✅ Free",          url: "https://developers.google.com/machine-learning/crash-course", desc: "Google's free ML course with exercises and real examples." },
    ]
  },
  security: {
    label: "🔐 Cybersecurity",
    color: "#d97706",
    intro: "Linux basics and networking fundamentals are your first steps. Then learn ethical hacking.",
    courses: [
      { name: "Google Cybersecurity Certificate", platform: "Coursera",   level: "Beginner", duration: "6 months",  tag: "⭐ Best for Jobs", url: "https://www.coursera.org/professional-certificates/google-cybersecurity", desc: "Google's official cybersecurity path. Audit for free!" },
      { name: "TryHackMe",                         platform: "TryHackMe",  level: "Beginner", duration: "Self-paced", tag: "🔥 Hands-on",     url: "https://tryhackme.com/", desc: "Learn cybersecurity by hacking virtual machines. Free tier available." },
      { name: "Cybrary",                           platform: "Cybrary",    level: "Beginner", duration: "Self-paced", tag: "✅ Free Tier",    url: "https://www.cybrary.it/", desc: "Free cybersecurity courses including ethical hacking and Linux." },
      { name: "Linux Basics for Hackers",          platform: "Free Book",  level: "Beginner", duration: "Self-paced", tag: "📖 Free Book",    url: "https://nostarch.com/linuxbasicsforhackers", desc: "Essential Linux skills for anyone going into security." },
    ]
  },
  cloud: {
    label: "☁️ Cloud & DevOps",
    color: "#0284c7",
    intro: "AWS is the most in-demand cloud platform. Get the free tier and start building.",
    courses: [
      { name: "AWS Cloud Practitioner",  platform: "AWS",          level: "Beginner",     duration: "Self-paced", tag: "⭐ Get Certified", url: "https://aws.amazon.com/training/digital/", desc: "Free AWS official training to get your first cloud certification." },
      { name: "Docker for Beginners",    platform: "YouTube",      level: "Beginner",     duration: "3 hours",   tag: "🔥 Must Learn",   url: "https://www.youtube.com/watch?v=pg19Z8LL06w", desc: "Best free Docker tutorial on YouTube — TechWorld with Nana." },
      { name: "DevOps Roadmap",          platform: "roadmap.sh",   level: "Beginner",     duration: "Self-paced", tag: "📖 Free Guide",   url: "https://roadmap.sh/devops", desc: "Visual roadmap of everything to learn for DevOps. Free and updated." },
      { name: "Google Cloud Training",   platform: "Google",       level: "Beginner",     duration: "Self-paced", tag: "✅ Free",         url: "https://cloud.google.com/training/free", desc: "Free Google Cloud courses and labs." },
    ]
  }
};

const LEVEL_COLORS = {
  "Beginner":     { bg: "rgba(74,222,128,0.1)",  color: "#4ade80"  },
  "Intermediate": { bg: "rgba(251,191,36,0.1)",  color: "#fbbf24"  },
  "Advanced":     { bg: "rgba(248,113,113,0.1)", color: "#f87171"  },
};

export default function FreeCourses() {
  const [selected, setSelected] = useState("software");
  const [search,   setSearch]   = useState("");
  const career = COURSES[selected];
  const navigate = useNavigate();

  const filtered = career.courses.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.platform.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ padding: "44px 20px 36px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 60%)" }}>
        <div className="badge" style={{ marginBottom: 14 }}>🎓 100% Free Resources</div>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, marginBottom: 12 }}>
          Free Courses for Every{" "}
          <span style={{ background: "linear-gradient(90deg,#f59e0b,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Tech Career
          </span>
        </h1>
        <p style={{ color: "#64748b", fontSize: 15, maxWidth: 460, margin: "0 auto" }}>
          Handpicked free courses from Google, Harvard, Coursera and more. No paid courses — just the best free ones that actually get you hired.
        </p>
      </div>

      <div style={{ maxWidth: 1050, margin: "0 auto", padding: "28px 20px 60px" }}>

        {/* Career selector */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
          {Object.entries(COURSES).map(([id, c]) => (
            <button key={id} onClick={() => { setSelected(id); setSearch(""); }}
              style={{ padding: "8px 16px", borderRadius: 30, fontSize: 13, fontWeight: 700, background: selected === id ? "linear-gradient(135deg,#f59e0b,#f97316)" : "rgba(255,255,255,0.04)", color: selected === id ? "#0a0a0a" : "#64748b", border: `1px solid ${selected === id ? "transparent" : "rgba(255,255,255,0.08)"}`, boxShadow: "none", transform: "none", transition: "all 0.2s" }}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Career intro */}
        <div style={{ background: `rgba(${career.color === "#6366f1" ? "99,102,241" : career.color === "#0891b2" ? "8,145,178" : career.color === "#e11d48" ? "225,29,72" : career.color === "#059669" ? "5,150,105" : career.color === "#7c3aed" ? "124,58,237" : career.color === "#d97706" ? "217,119,6" : "2,132,199"},0.08)`, border: `1px solid ${career.color}25`, borderRadius: 14, padding: "16px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24, flexShrink: 0 }}>💡</span>
          <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.65 }}>
            <strong style={{ color: career.color }}>Where to start:</strong> {career.intro}
          </p>
        </div>

        {/* Search */}
        <div style={{ marginBottom: 20 }}>
          <input type="text" placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ maxWidth: 360, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
        </div>

        {/* Courses grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 14 }}>
          {filtered.map((course, i) => {
            const lvl = LEVEL_COLORS[course.level] || LEVEL_COLORS.Beginner;
            return (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px", display: "flex", flexDirection: "column", gap: 10, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${career.color}40`; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = "none"; }}>

                {/* Top row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}>
                    {course.tag}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: lvl.bg, color: lvl.color }}>
                    {course.level}
                  </span>
                </div>

                {/* Title */}
                <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: "#f1f5f9", lineHeight: 1.3 }}>
                  {course.name}
                </h4>

                {/* Platform + duration */}
                <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#475569" }}>
                  <span>🏫 {course.platform}</span>
                  <span>⏱️ {course.duration}</span>
                </div>

                {/* Description */}
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65, flex: 1 }}>{course.desc}</p>

                {/* Button */}
                <a href={course.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", textAlign: "center", padding: "10px", borderRadius: 10, background: "linear-gradient(135deg,#f59e0b,#f97316)", color: "#0a0a0a", fontWeight: 700, fontSize: 13, textDecoration: "none", marginTop: "auto" }}>
                  Start Learning Free →
                </a>
              </div>
            );
          })}
        </div>

        {/* Bottom tip */}
        <div style={{ marginTop: 32, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "16px 20px" }}>
          <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.75 }}>
            💡 <strong style={{ color: "#f59e0b" }}>Pro Tip:</strong> Don't try to finish multiple courses at once. Pick ONE course, complete it fully, then move to the next. Consistency beats perfection every time! 🎯
          </p>
        </div>
      </div>
    </div>
  );
}
