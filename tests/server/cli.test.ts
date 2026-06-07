import { describe, expect, it, vi } from "vitest";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { runCli } from "../../src/server/cli.js";
import { DEFAULT_MCP_PROTOCOL_VERSION } from "../../src/server/mcp-protocol.js";
import { startTestHttpServer } from "./http-mcp-test-helpers.js";

const baseEnv = {
  HUAWEICLOUD_AK: "ak-test",
  HUAWEICLOUD_SK: "sk-test",
  HUAWEICLOUD_REGION: "cn-north-4",
  MCP_SERVER_NAME: "codearts-mcp",
  MCP_SERVER_VERSION: "0.1.0"
};

function createOutputCapture() {
  const stdout: string[] = [];
  const stderr: string[] = [];

  return {
    stdout,
    stderr,
    writeStdout: (text: string) => stdout.push(text),
    writeStderr: (text: string) => stderr.push(text)
  };
}

describe("CLI", () => {
  it("prints help", async () => {
    const output = createOutputCapture();

    await expect(
      runCli({
        argv: ["help"],
        env: baseEnv,
        stdout: output.writeStdout,
        stderr: output.writeStderr
      })
    ).resolves.toBe(0);

    expect(output.stdout.join("")).toContain("CodeArts MCP CLI");
    expect(output.stderr).toEqual([]);
  });

  it("lists local tools as text", async () => {
    const output = createOutputCapture();

    await expect(
      runCli({
        argv: ["tools", "--format", "text"],
        env: baseEnv,
        stdout: output.writeStdout,
        stderr: output.writeStderr
      })
    ).resolves.toBe(0);

    expect(output.stdout.join("")).toContain("req_list_projects");
    expect(output.stdout.join("")).toContain("repo_list_repositories");
  });

  it("prints a local tool schema", async () => {
    const output = createOutputCapture();

    await expect(
      runCli({
        argv: ["schema", "repo_list_repositories"],
        env: baseEnv,
        stdout: output.writeStdout,
        stderr: output.writeStderr
      })
    ).resolves.toBe(0);

    const parsed = JSON.parse(output.stdout.join("")) as {
      name: string;
      input_schema: { properties: Record<string, unknown> };
    };
    expect(parsed.name).toBe("repo_list_repositories");
    expect(parsed.input_schema.properties).toHaveProperty("project_id");
  });

  it("returns validation errors for invalid local call input", async () => {
    const output = createOutputCapture();

    await expect(
      runCli({
        argv: ["call", "repo_list_repositories", "--input", "{"],
        env: baseEnv,
        stdout: output.writeStdout,
        stderr: output.writeStderr
      })
    ).resolves.toBe(1);

    expect(output.stderr.join("")).toContain("Input must be valid JSON");
  });

  it("accepts local call input from stdin", async () => {
    const output = createOutputCapture();

    await expect(
      runCli({
        argv: ["call", "repo_delete_repository_webhook", "--stdin"],
        env: baseEnv,
        stdin: "{\"repository_id\":\"1001\",\"hook_id\":\"7\"}",
        stdout: output.writeStdout,
        stderr: output.writeStderr
      })
    ).resolves.toBe(0);

    expect(output.stdout.join("")).toContain("Dry run: delete repository webhook");
    expect(output.stdout.join("")).toContain("\"hookId\":\"7\"");
    expect(output.stderr.join("")).toBe("");
  });

  it("calls HTTP MCP tools", async () => {
    const output = createOutputCapture();
    const fetchMock = vi.fn(async (_url: string | URL | Request, init?: RequestInit) => {
      if (init?.method === "POST") {
        const payload = JSON.parse(String(init.body));

        if (payload.method === "initialize") {
          return {
            ok: true,
            status: 200,
            headers: new Headers({
              "mcp-session-id": "session-1"
            }),
            json: async () => ({
              jsonrpc: "2.0",
              id: "codearts-cli-init",
              result: {
                protocolVersion: DEFAULT_MCP_PROTOCOL_VERSION,
                capabilities: {
                  tools: {}
                },
                serverInfo: {
                  name: "codearts-mcp",
                  version: "0.1.0"
                }
              }
            })
          } as Response;
        }

        expect(init.headers).toMatchObject({
          "mcp-session-id": "session-1",
          "mcp-protocol-version": DEFAULT_MCP_PROTOCOL_VERSION
        });
        expect(payload).toMatchObject({
          method: "tools/call",
          params: {
            name: "req_list_projects",
            arguments: {
              page: 1
            }
          }
        });

        return {
          ok: true,
          status: 200,
          headers: new Headers(),
          json: async () => ({
            jsonrpc: "2.0",
            id: 1,
            result: {
              structuredContent: {
                summary: "1 project found",
                items: [{ id: "project-1", name: "Demo" }]
              },
              content: [{ type: "text", text: "1 project found" }]
            }
          })
        } as Response;
      }

      expect(init?.method).toBe("DELETE");
      expect(init?.headers).toMatchObject({
        "mcp-session-id": "session-1",
        "mcp-protocol-version": DEFAULT_MCP_PROTOCOL_VERSION
      });

      return {
        ok: true,
        status: 200,
        headers: new Headers(),
        json: async () => ({})
      } as Response;
    });

    await expect(
      runCli({
        argv: [
          "call",
          "req_list_projects",
          "--transport",
          "http",
          "--endpoint",
          "https://example.test/mcp",
          "--input",
          "{\"page\":1}",
          "--pretty"
        ],
        env: baseEnv,
        fetch: fetchMock as unknown as typeof fetch,
        stdout: output.writeStdout,
        stderr: output.writeStderr
      })
    ).resolves.toBe(0);

    expect(JSON.parse(output.stdout.join(""))).toMatchObject({
      summary: "1 project found"
    });
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("lists HTTP tools", async () => {
    const output = createOutputCapture();
    const fetchMock = vi.fn(async (_url: string | URL | Request, init?: RequestInit) => {
      if (init?.method === "POST") {
        const payload = JSON.parse(String(init.body));

        if (payload.method === "initialize") {
          return {
            ok: true,
            status: 200,
            headers: new Headers({
              "mcp-session-id": "session-tools"
            }),
            json: async () => ({
              result: {
                protocolVersion: DEFAULT_MCP_PROTOCOL_VERSION,
                capabilities: {
                  tools: {}
                }
              }
            })
          } as Response;
        }

        expect(init.headers).toMatchObject({
          "mcp-session-id": "session-tools",
          "mcp-protocol-version": DEFAULT_MCP_PROTOCOL_VERSION
        });
        expect(payload).toMatchObject({
          method: "tools/list"
        });

        return {
          ok: true,
          status: 200,
          headers: new Headers(),
          json: async () => ({
            result: {
              tools: [{ name: "req_list_projects" }]
            }
          })
        } as Response;
      }

      return {
        ok: true,
        status: 200,
        headers: new Headers(),
        json: async () => ({})
      } as Response;
    }) as unknown as typeof fetch;

    await expect(
      runCli({
        argv: ["tools", "--transport", "http", "--endpoint", "https://example.test/mcp", "--format", "text"],
        env: baseEnv,
        fetch: fetchMock,
        stdout: output.writeStdout,
        stderr: output.writeStderr
      })
    ).resolves.toBe(0);

    expect(output.stdout.join("")).toBe("req_list_projects\n");
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("renders tools as a table", async () => {
    const output = createOutputCapture();

    await expect(
      runCli({
        argv: ["tools", "--format", "table"],
        env: baseEnv,
        stdout: output.writeStdout,
        stderr: output.writeStderr
      })
    ).resolves.toBe(0);

    expect(output.stdout.join("")).toContain("| name");
    expect(output.stdout.join("")).toContain("req_list_projects");
  });

  it("renders call result items as a table", async () => {
    const output = createOutputCapture();
    const fetchMock = vi.fn(async (_url: string | URL | Request, init?: RequestInit) => {
      if (init?.method === "POST") {
        const payload = JSON.parse(String(init.body));

        if (payload.method === "initialize") {
          return {
            ok: true,
            status: 200,
            headers: new Headers({
              "mcp-session-id": "session-table"
            }),
            json: async () => ({
              result: {
                protocolVersion: DEFAULT_MCP_PROTOCOL_VERSION,
                capabilities: {
                  tools: {}
                }
              }
            })
          } as Response;
        }

        return {
          ok: true,
          status: 200,
          headers: new Headers(),
          json: async () => ({
            result: {
              structuredContent: {
                summary: "1 project found",
                items: [{ id: "project-1", name: "Demo" }]
              }
            }
          })
        } as Response;
      }

      return {
        ok: true,
        status: 200,
        headers: new Headers(),
        json: async () => ({})
      } as Response;
    }) as unknown as typeof fetch;

    await expect(
      runCli({
        argv: [
          "call",
          "req_list_projects",
          "--transport",
          "http",
          "--endpoint",
          "https://example.test/mcp",
          "--input",
          "{\"page\":1}",
          "--format",
          "table"
        ],
        env: baseEnv,
        fetch: fetchMock,
        stdout: output.writeStdout,
        stderr: output.writeStderr
      })
    ).resolves.toBe(0);

    expect(output.stdout.join("")).toContain("| id");
    expect(output.stdout.join("")).toContain("project-1");
  });

  it("loads HTTP defaults from a profile", async () => {
    const dir = mkdtempSync(join(tmpdir(), "codearts-cli-"));
    const configPath = join(dir, "profiles.json");
    const output = createOutputCapture();
    const fetchMock = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
      expect(String(url)).toBe("https://profile.example/mcp");
      expect(init?.headers).toMatchObject({
        authorization: "Bearer profile-token"
      });

      if (init?.method === "POST") {
        const payload = JSON.parse(String(init.body));

        if (payload.method === "initialize") {
          return {
            ok: true,
            status: 200,
            headers: new Headers({
              "mcp-session-id": "profile-session"
            }),
            json: async () => ({
              result: {
                protocolVersion: DEFAULT_MCP_PROTOCOL_VERSION,
                capabilities: {
                  tools: {}
                }
              }
            })
          } as Response;
        }

        return {
          ok: true,
          status: 200,
          headers: new Headers(),
          json: async () => ({
            result: {
              tools: [{ name: "req_list_projects" }]
            }
          })
        } as Response;
      }

      return {
        ok: true,
        status: 200,
        headers: new Headers(),
        json: async () => ({})
      } as Response;
    });

    writeFileSync(
      configPath,
      JSON.stringify({
        default_profile: "shared",
        profiles: {
          shared: {
            transport: "http",
            endpoint: "https://profile.example/mcp",
            token: "profile-token"
          }
        }
      })
    );

    try {
      await expect(
        runCli({
          argv: ["tools", "--config", configPath, "--format", "text"],
          env: {},
          fetch: fetchMock as unknown as typeof fetch,
          stdout: output.writeStdout,
          stderr: output.writeStderr
        })
      ).resolves.toBe(0);

      expect(output.stdout.join("")).toBe("req_list_projects\n");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("initializes a real HTTP MCP session before listing tools", async () => {
    const output = createOutputCapture();
    const { server, port } = await startTestHttpServer();

    try {
      await expect(
        runCli({
          argv: [
            "tools",
            "--transport",
            "http",
            "--endpoint",
            `http://127.0.0.1:${port}/mcp`,
            "--format",
            "text"
          ],
          env: {},
          stdout: output.writeStdout,
          stderr: output.writeStderr
        })
      ).resolves.toBe(0);

      expect(output.stdout.join("")).toContain("auth_configure_session");
      expect(output.stdout.join("")).toContain("req_list_projects");
      expect(output.stderr.join("")).toBe("");
    } finally {
      server.close();
    }
  });

  it("prints shell completion scripts", async () => {
    const output = createOutputCapture();

    await expect(
      runCli({
        argv: ["completion", "powershell"],
        env: baseEnv,
        stdout: output.writeStdout,
        stderr: output.writeStderr
      })
    ).resolves.toBe(0);

    expect(output.stdout.join("")).toContain("Register-ArgumentCompleter");
    expect(output.stdout.join("")).toContain("codearts");
  });
});
