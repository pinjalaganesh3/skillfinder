import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Signup() {
  const navigate = useNavigate();
  const [step,    setStep]    = useState(1);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const [form, setForm] = useState({
    fullName: "", username: "", age: "",
    qualification: "", skills: "", email: "", password: ""
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const passwordValid =
    form.password.length >= 5 &&
    /^[A-Z]/.test(form.password);

  const nextStep = (toStep) => {
    setError("");
    // Basic validation before moving forward
    if (toStep === 2 && (!form.fullName.trim() || !form.username.trim())) {
      setError("Please fill in your Full Name and Username."); return;
    }
    if (toStep === 3 && (!form.age || !form.qualification)) {
      setError("Please fill in Age and Qualification."); return;
    }
    setStep(toStep);
  };

  const handleSignup = async () => {
    if (!form.email.trim() || !form.password.trim()) {
      setError("Please enter your email and password."); return;
    }
    if (!passwordValid) {
      setError("Password must start with a capital letter and be 5+ characters."); return;
    }

    setLoading(true);
    setError("");

    // 1. Create Supabase auth user
    const { data, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    // 2. Save profile to `profiles` table
    const { error: profileError } = await supabase.from("profiles").insert({
      id:            user.id,
      full_name:     form.fullName,
      username:      form.username,
      email:         form.email,
      age:           Number(form.age),
      qualification: form.qualification,
      skills:        form.skills.split(",").map(s => s.trim()).filter(Boolean)
    });

    // Also save to `students` table as backup (for login fallback)
    await supabase.from("students").insert({
      name:          form.fullName,
      username:      form.username,
      email:         form.email,
      age:           Number(form.age),
      qualification: form.qualification,
      password:      form.password
    }).then(() => {}).catch(() => {}); // silent — profiles table is primary

    setLoading(false);

    if (profileError) {
      // Profile save failed but auth succeeded — still let them in
      console.warn("Profile save warning:", profileError.message);
    }

    // Save to localStorage and go home
    localStorage.setItem("isLoggedIn",       "true");
    localStorage.setItem("userEmail",         form.email);
    localStorage.setItem("userName",          form.fullName);
    localStorage.setItem("userQualification", form.qualification);
    navigate("/home");
    window.location.reload();
  };

  // Step indicator style
  const stepStyle = (n) => ({
    fontSize: 12,
    fontWeight: 700,
    padding: "4px 14px",
    borderRadius: 20,
    background: step >= n ? "linear-gradient(90deg,#facc15,#f97316)" : "rgba(255,255,255,0.08)",
    color: step >= n ? "#0f172a" : "#475569",
    transition: "all 0.3s"
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #0f172a, #020617)",
      display: "flex", justifyContent: "center", alignItems: "center",
      padding: 20, fontFamily: "'Poppins', sans-serif"
    }}>
      <div style={{
        width: "100%", maxWidth: 400,
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 20, padding: "36px 32px",
        color: "white",
        boxShadow: "0 24px 60px rgba(0,0,0,0.5)"
      }}>

        {/* Title */}
        <h2 style={{
          textAlign: "center", marginBottom: 6, fontSize: 24, fontWeight: 900,
          background: "linear-gradient(90deg,#facc15,#f97316)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>
          🚀 Student Registration
        </h2>
        <p style={{ textAlign: "center", color: "#475569", fontSize: 13, marginBottom: 24 }}>
          Create your free SkillFinder account
        </p>

        {/* Step indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
          <span style={stepStyle(1)}>1. Basic</span>
          <span style={stepStyle(2)}>2. Academic</span>
          <span style={stepStyle(3)}>3. Account</span>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 10, marginBottom: 28 }}>
          <div style={{
            height: "100%", borderRadius: 10,
            background: "linear-gradient(90deg,#facc15,#f97316)",
            width: `${((step - 1) / 2) * 100}%`,
            transition: "width 0.4s ease"
          }} />
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(239,68,68,0.15)", border: "1px solid #ef4444",
            color: "#fca5a5", padding: "10px 14px", borderRadius: 10,
            fontSize: 13, marginBottom: 16
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* ── STEP 1: Basic Info ── */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={labelStyle}>Full Name</label>
              <input name="fullName" placeholder="e.g. Arjun Kumar" onChange={handleChange} value={form.fullName} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Username</label>
              <input name="username" placeholder="e.g. arjun_dev" onChange={handleChange} value={form.username} style={inputStyle} />
            </div>
            <button onClick={() => nextStep(2)} style={btnStyle}>Next →</button>
          </div>
        )}

        {/* ── STEP 2: Academic ── */}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={labelStyle}>Age</label>
              <input name="age" type="number" placeholder="e.g. 20" onChange={handleChange} value={form.age} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Qualification</label>
              <select name="qualification" onChange={handleChange} value={form.qualification} style={{ ...inputStyle, cursor: "pointer" }}>
                <option value="">Select Qualification</option>
                <option>Diploma in CSE</option>
                <option>Diploma in ECE</option>
                <option>Diploma in EEE</option>
                <option>B.Tech</option>
                <option>B.Sc Computer Science</option>
                <option>MCA</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Skills <span style={{ color: "#475569", fontWeight: 400 }}>(comma separated)</span></label>
              <input name="skills" placeholder="e.g. React, Python, Figma" onChange={handleChange} value={form.skills} style={inputStyle} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setStep(1)} style={{ ...btnStyle, background: "rgba(255,255,255,0.08)", color: "#94a3b8", flex: 1 }}>← Back</button>
              <button onClick={() => nextStep(3)} style={{ ...btnStyle, flex: 2 }}>Next →</button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Account ── */}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input name="email" type="email" placeholder="you@email.com" onChange={handleChange} value={form.email} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Password</label>
              <input name="password" type="password" placeholder="Starts with capital, 5+ chars" onChange={handleChange} value={form.password} style={inputStyle} />
              <p style={{ fontSize: 11, marginTop: 5, color: passwordValid ? "#4ade80" : "#f87171" }}>
                {form.password.length === 0
                  ? "Must start with a capital letter and be 5+ characters"
                  : passwordValid
                  ? "✓ Password looks good!"
                  : "✗ Must start with capital & be 5+ characters"}
              </p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setStep(2)} style={{ ...btnStyle, background: "rgba(255,255,255,0.08)", color: "#94a3b8", flex: 1 }}>← Back</button>
              <button onClick={handleSignup} disabled={loading} style={{ ...btnStyle, flex: 2, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
                {loading ? "Creating..." : "Create Account 🚀"}
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#475569" }}>
          Already have an account?{" "}
          <span onClick={() => navigate("/")} style={{ color: "#facc15", fontWeight: 700, cursor: "pointer" }}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block", fontSize: 12, color: "#94a3b8",
  fontWeight: 600, marginBottom: 6, letterSpacing: "0.04em"
};

const inputStyle = {
  width: "100%", padding: "12px 14px", borderRadius: 10,
  border: "1.5px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.06)",
  color: "white", fontSize: 14, outline: "none",
  boxSizing: "border-box", boxShadow: "none", margin: 0,
  fontFamily: "'Poppins', sans-serif"
};

const btnStyle = {
  width: "100%", padding: "13px", borderRadius: 10, border: "none",
  background: "linear-gradient(90deg,#facc15,#f97316)",
  color: "#0f172a", fontWeight: 900, fontSize: 14,
  cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s"
};
