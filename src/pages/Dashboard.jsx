import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { fetchIndianJobs, fetchRemoteJobs } from "../services/jobService";

export default function Dashboard() {
  const [indiaJobs,    setIndiaJobs]    = useState([]);
  const [globalJobs,   setGlobalJobs]   = useState([]);
  const [loadingIndia,  setLoadingIndia]  = useState(true);
  const [loadingGlobal, setLoadingGlobal] = useState(true);
  const [studentData,  setStudentData]  = useState(null);
  const navigate = useNavigate();

  const email         = localStorage.getItem("userEmail")         || "";
  const savedName     = localStorage.getItem("userName")          || "";
  const savedQual     = localStorage.getItem("userQualification") || "";

  useEffect(() => {
    // Fetch student profile from Supabase
    const fetchProfile = async () => {
      if (!email) return;
      const { data } = await supabase
        .from("students")
        .select("*")
        .eq("email", email)
        .single();
      if (data) {
        setStudentData(data);
        localStorage.setItem("userName",          data.name         || "");
        localStorage.setItem("userQualification", data.qualification || "");
      }
    };

    // Fetch Indian jobs via Adzuna
    const loadIndian = async () => {
      const jobs = await fetchIndianJobs("developer");
      setIndiaJobs(jobs);
      setLoadingIndia(false);
    };

    // Fetch global remote jobs via Remotive
    const loadGlobal = async () => {
      const jobs = await fetchRemoteJobs("developer");
      setGlobalJobs(jobs.slice(0, 6));
      setLoadingGlobal(false);
    };

    fetchProfile();
    loadIndian();
    loadGlobal();
  }, []);

  const displayName = studentData?.name || savedName || email.split("@")[0];
  const displayQual = studentData?.qualification || savedQual;

  return (
    <div className="dashboard-container">

      {/* PROFILE CARD */}
      <div className="profile-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14 }}>
          <div>
            <h2>👋 Welcome back, {displayName}!</h2>
            <p style={{ marginTop: 8 }}>📧 {email}</p>
            {displayQual && <p>🎓 {displayQual}</p>}
            <p style={{ marginTop: 6 }}>🎯 Your personalised job picks are ready below</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={() => navigate("/interview")} style={{ padding: "10px 18px", fontSize: 14 }}>🤖 Mock Interview</button>
            <button onClick={() => navigate("/heatmap")}   style={{ padding: "10px 18px", fontSize: 14, background: "white", color: "#1e293b" }}>🔥 Skills Heatmap</button>
            <button onClick={() => navigate("/explore")}   style={{ padding: "10px 18px", fontSize: 14, background: "white", color: "#1e293b" }}>🧭 Explore Careers</button>
          </div>
        </div>
      </div>

      {/* INDIA JOBS — Adzuna */}
      <div className="section-block">
        <h3 className="section-title">🇮🇳 Top Jobs in India <span style={{ fontSize: 12, fontWeight: 400, color: "#64748b", marginLeft: 8 }}>via Adzuna</span></h3>
        {loadingIndia && <p style={{ color: "#475569" }}>⏳ Loading Indian jobs...</p>}
        {!loadingIndia && indiaJobs.length === 0 && (
          <p style={{ color: "#64748b", fontSize: 14 }}>Couldn't load live jobs. <a href="https://www.adzuna.in" target="_blank" rel="noreferrer" style={{ color: "#f97316" }}>Browse on Adzuna →</a></p>
        )}
        <div className="job-grid">
          {indiaJobs.slice(0, 6).map((job, i) => (
            <div key={job.id || i} className="job-card">
              <h4>{job.title}</h4>
              <p>🏢 {job.company}</p>
              <p>📍 {job.location}</p>
              {job.salary && <p>💰 {job.salary}</p>}
              <a href={job.url} target="_blank" rel="noreferrer">Apply Now →</a>
            </div>
          ))}
        </div>
      </div>

      {/* GLOBAL JOBS — Remotive */}
      <div className="section-block">
        <h3 className="section-title">🌍 International Remote Jobs <span style={{ fontSize: 12, fontWeight: 400, color: "#64748b", marginLeft: 8 }}>via Remotive</span></h3>
        {loadingGlobal && <p style={{ color: "#475569" }}>⏳ Loading remote jobs...</p>}
        {!loadingGlobal && globalJobs.length === 0 && (
          <p style={{ color: "#64748b", fontSize: 14 }}>Couldn't load live jobs. <a href="https://remotive.com" target="_blank" rel="noreferrer" style={{ color: "#f97316" }}>Browse on Remotive →</a></p>
        )}
        <div className="job-grid">
          {globalJobs.map((job, i) => (
            <div key={job.id || i} className="job-card">
              <h4>{job.title}</h4>
              <p>🏢 {job.company}</p>
              <p>📍 {job.location}</p>
              <p>💼 {job.type}</p>
              {job.skills?.length > 0 && <span className="tag">{job.skills[0]}</span>}
              <a href={job.url} target="_blank" rel="noreferrer">Apply Now →</a>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="section-block">
        <h3 className="section-title">⚡ Search Jobs by Skill</h3>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { label: "💻 Software",   search: "software developer" },
            { label: "📊 Data",        search: "data analyst" },
            { label: "🎨 Design",      search: "ui ux designer" },
            { label: "📱 Mobile",      search: "flutter developer" },
            { label: "🔐 Security",    search: "cybersecurity" },
            { label: "🤖 AI / ML",     search: "machine learning" },
            { label: "☁️ DevOps",      search: "devops cloud" },
            { label: "🧪 QA Testing",  search: "qa testing" },
          ].map(item => (
            <button
              key={item.search}
              onClick={() => navigate(`/jobs?search=${encodeURIComponent(item.search)}`)}
              style={{ padding: "10px 18px", fontSize: 14 }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
