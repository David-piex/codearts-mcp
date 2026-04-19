import { createHash, randomBytes } from "node:crypto";

export function hashAuthToken(raw: string) {
  return createHash("sha256").update(raw).digest("hex");
}

export function createAuthToken() {
  const raw = randomBytes(32).toString("base64url");

  return {
    raw,
    hash: hashAuthToken(raw)
  };
}
