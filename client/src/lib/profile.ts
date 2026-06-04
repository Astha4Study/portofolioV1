import { API_URL } from "./config";

export async function fetchProfile() {
  const res = await fetch(`${API_URL}/github/profile`);

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return res.json();
}