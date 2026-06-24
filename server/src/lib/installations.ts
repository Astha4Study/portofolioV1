import { generateJWT } from "./jwt.js";

export async function getInstallations() {
  const jwt = generateJWT();

  const res = await fetch("https://api.github.com/app/installations", {
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch GitHub App installations (${res.status})`);
  }

  return res.json();
}