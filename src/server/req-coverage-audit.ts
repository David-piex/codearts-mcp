import { readFileSync } from "node:fs";
import { reqToolNames } from "../products/req/tools/index.js";

export type ReqCoverageEndpoint = {
  method: string;
  path: string;
  clientScore: number;
  matchedTools: string[];
};

const DEFAULT_DOC_PATH = "tmp/pdf-text/_____CodeArts_Req_API__.txt";
const DEFAULT_CLIENT_PATH = "src/products/req/client.ts";

const parameterTokens = new Set([
  "project_id",
  "project_uuid",
  "issue_id",
  "workitem_id",
  "work_item_id",
  "plan_id",
  "id",
  "field_id",
  "category_id",
  "label_id",
  "attachment_id",
  "template_id",
  "program_id",
  "ir_id",
  "rr_id",
  "iteration_id",
  "work_hours_id",
  "workhour_id",
  "upload_ym",
  "img_name",
  "extention"
]);

const tokenAliases: Record<string, string[]> = {
  img: ["image"],
  irs: ["ir"],
  issues: ["issue"],
  rrs: ["rr"]
};

function normalizeToken(value: string) {
  return value.replace(/[{}]/g, "").replace(/\..*$/, "");
}

function endpointTokens(path: string) {
  return path
    .split("/")
    .filter(Boolean)
    .map(normalizeToken)
    .filter((token) => token && !parameterTokens.has(token));
}

function toolTokens(toolName: string) {
  return new Set(toolName.replace(/^req_/, "").split("_").filter(Boolean));
}

function collectEndpoints(docText: string) {
  const endpoints = new Map<string, { method: string; path: string }>();
  const pattern = /^(GET|POST|PUT|DELETE|PATCH) (\/[^\s]+)/gm;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(docText))) {
    const method = match[1] ?? "";
    const path = match[2] ?? "";

    if (!path.startsWith("/v") || /^\/v\d\/?$/.test(path)) {
      continue;
    }

    endpoints.set(`${method} ${path}`, { method, path });
  }

  return [...endpoints.values()];
}

function scoreClientPath(path: string, clientText: string) {
  const stableTokens = endpointTokens(path);
  const prefix = path.replace(/\{[^}]+\}/g, "");
  const pathBonus = prefix.length > 4 && clientText.includes(prefix) ? 10 : 0;

  return pathBonus + stableTokens.filter((token) => clientText.includes(token)).length;
}

function findMatchedTools(path: string, toolNames: readonly string[]) {
  const tokens = endpointTokens(path)
    .flatMap((token) => token.split(/[-_]/g))
    .filter((token) => token.length > 1)
    .flatMap((token) => [token, ...(tokenAliases[token] ?? [])]);

  return toolNames.filter((toolName) => {
    const set = toolTokens(toolName);
    return tokens.some((token) => set.has(token));
  });
}

export function auditReqCoverage(input?: {
  docText?: string;
  clientText?: string;
  toolNames?: readonly string[];
}) {
  const docText = input?.docText ?? readFileSync(DEFAULT_DOC_PATH, "utf8");
  const clientText = input?.clientText ?? readFileSync(DEFAULT_CLIENT_PATH, "utf8");
  const toolNames = input?.toolNames ?? reqToolNames;

  return collectEndpoints(docText)
    .map<ReqCoverageEndpoint>((endpoint) => ({
      ...endpoint,
      clientScore: scoreClientPath(endpoint.path, clientText),
      matchedTools: findMatchedTools(endpoint.path, toolNames)
    }))
    .sort((left, right) => {
      if (left.clientScore !== right.clientScore) {
        return left.clientScore - right.clientScore;
      }
      return `${left.method} ${left.path}`.localeCompare(`${right.method} ${right.path}`);
    });
}

export function renderReqCoverageAudit(input?: Parameters<typeof auditReqCoverage>[0]) {
  const rows = auditReqCoverage(input);
  const weakRows = rows.filter((row) => row.clientScore < 4 && row.matchedTools.length === 0);

  return [
    `Req official endpoints: ${rows.length}`,
    `Weak client/tool matches: ${weakRows.length}`,
    "",
    "| Method | Path | Client score | Matched tools |",
    "| --- | --- | ---: | --- |",
    ...weakRows.map((row) =>
      `| ${row.method} | \`${row.path}\` | ${row.clientScore} | ${row.matchedTools.join(", ") || "-"} |`
    )
  ].join("\n");
}
