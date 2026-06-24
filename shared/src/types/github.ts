export type GitHubProfile = {
  name: string | null;
  username: string;
  image: string;
  bio?: string | null;
};

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
