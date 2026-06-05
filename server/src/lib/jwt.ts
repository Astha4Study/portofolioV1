import jwt from "jsonwebtoken";
import { env } from "./env.js";

const appId = env.get("GITHUB_APP_ID");
const privateKey = env.get("GITHUB_PRIVATE_KEY").replace(/\\n/g, "\n");

export function generateJWT() {
  const now = Math.floor(Date.now() / 1000);

  return jwt.sign(
    {
      iat: now - 60,
      exp: now + 10 * 60,
      iss: appId,
    },
    privateKey,
    { algorithm: "RS256" },
  );
}
