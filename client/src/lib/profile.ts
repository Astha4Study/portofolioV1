export async function fetchProfile() {
  const res = await fetch("http://localhost:3000/github/profile");

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return res.json();
}