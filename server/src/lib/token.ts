import { generateJWT } from "./jwt.js";
import { getInstallations } from "./installations.js";

type InstallationTokenResponse = {
  token: string;
};

export async function getInstallationToken() {
  const installations = await getInstallations();

  if (!installations.length) {
    throw new Error("App belum di-install");
  }

  const installation = installations[0];
  if (!installation) {
    throw new Error("Installation not found");
  }

  const jwt = generateJWT();
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
