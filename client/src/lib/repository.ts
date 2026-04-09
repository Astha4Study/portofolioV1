export type GitHubPinnedRepository = {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  isPrivate: boolean;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string | null;
  } | null;
  owner: {
    login: string;
    avatarUrl: string;
  };
};

export async function fetchPinnedRepos(): Promise<GitHubPinnedRepository[]> {
  const res = await fetch("http://localhost:3000/github/pinned-repos");

  if (!res.ok) {
    throw new Error("Failed to fetch pinned repositories");
  }

  return res.json();
}