const ADZUNA_APP_ID  = import.meta.env.VITE_ADZUNA_APP_ID  || "74f5cd93";
const ADZUNA_APP_KEY = import.meta.env.VITE_ADZUNA_APP_KEY || "f94d1d44c2eaadf121a1a76f97890912";
const JOOBLE_API_KEY = import.meta.env.VITE_JOOBLE_API_KEY || "4bab27b9-5697-435d-8c99-e6191b19a093";

function cleanTitle(title = "") {
  return title.replace(/\s*[-–|].*$/, "").replace(/\s*\(.*?\)/g, "").replace(/\s{2,}/g, " ").trim().slice(0, 60);
}

function deduplicate(jobs) {
  const seen = new Set();
  return jobs.filter(job => {
    const key = `${job.title?.toLowerCase().trim()}||${job.company?.toLowerCase().trim()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function relevanceScore(job, search) {
  const terms = search.toLowerCase().split(/\s+/).filter(Boolean);
  const title = (job.title || "").toLowerCase();
  const skills = (job.skills || []).join(" ").toLowerCase();
  let score = 0;
  for (const term of terms) {
    if (title.includes(term))  score += 10;
    if (skills.includes(term)) score += 5;
  }
  return score;
}

export async function fetchRemoteJobs(search = "developer") {
  try {
    // Use CORS proxy to bypass Remotive blocking browser requests
    const target = `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(search)}&limit=20`;
    const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(target)}`);
    if (!res.ok) throw new Error("Remotive failed");
    const wrapper = await res.json();
    const data = JSON.parse(wrapper.contents);
    return (data.jobs || []).map(job => ({
      id:       `rem-${job.id}`,
      title:    cleanTitle(job.title),
      company:  job.company_name || "Company",
      location: job.candidate_required_location || "Remote 🌍",
      type:     job.job_type || "Full-time",
      skills:   (job.tags || []).slice(0, 5),
      url:      job.url,
      source:   "Remotive",
      posted:   job.publication_date || null,
    }));
  } catch { return []; }
}

export async function fetchIndianJobs(search = "developer") {
  try {
    // Using CORS proxy to fix Adzuna blocking browser requests
    const url = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=20&what=${encodeURIComponent(search)}&sort_by=relevance&content-type=application/json`;
    const res = await fetch(url, {
      headers: { "Accept": "application/json" }
    });
    if (!res.ok) throw new Error("Adzuna failed");
    const data = await res.json();
    return (data.results || []).map(job => ({
      id:       `adz-${job.id}`,
      title:    cleanTitle(job.title),
      company:  job.company?.display_name || "Company",
      location: job.location?.display_name || "India 🇮🇳",
      type:     job.contract_time === "full_time" ? "Full-time" : "Full-time",
      skills:   [],
      salary:   job.salary_min ? `₹${Math.round(job.salary_min / 1000)}k – ₹${Math.round((job.salary_max || job.salary_min * 1.5) / 1000)}k` : null,
      url:      job.redirect_url,
      source:   "Adzuna",
      posted:   job.created || null,
    }));
  } catch { return []; }
}

export async function fetchJoobleJobs({ keywords = "developer", location = "India" } = {}) {
  try {
    const res = await fetch(`https://jooble.org/api/${JOOBLE_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keywords, location, resultonpage: 15 })
    });
    if (!res.ok) throw new Error("Jooble failed");
    const data = await res.json();
    return (data.jobs || []).map(job => ({
      id:       `joo-${job.id || Math.random()}`,
      title:    cleanTitle(job.title),
      company:  job.company || "Company",
      location: job.location || "India 🇮🇳",
      type:     "Full-time",
      skills:   [],
      salary:   job.salary || null,
      url:      job.link,
      source:   "Jooble",
      posted:   job.updated || null,
    }));
  } catch { return []; }
}

export async function fetchAllJobs(search = "developer") {
  const [remResult, adzResult, jooResult] = await Promise.allSettled([
    fetchRemoteJobs(search),
    fetchIndianJobs(search),
    fetchJoobleJobs({ keywords: search, location: "India" }),
  ]);
  const remote = remResult.status === "fulfilled" ? remResult.value : [];
  const india  = adzResult.status === "fulfilled" ? adzResult.value : [];
  const jooble = jooResult.status === "fulfilled" ? jooResult.value : [];
  const all    = [...india, ...remote, ...jooble];
  const unique = deduplicate(all);
  return unique
    .map(job => ({ ...job, _score: relevanceScore(job, search) }))
    .filter(job => job._score > 0 || search.length <= 4)
    .sort((a, b) => b._score - a._score)
    .map(({ _score, ...job }) => job);
}