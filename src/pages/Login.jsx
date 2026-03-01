import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../styles/auth.css";

export default function Login() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { user } = await loginUser({ email, password });
      localStorage.setItem("isLoggedIn",       "true");
      localStorage.setItem("userEmail",         email);
      localStorage.setItem("userName",          user.name          || user.full_name || user.email?.split("@")[0] || "");
      localStorage.setItem("userQualification", user.qualification || "");
      navigate("/home");
      window.location.reload();
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    }

    setLoading(false);
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={handleLogin}>

        {/* Logo */}
        <h1 className="auth-title">🚀 SkillFinder</h1>
        <p className="auth-subtitle">Find jobs that match your skills</p>

        {/* Error */}
        {error && <div className="auth-error">⚠️ {error}</div>}

        {/* Email */}
        <div className="auth-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="auth-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="auth-btn" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <div className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
