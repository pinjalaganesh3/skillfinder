# 🚀 SkillFinder — AI Career Platform

> A full-stack career platform built for students to discover tech careers, find real jobs, and get hired.

![SkillFinder](https://img.shields.io/badge/Built%20With-React%20%2B%20Vite-61dafb?style=for-the-badge&logo=react)
![Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E?style=for-the-badge&logo=supabase)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Live Job Search** | Real jobs from Adzuna, Remotive & Jooble — 3 APIs combined |
| 🤖 **AI Mock Interview** | Real questions, live timer, AI scoring with feedback |
| 🔥 **Skills Heatmap** | 35+ tech skills ranked by job market demand |
| 🧭 **Career Explorer** | Roadmaps for 6 tech fields with salary data |
| 🎯 **Career Quiz** | 5-question quiz to find your perfect career match |
| 🗺️ **Interactive Roadmap** | Checkable learning plans with progress tracking |
| 📄 **Resume Analyzer** | Upload resume → get AI career suggestions |
| 💬 **SkillBot** | Offline AI chatbot for career advice |
| 📊 **Dashboard** | Personalized job picks for India + global |

---

## 🛠️ Tech Stack

- **Frontend:** React.js + Vite
- **Styling:** Custom Dark Glassmorphism CSS
- **Backend:** Supabase (Auth + Database)
- **Job APIs:** Adzuna, Remotive, Jooble
- **Fonts:** Syne + DM Sans (Google Fonts)
- **Deployment:** Netlify

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/YOURUSERNAME/skillfinder.git

# 2. Install dependencies
cd skillfinder
npm install

# 3. Create .env file
cp .env.example .env
# Add your Supabase keys to .env

# 4. Run locally
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the root folder:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ChatBot.jsx
├── pages/
│   ├── Home.jsx
│   ├── Jobs.jsx
│   ├── Dashboard.jsx
│   ├── ExploreCareers.jsx
│   ├── MockInterview.jsx
│   ├── SkillsHeatmap.jsx
│   ├── CareerQuiz.jsx
│   ├── Roadmap.jsx
│   ├── ResumeUpload.jsx
│   └── About.jsx
├── services/
│   ├── jobService.js
│   └── authService.js
└── styles/
    └── auth.css
```

---

## 🎨 Design

- Pure black background (`#000000`)
- Glassmorphism cards with `backdrop-filter: blur()`
- Gold (`#facc15`) + Orange (`#f97316`) accent colors
- Syne font for headings — sharp and futuristic
- Fully responsive on mobile

---

Built with 💛 for students who refuse to be overlooked.
