export function parseCookieHeader(header?: string) {
  if (!header) {
    return {} as Record<string, string>;
  }

  return Object.fromEntries(
    header
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const separatorIndex = part.indexOf("=");
        return [
          part.slice(0, separatorIndex),
          decodeURIComponent(part.slice(separatorIndex + 1))
        ];
      })
  );
}

export function serializeAuthCookie(
  name: string,
  value: string,
  options: { secure: boolean; maxAgeSeconds: number }
) {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${options.maxAgeSeconds}`
  ];

  if (options.secure) {
    parts.push("Secure");
  }

  return parts.join("; ");
}
