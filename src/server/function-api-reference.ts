import { readFileSync } from "node:fs";
import { createServer } from "./create-server.js";
import { createSessionCredentialStore } from "./session-store.js";
import {
  collectManifestToolNames,
  findToolManifestEntry
} from "./tool-manifest.js";

const FUNCTION_API_REFERENCE_PATH = "docs/wiki/Function-API-Reference.md";

type ToolDefinition = {
  name: string;
  description?: string;
  inputSchema?: unknown;
};

type ToolsListResult = {
  tools?: ToolDefinition[];
};

function getModuleLabel(toolName: string) {
  return findToolManifestEntry(toolName)?.module ?? "Other";
}

function sortTools(tools: ToolDefinition[]) {
  return [...tools].sort((left, right) => left.name.localeCompare(right.name));
}

function renderJson(value: unknown) {
  return JSON.stringify(value ?? { type: "object", properties: {} }, null, 2);
}

export async function collectHttpToolDefinitions(): Promise<ToolDefinition[]> {
  const server = createServer({
    mode: "http",
    config: {
      serverName: "codearts-mcp",
      serverVersion: "0.1.0",
      httpPort: 0
    },
    sessionStore: createSessionCredentialStore()
  });
  const requestHandlers = (
    server as unknown as {
      server?: {
        _requestHandlers?: Map<string, (request: unknown, extra: unknown) => Promise<unknown>>;
      };
    }
  ).server?._requestHandlers;
  const handler = requestHandlers?.get("tools/list");

  if (!handler) {
    throw new Error("Expected tools/list handler to be registered.");
  }

  const result = (await handler(
    {
      jsonrpc: "2.0",
      id: "function-api-reference",
      method: "tools/list",
      params: {}
    },
    {}
  )) as ToolsListResult;

  const tools = sortTools(result.tools ?? []);
  const expectedToolNames = collectManifestToolNames({ mode: "http" });
  const actualToolNames = tools.map((tool) => tool.name);

  if (actualToolNames.join("\n") !== expectedToolNames.join("\n")) {
    throw new Error("HTTP tools/list output does not match the ToolManifest.");
  }

  return tools;
}

export function renderFunctionApiReference(tools: ToolDefinition[]) {
  const sortedTools = sortTools(tools);
  const moduleCounts = new Map<string, number>();

  for (const tool of sortedTools) {
    moduleCounts.set(getModuleLabel(tool.name), (moduleCounts.get(getModuleLabel(tool.name)) ?? 0) + 1);
  }

  const lines = [
    "# CodeArts MCP Function API Reference",
    "",
    "This document is generated from the ToolManifest-validated HTTP MCP `tools/list` registry. Do not edit tool entries by hand.",
    "",
    "All function APIs use the same HTTP endpoint: `POST /mcp`. The JSON-RPC method is `tools/call`; select a function with `params.name`.",
    "",
    "## Common Call Shape",
    "",
    "```json",
    renderJson({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: {
        name: "<tool-name>",
        arguments: {}
      }
    }),
    "```",
    "",
    "## Module Directory",
    "",
    "| Module | APIs |",
    "| --- | ---: |",
    ...Array.from(moduleCounts.entries()).map(([module, count]) => `| ${module} | ${count} |`),
    `| **Total** | **${sortedTools.length}** |`,
    "",
    "## APIs",
    ""
  ];

  for (const tool of sortedTools) {
    lines.push(
      `### ${tool.name}`,
      "",
      `Module: \`${getModuleLabel(tool.name)}\``,
      "",
      `Description: ${tool.description ?? ""}`,
      "",
      "Call example:",
      "",
      "```json",
      renderJson({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: {
          name: tool.name,
          arguments: {}
        }
      }),
      "```",
      "",
      "Input JSON Schema:",
      "",
      "```json",
      renderJson(tool.inputSchema),
      "```",
      ""
    );
  }

  return `${lines.join("\n").replace(/\r\n/g, "\n")}\n`;
}

export async function renderCurrentFunctionApiReference() {
  return renderFunctionApiReference(await collectHttpToolDefinitions());
}

export function loadFunctionApiReference(path = FUNCTION_API_REFERENCE_PATH) {
  return readFileSync(path, "utf8");
}

export function normalizeMarkdownForComparison(markdown: string) {
  return markdown.replace(/\r\n/g, "\n");
}

export const functionApiReferencePath = FUNCTION_API_REFERENCE_PATH;
