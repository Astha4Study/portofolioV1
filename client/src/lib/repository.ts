import type { GitHubPinnedRepository } from "shared";
import { apiFetch } from "./api-client";

export type { GitHubPinnedRepository } from "shared";

export async function fetchPinnedRepos(): Promise<GitHubPinnedRepository[]> {
  return apiFetch<GitHubPinnedRepository[]>("/github/pinned-repos");
}
