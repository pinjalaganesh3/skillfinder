import { useNavigate } from "react-router-dom";

const STATS = [
  { value:"6+",   label:"Career Fields",   icon:"🎯" },
  { value:"3",    label:"Job APIs",         icon:"🌐" },
  { value:"Free", label:"Always Free",      icon:"💚" },
  { value:"AI",   label:"Powered By",       icon:"🤖" },
];

const FEATURES = [
  { icon:"🔍", title:"Live Job Search",      desc:"Real-time results from Adzuna, Remotive & Jooble — Indian + global jobs combined." },
  { icon:"🎯", title:"Career Quiz",          desc:"5-question personality quiz that matches you to your best-fit tech career." },
  { icon:"🗺️", title:"Interactive Roadmap",  desc:"Step-by-step learning plans with checkboxes to track your progress." },
  { icon:"🧭", title:"Industry Explorer",    desc:"Deep-dives into 6 tech fields — roadmaps, skills, salaries explained simply." },
  { icon:"📄", title:"Resume Analyzer",      desc:"Upload your resume, get instant career suggestions from keyword detection." },
  { icon:"🤖", title:"AI Mock Interview",    desc:"Real questions, live timer, AI scoring across 4 dimensions with written feedback." },
  { icon:"🔥", title:"Skills Heatmap",       desc:"Visual demand map of 35+ tech skills with growth % and salary ranges." },
  { icon:"💬", title:"AI Career Chatbot",    desc:"Ask any career question and get instant answers from Claude AI." },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight:"100vh" }}>
      {/* Header */}
      <div style={{ padding:"60px 24px 50px", textAlign:"center", position:"relative", overflow:"hidden", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ position:"absolute", top:-100, left:"50%", transform:"translateX(-50%)", width:600, height:300, background:"radial-gradient(ellipse, rgba(250,204,21,0.08), transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"relative" }}>
          <div className="badge" style={{ marginBottom:18 }}>ℹ️ About SkillFinder</div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(28px,5vw,52px)", fontWeight:900, lineHeight:1.1, marginBottom:16 }}>
            Built to Help Students<br />
            <span style={{ background:"linear-gradient(90deg,#facc15,#f97316)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Find Their Career Path
            </span>
          </h1>
          <p style={{ color:"#475569", fontSize:16, maxWidth:500, margin:"0 auto 44px", lineHeight:1.7 }}>
            A free platform helping tech students in India discover careers, learn roadmaps, and find real jobs — all in one place.
          </p>
          {/* Stats */}
          <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
            {STATS.map(s => (
              <div key={s.label} style={{ background:"rgba(255,255,255,0.04)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:"22px 32px", minWidth:120 }}>
                <div style={{ fontSize:28, marginBottom:4 }}>{s.icon}</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:30, fontWeight:900, color:"#facc15" }}>{s.value}</div>
                <div style={{ fontSize:12, color:"#475569", marginTop:4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:980, margin:"50px auto 60px", padding:"0 24px" }}>
        {/* Mission */}
        <div style={{ background:"rgba(250,204,21,0.04)", border:"1px solid rgba(250,204,21,0.15)", borderRadius:20, padding:"36px 40px", marginBottom:32, backdropFilter:"blur(20px)" }}>
          <h2 style={{ fontSize:22, marginBottom:14 }}>🎯 Our Mission</h2>
          <p style={{ color:"#64748b", fontSize:16, lineHeight:1.8 }}>
            Many students finish their diploma or degree without knowing which career suits them or how to get there.
            SkillFinder bridges that gap — giving every student access to career guidance, real job listings,
            personalized roadmaps, and AI-powered tools to get hired, completely free.
          </p>
        </div>

        {/* Features */}
        <h2 style={{ fontSize:22, marginBottom:20 }}>✨ Platform Features</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:14, marginBottom:40 }}>
          {FEATURES.map(f => (
            <div key={f.title} className="job-card" style={{ padding:"22px 20px" }}>
              <div style={{ fontSize:28, marginBottom:10 }}>{f.icon}</div>
              <h4 style={{ fontSize:14, marginBottom:8 }}>{f.title}</h4>
              <p style={{ fontSize:13, lineHeight:1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:14, marginBottom:40 }}>
          {[
            { title:"Built With",     items:["React.js + Vite","Supabase Auth & DB","Adzuna API","Remotive API","Jooble API","Claude AI"] },
            { title:"Designed For",   items:["Diploma Students","Engineering Students","Career Switchers","First-Gen Techies"] },
            { title:"Core Principle", items:["Free Forever","No Ads","Real Data","AI-Powered","Student First"] },
          ].map(b => (
            <div key={b.title} className="job-card" style={{ padding:"22px 20px" }}>
              <h4 style={{ fontSize:12, fontWeight:700, color:"#facc15", marginBottom:14, textTransform:"uppercase", letterSpacing:"0.08em" }}>{b.title}</h4>
              {b.items.map(item => (
                <div key={item} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:"linear-gradient(90deg,#facc15,#f97316)", flexShrink:0 }} />
                  <span style={{ color:"#64748b", fontSize:13 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:"44px", textAlign:"center", backdropFilter:"blur(20px)" }}>
          <h2 style={{ fontSize:24, marginBottom:12 }}>Ready to find your path?</h2>
          <p style={{ color:"#475569", fontSize:15, marginBottom:28 }}>Start with the quiz, explore roadmaps, and search real jobs — all free.</p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => navigate("/quiz")}    style={{ padding:"12px 28px" }}>🎯 Take the Quiz</button>
            <button onClick={() => navigate("/explore")} style={{ padding:"12px 28px", background:"rgba(255,255,255,0.05)", color:"#f1f5f9", border:"1px solid rgba(255,255,255,0.1)" }}>🧭 Explore Careers</button>
            <button onClick={() => navigate("/interview")} style={{ padding:"12px 28px", background:"rgba(255,255,255,0.05)", color:"#f1f5f9", border:"1px solid rgba(255,255,255,0.1)" }}>🤖 Mock Interview</button>
          </div>
        </div>
      </div>
    </div>
  );
}
