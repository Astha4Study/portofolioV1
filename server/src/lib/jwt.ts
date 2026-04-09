import jwt from "jsonwebtoken";

const appId = process.env.GITHUB_APP_ID!;
const privateKey = process.env.GITHUB_PRIVATE_KEY!.replace(/\\n/g, "\n");

export function generateJWT() {
  const now = Math.floor(Date.now() / 1000);

  return jwt.sign(
    {
      iat: now - 60,
      exp: now + 10 * 60,
      iss: appId,
    },
    privateKey,
    { algorithm: "RS256" }
  );
}