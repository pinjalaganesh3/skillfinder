import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function Login() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const { user } = await loginUser({ email, password });
      localStorage.setItem("isLoggedIn",       "true");
      localStorage.setItem("userEmail",         email);
      localStorage.setItem("userName",          user.name || user.full_name || user.email?.split("@")[0] || "");
      localStorage.setItem("userQualification", user.qualification || "");
      navigate("/home");
      window.location.reload();
    } catch (err) {
      setError(err.message || "Wrong email or password. Try again!");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#0a0a0a" }}>

      {/* Left side — welcome message (hidden on mobile) */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 60px", background: "radial-gradient(ellipse at 30% 50%, rgba(245,158,11,0.08) 0%, transparent 60%)" }} className="login-left">
        <div style={{ maxWidth: 420 }}>
          <div style={{ fontSize: 42, marginBottom: 20 }}>🚀</div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 800, lineHeight: 1.2, marginBottom: 18 }}>
            Your Tech Career<br />
            <span style={{ background: "linear-gradient(90deg,#f59e0b,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Starts Here 🎯
            </span>
          </h1>
          <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
            Whether you just graduated or still studying — SkillFinder helps you find the right career path, learn the right skills, and get hired.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "🎯 Take a quiz to find your career",
              "🗺️ Follow step-by-step learning plans",
              "💼 Find real jobs from India & worldwide",
              "🤖 Practice interviews with AI feedback",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#94a3b8" }}>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side — login form */}
      <div style={{ width: "100%", maxWidth: 440, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 32px", background: "rgba(255,255,255,0.01)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ width: "100%" }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 6 }}>
            Welcome back! 👋
          </h2>
          <p style={{ color: "#475569", fontSize: 14, marginBottom: 28 }}>
            Log in to continue your career journey
          </p>

          {error && (
            <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#fca5a5", padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 18 }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 6 }}>Email Address</label>
              <input type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 6 }}>Password</label>
              <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>

            <button type="submit" disabled={loading} style={{ width: "100%", padding: "13px", fontSize: 15 }}>
              {loading ? "⏳ Logging in..." : "Log In →"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "#475569" }}>
            New here?{" "}
            <Link to="/signup" style={{ color: "#f59e0b", fontWeight: 700, textDecoration: "none" }}>
              Create a free account
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .login-left { display: none !important; }
        }
      `}</style>
    </div>
  );
}
