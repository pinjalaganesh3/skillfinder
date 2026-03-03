import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar     from "./components/Navbar";
import Footer     from "./components/Footer";
import ChatBot    from "./components/ChatBot";
import Login      from "./pages/Login";
import Signup     from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Home       from "./pages/Home";
import Jobs       from "./pages/Jobs";
import Dashboard  from "./pages/Dashboard";
import ResumeUpload   from "./pages/ResumeUpload";
import ExploreCareers from "./pages/ExploreCareers";
import CareerQuiz     from "./pages/CareerQuiz";
import Roadmap        from "./pages/Roadmap";
import About          from "./pages/About";
import MockInterview  from "./pages/MockInterview";
import SkillsHeatmap  from "./pages/SkillsHeatmap";
import SavedJobs      from "./pages/SavedJobs";
import FreeCourses    from "./pages/FreeCourses";
import StudyPlanner   from "./pages/StudyPlanner";

function Protected({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

function AppShell() {
  const location   = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const hideLayout = ["/", "/signup", "/onboarding"].includes(location.pathname);
  const showChat   = isLoggedIn && !hideLayout;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!hideLayout && <Navbar />}

      <main style={{ flex: 1 }}>
        <Routes>
          {/* Public */}
          <Route path="/"         element={<Login />} />
          <Route path="/signup"   element={<Signup />} />
          <Route path="/onboarding" element={<Protected><Onboarding /></Protected>} />

          {/* Protected */}
          <Route path="/home"      element={<Protected><Home /></Protected>} />
          <Route path="/jobs"      element={<Protected><Jobs /></Protected>} />
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="/upload"    element={<Protected><ResumeUpload /></Protected>} />
          <Route path="/explore"   element={<Protected><ExploreCareers /></Protected>} />
          <Route path="/quiz"      element={<Protected><CareerQuiz /></Protected>} />
          <Route path="/roadmap"   element={<Protected><Roadmap /></Protected>} />
          <Route path="/about"     element={<Protected><About /></Protected>} />
          <Route path="/interview" element={<Protected><MockInterview /></Protected>} />
          <Route path="/heatmap"   element={<Protected><SkillsHeatmap /></Protected>} />
          <Route path="/saved"     element={<Protected><SavedJobs /></Protected>} />
          <Route path="/courses"   element={<Protected><FreeCourses /></Protected>} />
          <Route path="/planner"   element={<Protected><StudyPlanner /></Protected>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
      {showChat && <ChatBot />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
