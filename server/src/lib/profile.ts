import type { GitHubProfile } from "shared";

export type { GitHubProfile } from "shared";

type GitHubUserResponse = {
  name: string | null;
  login: string;
  avatar_url: string;
  bio?: string | null;
};

export async function getProfile(token: string): Promise<GitHubProfile> {
  const res = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch profile (${res.status})`);
  }

  const data = (await res.json()) as GitHubUserResponse;

  return {
    name: data.name,
    username: data.login,
    image: data.avatar_url,
    bio: data.bio,
  };
}
