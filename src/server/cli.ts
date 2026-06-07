#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { stdin as processStdin } from "node:process";
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

type CliOutputFormat = "json" | "text" | "table";
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
  profile?: string;
  config?: string;
};

type CliProfile = {
  transport?: CliTransport;
  endpoint?: string;
  token?: string;
  region?: string;
  access_key?: string;
  secret_key?: string;
  server_name?: string;
  server_version?: string;
  format?: CliOutputFormat;
};

type CliConfigFile = {
  default_profile?: string;
  profiles?: Record<string, CliProfile>;
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

const MCP_PROTOCOL_VERSION = "2025-03-26";

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

function defaultConfigPath(env: Record<string, string | undefined>) {
  return env.CODEARTS_CLI_CONFIG ?? join(env.USERPROFILE ?? env.HOME ?? ".", ".codearts-mcp-cli.json");
}

function readCliConfig(path: string): CliConfigFile {
  if (!existsSync(path)) {
    return {};
  }

  try {
    return JSON.parse(readFileSync(path, "utf8")) as CliConfigFile;
  } catch (error) {
    throw new CliError(`Failed to read CLI config ${path}: ${(error as Error).message}`);
  }
}

function applyProfile(
  parsed: ParsedGlobalOptions,
  env: Record<string, string | undefined>
) {
  const configPath = parsed.config ?? defaultConfigPath(env);
  const config = readCliConfig(configPath);
  const profileName = parsed.profile ?? env.CODEARTS_CLI_PROFILE ?? config.default_profile;

  if (!profileName) {
    return env;
  }

  const profile = config.profiles?.[profileName];

  if (!profile) {
    throw new CliError(`CLI profile not found: ${profileName}`);
  }

  if (profile.transport && parsed.transport === "local" && !env.CODEARTS_CLI_TRANSPORT) {
    parsed.transport = profile.transport;
  }
  parsed.endpoint ??= profile.endpoint;
  parsed.token ??= profile.token;

  if (profile.format && parsed.format === "json" && !env.CODEARTS_CLI_FORMAT) {
    parsed.format = profile.format;
  }

  return {
    ...env,
    HUAWEICLOUD_REGION: env.HUAWEICLOUD_REGION ?? profile.region,
    HUAWEICLOUD_AK: env.HUAWEICLOUD_AK ?? profile.access_key,
    HUAWEICLOUD_SK: env.HUAWEICLOUD_SK ?? profile.secret_key,
    MCP_SERVER_NAME: env.MCP_SERVER_NAME ?? profile.server_name ?? "codearts-mcp",
    MCP_SERVER_VERSION: env.MCP_SERVER_VERSION ?? profile.server_version ?? "0.1.0"
  };
}

function parseGlobalOptions(argv: string[], env: Record<string, string | undefined>): ParsedGlobalOptions {
  const args = [...argv];
  let format: CliOutputFormat = parseOutputFormat(env.CODEARTS_CLI_FORMAT ?? "json");
  let pretty = false;
  let transport: CliTransport = env.CODEARTS_CLI_TRANSPORT === "http" ? "http" : "local";
  let endpoint = env.CODEARTS_MCP_URL ?? env.MCP_HTTP_URL;
  let token = env.CODEARTS_MCP_AUTH_TOKEN ?? env.MCP_AUTH_TOKEN;
  let profile = env.CODEARTS_CLI_PROFILE;
  let config = env.CODEARTS_CLI_CONFIG;

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
      case "--profile":
        profile = readRequiredOptionValue(args, option);
        break;
      case "--config":
        config = readRequiredOptionValue(args, option);
        break;
      case "--help":
      case "-h":
        return { command: "help", args: [], format, pretty, transport, endpoint, token, profile, config };
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
    token,
    profile,
    config
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
      case "--profile":
        parsed.profile = readRequiredOptionValue(args, option);
        break;
      case "--config":
        parsed.config = readRequiredOptionValue(args, option);
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

async function readProcessStdin() {
  let input = "";

  processStdin.setEncoding("utf8");
  for await (const chunk of processStdin) {
    input += chunk;
  }

  return input;
}

function parseOutputFormat(value: string): CliOutputFormat {
  if (value === "json" || value === "text" || value === "table") {
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

function scalarToText(value: unknown) {
  if (value === undefined || value === null) {
    return "";
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return JSON.stringify(value);
}

function truncateCell(value: string, maxWidth = 80) {
  if (value.length <= maxWidth) {
    return value;
  }

  return `${value.slice(0, maxWidth - 3)}...`;
}

function renderTable(rows: Array<Record<string, unknown>>, columns?: string[]) {
  if (rows.length === 0) {
    return "\n";
  }

  const resolvedColumns = columns ?? Object.keys(rows[0] ?? {});
  const cellRows = rows.map((row) =>
    resolvedColumns.map((column) => truncateCell(scalarToText(row[column])))
  );
  const widths = resolvedColumns.map((column, index) =>
    Math.max(
      column.length,
      ...cellRows.map((row) => row[index]?.length ?? 0)
    )
  );
  const line = (values: string[]) =>
    `| ${values.map((value, index) => value.padEnd(widths[index] ?? 0)).join(" | ")} |`;
  const separator = `| ${widths.map((width) => "-".repeat(width)).join(" | ")} |`;

  return `${[line(resolvedColumns), separator, ...cellRows.map(line)].join("\n")}\n`;
}

function tableRowsFromResult(result: unknown) {
  const json = jsonFromMcpResult(result);

  if (!json || typeof json !== "object") {
    return [{ value: json }];
  }

  const candidate = json as { items?: unknown; item?: unknown };

  if (Array.isArray(candidate.items)) {
    return candidate.items.map((item) =>
      item && typeof item === "object" ? (item as Record<string, unknown>) : { value: item }
    );
  }

  if (candidate.item && typeof candidate.item === "object") {
    return [candidate.item as Record<string, unknown>];
  }

  return [json as Record<string, unknown>];
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

function buildHttpMcpHeaders(options: {
  token?: string;
  sessionId?: string;
  includeContentType?: boolean;
}) {
  const headers: Record<string, string> = {
    accept: "application/json, text/event-stream"
  };

  if (options.includeContentType) {
    headers["content-type"] = "application/json";
  }

  if (options.token) {
    headers.authorization = `Bearer ${options.token}`;
  }

  if (options.sessionId) {
    headers["mcp-session-id"] = options.sessionId;
    headers["mcp-protocol-version"] = MCP_PROTOCOL_VERSION;
  }

  return headers;
}

function getResponseHeader(
  response: Pick<Response, "headers"> | { headers?: { get?: (name: string) => string | null } },
  name: string
) {
  if (!response.headers || typeof response.headers.get !== "function") {
    return null;
  }

  return response.headers.get(name);
}

async function initializeHttpSession(options: {
  endpoint?: string;
  token?: string;
  fetch: typeof fetch;
}) {
  if (!options.endpoint) {
    throw new CliError("HTTP transport requires --endpoint or CODEARTS_MCP_URL.");
  }

  const response = await options.fetch(options.endpoint, {
    method: "POST",
    headers: buildHttpMcpHeaders({
      token: options.token,
      includeContentType: true
    }),
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "codearts-cli-init",
      method: "initialize",
      params: {
        protocolVersion: MCP_PROTOCOL_VERSION,
        capabilities: {},
        clientInfo: {
          name: "codearts-cli",
          version: "0.1.0"
        }
      }
    })
  });
  const body = (await response.json()) as HttpJsonRpcResponse;

  if (!response.ok || body.error) {
    throw new CliError(body.error?.message ?? `HTTP MCP request failed with status ${response.status}`);
  }

  const sessionId = getResponseHeader(response, "mcp-session-id");

  if (!sessionId) {
    throw new CliError("HTTP MCP initialize did not return an MCP session id.");
  }

  return sessionId;
}

async function closeHttpSession(options: {
  endpoint?: string;
  token?: string;
  sessionId: string;
  fetch: typeof fetch;
}) {
  if (!options.endpoint) {
    return;
  }

  try {
    await options.fetch(options.endpoint, {
      method: "DELETE",
      headers: buildHttpMcpHeaders({
        token: options.token,
        sessionId: options.sessionId
      })
    });
  } catch {
    // Best-effort cleanup so command results are not hidden by session close failures.
  }
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

  const sessionId = await initializeHttpSession(options);

  try {
    const response = await options.fetch(options.endpoint, {
      method: "POST",
      headers: buildHttpMcpHeaders({
        token: options.token,
        sessionId,
        includeContentType: true
      }),
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
  } finally {
    await closeHttpSession({
      endpoint: options.endpoint,
      token: options.token,
      sessionId,
      fetch: options.fetch
    });
  }
}

async function listHttpTools(options: {
  endpoint?: string;
  token?: string;
  fetch: typeof fetch;
}) {
  if (!options.endpoint) {
    throw new CliError("HTTP transport requires --endpoint or CODEARTS_MCP_URL.");
  }

  const sessionId = await initializeHttpSession(options);

  try {
    const response = await options.fetch(options.endpoint, {
      method: "POST",
      headers: buildHttpMcpHeaders({
        token: options.token,
        sessionId,
        includeContentType: true
      }),
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
  } finally {
    await closeHttpSession({
      endpoint: options.endpoint,
      token: options.token,
      sessionId,
      fetch: options.fetch
    });
  }
}

function renderHelp() {
  return [
    "CodeArts MCP CLI",
    "",
    "Usage:",
    "  codearts tools [--format json|text] [--pretty]",
    "  codearts schema <tool> [--pretty]",
    "  codearts call <tool> [--input JSON | --file path | --stdin] [--format json|text] [--pretty]",
    "  codearts completion powershell|bash|zsh",
    "",
    "Global options:",
    "  --transport local|http",
    "  --endpoint URL",
    "  --token TOKEN",
    "  --profile NAME",
    "  --config PATH",
    "  --format json|text|table",
    "  --pretty",
    "",
    "Local mode uses HUAWEICLOUD_AK, HUAWEICLOUD_SK, HUAWEICLOUD_REGION, MCP_SERVER_NAME and MCP_SERVER_VERSION."
  ].join("\n");
}

function renderCompletion(shell: string) {
  const commands = "tools schema call completion help";
  const globalOptions = "--transport --endpoint --url --token --profile --config --format --pretty --help";

  switch (shell) {
    case "powershell":
      return [
        "Register-ArgumentCompleter -Native -CommandName codearts,codearts-mcp -ScriptBlock {",
        "  param($wordToComplete, $commandAst, $cursorPosition)",
        `  $values = '${commands} ${globalOptions} json text table local http'.Split(' ')`,
        "  $values | Where-Object { $_ -like \"$wordToComplete*\" } | ForEach-Object {",
        "    [System.Management.Automation.CompletionResult]::new($_, $_, 'ParameterValue', $_)",
        "  }",
        "}"
      ].join("\n");
    case "bash":
      return [
        "_codearts_complete() {",
        `  local words=\"${commands} ${globalOptions} json text table local http\"`,
        "  COMPREPLY=( $(compgen -W \"$words\" -- \"${COMP_WORDS[COMP_CWORD]}\") )",
        "}",
        "complete -F _codearts_complete codearts codearts-mcp"
      ].join("\n");
    case "zsh":
      return [
        "#compdef codearts codearts-mcp",
        `_arguments '*: :(${commands} ${globalOptions} json text table local http)'`
      ].join("\n");
    default:
      throw new CliError(`Unsupported completion shell: ${shell}`);
  }
}

export async function runCli(options: CliRunOptions = {}) {
  const argv = options.argv ?? process.argv.slice(2);
  const env = options.env ?? process.env;
  const stdout = options.stdout ?? ((text) => process.stdout.write(text));
  const stderr = options.stderr ?? ((text) => process.stderr.write(text));

  try {
    const parsed = parseGlobalOptions(argv, env);
    const effectiveEnv = applyProfile(parsed, env);

    switch (parsed.command) {
      case undefined:
      case "help":
      case "--help":
      case "-h":
        stdout(`${renderHelp()}\n`);
        return 0;
      case "completion": {
        const shell = parsed.args.shift();

        if (!shell) {
          throw new CliError("completion requires a shell: powershell, bash, or zsh.");
        }

        stdout(`${renderCompletion(shell)}\n`);
        return 0;
      }
      case "tools": {
        consumeSharedOptions(parsed.args, parsed);
        const commandEnv = applyProfile(parsed, effectiveEnv);
        const tools =
          parsed.transport === "http"
            ? await listHttpTools({
                endpoint: parsed.endpoint,
                token: parsed.token,
                fetch: options.fetch ?? fetch
              })
            : getLocalTools(commandEnv).map(toolToListEntry);
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
        } else if (parsed.format === "table") {
          stdout(renderTable(tools as Array<Record<string, unknown>>, [
            "name",
            "module",
            "access",
            "risk_level",
            "live_status"
          ]));
        } else {
          stdout(printJson({ tools }, parsed.pretty));
        }
        return 0;
      }
      case "schema": {
        consumeSharedOptions(parsed.args, parsed);
        const commandEnv = applyProfile(parsed, effectiveEnv);
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

        const tool = findLocalTool(toolName, commandEnv);
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
        const commandEnv = applyProfile(parsed, effectiveEnv);
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
          const tool = findLocalTool(toolName, commandEnv);
          result = await tool.handler(input, {});
        }

        if (parsed.format === "text") {
          stdout(`${textFromMcpResult(result)}\n`);
        } else if (parsed.format === "table") {
          stdout(renderTable(tableRowsFromResult(result)));
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
  const needsStdin = process.argv.includes("--stdin");
  process.exitCode = await runCli({
    stdin: needsStdin ? await readProcessStdin() : undefined
  });
}

export const cliEntrypointPath = fileURLToPath(import.meta.url);
