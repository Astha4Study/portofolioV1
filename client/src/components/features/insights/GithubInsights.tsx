import { useEffect, useState } from "react";
import ContributionGithub from "@/components/ContributionGithub";
import { Badge } from "@/components/ui/badge";
import RepositoryPinned from "@/components/RepositoryPinned";

export type GitHubProfile = {
  name: string | null;
  username: string;
  image: string;
  bio?: string | null;
};

export default function GithubInsights() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("http://localhost:3000/github/profile");
        if (!res.ok) throw new Error("Failed to fetch profile");

        const data: GitHubProfile = await res.json();
        setProfile(data);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <section className="w-full space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="h-5 w-24 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-9 w-52 animate-pulse rounded-md bg-neutral-300 dark:bg-neutral-700" />
            <div className="h-4 w-36 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <div className="h-14 w-14 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
        </div>

        <ContributionGithub />
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full space-y-8">
        <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 px-4 py-3 text-sm text-red-700 dark:text-red-400">
          Error: {error}
        </div>

        <ContributionGithub />
      </section>
    );
  }

  return (
    <section className="w-full space-y-8">
      <div className="flex flex-col gap-5 border-b border-neutral-200 dark:border-neutral-800 pb-6 sm:flex-row sm:items-center sm:justify-between transition-colors duration-200">
        <div className="space-y-3">
          <Badge
            variant="outline"
            className="border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 transition-colors duration-200"
          >
            GitHub
          </Badge>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-100 sm:text-3xl transition-colors duration-200">
              {profile?.name || profile?.username}
            </h2>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 sm:text-base transition-colors duration-200">
              @{profile?.username}
            </p>
          </div>

          {profile?.bio ? (
            <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 transition-colors duration-200">
              {profile.bio}
            </p>
          ) : null}
        </div>

        <div className="shrink-0">
          <img
            src={profile?.image || "/default-avatar.png"}
            alt={profile?.name || "Avatar"}
            className="h-34 w-34 rounded-full border border-neutral-200 dark:border-neutral-700 object-cover shadow-sm dark:shadow-neutral-800/50 transition-colors duration-200"
          />
        </div>
      </div>

      <ContributionGithub />
      <RepositoryPinned />
    </section>
  );
}
