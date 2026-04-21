import { useQueries } from "@tanstack/react-query";
import ContributionGithub from "@/components/ContributionGithub";
import RepositoryPinned from "@/components/RepositoryPinned";
import { Badge } from "@/components/ui/badge";

import { LoadinggithubInsights } from "@/components/LoadingGithubInsights";
import { LoadingContributionGithub } from "@/components/LoadingContributionGithub";
import { LoadingRepositoryPinned } from "@/components/LoadingRepositoryPinned";
import { Skeleton } from "@/components/ui/skeleton";

export type GitHubProfile = {
  name: string | null;
  username: string;
  image: string;
  bio?: string | null;
};

async function fetchProfile() {
  const res = await fetch("http://localhost:3000/github/profile");
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

async function fetchContributions() {
  const res = await fetch("http://localhost:3000/github/contributions");
  if (!res.ok) throw new Error("Failed to fetch contributions");
  return res.json();
}

async function fetchRepos() {
  const res = await fetch("http://localhost:3000/github/pinned-repos");
  if (!res.ok) throw new Error("Failed to fetch repositories");
  return res.json();
}

export default function GithubInsights() {
  const results = useQueries({
    queries: [
      { queryKey: ["github-profile"], queryFn: fetchProfile },
      { queryKey: ["contributions"], queryFn: fetchContributions },
      { queryKey: ["pinned-repositories"], queryFn: fetchRepos },
    ],
  });

  const [profileQuery, contribQuery, repoQuery] = results;

  const isLoading = results.some((q) => q.isLoading);
  const isError = results.some((q) => q.error);

  if (isLoading) {
    return (
      <section className="space-y-8">
        <LoadinggithubInsights />

        <LoadingContributionGithub />

        <section className="space-y-4">
          <Skeleton className="h-6 w-44" />
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <LoadingRepositoryPinned key={i} />
            ))}
          </div>
        </section>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="w-full space-y-8">
        <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 px-4 py-3 text-sm text-red-700 dark:text-red-400">
          Failed to load GitHub data
        </div>
      </section>
    );
  }

  const profile: GitHubProfile = profileQuery.data;

  return (
    <section className="w-full space-y-8">
      {/* Profile */}
      <div className="flex flex-col gap-5 border-b border-neutral-200 dark:border-neutral-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <Badge variant="outline" className="border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 transition-colors duration-200" > GitHub </Badge>

          <div className="space-y-1"> <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-100 sm:text-3xl transition-colors duration-200"> {profile?.name || profile?.username} </h2> <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 sm:text-base transition-colors duration-200"> @{profile?.username} </p> </div>

          {profile?.bio ? ( <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 transition-colors duration-200"> {profile.bio} </p> ) : null}
        </div>

        <div className="shrink-0">
          <img
            src={profile?.image || "/default-avatar.png"}
            alt="Avatar"
            className="h-28 w-28 rounded-full object-cover"
          />
        </div>
      </div>

      <ContributionGithub data={contribQuery.data} />
      <RepositoryPinned data={repoQuery.data} />
    </section>
  );
}
