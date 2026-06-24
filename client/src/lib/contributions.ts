import { apiFetch } from "./api-client";

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export async function fetchContributions(): Promise<ContributionDay[]> {
  return apiFetch<ContributionDay[]>("/github/contributions");
}
