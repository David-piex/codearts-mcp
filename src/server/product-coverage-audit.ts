import { readFileSync } from "node:fs";
import { artifactToolNames } from "../products/artifact/tools/index.js";
import { buildToolNames } from "../products/build/tools/index.js";
import { checkToolNames } from "../products/check/tools/index.js";
import { deployToolNames } from "../products/deploy/tools/index.js";
import { pipelineToolNames } from "../products/pipeline/tools/index.js";
import { repoToolNames } from "../products/repo/tools/index.js";
import { reqToolNames } from "../products/req/tools/index.js";
import { testPlanToolNames } from "../products/testplan/tools/index.js";
import type { ProductToolFamily } from "./register-product-tools.js";

export type ProductCoverageEndpoint = {
  method: string;
  path: string;
  clientScore: number;
  matchedTools: string[];
  ignoredReason?: string;
};

export type ProductCoverageConfig = {
  family: ProductToolFamily;
  module: string;
  docPath: string;
  clientPaths: string[];
  toolNames: readonly string[];
  endpointAliases?: Record<string, string>;
  ignoredEndpoints?: Record<string, string>;
};

export const productCoverageConfigs: ProductCoverageConfig[] = [
  {
    family: "artifact",
    module: "Artifact",
    docPath: "tmp/pdf-text/_____CodeArts_Artifact_API__.txt",
    clientPaths: ["src/products/artifact/client.ts"],
    toolNames: artifactToolNames
  },
  {
    family: "build",
    module: "Build",
    docPath: "tmp/pdf-text/_____CodeArts_Build_API__.txt",
    clientPaths: ["src/products/build/client.ts"],
    toolNames: buildToolNames
  },
  {
    family: "check",
    module: "Check",
    docPath: "tmp/pdf-text/_____CodeArts_Check_API__.txt",
    clientPaths: ["src/products/check/client.ts"],
    toolNames: checkToolNames,
    endpointAliases: {
      "GET /v1/simple-": "GET /v1/simple-query/{id}",
      "POST /v1/config-": "POST /v1/config-items"
    }
  },
  {
    family: "deploy",
    module: "Deploy",
    docPath: "tmp/pdf-text/___CodeArts_Deploy_API__.txt",
    clientPaths: ["src/products/deploy/client.ts"],
    toolNames: deployToolNames
  },
  {
    family: "pipeline",
    module: "Pipeline",
    docPath: "tmp/pdf-text/____CodeArts_Pipeline_API__.txt",
    clientPaths: ["src/products/pipeline/client.ts"],
    toolNames: pipelineToolNames
  },
  {
    family: "repo",
    module: "Repo",
    docPath: "tmp/pdf-text/_____CodeArts_Repo_API__.txt",
    clientPaths: ["src/products/repo/client.ts"],
    toolNames: repoToolNames,
    endpointAliases: {
      "DELETE /v1/users/sshkey/{id}": "DELETE /v4/user/keys/{key_id}",
      "GET /v1/users/sshkey": "GET /v4/user/keys",
      "POST /v1/users/sshkey": "POST /v4/user/keys"
    },
    ignoredEndpoints: {
      "POST /v1/users/sshkey/privatekey/verify": "deprecated token-only endpoint that requires raw SSH private key input"
    }
  },
  {
    family: "req",
    module: "Req",
    docPath: "tmp/pdf-text/_____CodeArts_Req_API__.txt",
    clientPaths: ["src/products/req/client.ts"],
    toolNames: reqToolNames
  },
  {
    family: "testplan",
    module: "TestPlan",
    docPath: "tmp/pdf-text/_____CodeArts_TestPlan_API__.txt",
    clientPaths: ["src/products/testplan/client.ts"],
    toolNames: testPlanToolNames
  }
];

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
  "repository_id",
  "repository_uuid",
  "group_id",
  "pipeline_id",
  "build_project_id",
  "job_id",
  "task_id",
  "deployment_id",
  "application_id",
  "environment_id",
  "testcase_id",
  "testplan_id",
  "iteration_id",
  "work_hours_id",
  "workhour_id",
  "upload_ym",
  "img_name",
  "extention"
]);

const tokenAliases: Record<string, string[]> = {
  apps: ["application"],
  envs: ["environment"],
  img: ["image"],
  irs: ["ir"],
  issues: ["issue"],
  jobs: ["job"],
  projects: ["project"],
  repos: ["repo", "repository"],
  repositories: ["repo", "repository"],
  rrs: ["rr"],
  tasks: ["task"],
  testcases: ["case", "testcase"],
  testsuites: ["suite", "testsuite"]
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

function toolTokens(toolName: string, family: ProductToolFamily) {
  return new Set(toolName.replace(new RegExp(`^${family}_`), "").split("_").filter(Boolean));
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

function findMatchedTools(
  endpoint: { method: string; path: string },
  config: Pick<ProductCoverageConfig, "family" | "toolNames" | "endpointAliases">
) {
  const aliasKey = config.endpointAliases?.[`${endpoint.method} ${endpoint.path}`];
  const path = aliasKey?.replace(/^[A-Z]+\s+/, "") ?? endpoint.path;
  const tokens = endpointTokens(path)
    .flatMap((token) => token.split(/[-_]/g))
    .filter((token) => token.length > 1)
    .flatMap((token) => [token, ...(tokenAliases[token] ?? [])]);

  return config.toolNames.filter((toolName) => {
    const set = toolTokens(toolName, config.family);
    return tokens.some((token) => set.has(token));
  });
}

function readClientText(clientPaths: string[]) {
  return clientPaths.map((path) => readFileSync(path, "utf8")).join("\n");
}

export function auditProductCoverage(input: {
  config: ProductCoverageConfig;
  docText?: string;
  clientText?: string;
}) {
  const docText = input.docText ?? readFileSync(input.config.docPath, "utf8");
  const clientText = input.clientText ?? readClientText(input.config.clientPaths);

  return collectEndpoints(docText)
    .map<ProductCoverageEndpoint>((endpoint) => ({
      ...endpoint,
      clientScore: scoreClientPath(endpoint.path, clientText),
      matchedTools: findMatchedTools(endpoint, input.config),
      ignoredReason: input.config.ignoredEndpoints?.[`${endpoint.method} ${endpoint.path}`]
    }))
    .sort((left, right) => {
      if (left.clientScore !== right.clientScore) {
        return left.clientScore - right.clientScore;
      }
      return `${left.method} ${left.path}`.localeCompare(`${right.method} ${right.path}`);
    });
}

export function findWeakProductCoverageRows(rows: ProductCoverageEndpoint[]) {
  return rows.filter((row) => !row.ignoredReason && row.clientScore < 4 && row.matchedTools.length === 0);
}

export function findIgnoredProductCoverageRows(rows: ProductCoverageEndpoint[]) {
  return rows.filter((row) => row.ignoredReason);
}

export function renderProductCoverageAudit(input: {
  config: ProductCoverageConfig;
  docText?: string;
  clientText?: string;
}) {
  const rows = auditProductCoverage(input);
  const weakRows = findWeakProductCoverageRows(rows);
  const ignoredRows = findIgnoredProductCoverageRows(rows);

  return [
    `${input.config.module} official endpoints: ${rows.length}`,
    `Weak client/tool matches: ${weakRows.length}`,
    `Explicitly ignored endpoints: ${ignoredRows.length}`,
    "",
    "| Method | Path | Client score | Matched tools |",
    "| --- | --- | ---: | --- |",
    ...weakRows.map((row) => `| ${row.method} | \`${row.path}\` | ${row.clientScore} | ${row.matchedTools.join(", ") || "-"} |`),
    ...(ignoredRows.length > 0
      ? [
          "",
          "| Ignored method | Ignored path | Reason |",
          "| --- | --- | --- |",
          ...ignoredRows.map((row) => `| ${row.method} | \`${row.path}\` | ${row.ignoredReason ?? "-"} |`)
        ]
      : [])
  ].join("\n");
}

export function renderAllProductCoverageAudit() {
  const sections = productCoverageConfigs.map((config) => {
    const rows = auditProductCoverage({ config });
    const weakRows = findWeakProductCoverageRows(rows);
    const ignoredRows = findIgnoredProductCoverageRows(rows);

    return {
      config,
      rows,
      weakRows,
      ignoredRows
    };
  });
  const lines = [
    "| Module | Official endpoints | Weak client/tool matches | Explicitly ignored endpoints |",
    "| --- | ---: | ---: | ---: |",
    ...sections.map(
      ({ config, rows, weakRows, ignoredRows }) =>
        `| ${config.module} | ${rows.length} | ${weakRows.length} | ${ignoredRows.length} |`
    )
  ];

  for (const section of sections.filter(({ weakRows }) => weakRows.length > 0)) {
    lines.push("", `## ${section.config.module}`, "", "| Method | Path | Client score |", "| --- | --- | ---: |");
    lines.push(
      ...section.weakRows
        .slice(0, 50)
        .map((row) => `| ${row.method} | \`${row.path}\` | ${row.clientScore} |`)
    );
  }

  for (const section of sections.filter(({ ignoredRows }) => ignoredRows.length > 0)) {
    lines.push("", `## ${section.config.module} ignored endpoints`, "", "| Method | Path | Reason |", "| --- | --- | --- |");
    lines.push(
      ...section.ignoredRows
        .slice(0, 50)
        .map((row) => `| ${row.method} | \`${row.path}\` | ${row.ignoredReason ?? "-"} |`)
    );
  }

  return lines.join("\n");
}
