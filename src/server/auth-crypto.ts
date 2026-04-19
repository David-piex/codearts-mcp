import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

function deriveKey(masterKey: string) {
  return createHash("sha256").update(masterKey).digest();
}

export function encryptSecretValue(value: string, masterKey: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", deriveKey(masterKey), iv);
  const ciphertext = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);

  return {
    scheme: "aes-256-gcm",
    iv: iv.toString("base64"),
    ciphertext: ciphertext.toString("base64"),
    auth_tag: cipher.getAuthTag().toString("base64")
  };
}

export function decryptSecretValue(
  encrypted: {
    iv: string;
    ciphertext: string;
    auth_tag: string;
  },
  masterKey: string
) {
  const decipher = createDecipheriv(
    "aes-256-gcm",
    deriveKey(masterKey),
    Buffer.from(encrypted.iv, "base64")
  );
  decipher.setAuthTag(Buffer.from(encrypted.auth_tag, "base64"));

  return Buffer.concat([
    decipher.update(Buffer.from(encrypted.ciphertext, "base64")),
    decipher.final()
  ]).toString("utf8");
}
