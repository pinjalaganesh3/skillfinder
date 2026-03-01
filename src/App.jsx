import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import ExploreCareers from "./pages/ExploreCareers";
import CareerQuiz from "./pages/CareerQuiz";
import Roadmap from "./pages/Roadmap";
import About from "./pages/About";
import MockInterview from "./pages/MockInterview";
import SkillsHeatmap from "./pages/SkillsHeatmap";

function Protected({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

function AppShell() {
  const location  = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // These pages hide navbar, footer and chatbot completely
  const authPages = ["/", "/signup"];
  const isAuthPage = authPages.includes(location.pathname);
  const showChat = isLoggedIn && !isAuthPage;

  return (
    <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh" }}>

      {/* ── Navbar only shows when NOT on login/signup ── */}
      {!isAuthPage && <Navbar />}

      <main style={{ flex:1 }}>
        <Routes>
          {/* Public — no navbar */}
          <Route path="/"       element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected — with navbar */}
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

          {/* Catch all unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* ── Footer only shows when NOT on login/signup ── */}
      {!isAuthPage && <Footer />}

      {/* ── Chatbot ── */}
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
