import { generateJWT } from "./jwt.js";


type GitHubInstallation = {
  id: number;
};

type InstallationTokenResponse = {
  token: string;
};

export async function getInstallationToken() {
  const jwt = generateJWT();

  const installRes = await fetch("https://api.github.com/app/installations", {
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!installRes.ok) {
    throw new Error(`Failed to fetch installations (${installRes.status})`);
  }

  const installations = (await installRes.json()) as GitHubInstallation[];

  if (!installations.length) {
    throw new Error("No GitHub App installations found");
  }

  const installation = installations[0];
  if (!installation) {
    throw new Error("Installation not found");
  }

  const installationId = installation.id;

  const tokenRes = await fetch(
    `https://api.github.com/app/installations/${installationId}/access_tokens`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!tokenRes.ok) {
    throw new Error(`Failed to create installation token (${tokenRes.status})`);
  }

  const data = (await tokenRes.json()) as InstallationTokenResponse;

  if (!data.token) {
    throw new Error("GitHub returned an installation token response without a token");
  }

  return data.token;
}