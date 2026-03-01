import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <Link to={isLoggedIn ? "/home" : "/"} className="logo">
        🚀 SkillFinder
      </Link>
      <div className="nav-links">
        {isLoggedIn ? (
          <>
            <Link to="/home">Home</Link>
            <Link to="/explore" style={{ color: "#facc15" }}>🧭 Explore</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/heatmap" style={{ color: "#f97316" }}>🔥 Heatmap</Link>
            <Link to="/interview" style={{ color: "#a78bfa" }}>🤖 Interview</Link>
            <Link to="/quiz">🎯 Quiz</Link>
            <Link to="/roadmap">🗺️ Roadmap</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/upload">Resume</Link>
            <Link to="/about">About</Link>
            <span onClick={handleLogout} style={{ cursor: "pointer", color: "#94a3b8" }}>Logout</span>
          </>
        ) : (
          <>
            <Link to="/">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
}
