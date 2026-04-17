import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";

describe("https reverse proxy assets", () => {
  it("contains an nginx ssl config for mcp and health routes", () => {
    expect(existsSync("deploy/nginx/codearts-mcp-ssl.conf")).toBe(true);

    const content = readFileSync("deploy/nginx/codearts-mcp-ssl.conf", "utf8");
    expect(content).toContain("listen 443 ssl");
    expect(content).toContain("ssl_certificate");
    expect(content).toContain("location /mcp");
    expect(content).toContain("location /health");
  });

  it("contains an ssl deployment note", () => {
    expect(existsSync("deploy/nginx/ssl/README.md")).toBe(true);
  });
});
