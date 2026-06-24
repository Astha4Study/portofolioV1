import { generateJWT } from "./jwt.js";

type GitHubInstallation = {
  id: number;
};

export async function getInstallations(): Promise<GitHubInstallation[]> {
  const jwt = generateJWT();

  const res = await fetch("https://api.github.com/app/installations", {
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch installations (${res.status})`);
  }

  return res.json() as Promise<GitHubInstallation[]>;
}
