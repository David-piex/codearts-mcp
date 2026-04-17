import { createHmac, createHash } from "node:crypto";
import type { AuthHeadersProvider } from "./types.js";

type Clock = {
  now: () => Date;
};

function formatSdkDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function sha256Hex(value: string | Uint8Array): string {
  if (typeof value === "string") {
    return createHash("sha256").update(value, "utf8").digest("hex");
  }

  return createHash("sha256").update(value).digest("hex");
}

function hmacHex(secret: string, value: string): string {
  return createHmac("sha256", secret).update(value, "utf8").digest("hex");
}

function encodeCanonicalUri(pathname: string): string {
  if (!pathname || pathname === "/") {
    return "/";
  }

  const encodedPath = decodeURIComponent(pathname)
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")
    .replace(/%2F/g, "/");

  return encodedPath.endsWith("/") ? encodedPath : `${encodedPath}/`;
}

function buildCanonicalQuery(url: URL): string {
  return [...url.searchParams.entries()]
    .sort(([aKey, aValue], [bKey, bValue]) => {
      if (aKey === bKey) {
        return aValue.localeCompare(bValue);
      }
      return aKey.localeCompare(bKey);
    })
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}

export function createHuaweiAuthHeaders(
  accessKey: string,
  secretKey: string,
  clock: Clock = { now: () => new Date() }
): AuthHeadersProvider {
  return async ({ method, url, body, headers }) => {
    const requestUrl = new URL(url);
    const sdkDate = formatSdkDate(clock.now());
    const mergedHeaders: Record<string, string> = {
      ...headers,
      host: headers.host ?? requestUrl.host,
      "X-Sdk-Date": sdkDate
    };

    const canonicalHeaders = Object.entries(mergedHeaders)
      .map(([key, value]) => [key.toLowerCase().trim(), value.trim()] as const)
      .sort(([a], [b]) => a.localeCompare(b));
    const signedHeaders = canonicalHeaders.map(([key]) => key).join(";");
    const canonicalHeadersText = canonicalHeaders.map(([key, value]) => `${key}:${value}\n`).join("");
    const canonicalRequest = [
      method.toUpperCase(),
      encodeCanonicalUri(requestUrl.pathname),
      buildCanonicalQuery(requestUrl),
      canonicalHeadersText,
      signedHeaders,
      sha256Hex(body ?? "")
    ].join("\n");
    const stringToSign = ["SDK-HMAC-SHA256", sdkDate, sha256Hex(canonicalRequest)].join("\n");
    const signature = hmacHex(secretKey, stringToSign);

    return {
      ...mergedHeaders,
      Authorization: `SDK-HMAC-SHA256 Access=${accessKey}, SignedHeaders=${signedHeaders}, Signature=${signature}`
    };
  };
}
