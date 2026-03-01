import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchAllJobs } from "../services/jobService";

const QUICK_SEARCHES = [
  { label: "💻 React Dev",       term: "react developer" },
  { label: "🐍 Python",          term: "python developer" },
  { label: "📊 Data Analyst",    term: "data analyst" },
  { label: "🎨 UI/UX",           term: "ui ux designer" },
  { label: "📱 Flutter",         term: "flutter developer" },
  { label: "🔐 Cybersecurity",   term: "cybersecurity" },
  { label: "☁️ AWS / DevOps",    term: "aws devops" },
  { label: "🤖 Machine Learning",term: "machine learning" },
  { label: "📱 Android",         term: "android developer" },
  { label: "🌐 Full Stack",      term: "full stack developer" },
];

const SOURCE_META = {
  Adzuna:   { emoji: "🇮🇳", label: "India",  color: "#4ade80", bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.2)"  },
  Remotive: { emoji: "🌍", label: "Remote", color: "#60a5fa", bg: "rgba(96,165,250,0.1)",  border: "rgba(96,165,250,0.2)"  },
  Jooble:   { emoji: "🔎", label: "Jooble", color: "#facc15", bg: "rgba(250,204,21,0.1)",  border: "rgba(250,204,21,0.2)"  },
};

function timeAgo(dateStr) {
  if (!dateStr) return null;
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7)  return `${days}d ago`;
  if (days < 30) return `${Math.floor(days/7)}w ago`;
  return `${Math.floor(days/30)}mo ago`;
}

export default function Jobs() {
  const [jobs,     setJobs]     = useState([]);
  const [keyword,  setKeyword]  = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [searched, setSearched] = useState(false);
  const [filter,   setFilter]   = useState("All");
  const [sort,     setSort]     = useState("relevance"); // relevance | newest

  const location = useLocation();
  const params   = new URLSearchParams(location.search);
  const urlQuery = params.get("search") || params.get("keyword");

  const doSearch = async (term) => {
    if (!term?.trim()) return;
    setLoading(true);
    setError("");
    setSearched(true);
    setKeyword(term);
    setFilter("All");
    const results = await fetchAllJobs(term);
    if (results.length === 0) setError("No matching jobs found. Try a broader keyword.");
    setJobs(results);
    setLoading(false);
  };

  useEffect(() => { if (urlQuery) doSearch(urlQuery); }, [urlQuery]);

  // Filter + sort
  const filtered = jobs
    .filter(j => filter === "All" || j.source === filter)
    .sort((a, b) => {
      if (sort === "newest") {
        return new Date(b.posted || 0) - new Date(a.posted || 0);
      }
      return 0; // relevance already sorted by service
    });

  const countFor = src => jobs.filter(j => j.source === src).length;

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* ── HEADER ── */}
      <div style={{
        padding: "52px 24px 44px", textAlign: "center",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position:"absolute", top:-80, left:"50%", transform:"translateX(-50%)", width:500, height:260, background:"radial-gradient(ellipse, rgba(250,204,21,0.08), transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"relative" }}>
          <div className="badge" style={{ marginBottom:16 }}>💼 Live Job Board</div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(28px,5vw,52px)", fontWeight:900, lineHeight:1.1, marginBottom:14 }}>
            Find Your <span style={{ background:"linear-gradient(90deg,#facc15,#f97316)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Perfect Job</span>
          </h1>
          <p style={{ color:"#475569", fontSize:16, marginBottom:36, maxWidth:480, margin:"0 auto 36px" }}>
            Real jobs from India and worldwide — filtered, ranked by relevance, and deduplicated for you.
          </p>

          {/* Search bar */}
          <div style={{
            display:"flex", maxWidth:660, margin:"0 auto",
            background:"rgba(255,255,255,0.05)", backdropFilter:"blur(20px)",
            border:"1.5px solid rgba(255,255,255,0.1)", borderRadius:16,
            padding:"6px 6px 6px 22px",
            boxShadow:"0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(250,204,21,0.04)"
          }}>
            <input
              type="text"
              placeholder="Search by skill, role, or company..."
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && doSearch(keyword)}
              style={{
                flex:1, border:"none", outline:"none",
                background:"transparent", color:"#f1f5f9",
                fontSize:15, padding:"8px 0",
                boxShadow:"none", margin:0, width:"100%"
              }}
            />
            <button onClick={() => doSearch(keyword)} style={{ padding:"12px 28px", borderRadius:12, fontWeight:800, fontSize:14, flexShrink:0 }}>
              Search →
            </button>
          </div>

          {/* Quick search chips */}
          <div style={{ marginTop:20, display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", maxWidth:700, margin:"20px auto 0" }}>
            {QUICK_SEARCHES.map(q => (
              <span
                key={q.term}
                onClick={() => { setKeyword(q.term); doSearch(q.term); }}
                style={{
                  padding:"6px 14px", borderRadius:30, fontSize:12, fontWeight:600,
                  background: keyword === q.term ? "linear-gradient(135deg,#facc15,#f97316)" : "rgba(255,255,255,0.05)",
                  color: keyword === q.term ? "#0a0a0a" : "#64748b",
                  border: `1px solid ${keyword === q.term ? "transparent" : "rgba(255,255,255,0.08)"}`,
                  cursor:"pointer", transition:"all 0.2s", whiteSpace:"nowrap"
                }}
                onMouseEnter={e => { if (keyword !== q.term) { e.currentTarget.style.color="#facc15"; e.currentTarget.style.borderColor="rgba(250,204,21,0.3)"; }}}
                onMouseLeave={e => { if (keyword !== q.term) { e.currentTarget.style.color="#64748b"; e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; }}}
              >
                {q.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"32px 24px 60px" }}>

        {/* ── LOADING ── */}
        {loading && (
          <div style={{ textAlign:"center", padding:"80px 20px" }}>
            <div style={{ display:"inline-flex", flexDirection:"column", alignItems:"center", gap:20 }}>
              <div style={{ display:"flex", gap:10 }}>
                {["🇮🇳 Adzuna","🌍 Remotive","🔎 Jooble"].map((s,i) => (
                  <div key={s} style={{
                    padding:"10px 18px", borderRadius:12, fontSize:13, fontWeight:600,
                    background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
                    color:"#475569", animation:"pulse 1.4s ease-in-out infinite",
                    animationDelay:`${i*0.2}s`
                  }}>{s}</div>
                ))}
              </div>
              <p style={{ color:"#475569", fontSize:15 }}>
                Searching for <strong style={{ color:"#facc15" }}>"{keyword}"</strong> across all sources...
              </p>
            </div>
          </div>
        )}

        {/* ── EMPTY STATE ── */}
        {!loading && !searched && (
          <div style={{ textAlign:"center", padding:"80px 20px" }}>
            <div style={{ fontSize:64, marginBottom:16 }}>🔍</div>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:22, marginBottom:10, color:"#f1f5f9" }}>Search for any skill or role</h3>
            <p style={{ color:"#475569", fontSize:15, maxWidth:380, margin:"0 auto" }}>
              Jobs from India and worldwide will appear here, ranked by how well they match your search.
            </p>
          </div>
        )}

        {/* ── ERROR ── */}
        {error && !loading && (
          <div style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:14, padding:"18px 22px", marginBottom:24, color:"#fca5a5", fontSize:14 }}>
            ⚠️ {error}
          </div>
        )}

        {/* ── RESULTS ── */}
        {!loading && searched && filtered.length > 0 && (
          <>
            {/* Results header + filters */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:16, marginBottom:24 }}>
              <div>
                <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:22, marginBottom:4 }}>
                  Results for <span style={{ color:"#facc15" }}>"{keyword}"</span>
                </h2>
                <p style={{ color:"#475569", fontSize:13 }}>
                  {filtered.length} relevant jobs · Ranked by match quality
                </p>
              </div>

              <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
                {/* Source filter */}
                <div style={{ display:"flex", gap:6, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, padding:4 }}>
                  {["All", "Adzuna", "Remotive", "Jooble"].map(src => {
                    const meta = SOURCE_META[src];
                    const count = src === "All" ? jobs.length : countFor(src);
                    return (
                      <button
                        key={src}
                        onClick={() => setFilter(src)}
                        style={{
                          padding:"6px 14px", borderRadius:9, fontSize:12, fontWeight:700,
                          background: filter === src ? "linear-gradient(135deg,#facc15,#f97316)" : "transparent",
                          color: filter === src ? "#0a0a0a" : "#475569",
                          border:"none", cursor:"pointer", transition:"all 0.2s",
                          whiteSpace:"nowrap"
                        }}
                      >
                        {src === "All" ? `All (${count})` : `${meta.emoji} ${meta.label} (${count})`}
                      </button>
                    );
                  })}
                </div>

                {/* Sort */}
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  style={{ padding:"8px 14px", borderRadius:10, fontSize:12, width:"auto", fontWeight:600 }}
                >
                  <option value="relevance">Sort: Relevance</option>
                  <option value="newest">Sort: Newest</option>
                </select>
              </div>
            </div>

            {/* Job grid */}
            <div className="job-grid">
              {filtered.map((job, i) => {
                const meta = SOURCE_META[job.source] || SOURCE_META.Remotive;
                const ago  = timeAgo(job.posted);
                return (
                  <div
                    key={job.id || i}
                    className="job-card"
                    style={{ animationDelay:`${i * 40}ms` }}
                  >
                    {/* Top row */}
                    <div>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12, gap:8 }}>
                        {/* Company avatar */}
                        <div style={{
                          width:42, height:42, borderRadius:10, flexShrink:0,
                          background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)",
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:18, fontWeight:800, color:"#facc15",
                          fontFamily:"'Syne',sans-serif"
                        }}>
                          {job.company?.[0]?.toUpperCase() || "?"}
                        </div>
                        {/* Source badge */}
                        <span style={{
                          fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:20,
                          background: meta.bg, color: meta.color, border:`1px solid ${meta.border}`,
                          letterSpacing:"0.06em", whiteSpace:"nowrap"
                        }}>
                          {meta.emoji} {meta.label}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 style={{ fontSize:15, lineHeight:1.4, marginBottom:8, fontFamily:"'Syne',sans-serif" }}>
                        {job.title}
                      </h4>

                      {/* Info rows */}
                      <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom:12 }}>
                        <p style={{ fontSize:13, color:"#64748b", display:"flex", alignItems:"center", gap:6 }}>
                          <span style={{ fontSize:15 }}>🏢</span> {job.company}
                        </p>
                        <p style={{ fontSize:13, color:"#64748b", display:"flex", alignItems:"center", gap:6 }}>
                          <span style={{ fontSize:15 }}>📍</span> {job.location}
                        </p>
                        <p style={{ fontSize:13, color:"#64748b", display:"flex", alignItems:"center", gap:6 }}>
                          <span style={{ fontSize:15 }}>💼</span> {job.type}
                          {ago && <span style={{ color:"#334155", fontSize:12 }}>· {ago}</span>}
                        </p>
                        {job.salary && (
                          <p style={{ fontSize:13, color:"#4ade80", fontWeight:700, display:"flex", alignItems:"center", gap:6 }}>
                            <span style={{ fontSize:15 }}>💰</span> {job.salary}
                          </p>
                        )}
                      </div>

                      {/* Skill tags */}
                      {job.skills?.length > 0 && (
                        <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:4 }}>
                          {job.skills.slice(0, 4).map(s => (
                            <span key={s} className="tag">{s}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Apply button */}
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginTop:16 }}
                    >
                      Apply Now →
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Load more hint */}
            {filtered.length >= 20 && (
              <div style={{ textAlign:"center", marginTop:36, padding:"20px", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:14 }}>
                <p style={{ color:"#475569", fontSize:14, marginBottom:12 }}>
                  Showing {filtered.length} jobs. Try a more specific search to narrow results.
                </p>
                <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
                  {["senior " + keyword, keyword + " intern", keyword + " remote"].map(s => (
                    <span
                      key={s}
                      onClick={() => { setKeyword(s); doSearch(s); }}
                      style={{ padding:"7px 16px", borderRadius:30, fontSize:12, fontWeight:600, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"#64748b", cursor:"pointer" }}
                    >
                      🔍 "{s}"
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
