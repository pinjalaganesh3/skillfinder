import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllJobs } from "../services/jobService";

const CATEGORIES = [
  { label: "💻 Software",      search: "software developer" },
  { label: "📊 Data Science",  search: "data analyst" },
  { label: "🎨 UI/UX Design",  search: "ui ux designer" },
  { label: "📱 Mobile Dev",    search: "flutter developer" },
  { label: "🔐 Cybersecurity", search: "cybersecurity" },
  { label: "🤖 AI / ML",       search: "machine learning" },
  { label: "☁️ DevOps",        search: "devops cloud" },
  { label: "🧪 QA Testing",    search: "qa testing" },
];

const FEATURES = [
  { icon:"💼", title:"Find Real Jobs",    desc:"Live jobs from Adzuna, Remotive & Jooble — 3 sources at once.",  path:"/jobs",      btn:"Browse Jobs" },
  { icon:"🧭", title:"Explore Careers",  desc:"Step-by-step roadmaps for every field in tech.",                  path:"/explore",   btn:"Explore Now" },
  { icon:"🤖", title:"Mock Interview",   desc:"5 real questions, live timer, AI scoring & instant feedback.",    path:"/interview", btn:"Start Now" },
  { icon:"🔥", title:"Skills Heatmap",   desc:"See which skills are hottest in the job market right now.",       path:"/heatmap",   btn:"View Heatmap" },
  { icon:"📄", title:"Resume Analyzer",  desc:"Upload your resume, get AI-powered career suggestions.",          path:"/upload",    btn:"Analyze" },
  { icon:"🎯", title:"Career Quiz",      desc:"5 quick questions to discover your perfect tech career.",         path:"/quiz",      btn:"Take Quiz" },
];

const HOT_SKILLS = ["Python","React","Figma","SQL","Flutter","Node.js","Java","Machine Learning","AWS","TypeScript"];

export default function Home() {
  const navigate = useNavigate();
  const [search,     setSearch]     = useState("");
  const [jobs,       setJobs]       = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [searched,   setSearched]   = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const name = localStorage.getItem("userName") || "";

  const doSearch = async (term) => {
    if (!term?.trim()) return;
    setLoading(true);
    setSearched(true);
    setSearchTerm(term);
    const results = await fetchAllJobs(term);
    setJobs(results.slice(0, 6));
    setLoading(false);
  };

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <div style={{
        position: "relative", overflow: "hidden",
        padding: "80px 24px 70px", textAlign: "center",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        {/* Glow orbs */}
        <div style={{ position:"absolute", top:"-80px", left:"50%", transform:"translateX(-50%)", width:"600px", height:"300px", background:"radial-gradient(ellipse, rgba(250,204,21,0.1) 0%, transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-40px", left:"10%", width:"300px", height:"200px", background:"radial-gradient(ellipse, rgba(249,115,22,0.06) 0%, transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-40px", right:"10%", width:"300px", height:"200px", background:"radial-gradient(ellipse, rgba(250,204,21,0.05) 0%, transparent 70%)", pointerEvents:"none" }} />

        <div style={{ position:"relative", zIndex:1 }}>
          {/* Badge */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(250,204,21,0.08)", border:"1px solid rgba(250,204,21,0.2)", borderRadius:30, padding:"6px 18px", marginBottom:28 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#facc15", display:"inline-block", boxShadow:"0 0 8px #facc15" }} />
            <span style={{ fontSize:12, color:"#facc15", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" }}>AI-Powered Career Platform</span>
          </div>

          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(32px,6vw,64px)", fontWeight:900, lineHeight:1.1, margin:"0 0 18px", color:"#f1f5f9" }}>
            {name ? `Hey ${name} 👋` : "Find Your"}<br />
            <span style={{ background:"linear-gradient(90deg,#facc15,#f97316)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              {name ? "Let's Get You Hired 🚀" : "Dream Career"}
            </span>
          </h1>

          <p style={{ color:"#475569", fontSize:17, maxWidth:520, margin:"0 auto 40px", lineHeight:1.7 }}>
            Type any skill — Python, React, Figma, SQL — and get real jobs from 3 live sources instantly.
          </p>

          {/* Search */}
          <div style={{
            display:"flex", maxWidth:640, margin:"0 auto",
            background:"rgba(255,255,255,0.05)",
            backdropFilter:"blur(20px)",
            border:"1.5px solid rgba(255,255,255,0.1)",
            borderRadius:16, padding:"6px 6px 6px 20px",
            boxShadow:"0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(250,204,21,0.05)"
          }}>
            <input
              type="text"
              placeholder="Search any skill or job role..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === "Enter" && doSearch(search)}
              style={{
                flex:1, border:"none", outline:"none", background:"transparent",
                color:"#f1f5f9", fontSize:15, padding:"8px 0",
                width:"100%", boxShadow:"none", margin:0
              }}
            />
            <button
              onClick={() => doSearch(search)}
              style={{ padding:"12px 26px", borderRadius:12, fontWeight:800, fontSize:14, flexShrink:0 }}
            >
              Search →
            </button>
          </div>

          {/* Hot skill chips */}
          <div style={{ marginTop:20, display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
            {HOT_SKILLS.map(skill => (
              <span
                key={skill}
                onClick={() => { setSearch(skill); doSearch(skill); }}
                style={{
                  background:"rgba(255,255,255,0.04)", color:"#64748b",
                  padding:"5px 14px", borderRadius:20, fontSize:12,
                  cursor:"pointer", border:"1px solid rgba(255,255,255,0.07)",
                  transition:"all 0.2s", fontWeight:500
                }}
                onMouseEnter={e => { e.target.style.color="#facc15"; e.target.style.borderColor="rgba(250,204,21,0.3)"; e.target.style.background="rgba(250,204,21,0.06)"; }}
                onMouseLeave={e => { e.target.style.color="#64748b"; e.target.style.borderColor="rgba(255,255,255,0.07)"; e.target.style.background="rgba(255,255,255,0.04)"; }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ JOB RESULTS ═══ */}
      {(loading || searched) && (
        <div className="page">
          {loading ? (
            <div style={{ textAlign:"center", padding:"40px 0" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:12, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:"16px 28px" }}>
                <div style={{ width:16, height:16, borderRadius:"50%", border:"2px solid #facc15", borderTopColor:"transparent", animation:"spin 0.8s linear infinite" }} />
                <span style={{ color:"#94a3b8", fontSize:15 }}>Searching 3 job sources for "<strong style={{ color:"#facc15" }}>{searchTerm}</strong>"...</span>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, flexWrap:"wrap", gap:10 }}>
                <div>
                  <h2 style={{ marginBottom:4 }}>Results for "<span style={{ color:"#facc15" }}>{searchTerm}</span>"</h2>
                  <p style={{ color:"#475569", fontSize:13 }}>{jobs.length} jobs found across Adzuna · Remotive · Jooble</p>
                </div>
                <button onClick={() => navigate(`/jobs?search=${encodeURIComponent(searchTerm)}`)} style={{ padding:"10px 20px", fontSize:13 }}>
                  See All Results →
                </button>
              </div>
              <div className="job-grid">
                {jobs.map((job, i) => {
                  const srcColors = { Adzuna:{ color:"#4ade80", emoji:"🇮🇳" }, Remotive:{ color:"#60a5fa", emoji:"🌍" }, Jooble:{ color:"#facc15", emoji:"🔎" } };
                  const src = srcColors[job.source] || srcColors.Remotive;
                  return (
                    <div key={job.id || i} className="job-card">
                      <div>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
                          <div style={{ width:40, height:40, borderRadius:10, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Syne',sans-serif", fontWeight:800, color:"#facc15", fontSize:17 }}>
                            {job.company?.[0]?.toUpperCase() || "?"}
                          </div>
                          <span style={{ fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:20, background:`rgba(${src.color === "#4ade80" ? "74,222,128" : src.color === "#60a5fa" ? "96,165,250" : "250,204,21"},0.1)`, color:src.color, border:`1px solid ${src.color}30` }}>
                            {src.emoji} {job.source}
                          </span>
                        </div>
                        <h4 style={{ fontSize:14, marginBottom:8 }}>{job.title}</h4>
                        <p style={{ fontSize:12, color:"#64748b" }}>🏢 {job.company}</p>
                        <p style={{ fontSize:12, color:"#64748b" }}>📍 {job.location}</p>
                        {job.salary && <p style={{ fontSize:12, color:"#4ade80", fontWeight:700 }}>💰 {job.salary}</p>}
                        {job.skills?.length > 0 && <span className="tag" style={{ marginTop:8 }}>{job.skills[0]}</span>}
                      </div>
                      <a href={job.url} target="_blank" rel="noopener noreferrer" style={{ marginTop:14 }}>Apply Now →</a>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {/* ═══ CATEGORIES ═══ */}
      <div className="page">
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, flexWrap:"wrap", gap:8 }}>
          <h2>Browse by Category</h2>
          <span style={{ fontSize:13, color:"#475569" }}>Click to search instantly</span>
        </div>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          {CATEGORIES.map(cat => (
            <div
              key={cat.search}
              onClick={() => { setSearch(cat.search); doSearch(cat.search); window.scrollTo({top:0,behavior:"smooth"}); }}
              className="tag-btn"
            >
              {cat.label}
            </div>
          ))}
        </div>
      </div>

      <hr className="gold-line" />

      {/* ═══ FEATURES ═══ */}
      <div className="page">
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <div className="badge" style={{ marginBottom:14 }}>✦ Platform Features</div>
          <h2 style={{ fontSize:"clamp(22px,4vw,36px)", marginBottom:10 }}>Everything You Need to Get Hired</h2>
          <p style={{ color:"#475569", fontSize:15, maxWidth:480, margin:"0 auto" }}>
            From career discovery to mock interviews — all in one place, completely free.
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16 }}>
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              onClick={() => navigate(f.path)}
              className="job-card"
              style={{ padding:"28px 24px", cursor:"pointer", animationDelay:`${i*60}ms` }}
            >
              <div>
                <div style={{ fontSize:36, marginBottom:14 }}>{f.icon}</div>
                <h4 style={{ fontSize:17, marginBottom:8 }}>{f.title}</h4>
                <p style={{ fontSize:13, lineHeight:1.7, marginBottom:20 }}>{f.desc}</p>
              </div>
              <button
                onClick={e => { e.stopPropagation(); navigate(f.path); }}
                style={{ padding:"9px 20px", fontSize:13, width:"auto" }}
              >
                {f.btn} →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ CTA STRIP ═══ */}
      <div style={{ margin:"40px 24px 60px", maxWidth:1140, marginLeft:"auto", marginRight:"auto" }}>
        <div style={{
          background:"rgba(250,204,21,0.04)", border:"1px solid rgba(250,204,21,0.15)",
          borderRadius:22, padding:"44px 40px", textAlign:"center",
          backdropFilter:"blur(20px)", position:"relative", overflow:"hidden"
        }}>
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 0%, rgba(250,204,21,0.06), transparent 60%)", pointerEvents:"none" }} />
          <h2 style={{ fontSize:"clamp(20px,4vw,34px)", marginBottom:12, position:"relative" }}>
            Not sure which career is right for you?
          </h2>
          <p style={{ color:"#475569", fontSize:15, marginBottom:28, maxWidth:420, margin:"0 auto 28px", position:"relative" }}>
            Take our 2-minute quiz and find your perfect tech career path instantly.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", position:"relative" }}>
            <button onClick={() => navigate("/quiz")} style={{ padding:"14px 32px", fontSize:15 }}>🎯 Take the Quiz</button>
            <button onClick={() => navigate("/explore")} style={{ padding:"14px 32px", fontSize:15, background:"rgba(255,255,255,0.06)", color:"#f1f5f9", border:"1px solid rgba(255,255,255,0.1)" }}>
              🧭 Explore Careers
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
