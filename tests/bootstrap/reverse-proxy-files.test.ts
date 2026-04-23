import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";

describe("reverse proxy deployment assets", () => {
  it("contains an nginx config for mcp and health routes", () => {
    expect(existsSync("deploy/nginx/codearts-mcp.conf")).toBe(true);

    const content = readFileSync("deploy/nginx/codearts-mcp.conf", "utf8");
    expect(content).toContain("location /mcp");
    expect(content).toContain("location /health");
    expect(content).toContain("location /diagnostics/session-reuse");
    expect(content).toContain("proxy_pass http://codearts_mcp_upstream");
  });

  it("contains a docker compose file for shared http deployment", () => {
    expect(existsSync("docker-compose.yml")).toBe(true);

    const content = readFileSync("docker-compose.yml", "utf8");
    expect(content).toContain("codearts-mcp:");
    expect(content).toContain("nginx:");
    expect(content).toContain("MCP_TRANSPORT=http");
  });
});
