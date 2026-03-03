import { useState, useEffect } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SUGGESTED_GOALS = [
  "📖 Study for 1 hour",
  "💻 Practice coding for 30 mins",
  "🎯 Complete 1 course lesson",
  "📄 Work on resume",
  "🤖 Do a mock interview",
  "🔍 Search and apply to 2 jobs",
  "📚 Read 1 tech article",
  "🔨 Build something small",
  "💬 Practice explaining a concept out loud",
  "⭐ Save 3 interesting job listings",
];

const QUOTES = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
  { text: "Great things never come from comfort zones.", author: "Unknown" },
];

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function getWeekDates() {
  const today = new Date();
  const day = today.getDay(); // 0=Sun
  const monday = new Date(today);
  monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));
  return DAYS.map((d, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return { label: d, key: date.toISOString().split("T")[0], date: date.getDate() };
  });
}

export default function StudyPlanner() {
  const [tasks,      setTasks]      = useState([]);
  const [newTask,    setNewTask]    = useState("");
  const [streak,     setStreak]     = useState(0);
  const [weekData,   setWeekData]   = useState({});
  const todayKey = getTodayKey();
  const weekDates = getWeekDates();
  const quote = QUOTES[new Date().getDay() % QUOTES.length];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`tasks_${todayKey}`) || "[]");
    const savedStreak = parseInt(localStorage.getItem("studyStreak") || "0");
    const allWeek = {};
    weekDates.forEach(d => {
      allWeek[d.key] = JSON.parse(localStorage.getItem(`tasks_${d.key}`) || "[]");
    });
    setTasks(saved);
    setStreak(savedStreak);
    setWeekData(allWeek);
  }, []);

  const saveTasks = (updated) => {
    setTasks(updated);
    localStorage.setItem(`tasks_${todayKey}`, JSON.stringify(updated));
    // Update week data
    setWeekData(prev => ({ ...prev, [todayKey]: updated }));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const updated = [...tasks, { id: Date.now(), text: newTask.trim(), done: false }];
    saveTasks(updated);
    setNewTask("");
  };

  const toggleTask = (id) => {
    const updated = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    saveTasks(updated);
    // Update streak
    const allDone = updated.length > 0 && updated.every(t => t.done);
    if (allDone) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem("studyStreak", newStreak.toString());
    }
  };

  const removeTask = (id) => {
    saveTasks(tasks.filter(t => t.id !== id));
  };

  const addSuggested = (text) => {
    if (tasks.some(t => t.text === text)) return;
    const updated = [...tasks, { id: Date.now(), text, done: false }];
    saveTasks(updated);
  };

  const completedCount = tasks.filter(t => t.done).length;
  const progressPct = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;
  const today = new Date();
  const todayFormatted = today.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "36px 20px 60px" }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div className="badge" style={{ marginBottom: 12 }}>📅 Study Planner</div>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(22px,3.5vw,32px)", fontWeight: 800, marginBottom: 6 }}>
          Daily Study Goals
        </h1>
        <p style={{ color: "#64748b", fontSize: 14 }}>{todayFormatted}</p>
      </div>

      {/* Motivational quote */}
      <div style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.12)", borderRadius: 14, padding: "16px 20px", marginBottom: 24 }}>
        <p style={{ fontSize: 14, color: "#94a3b8", fontStyle: "italic", lineHeight: 1.7, marginBottom: 4 }}>
          "{quote.text}"
        </p>
        <p style={{ fontSize: 12, color: "#475569" }}>— {quote.author}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
        {/* Streak */}
        <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 14, padding: "18px", textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>🔥</div>
          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 24, fontWeight: 800, color: "#f59e0b" }}>{streak}</div>
          <div style={{ fontSize: 12, color: "#475569", marginTop: 3 }}>Day Streak</div>
        </div>
        {/* Today's progress */}
        <div style={{ background: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.15)", borderRadius: 14, padding: "18px", textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>✅</div>
          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 24, fontWeight: 800, color: "#60a5fa" }}>{completedCount}/{tasks.length}</div>
          <div style={{ fontSize: 12, color: "#475569", marginTop: 3 }}>Done Today</div>
        </div>
        {/* Completion % */}
        <div style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)", borderRadius: 14, padding: "18px", textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>🎯</div>
          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 24, fontWeight: 800, color: "#4ade80" }}>{progressPct}%</div>
          <div style={{ fontSize: 12, color: "#475569", marginTop: 3 }}>Complete</div>
        </div>
      </div>

      {/* Weekly view */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "18px 20px", marginBottom: 24 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#475569", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.06em" }}>This Week</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
          {weekDates.map(d => {
            const dayTasks = weekData[d.key] || [];
            const done = dayTasks.filter(t => t.done).length;
            const total = dayTasks.length;
            const isToday = d.key === todayKey;
            const isPast = new Date(d.key) < new Date(todayKey);
            const allDone = total > 0 && done === total;
            return (
              <div key={d.key} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 11, color: isToday ? "#f59e0b" : "#475569", fontWeight: isToday ? 800 : 500, marginBottom: 6 }}>{d.label}</div>
                <div style={{ width: "100%", aspectRatio: "1", borderRadius: 10, background: allDone ? "rgba(74,222,128,0.2)" : isToday ? "rgba(245,158,11,0.15)" : isPast && total > 0 ? "rgba(248,113,113,0.1)" : "rgba(255,255,255,0.04)", border: `2px solid ${allDone ? "#4ade80" : isToday ? "#f59e0b" : "rgba(255,255,255,0.08)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, marginBottom: 4 }}>
                  {allDone ? "✅" : isToday ? "📅" : isPast && total > 0 ? "😅" : "·"}
                </div>
                <div style={{ fontSize: 10, color: "#334155" }}>{d.date}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add task */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px", marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", marginBottom: 14 }}>📝 Today's Goals</p>

        {/* Input */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Add a study goal for today..."
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTask()}
            style={{ flex: 1, margin: 0 }}
          />
          <button onClick={addTask} style={{ padding: "11px 18px", fontSize: 13, flexShrink: 0, borderRadius: 10 }}>
            Add
          </button>
        </div>

        {/* Progress bar */}
        {tasks.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ width: `${progressPct}%`, height: "100%", background: "linear-gradient(90deg,#f59e0b,#4ade80)", borderRadius: 10, transition: "width 0.5s ease" }} />
            </div>
            <p style={{ fontSize: 12, color: "#475569", marginTop: 6 }}>
              {completedCount === tasks.length && tasks.length > 0 ? "🎉 All done! Amazing work today!" : `${completedCount} of ${tasks.length} goals completed`}
            </p>
          </div>
        )}

        {/* Task list */}
        {tasks.length === 0 ? (
          <p style={{ color: "#334155", fontSize: 13, textAlign: "center", padding: "16px 0" }}>
            No goals yet! Add one above or pick from suggestions below 👇
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {tasks.map(task => (
              <div key={task.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, background: task.done ? "rgba(74,222,128,0.06)" : "rgba(255,255,255,0.03)", border: `1px solid ${task.done ? "rgba(74,222,128,0.2)" : "rgba(255,255,255,0.07)"}`, transition: "all 0.2s" }}>
                {/* Checkbox */}
                <div onClick={() => toggleTask(task.id)}
                  style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${task.done ? "#4ade80" : "rgba(255,255,255,0.2)"}`, background: task.done ? "#4ade80" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "all 0.2s", fontSize: 12 }}>
                  {task.done && "✓"}
                </div>
                <span style={{ flex: 1, fontSize: 14, color: task.done ? "#475569" : "#f1f5f9", textDecoration: task.done ? "line-through" : "none", transition: "all 0.2s" }}>
                  {task.text}
                </span>
                <span onClick={() => removeTask(task.id)} style={{ fontSize: 16, color: "#334155", cursor: "pointer", padding: "0 4px", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#f87171"}
                  onMouseLeave={e => e.currentTarget.style.color = "#334155"}>
                  ×
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Suggested goals */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "18px 20px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#475569", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          💡 Quick Add Suggestions
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {SUGGESTED_GOALS.map((g, i) => {
            const alreadyAdded = tasks.some(t => t.text === g);
            return (
              <span key={i} onClick={() => !alreadyAdded && addSuggested(g)}
                style={{ padding: "6px 14px", borderRadius: 30, fontSize: 12, fontWeight: 600, background: alreadyAdded ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.04)", color: alreadyAdded ? "#4ade80" : "#64748b", border: `1px solid ${alreadyAdded ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.08)"}`, cursor: alreadyAdded ? "default" : "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { if (!alreadyAdded) { e.currentTarget.style.borderColor = "rgba(245,158,11,0.4)"; e.currentTarget.style.color = "#f59e0b"; }}}
                onMouseLeave={e => { if (!alreadyAdded) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#64748b"; }}}>
                {alreadyAdded ? "✓ " : "+ "}{g}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
