import { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────────────────────────
//  SkillBot — Fully offline AI career advisor
//  No API calls. No CORS. Works 100% in the browser.
//  Smart keyword matching with rich, detailed responses.
// ─────────────────────────────────────────────────────────────

const KNOWLEDGE = [
  // ── DATA ANALYST ──────────────────────────────────────────
  {
    patterns: ["data analyst", "data analysis", "become data analyst", "data analyst skills", "what does data analyst"],
    answer: `📊 **Data Analyst Career Guide**

To become a Data Analyst you need:

**Core Skills:**
• SQL — must know, used every single day
• Python (pandas, numpy, matplotlib)
• Excel (pivot tables, VLOOKUP, charts)
• Power BI or Tableau for dashboards

**Learning Path:**
1. Learn SQL first (W3Schools, SQLZoo — free)
2. Python basics → pandas for data (Kaggle free course)
3. Pick Power BI or Tableau (both have free versions)
4. Do 2–3 real projects on Kaggle datasets
5. Apply on Naukri, LinkedIn, Internshala

**Salary in India:**
Fresher: ₹3–6 LPA | Mid: ₹6–14 LPA | Senior: ₹14–25 LPA

📌 Tip: Get the Google Data Analytics Certificate on Coursera — many Indian companies recognize it!`
  },

  // ── SOFTWARE DEVELOPER ────────────────────────────────────
  {
    patterns: ["software developer", "software engineer", "become developer", "learn coding", "how to code", "programming"],
    answer: `💻 **Software Developer Roadmap**

**Start Here (Month 1–2):**
• Pick ONE language: Python (easier) or JavaScript (web)
• Learn variables, loops, functions, conditions
• Free: CS50 Harvard (YouTube) or FreeCodeCamp

**Build Core Skills (Month 3–5):**
• Data structures: arrays, objects, lists
• Git & GitHub — essential for every job
• HTML + CSS for web basics

**Get Job-Ready (Month 6–8):**
• Learn React.js (frontend) OR Node.js (backend)
• Build 3 projects and host them free on Netlify/Vercel
• Create a GitHub portfolio

**Apply On:**
LinkedIn, Internshala, Wellfound, Naukri

**Salary:** Fresher ₹4–10 LPA | After 2 years ₹10–25 LPA

📌 Pro tip: One good deployed project > 10 unfinished ones!`
  },

  // ── PYTHON ────────────────────────────────────────────────
  {
    patterns: ["python", "learn python", "python for beginners", "python skills"],
    answer: `🐍 **Python — The Most In-Demand Skill**

Python is used in: Data Science, AI/ML, Web Dev, Automation, Cybersecurity

**Learn in this order:**
1. Variables, data types, conditions, loops
2. Functions and modules
3. File handling, error handling
4. Libraries: pandas, numpy (data) OR Django/Flask (web)

**Free Resources:**
• Python.org official tutorial
• FreeCodeCamp Python full course (YouTube)
• Kaggle Python micro-course (free + certificate)

**Time to learn basics:** 4–6 weeks with daily practice

**Jobs that need Python:**
Data Analyst, ML Engineer, Backend Dev, Automation Engineer

**Average Salary:** ₹5–22 LPA depending on specialization

📌 Practice daily on HackerRank or LeetCode — even 30 mins/day makes a huge difference!`
  },

  // ── REACT ─────────────────────────────────────────────────
  {
    patterns: ["react", "reactjs", "react vs vue", "react vs angular", "frontend developer", "frontend development"],
    answer: `⚛️ **React.js — King of Frontend**

React is made by Meta and is the most hired frontend skill globally.

**React vs Vue vs Angular:**
• React — Most jobs, huge community, flexible ✅ (recommended)
• Vue — Easier to learn, fewer jobs in India
• Angular — Used in enterprise, steeper learning curve

**React Learning Path:**
1. Learn JavaScript basics first (arrays, functions, DOM)
2. React basics: components, props, state
3. React Hooks: useState, useEffect, useContext
4. React Router for navigation
5. Connect to an API (fetch/axios)

**Free Resources:**
• React official docs (react.dev) — very beginner friendly
• FreeCodeCamp React course (YouTube)

**Time:** ~2–3 months to build real projects

**Salary:** ₹5–20 LPA | Remote jobs available worldwide

📌 This very SkillFinder website is built with React! 🚀`
  },

  // ── UI/UX DESIGN ──────────────────────────────────────────
  {
    patterns: ["ui ux", "ui/ux", "design", "figma", "become designer", "ux designer", "user experience"],
    answer: `🎨 **UI/UX Design Career Guide**

**What UI/UX designers do:**
Design how apps and websites look and feel. UI = visuals, UX = how easy it is to use.

**Skills You Need:**
• Figma — industry standard design tool (free)
• Color theory, typography, layout grids
• User research and personas
• Prototyping and wireframing
• Basic HTML/CSS (bonus — makes you more hireable)

**Learning Path:**
1. Learn Figma (YouTube: Figma tutorials — free)
2. Study 10 great apps — analyze why they feel good
3. Complete Google UX Design Certificate (Coursera)
4. Build 3 case studies (redesign an existing app)
5. Post on Behance and Dribbble

**Salary in India:** ₹3–16 LPA | Remote design jobs are plentiful

**Tools:** Figma, Adobe XD, Framer, Webflow

📌 Tip: Your portfolio matters MORE than your degree in design. Show your process, not just the final result!`
  },

  // ── MACHINE LEARNING / AI ─────────────────────────────────
  {
    patterns: ["machine learning", "ml", "artificial intelligence", "ai", "deep learning", "data science", "data scientist"],
    answer: `🤖 **AI/ML Career Guide**

This is the hottest field in tech right now.

**Prerequisites:**
• Python (must know)
• Basic statistics & probability
• Linear algebra basics

**Learning Path:**
1. Python with NumPy & Pandas (1 month)
2. Statistics basics — mean, variance, distributions (2 weeks)
3. Scikit-learn for ML models (1 month)
4. Andrew Ng's ML course on Coursera (free to audit)
5. Work on Kaggle competitions
6. TensorFlow or PyTorch for deep learning

**Key Concepts to Learn:**
Linear Regression → Classification → Clustering → Neural Networks → NLP → Computer Vision

**Free Resources:**
• Kaggle Learn (free, has certificate)
• Fast.ai (practical deep learning)
• Google ML Crash Course

**Salary:** ₹8–40 LPA | One of highest paying fields

📌 LLMs and GenAI are exploding right now — learn prompt engineering too!`
  },

  // ── FLUTTER / MOBILE ──────────────────────────────────────
  {
    patterns: ["flutter", "mobile development", "mobile app", "app development", "android", "ios", "react native"],
    answer: `📱 **Mobile Development Guide**

**Flutter vs React Native:**
• Flutter (Google) — Best performance, single codebase for iOS + Android, growing fast ✅
• React Native (Meta) — Good if you already know React/JS

**Flutter Learning Path:**
1. Learn Dart language basics (1–2 weeks, very easy)
2. Flutter widgets, layouts, navigation
3. State management: Provider or Riverpod
4. Connect to Firebase (backend)
5. Publish your app to Play Store (₹1,700 one-time fee)

**Free Resources:**
• Flutter official docs (flutter.dev)
• FreeCodeCamp Flutter full course (YouTube)
• Angela Yu's Flutter course (Udemy — watch for sales)

**Time to first app:** 6–8 weeks

**Salary:** ₹4–18 LPA | Lots of freelance opportunities

📌 Build a useful app, publish it, and put the Play Store link on your resume — instant credibility!`
  },

  // ── CYBERSECURITY ─────────────────────────────────────────
  {
    patterns: ["cybersecurity", "ethical hacking", "hacking", "security", "network security", "cyber"],
    answer: `🔐 **Cybersecurity Career Guide**

One of the fastest growing and highest paying fields!

**Core Skills:**
• Networking basics (TCP/IP, DNS, HTTP)
• Linux command line — essential
• Python for scripting
• Understanding of web vulnerabilities (OWASP Top 10)

**Learning Path:**
1. CompTIA Security+ certification (most recognized)
2. Learn Linux (TryHackMe — gamified, free tier)
3. Networking: CCNA basics
4. Ethical hacking: Kali Linux, Metasploit
5. Bug bounty programs for practice (HackerOne)

**Free Practice:**
• TryHackMe.com — gamified hacking challenges ✅
• HackTheBox — advanced CTF challenges
• PortSwigger Web Security Academy (free)

**Certifications:** CompTIA Security+, CEH, OSCP (most respected)

**Salary:** ₹5–25 LPA | Very high demand in banking & IT sectors

📌 Never test on systems you don't own! Always use legal practice environments.`
  },

  // ── FIRST JOB ─────────────────────────────────────────────
  {
    patterns: ["first job", "no experience", "fresher", "how to get job", "get hired", "job with no experience", "fresher job"],
    answer: `🚀 **How to Get Your First Tech Job (No Experience)**

This is possible — thousands do it every year. Here's how:

**Step 1 — Build something real**
Make 2–3 projects and deploy them online (free with Netlify/Vercel). A live project > a degree.

**Step 2 — GitHub profile**
Recruiters check GitHub. Have at least 3 repos with good READMEs.

**Step 3 — Resume tips**
• 1 page only
• List projects with live links
• Use Flowcv.io (free, looks professional)
• Mention: tools used, what it does, impact

**Step 4 — Apply smartly**
• Internshala — best for India freshers
• LinkedIn (message recruiters directly)
• Wellfound/AngelList — startups hire freshers
• Company career pages directly

**Step 5 — Interview prep**
• Practice on LeetCode (Easy problems)
• Study system design basics
• Prepare: "Tell me about your project" answer

**Timeline:** Most dedicated freshers get their first offer in 3–6 months.

📌 Rejection is normal. Apply to 50+ places. Every rejection teaches you something!`
  },

  // ── SALARY ────────────────────────────────────────────────
  {
    patterns: ["salary", "how much", "pay", "lpa", "income", "earn"],
    answer: `💰 **Tech Salaries in India (2025)**

| Role               | Fresher     | 2–3 years   | Senior      |
|:-------------------|:------------|:------------|:------------|
| Software Developer | ₹4–8 LPA    | ₹10–18 LPA  | ₹20–40 LPA  |
| Data Analyst       | ₹3–6 LPA    | ₹6–14 LPA   | ₹14–25 LPA  |
| ML Engineer        | ₹6–10 LPA   | ₹12–22 LPA  | ₹25–50 LPA  |
| UI/UX Designer     | ₹3–5 LPA    | ₹6–12 LPA   | ₹12–22 LPA  |
| Flutter Developer  | ₹4–7 LPA    | ₹8–16 LPA   | ₹16–28 LPA  |
| Cybersecurity      | ₹4–7 LPA    | ₹8–18 LPA   | ₹18–35 LPA  |
| DevOps/Cloud       | ₹5–9 LPA    | ₹10–20 LPA  | ₹22–45 LPA  |

**Top paying companies in India:**
Google, Microsoft, Amazon, Flipkart, Razorpay, Zepto, Swiggy

📌 Skills > Degree for salary in tech. A strong portfolio can get you a ₹8 LPA offer even without a tier-1 college.`
  },

  // ── RESUME ────────────────────────────────────────────────
  {
    patterns: ["resume", "cv", "portfolio", "resume tips", "how to make resume"],
    answer: `📄 **Resume & Portfolio Tips**

**Resume Rules:**
• Keep it to 1 page only
• Use a clean template — Flowcv.io or Novoresume (free)
• No photo needed for international jobs
• Start each bullet with an action verb (Built, Designed, Reduced)

**Must-Have Sections:**
1. Contact (email, GitHub, LinkedIn, portfolio link)
2. Skills (list your actual tech stack)
3. Projects (2–3 with live links)
4. Education
5. Certifications (optional but good)

**For Projects, Write:**
"Built a [what] using [tech] that [achievement/impact]"
Example: "Built a job search app using React + Supabase with 3 live job APIs"

**Portfolio:**
• GitHub — keep it clean with pinned repos
• Behance/Dribbble — for designers
• Personal website — use GitHub Pages (free)

**Resume Tools:**
• Flowcv.io ✅ (best free option)
• Canva resume templates
• LinkedIn's resume builder

📌 Tailor your resume for each job — match keywords from the job description!`
  },

  // ── DEVOPS / CLOUD ────────────────────────────────────────
  {
    patterns: ["devops", "cloud", "aws", "docker", "kubernetes", "azure", "gcp"],
    answer: `☁️ **DevOps & Cloud Career Guide**

One of the highest paying paths in tech!

**Core Skills:**
• Linux command line (learn this first)
• Git & version control
• Docker (containerization)
• AWS, Azure, or GCP (pick one)
• CI/CD pipelines (GitHub Actions, Jenkins)
• Kubernetes (container orchestration)

**Learning Path:**
1. Linux basics → Shell scripting (1 month)
2. Docker fundamentals (2 weeks)
3. AWS Certified Cloud Practitioner (free prep on YouTube)
4. Terraform for infrastructure as code
5. Kubernetes basics

**Free Resources:**
• AWS Free Tier — practice for free
• KodeKloud — best DevOps learning platform
• TechWorld with Nana (YouTube) — amazing DevOps tutorials

**Certifications:**
AWS CCP → AWS Solutions Architect → CKA (Kubernetes)

**Salary:** ₹6–45 LPA | Very high demand globally

📌 Cloud skills + Python scripting = extremely hireable combo!`
  },

  // ── SQL ───────────────────────────────────────────────────
  {
    patterns: ["sql", "database", "mysql", "postgresql", "mongodb"],
    answer: `🗄️ **SQL & Database Guide**

SQL is needed in almost EVERY tech job. Learn it!

**SQL Basics to Know:**
• SELECT, WHERE, ORDER BY, GROUP BY
• JOINs (INNER, LEFT, RIGHT) — very important
• Aggregate functions: COUNT, SUM, AVG, MAX, MIN
• Subqueries and CTEs
• Indexes for performance

**Free Learning:**
• W3Schools SQL (sqlzoo.net) — interactive
• Mode Analytics SQL Tutorial (free)
• LeetCode SQL problems (interview prep)

**SQL vs NoSQL:**
• SQL (MySQL, PostgreSQL) — structured data, most business apps
• NoSQL (MongoDB) — flexible, used in modern web apps

**Practice:**
• SQLiteOnline.com — practice in browser
• Kaggle SQL course — free with certificate

**Used By:** Data Analysts, Backend Devs, Data Scientists, DBAs

📌 Being strong in SQL alone can get you a ₹4–8 LPA Data Analyst role in India!`
  },

  // ── CERTIFICATION ─────────────────────────────────────────
  {
    patterns: ["certification", "certificate", "course", "online course", "best course"],
    answer: `🎓 **Best Free/Affordable Certifications**

**Completely Free:**
• Google Data Analytics Certificate (Coursera — audit free)
• Google UX Design Certificate (Coursera — audit free)
• AWS Cloud Practitioner Essentials (AWS Skill Builder)
• Meta Frontend Developer Certificate (Coursera — audit free)
• Kaggle Courses — Python, ML, SQL, Data Viz

**Worth Paying For (watch for sales on Udemy):**
• Angela Yu's courses (Python, Flutter, Web Dev)
• Jose Portilla's Python Data Science Bootcamp
• Udemy courses go on sale for ₹499–699 regularly!

**Free Platforms:**
• freeCodeCamp.org — Web Dev, Data Science
• The Odin Project — Full Stack Web Dev
• CS50 (Harvard) — Computer Science basics
• NPTEL — Indian university courses, free + certificate

**For Interviews:**
• LeetCode (coding problems)
• HackerRank (has skill certificates employers check)

📌 Don't collect certificates — build projects. One real project > five certificates!`
  },

  // ── GIT / GITHUB ──────────────────────────────────────────
  {
    patterns: ["git", "github", "version control"],
    answer: `🐙 **Git & GitHub — Essential for Every Developer**

Every tech job requires Git. Learn it early!

**Key Commands:**
\`git init\` — start a repo
\`git add .\` — stage changes  
\`git commit -m "message"\` — save changes
\`git push\` — upload to GitHub
\`git pull\` — get latest changes
\`git branch\` — create/switch branches
\`git merge\` — combine branches

**GitHub Profile Tips:**
• Pin your best 6 repos
• Add a README to every project
• Write a profile README (GitHub supports it)
• Commit regularly — the green contribution graph matters to recruiters

**Free Learning:**
• GitHub's own learning lab (lab.github.com)
• Atlassian Git tutorials (free, very good)

📌 Recruiters look at your GitHub before your resume. Make it count!`
  },

  // ── COMPARE CAREERS ───────────────────────────────────────
  {
    patterns: ["which career", "best career", "which field", "career choice", "what to choose", "compare"],
    answer: `🤔 **Which Tech Career Is Right For You?**

**Choose Software Dev if:** You love building things, solving logical problems, and seeing your code come to life

**Choose Data Science if:** You like patterns, numbers, and finding hidden insights in data

**Choose UI/UX if:** You're creative, care about how things look AND feel, and love making things easier to use

**Choose Mobile Dev if:** You want your work on people's phones used daily

**Choose Cybersecurity if:** You think like a detective, love finding weaknesses, and want to protect systems

**Choose AI/ML if:** You want to be at the absolute cutting edge of technology

**Fastest to get a job:** Software Dev or Data Analyst
**Highest paying fresher:** ML Engineer or Cloud/DevOps
**Easiest to freelance:** UI/UX or Mobile Dev
**Most in demand in India 2025:** Software Dev, Data Analyst, Cloud

📌 Take the Career Quiz on SkillFinder — it'll match you in 2 minutes! 🎯`
  },

  // ── LINKEDIN ──────────────────────────────────────────────
  {
    patterns: ["linkedin", "profile", "networking", "connect recruiters"],
    answer: `💼 **LinkedIn Tips for Students**

LinkedIn gets you jobs. Here's how to use it properly:

**Profile Essentials:**
• Professional photo (clear face, good lighting)
• Headline: "React Developer | Building [X]" not just "Student"
• About section: 3–4 lines about your skills and goals
• Add ALL your projects with descriptions and links
• Get 3+ skill endorsements from friends/classmates

**Getting Noticed:**
• Post about your projects — even small ones get views
• Comment on posts by companies you want to work for
• Connect with 5 new people in tech per week
• Message recruiters directly: keep it short and specific

**Message Template:**
"Hi [Name], I'm a [role] fresher with skills in [X]. I noticed [Company] is hiring. I'd love to connect and learn more about opportunities. Here's my portfolio: [link]"

**Follow:** Companies you want to work for, tech influencers in India

📌 500+ connections looks much better than 50. Start connecting now!`
  },

  // ── INTERNSHIP ────────────────────────────────────────────
  {
    patterns: ["internship", "intern", "internshala", "stipend"],
    answer: `🎯 **How to Get Tech Internships in India**

**Best Platforms:**
• Internshala — best for Indian students ✅
• LinkedIn — filter by "Internship"
• Wellfound (AngelList) — startups
• LetsIntern, HelloIntern
• Company websites directly

**Stipend Ranges (2025):**
• Web Dev intern: ₹5,000–20,000/month
• Data Science intern: ₹8,000–25,000/month
• UI/UX intern: ₹5,000–15,000/month
• Remote internships can pay even more

**How to Stand Out:**
• Apply with a customized cover letter (2–3 lines)
• Have at least 1 project to show
• Apply to 20–30 places — response rate is ~10%
• Follow up after 1 week if no reply

**Free Internships:** Some unpaid internships from good startups give great experience + referral letters — worth it early on

📌 An internship at a known company is worth more than a year of certificates!`
  },

  // ── GREETINGS ─────────────────────────────────────────────
  {
    patterns: ["hi", "hello", "hey", "hii", "good morning", "good evening", "what's up", "sup"],
    answer: `Hey! 👋 Welcome to SkillBot!

I'm your AI career advisor. I can help you with:

• 📊 **Career guidance** — which tech field suits you
• 🗺️ **Learning roadmaps** — step by step plans
• 💼 **Job search tips** — how to get hired in India
• 💰 **Salary info** — what to expect as a fresher
• 📄 **Resume & portfolio** advice
• 🎓 **Best free courses** and certifications

Just ask me anything! For example:
👉 "What skills do I need for data analyst?"
👉 "How to get first job with no experience?"
👉 "Compare React vs Flutter"`
  },

  // ── THANKS ────────────────────────────────────────────────
  {
    patterns: ["thanks", "thank you", "thank u", "thx", "helpful", "awesome", "great"],
    answer: `You're welcome bro! 😊🔥

Keep grinding — your first tech job is closer than you think!

Remember:
✅ Build real projects
✅ Stay consistent — even 1 hour daily adds up
✅ Don't compare your day 1 to someone's day 1000

You've got this! 💪

Anything else I can help with? Ask me about careers, skills, salaries or job tips!`
  },

  // ── DEFAULT ───────────────────────────────────────────────
  {
    patterns: [],
    answer: `Hmm, I'm not sure about that specific topic! 🤔

But I can definitely help you with:

• 💻 **Tech careers** — Software Dev, Data Science, Design, Mobile, AI/ML, Cybersecurity
• 🗺️ **Learning paths** — step by step roadmaps for each field
• 💰 **Salaries** — what freshers and seniors earn in India
• 💼 **Getting hired** — resume tips, portfolio advice, interview prep
• 🎓 **Free courses** — best resources to learn any skill

Try asking something like:
👉 "What skills do I need for data analyst?"
👉 "How long to learn Python?"
👉 "How to get first tech job?"`,
  },
];

// ── Smart matcher ──────────────────────────────────────────
function getResponse(userInput) {
  const input = userInput.toLowerCase().trim();

  // Score each knowledge item
  let bestScore = 0;
  let bestAnswer = null;

  for (const item of KNOWLEDGE) {
    if (item.patterns.length === 0) continue;
    let score = 0;
    for (const pattern of item.patterns) {
      if (input.includes(pattern)) score += pattern.split(" ").length * 10;
      else {
        const words = pattern.split(" ");
        const matched = words.filter(w => input.includes(w)).length;
        score += matched * 3;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = item.answer;
    }
  }

  // Fallback if nothing matched well
  if (bestScore === 0) {
    return KNOWLEDGE[KNOWLEDGE.length - 1].answer;
  }
  return bestAnswer;
}

// ── Typing effect simulation ───────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

const SUGGESTED = [
  "What skills do I need for data analyst?",
  "How to get first job with no experience?",
  "Compare React vs Flutter",
  "Best certifications for freshers",
  "Python or JavaScript — which to learn first?",
  "How much salary for software developer?",
];

// ── Message formatter ──────────────────────────────────────
function FormatMessage({ text }) {
  const lines = text.split("\n");
  return (
    <div>
      {lines.map((line, i) => {
        // Bold headers **text**
        if (line.startsWith("**") && line.endsWith("**")) {
          return <div key={i} style={{ fontWeight: 700, color: "#f1f5f9", marginBottom: 6, marginTop: i > 0 ? 10 : 0 }}>{line.slice(2, -2)}</div>;
        }
        // Bold inline **text** within line
        if (line.includes("**")) {
          const parts = line.split(/\*\*(.*?)\*\*/g);
          return (
            <div key={i} style={{ marginBottom: 4 }}>
              {parts.map((part, j) =>
                j % 2 === 1
                  ? <strong key={j} style={{ color: "#f1f5f9", fontWeight: 700 }}>{part}</strong>
                  : <span key={j}>{part}</span>
              )}
            </div>
          );
        }
        // Bullet points
        if (line.startsWith("• ")) {
          return (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4, paddingLeft: 4 }}>
              <span style={{ color: "#facc15", flexShrink: 0, marginTop: 1 }}>•</span>
              <span>{line.slice(2)}</span>
            </div>
          );
        }
        // Table rows
        if (line.startsWith("|")) {
          const cells = line.split("|").filter(c => c.trim() && !c.includes("---"));
          if (cells.length > 0) {
            return (
              <div key={i} style={{ display: "flex", gap: 0, marginBottom: 2, fontSize: 12 }}>
                {cells.map((cell, j) => (
                  <div key={j} style={{ flex: 1, padding: "3px 6px", borderBottom: "1px solid rgba(255,255,255,0.06)", color: j === 0 ? "#94a3b8" : "#64748b" }}>
                    {cell.trim()}
                  </div>
                ))}
              </div>
            );
          }
          return null;
        }
        // Numbered
        if (/^\d+\./.test(line)) {
          return <div key={i} style={{ marginBottom: 4, paddingLeft: 4 }}>{line}</div>;
        }
        // Emoji lines
        if (line.startsWith("📌")) {
          return <div key={i} style={{ marginTop: 10, padding: "8px 12px", background: "rgba(250,204,21,0.06)", border: "1px solid rgba(250,204,21,0.15)", borderRadius: 8, fontSize: 12, color: "#94a3b8" }}>{line}</div>;
        }
        // Empty line
        if (!line.trim()) return <div key={i} style={{ height: 6 }} />;
        return <div key={i} style={{ marginBottom: 4 }}>{line}</div>;
      })}
    </div>
  );
}

export default function ChatBot() {
  const [open,    setOpen]    = useState(false);
  const [msgs,    setMsgs]    = useState([
    { role: "assistant", content: `Hey! 👋 I'm **SkillBot** — your AI career advisor.

Ask me anything about tech careers in India!

👉 "What skills for data analyst?"
👉 "How to get first tech job?"
👉 "Which career suits me?"` }
  ]);
  const [input,   setInput]   = useState("");
  const [typing,  setTyping]  = useState(false);
  const [hasNew,  setHasNew]  = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
      setTimeout(() => inputRef.current?.focus(), 200);
      setHasNew(false);
    }
  }, [msgs, open]);

  const sendMessage = async (text) => {
    const msg = (text || input).trim();
    if (!msg || typing) return;
    setInput("");
    setMsgs(prev => [...prev, { role: "user", content: msg }]);
    setTyping(true);

    // Simulate thinking delay (feels natural)
    await sleep(600 + Math.random() * 500);
    const reply = getResponse(msg);
    setMsgs(prev => [...prev, { role: "assistant", content: reply }]);
    setTyping(false);
    if (!open) setHasNew(true);
  };

  return (
    <>
      {/* ── FLOAT BUTTON ── */}
      <div
        onClick={() => { setOpen(o => !o); setHasNew(false); }}
        style={{
          position:"fixed", bottom:28, right:28, zIndex:1000,
          width:58, height:58, borderRadius:"50%",
          background:"linear-gradient(135deg,#facc15,#f97316)",
          display:"flex", alignItems:"center", justifyContent:"center",
          cursor:"pointer", fontSize:24,
          boxShadow:"0 8px 32px rgba(249,115,22,0.5)",
          transition:"all 0.25s",
          transform: open ? "scale(0.9) rotate(15deg)" : "scale(1)"
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = open ? "scale(0.9)" : "scale(1)"}
      >
        {open ? "✕" : "💬"}
        {hasNew && !open && (
          <div style={{ position:"absolute", top:2, right:2, width:14, height:14, background:"#ef4444", borderRadius:"50%", border:"2px solid #000" }} />
        )}
      </div>

      {/* ── CHAT WINDOW ── */}
      {open && (
        <div style={{
          position:"fixed", bottom:100, right:28, zIndex:999,
          width:"min(390px, calc(100vw - 40px))",
          height:"min(560px, calc(100vh - 140px))",
          background:"rgba(0,0,0,0.85)",
          backdropFilter:"blur(28px)",
          WebkitBackdropFilter:"blur(28px)",
          border:"1px solid rgba(255,255,255,0.08)",
          borderRadius:22,
          boxShadow:"0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(250,204,21,0.05) inset",
          display:"flex", flexDirection:"column",
          animation:"chatOpen 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          overflow:"hidden"
        }}>

          {/* Header */}
          <div style={{
            padding:"16px 20px", flexShrink:0,
            background:"rgba(255,255,255,0.03)",
            borderBottom:"1px solid rgba(255,255,255,0.07)",
            display:"flex", alignItems:"center", gap:12
          }}>
            <div style={{
              width:40, height:40, borderRadius:"50%", flexShrink:0,
              background:"linear-gradient(135deg,#facc15,#f97316)",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:20
            }}>🤖</div>
            <div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, color:"#f1f5f9", fontSize:15 }}>SkillBot</div>
              <div style={{ fontSize:11, color:"#16a34a", display:"flex", alignItems:"center", gap:5 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#16a34a", display:"inline-block" }} />
                AI Career Advisor · Always Online
              </div>
            </div>
            <button
              onClick={() => setMsgs([{ role:"assistant", content:"Chat cleared! Ask me anything about tech careers. 🚀" }])}
              style={{ marginLeft:"auto", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"#64748b", borderRadius:8, padding:"4px 10px", cursor:"pointer", fontSize:11, fontWeight:600, boxShadow:"none" }}
            >
              Clear
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex:1, overflowY:"auto", padding:"16px", display:"flex", flexDirection:"column", gap:14 }}>
            {msgs.map((msg, i) => (
              <div key={i} style={{ display:"flex", justifyContent:msg.role==="user"?"flex-end":"flex-start", gap:8 }}>
                {msg.role === "assistant" && (
                  <div style={{ width:28, height:28, borderRadius:"50%", background:"linear-gradient(135deg,#facc15,#f97316)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0, marginTop:2 }}>🤖</div>
                )}
                <div style={{
                  maxWidth:"82%",
                  padding: msg.role==="user" ? "10px 14px" : "14px 16px",
                  borderRadius: msg.role==="user" ? "18px 18px 4px 18px" : "4px 18px 18px 18px",
                  background: msg.role==="user"
                    ? "linear-gradient(135deg,#facc15,#f97316)"
                    : "rgba(255,255,255,0.05)",
                  border: msg.role==="assistant" ? "1px solid rgba(255,255,255,0.07)" : "none",
                  color: msg.role==="user" ? "#0a0a0a" : "#94a3b8",
                  fontSize:13, lineHeight:1.65,
                  fontWeight: msg.role==="user" ? 600 : 400,
                }}>
                  {msg.role === "assistant"
                    ? <FormatMessage text={msg.content} />
                    : msg.content
                  }
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:28, height:28, borderRadius:"50%", background:"linear-gradient(135deg,#facc15,#f97316)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>🤖</div>
                <div style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.07)", padding:"12px 16px", borderRadius:"4px 18px 18px 18px", display:"flex", gap:5, alignItems:"center" }}>
                  {[0,1,2].map(n => (
                    <div key={n} style={{ width:7, height:7, borderRadius:"50%", background:"#facc15", animation:"bounce 1.2s infinite", animationDelay:`${n*0.2}s`, opacity:0.7 }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions — show when few messages */}
          {msgs.length <= 2 && !typing && (
            <div style={{ padding:"0 14px 10px", display:"flex", gap:6, flexWrap:"wrap", flexShrink:0 }}>
              {SUGGESTED.slice(0,3).map(s => (
                <button key={s} onClick={() => sendMessage(s)} style={{
                  padding:"5px 10px", borderRadius:20, fontSize:11, fontWeight:600,
                  background:"rgba(255,255,255,0.04)", color:"#64748b",
                  border:"1px solid rgba(255,255,255,0.08)", cursor:"pointer",
                  transition:"0.2s", textAlign:"left", boxShadow:"none",
                  whiteSpace:"nowrap", overflow:"hidden", maxWidth:170,
                  textOverflow:"ellipsis"
                }}
                onMouseEnter={e => { e.currentTarget.style.color="#facc15"; e.currentTarget.style.borderColor="rgba(250,204,21,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.color="#64748b"; e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; }}
                >
                  {s.slice(0,28)}…
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding:"12px 14px", borderTop:"1px solid rgba(255,255,255,0.07)", display:"flex", gap:8, flexShrink:0 }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key==="Enter" && !e.shiftKey && sendMessage()}
              placeholder="Ask about careers, skills, salaries..."
              style={{
                flex:1, padding:"10px 14px", borderRadius:12, margin:0,
                background:"rgba(255,255,255,0.05)",
                border:"1.5px solid rgba(255,255,255,0.08)",
                color:"#f1f5f9", fontSize:13, outline:"none",
                fontFamily:"'DM Sans', sans-serif",
              }}
              onFocus={e => e.target.style.borderColor="#facc15"}
              onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.08)"}
            />
            <button
              onClick={() => sendMessage()}
              disabled={typing || !input.trim()}
              style={{
                width:42, height:42, borderRadius:12, border:"none", flexShrink:0,
                background: input.trim() ? "linear-gradient(135deg,#facc15,#f97316)" : "rgba(255,255,255,0.05)",
                color: input.trim() ? "#0a0a0a" : "#475569",
                cursor: input.trim() ? "pointer" : "not-allowed",
                fontSize:18, display:"flex", alignItems:"center", justifyContent:"center",
                transition:"all 0.2s", boxShadow:"none", padding:0
              }}
            >
              {typing ? "⏳" : "➤"}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chatOpen {
          from { opacity:0; transform:scale(0.85) translateY(20px); transform-origin: bottom right; }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes bounce {
          0%,80%,100% { transform:translateY(0); }
          40%          { transform:translateY(-6px); }
        }
      `}</style>
    </>
  );
}
