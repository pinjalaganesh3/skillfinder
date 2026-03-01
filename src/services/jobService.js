// ─────────────────────────────────────────────
// SKILLFINDER — Job Service
// Smart filtering · Deduplication · Relevance
// ─────────────────────────────────────────────

const ADZUNA_APP_ID  = "74f5cd93";
const ADZUNA_APP_KEY = "f94d1d44c2eaadf121a1a76f97890912";
const JOOBLE_API_KEY = "4bab27b9-5697-435d-8c99-e6191b19a093";

// ── Relevance scorer ──────────────────────────
// Checks how well a job title + company matches the search term
function relevanceScore(job, search) {
  const terms   = search.toLowerCase().split(/\s+/).filter(Boolean);
  const title   = (job.title   || "").toLowerCase();
  const company = (job.company || "").toLowerCase();
  const skills  = (job.skills  || []).join(" ").toLowerCase();
  let score = 0;
  for (const term of terms) {
    if (title.includes(term))   score += 10;
    if (skills.includes(term))  score += 5;
    if (company.includes(term)) score += 2;
  }
  return score;
}

// ── Deduplicator ──────────────────────────────
// Removes jobs with identical or very similar titles from same company
function deduplicate(jobs) {
  const seen = new Set();
  return jobs.filter(job => {
    const key = `${job.title?.toLowerCase().trim()}||${job.company?.toLowerCase().trim()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ── Title cleaner ─────────────────────────────
function cleanTitle(title = "") {
  return title
    .replace(/\s*[-–|].*$/, "")        // Remove everything after dash/pipe
    .replace(/\s*\(.*?\)/g, "")        // Remove parentheses content
    .replace(/\s{2,}/g, " ")           // Collapse spaces
    .trim()
    .slice(0, 60);                      // Max 60 chars
}

// ── REMOTIVE — Global Remote Jobs ────────────
export async function fetchRemoteJobs(search = "developer") {
  try {
    const res = await fetch(
      `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(search)}&limit=20`
    );
    if (!res.ok) throw new Error("Remotive failed");
    const data = await res.json();
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
  } catch {
    return [];
  }
}

// ── ADZUNA — Indian Jobs ──────────────────────
export async function fetchIndianJobs(search = "developer") {
  try {
    const res = await fetch(
      `https://api.adzuna.com/v1/api/jobs/in/search/1` +
      `?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}` +
      `&results_per_page=20&what=${encodeURIComponent(search)}` +
      `&sort_by=relevance`
    );
    if (!res.ok) throw new Error("Adzuna failed");
    const data = await res.json();
    return (data.results || []).map(job => ({
      id:       `adz-${job.id}`,
      title:    cleanTitle(job.title),
      company:  job.company?.display_name || "Company",
      location: job.location?.display_name || "India 🇮🇳",
      type:     job.contract_time === "full_time" ? "Full-time" : job.contract_time || "Full-time",
      skills:   [],
      salary:   job.salary_min
        ? `₹${Math.round(job.salary_min / 1000)}k – ₹${Math.round((job.salary_max || job.salary_min * 1.5) / 1000)}k`
        : null,
      url:      job.redirect_url,
      source:   "Adzuna",
      posted:   job.created || null,
    }));
  } catch {
    return [];
  }
}

// ── JOOBLE — Extra Source ─────────────────────
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
  } catch {
    return [];
  }
}

// ── COMBINED — Smart fetch + filter + rank ───
export async function fetchAllJobs(search = "developer") {
  const [remResult, adzResult, jooResult] = await Promise.allSettled([
    fetchRemoteJobs(search),
    fetchIndianJobs(search),
    fetchJoobleJobs({ keywords: search, location: "India" }),
  ]);

  const remote = remResult.status === "fulfilled" ? remResult.value : [];
  const india  = adzResult.status === "fulfilled" ? adzResult.value : [];
  const jooble = jooResult.status === "fulfilled" ? jooResult.value : [];

  // Combine: India first, then global, then jooble
  const all = [...india, ...remote, ...jooble];

  // 1. Remove duplicates
  const unique = deduplicate(all);

  // 2. Score relevance — filter out low relevance if search is specific
  const scored = unique
    .map(job => ({ ...job, _score: relevanceScore(job, search) }))
    .filter(job => job._score > 0 || search.length <= 4) // keep all for short searches
    .sort((a, b) => b._score - a._score);

  // 3. Remove _score from output
  return scored.map(({ _score, ...job }) => job);
}
