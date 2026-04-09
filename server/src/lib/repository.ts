type GitHubPinnedRepositoryNode = {
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

type GitHubPinnedRepositoriesResponse = {
  data?: {
    viewer?: {
      pinnedItems?: {
        nodes?: Array<GitHubPinnedRepositoryNode | null>;
      };
    };
  };
  errors?: Array<{ message: string }>;
};

const query = `
query GetPinnedRepositories {
	viewer {
		pinnedItems(first: 6, types: REPOSITORY) {
			nodes {
				... on Repository {
					name
					description
					url
					homepageUrl
					isPrivate
					stargazerCount
					forkCount
					primaryLanguage {
						name
						color
					}
					owner {
						login
						avatarUrl
					}
				}
			}
		}
	}
}
`;

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

export async function getPinnedRepositories(
  token: string,
): Promise<GitHubPinnedRepository[]> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({ query }),
  });

  const data = (await res.json()) as GitHubPinnedRepositoriesResponse;

  if (!res.ok || data.errors?.length) {
    throw new Error(
      data.errors?.[0]?.message ??
        `Failed to fetch pinned repositories (${res.status})`,
    );
  }

  return (
    data.data?.viewer?.pinnedItems?.nodes?.filter(
      (node): node is GitHubPinnedRepositoryNode => Boolean(node),
    ) ?? []
  ).map((repository) => ({
    name: repository.name,
    description: repository.description,
    url: repository.url,
    homepageUrl: repository.homepageUrl,
    isPrivate: repository.isPrivate,
    stargazerCount: repository.stargazerCount,
    forkCount: repository.forkCount,
    primaryLanguage: repository.primaryLanguage,
    owner: repository.owner,
  }));
}
