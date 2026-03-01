import { supabase } from "../supabaseClient";

// ── Sign up via Supabase Auth ──────────────────────────────
export const registerUser = async ({ email, password, name, username, age, qualification }) => {
  // 1. Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
  if (authError) throw authError;

  // 2. Save extra profile info to students table
  const { error: dbError } = await supabase.from("students").insert([{
    name, username, age, qualification, email, password
  }]);
  if (dbError) console.warn("Profile save error:", dbError.message);

  return authData;
};

// ── Login with Supabase Auth first, fallback to students table ──
export const loginUser = async ({ email, password }) => {
  // Try Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });

  if (!authError && authData?.user) {
    return { user: authData.user, source: "auth" };
  }

  // Fallback: check students table directly
  const { data: students, error: dbError } = await supabase
    .from("students")
    .select("*")
    .eq("email", email)
    .eq("password", password);

  if (dbError || !students || students.length === 0) {
    throw new Error("Invalid email or password.");
  }

  return { user: students[0], source: "db" };
};

// ── Logout ─────────────────────────────────────────────────
export const logoutUser = async () => {
  await supabase.auth.signOut();
  localStorage.clear();
};

// ── Get current session ────────────────────────────────────
export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getSession();
  return data?.session?.user || null;
};
