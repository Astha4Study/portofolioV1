import { generateJWT } from "./jwt";

export async function getInstallations() {
  const jwt = generateJWT();

  const res = await fetch("https://api.github.com/app/installations", {
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/vnd.github+json",
    },
  });

  return res.json();
}