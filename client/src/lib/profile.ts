import type { GitHubProfile } from "shared";
import { apiFetch } from "./api-client";

export async function fetchProfile(): Promise<GitHubProfile> {
  return apiFetch<GitHubProfile>("/github/profile");
}
