#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { toJsonSchemaCompat } from "@modelcontextprotocol/sdk/server/zod-json-schema-compat.js";
import {
  normalizeObjectSchema,
  objectFromShape,
  type ZodRawShapeCompat
} from "@modelcontextprotocol/sdk/server/zod-compat.js";
import { loadEnvConfig } from "../core/config/env.js";
import { createServer, readRegisteredTools, type RegisteredToolInfo } from "./create-server.js";
import { findToolManifestEntry } from "./tool-manifest.js";

type CliOutputFormat = "json" | "text";
type CliTransport = "local" | "http";

export type CliRunOptions = {
  argv?: string[];
  env?: Record<string, string | undefined>;
  stdin?: string;
  stdout?: (text: string) => void;
  stderr?: (text: string) => void;
  fetch?: typeof fetch;
};

type ParsedGlobalOptions = {
  command: string | undefined;
  args: string[];
  format: CliOutputFormat;
  pretty: boolean;
  transport: CliTransport;
  endpoint?: string;
  token?: string;
};

type HttpJsonRpcResponse = {
  jsonrpc?: string;
  id?: unknown;
  result?: unknown;
  error?: {
    code?: number;
    message?: string;
    data?: unknown;
  };
};

class CliError extends Error {
  constructor(
    message: string,
    readonly exitCode = 1
  ) {
    super(message);
  }
}

function printJson(value: unknown, pretty: boolean) {
  return `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`;
}

function parseGlobalOptions(argv: string[], env: Record<string, string | undefined>): ParsedGlobalOptions {
  const args = [...argv];
  let format: CliOutputFormat = "json";
  let pretty = false;
  let transport: CliTransport = env.CODEARTS_CLI_TRANSPORT === "http" ? "http" : "local";
  let endpoint = env.CODEARTS_MCP_URL ?? env.MCP_HTTP_URL;
  let token = env.CODEARTS_MCP_AUTH_TOKEN ?? env.MCP_AUTH_TOKEN;

  while (args[0]?.startsWith("--")) {
    const option = args.shift();

    switch (option) {
      case "--format":
        format = parseOutputFormat(readRequiredOptionValue(args, option));
        break;
      case "--pretty":
        pretty = true;
        break;
      case "--transport":
        transport = parseTransport(readRequiredOptionValue(args, option));
        break;
      case "--endpoint":
      case "--url":
        endpoint = readRequiredOptionValue(args, option);
        break;
      case "--token":
        token = readRequiredOptionValue(args, option);
        break;
      case "--help":
      case "-h":
        return { command: "help", args: [], format, pretty, transport, endpoint, token };
      default:
        throw new CliError(`Unknown global option: ${option}`);
    }
  }

  return {
    command: args.shift(),
    args,
    format,
    pretty,
    transport,
    endpoint,
    token
  };
}

function consumeSharedOptions(args: string[], parsed: ParsedGlobalOptions) {
  const remaining: string[] = [];

  while (args.length > 0) {
    const option = args.shift()!;

    switch (option) {
      case "--format":
        parsed.format = parseOutputFormat(readRequiredOptionValue(args, option));
        break;
      case "--pretty":
        parsed.pretty = true;
        break;
      case "--transport":
        parsed.transport = parseTransport(readRequiredOptionValue(args, option));
        break;
      case "--endpoint":
      case "--url":
        parsed.endpoint = readRequiredOptionValue(args, option);
        break;
      case "--token":
        parsed.token = readRequiredOptionValue(args, option);
        break;
      default:
        remaining.push(option);
    }
  }

  parsed.args = remaining;
}

function readRequiredOptionValue(args: string[], option: string) {
  const value = args.shift();

  if (!value || value.startsWith("--")) {
    throw new CliError(`${option} requires a value.`);
  }

  return value;
}

function parseOutputFormat(value: string): CliOutputFormat {
  if (value === "json" || value === "text") {
    return value;
  }

  throw new CliError(`Unsupported output format: ${value}`);
}

function parseTransport(value: string): CliTransport {
  if (value === "local" || value === "http") {
    return value;
  }

  throw new CliError(`Unsupported transport: ${value}`);
}

function getLocalTools(env: Record<string, string | undefined>) {
  const server = createServer({
    mode: "stdio",
    config: loadEnvConfig(env)
  });

  return readRegisteredTools(server).filter((tool) => tool.enabled);
}

function findLocalTool(toolName: string, env: Record<string, string | undefined>) {
  const tool = getLocalTools(env).find((entry) => entry.name === toolName);

  if (!tool) {
    throw new CliError(`Unknown tool: ${toolName}`);
  }

  return tool;
}

function isRawShape(schema: unknown): schema is ZodRawShapeCompat {
  return schema !== null && typeof schema === "object" && !("_def" in schema) && !("_zod" in schema);
}

function schemaToJson(schema: RegisteredToolInfo["inputSchema"]) {
  if (!schema) {
    return {
      type: "object",
      properties: {}
    };
  }

  const objectSchema = normalizeObjectSchema(schema) ?? (isRawShape(schema) ? objectFromShape(schema) : undefined);

  if (!objectSchema) {
    return {
      type: "object",
      properties: {}
    };
  }

  return toJsonSchemaCompat(objectSchema, {
    strictUnions: true,
    pipeStrategy: "input"
  });
}

function toolToListEntry(tool: RegisteredToolInfo) {
  const manifest = findToolManifestEntry(tool.name);

  return {
    name: tool.name,
    title: tool.title,
    description: tool.description,
    module: manifest?.module,
    access: manifest?.access,
    risk_level: manifest?.riskLevel,
    supports_dry_run: manifest?.supportsDryRun,
    live_status: manifest?.liveStatus
  };
}

function parseToolInput(args: string[], stdin: string | undefined) {
  let inputSource: string | undefined;

  while (args.length > 0) {
    const option = args.shift();

    switch (option) {
      case "--input":
      case "-i":
        inputSource = readRequiredOptionValue(args, option);
        break;
      case "--file":
      case "-f":
        inputSource = readFileSync(readRequiredOptionValue(args, option), "utf8");
        break;
      case "--stdin":
        inputSource = stdin ?? "";
        break;
      default:
        throw new CliError(`Unknown call option: ${option}`);
    }
  }

  if (!inputSource || inputSource.trim().length === 0) {
    return {};
  }

  try {
    return JSON.parse(inputSource);
  } catch (error) {
    throw new CliError(`Input must be valid JSON: ${(error as Error).message}`);
  }
}

function textFromMcpResult(result: unknown) {
  if (!result || typeof result !== "object") {
    return String(result ?? "");
  }

  const content = (result as { content?: unknown }).content;

  if (!Array.isArray(content)) {
    return "";
  }

  return content
    .map((item) => {
      if (!item || typeof item !== "object") {
        return "";
      }

      const candidate = item as { type?: unknown; text?: unknown };
      return candidate.type === "text" && typeof candidate.text === "string" ? candidate.text : "";
    })
    .filter(Boolean)
    .join("\n");
}

function jsonFromMcpResult(result: unknown) {
  if (!result || typeof result !== "object") {
    return result;
  }

  if ("structuredContent" in result) {
    return (result as { structuredContent?: unknown }).structuredContent;
  }

  return result;
}

async function callHttpTool(options: {
  endpoint?: string;
  token?: string;
  toolName: string;
  input: unknown;
  fetch: typeof fetch;
}) {
  if (!options.endpoint) {
    throw new CliError("HTTP transport requires --endpoint or CODEARTS_MCP_URL.");
  }

  const response = await options.fetch(options.endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(options.token ? { authorization: `Bearer ${options.token}` } : {})
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: {
        name: options.toolName,
        arguments: options.input
      }
    })
  });
  const body = (await response.json()) as HttpJsonRpcResponse;

  if (!response.ok || body.error) {
    throw new CliError(body.error?.message ?? `HTTP MCP request failed with status ${response.status}`);
  }

  return body.result;
}

async function listHttpTools(options: {
  endpoint?: string;
  token?: string;
  fetch: typeof fetch;
}) {
  if (!options.endpoint) {
    throw new CliError("HTTP transport requires --endpoint or CODEARTS_MCP_URL.");
  }

  const response = await options.fetch(options.endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(options.token ? { authorization: `Bearer ${options.token}` } : {})
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/list"
    })
  });
  const body = (await response.json()) as HttpJsonRpcResponse;

  if (!response.ok || body.error) {
    throw new CliError(body.error?.message ?? `HTTP MCP request failed with status ${response.status}`);
  }

  const result = body.result as { tools?: unknown };
  return Array.isArray(result.tools) ? result.tools : [];
}

function renderHelp() {
  return [
    "CodeArts MCP CLI",
    "",
    "Usage:",
    "  codearts tools [--format json|text] [--pretty]",
    "  codearts schema <tool> [--pretty]",
    "  codearts call <tool> [--input JSON | --file path | --stdin] [--format json|text] [--pretty]",
    "",
    "Global options:",
    "  --transport local|http",
    "  --endpoint URL",
    "  --token TOKEN",
    "  --format json|text",
    "  --pretty",
    "",
    "Local mode uses HUAWEICLOUD_AK, HUAWEICLOUD_SK, HUAWEICLOUD_REGION, MCP_SERVER_NAME and MCP_SERVER_VERSION."
  ].join("\n");
}

export async function runCli(options: CliRunOptions = {}) {
  const argv = options.argv ?? process.argv.slice(2);
  const env = options.env ?? process.env;
  const stdout = options.stdout ?? ((text) => process.stdout.write(text));
  const stderr = options.stderr ?? ((text) => process.stderr.write(text));

  try {
    const parsed = parseGlobalOptions(argv, env);

    switch (parsed.command) {
      case undefined:
      case "help":
      case "--help":
      case "-h":
        stdout(`${renderHelp()}\n`);
        return 0;
      case "tools": {
        consumeSharedOptions(parsed.args, parsed);
        const tools =
          parsed.transport === "http"
            ? await listHttpTools({
                endpoint: parsed.endpoint,
                token: parsed.token,
                fetch: options.fetch ?? fetch
              })
            : getLocalTools(env).map(toolToListEntry);
        if (parsed.format === "text") {
          stdout(
            `${tools
              .map((tool) =>
                tool && typeof tool === "object" && "name" in tool
                  ? String((tool as { name: unknown }).name)
                  : ""
              )
              .filter(Boolean)
              .join("\n")}\n`
          );
        } else {
          stdout(printJson({ tools }, parsed.pretty));
        }
        return 0;
      }
      case "schema": {
        consumeSharedOptions(parsed.args, parsed);
        const toolName = parsed.args.shift();

        if (!toolName) {
          throw new CliError("schema requires a tool name.");
        }

        if (parsed.transport === "http") {
          const tools = await listHttpTools({
            endpoint: parsed.endpoint,
            token: parsed.token,
            fetch: options.fetch ?? fetch
          });
          const tool = tools.find(
            (candidate) =>
              candidate &&
              typeof candidate === "object" &&
              "name" in candidate &&
              (candidate as { name: unknown }).name === toolName
          ) as { name: string; inputSchema?: unknown; outputSchema?: unknown } | undefined;

          if (!tool) {
            throw new CliError(`Unknown tool: ${toolName}`);
          }

          stdout(
            printJson(
              {
                name: tool.name,
                input_schema: tool.inputSchema,
                output_schema: tool.outputSchema
              },
              true
            )
          );
          return 0;
        }

        const tool = findLocalTool(toolName, env);
        stdout(
          printJson(
            {
              name: tool.name,
              input_schema: schemaToJson(tool.inputSchema),
              output_schema: tool.outputSchema ? schemaToJson(tool.outputSchema) : undefined
            },
            true
          )
        );
        return 0;
      }
      case "call": {
        consumeSharedOptions(parsed.args, parsed);
        const toolName = parsed.args.shift();

        if (!toolName) {
          throw new CliError("call requires a tool name.");
        }

        const input = parseToolInput(parsed.args, options.stdin);
        let result: unknown;

        if (parsed.transport === "http") {
          result = await callHttpTool({
            endpoint: parsed.endpoint,
            token: parsed.token,
            toolName,
            input,
            fetch: options.fetch ?? fetch
          });
        } else {
          const tool = findLocalTool(toolName, env);
          result = await tool.handler(input, {});
        }

        if (parsed.format === "text") {
          stdout(`${textFromMcpResult(result)}\n`);
        } else {
          stdout(printJson(jsonFromMcpResult(result), parsed.pretty));
        }
        return 0;
      }
      default:
        throw new CliError(`Unknown command: ${parsed.command}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    stderr(`${message}\n`);

    return error instanceof CliError ? error.exitCode : 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = await runCli();
}

export const cliEntrypointPath = fileURLToPath(import.meta.url);
