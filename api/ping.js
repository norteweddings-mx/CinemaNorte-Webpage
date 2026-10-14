// Mantiene despierto el proyecto gratuito de Supabase (Vercel lo ejecuta una vez al día).
const SB_URL = "https://jrkemmxsjdjgautqbjvn.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impya2VtbXhzamRqZ2F1dHFianZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5OTk4MjEsImV4cCI6MjEwNzU3NTgyMX0.dCwpAwrCAjs725LIQfRURr6RmU2m2FzxCi1OLrXwmoU";

export default async function handler(req, res) {
  const r = await fetch(SB_URL + "/rest/v1/ping?id=eq.1", {
    method: "PATCH",
    headers: { apikey: SB_KEY, Authorization: "Bearer " + SB_KEY, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ at: new Date().toISOString() }),
  });
  res.status(r.ok ? 200 : 500).json({ ok: r.ok, at: new Date().toISOString() });
}
