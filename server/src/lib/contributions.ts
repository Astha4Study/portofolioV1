const query = `
{
  viewer {
    contributionsCollection {
      contributionCalendar {
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
`;

type ContributionsResponse = {
  data?: {
    viewer?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks?: Array<{
            contributionDays: Array<{
              date: string;
              contributionCount: number;
            }>;
          }>;
        };
      };
    };
  };
  errors?: Array<{ message: string }>;
};

export async function getContributions(token: string): Promise<ContributionsResponse> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL request failed (${res.status})`);
  }

  const data = (await res.json()) as ContributionsResponse;

  if (data.errors?.length) {
    throw new Error(data.errors[0]?.message ?? "GitHub GraphQL error");
  }

  return data;
}