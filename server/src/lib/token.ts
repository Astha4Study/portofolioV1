import { generateJWT } from "./jwt";


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

  const installations = (await installRes.json()) as GitHubInstallation[];

  if (!installations.length) {
    throw new Error("App belum di-install");
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

  const data = (await tokenRes.json()) as InstallationTokenResponse;

  return data.token;
}