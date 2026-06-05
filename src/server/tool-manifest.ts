import { artifactToolNames } from "../products/artifact/tools/index.js";
import { buildToolNames } from "../products/build/tools/index.js";
import { checkToolNames } from "../products/check/tools/index.js";
import { deployToolNames } from "../products/deploy/tools/index.js";
import { pipelineToolNames } from "../products/pipeline/tools/index.js";
import { repoToolNames } from "../products/repo/tools/index.js";
import { reqToolNames } from "../products/req/tools/index.js";
import { testPlanToolNames } from "../products/testplan/tools/index.js";
import type { ProductToolFamily } from "./register-product-tools.js";

export type ToolManifestKind = "auth" | "product";
export type ToolManifestTransport = "all" | "http";
export type ToolAccess = "read" | "write";
export type ToolLiveStatus = "validated" | "partial" | "unpublished" | "unknown";
export type ToolRiskLevel = "low" | "medium" | "high";
export type ProductToolModule =
  | "Req"
  | "Repo"
  | "Pipeline"
  | "Check"
  | "TestPlan"
  | "Deploy"
  | "Build"
  | "Artifact";

export type ToolManifestEntry = {
  name: string;
  kind: ToolManifestKind;
  module: ProductToolModule | "Auth / Session";
  transport: ToolManifestTransport;
  access: ToolAccess;
  supportsDryRun: boolean;
  liveStatus: ToolLiveStatus;
  docGroup: string;
  riskLevel: ToolRiskLevel;
  requiresExplicitLiveSample: boolean;
  family?: ProductToolFamily;
};

export const productToolModuleOrder: ProductToolModule[] = [
  "Req",
  "Repo",
  "Pipeline",
  "Check",
  "TestPlan",
  "Deploy",
  "Build",
  "Artifact"
];

const productToolSources: Array<{
  family: ProductToolFamily;
  module: ProductToolModule;
  names: readonly string[];
}> = [
  { family: "artifact", module: "Artifact", names: artifactToolNames },
  { family: "build", module: "Build", names: buildToolNames },
  { family: "check", module: "Check", names: checkToolNames },
  { family: "deploy", module: "Deploy", names: deployToolNames },
  { family: "pipeline", module: "Pipeline", names: pipelineToolNames },
  { family: "repo", module: "Repo", names: repoToolNames },
  { family: "req", module: "Req", names: reqToolNames },
  { family: "testplan", module: "TestPlan", names: testPlanToolNames }
];

const WRITE_ACTIONS = new Set([
  "add",
  "append",
  "apply",
  "approve",
  "associate",
  "batch",
  "bind",
  "bulk",
  "cancel",
  "change",
  "clear",
  "close",
  "configure",
  "copy",
  "create",
  "delete",
  "disable",
  "enable",
  "follow",
  "inherit",
    "import",
    "init",
    "leave",
  "merge",
  "modify",
  "move",
  "pass",
  "prepare",
  "quick",
  "refuse",
  "reject",
  "restore",
  "request",
  "retry",
  "review",
  "rollback",
  "run",
  "save",
  "set",
  "start",
  "stop",
  "switch",
  "transfer",
  "unfollow",
  "upload",
  "update"
]);

const HIGH_RISK_ACTIONS = new Set([
  "delete",
  "rollback",
  "run",
  "start",
  "stop"
]);

const explicitLiveSampleActions = new Set([
  "rollback",
  "start",
  "stop"
]);

const moduleLiveStatus: Record<ProductToolModule, ToolLiveStatus> = {
  Req: "partial",
  Repo: "partial",
  Pipeline: "partial",
  Check: "validated",
  TestPlan: "partial",
  Deploy: "partial",
  Build: "validated",
  Artifact: "partial"
};

export function classifyToolAccess(toolName: string): ToolAccess {
  if (
    toolName === "pipeline_batch_get_pipeline_status" ||
    toolName === "pipeline_check_project" ||
    toolName === "pipeline_check_component"
  ) {
    return "read";
  }

  const [, action = ""] = toolName.split("_");
  return WRITE_ACTIONS.has(action) ? "write" : "read";
}

function getToolAction(toolName: string) {
  return toolName.split("_")[1] ?? "";
}

function inferRiskLevel(toolName: string): ToolRiskLevel {
  const action = getToolAction(toolName);

  if (HIGH_RISK_ACTIONS.has(action)) {
    return "high";
  }

  return classifyToolAccess(toolName) === "write" ? "medium" : "low";
}

function inferDocGroup(toolName: string, family: ProductToolFamily) {
  if (family !== "req") {
    return family;
  }

  if (toolName.includes("_ipd_")) {
    if (toolName.includes("_attachment") || toolName.includes("_image")) {
      return "req:attachment";
    }
    if (toolName.includes("_work_hour")) {
      return "req:work-hour";
    }
    return "req:ipd";
  }

  if (toolName.includes("_attachment") || toolName.includes("_image")) {
    return "req:attachment";
  }

  if (toolName.includes("_work_hour") || toolName.includes("_working_hours")) {
    return "req:work-hour";
  }

  if (toolName.includes("_member") || toolName === "req_leave_project") {
    return "req:member";
  }

  if (toolName.includes("_iteration")) {
    return "req:iteration";
  }

  if (
    toolName.includes("_plan") ||
    toolName.includes("_release_") ||
    toolName.includes("_ir") ||
    toolName.includes("_rr") ||
    toolName.includes("_program") ||
    toolName.includes("_severity")
  ) {
    return "req:plan";
  }

  if (
    toolName.includes("_status") ||
    toolName.includes("_config") ||
    toolName.includes("_template") ||
    toolName.includes("_tracker") ||
    toolName.includes("_cache") ||
    toolName.includes("_feature")
  ) {
    return "req:config";
  }

  if (toolName.includes("_work_item") || toolName.includes("_issue")) {
    return "req:work-item";
  }

  return "req:project";
}

function requiresExplicitLiveSample(toolName: string) {
  const action = getToolAction(toolName);

  return explicitLiveSampleActions.has(action) || toolName.includes("_execute_");
}

const authToolManifest: ToolManifestEntry[] = [
  {
    name: "auth_clear_session",
    kind: "auth",
    module: "Auth / Session",
    transport: "http",
    access: "write",
    supportsDryRun: false,
    liveStatus: "validated",
    docGroup: "auth",
    riskLevel: "medium",
    requiresExplicitLiveSample: false
  },
  {
    name: "auth_configure_session",
    kind: "auth",
    module: "Auth / Session",
    transport: "http",
    access: "write",
    supportsDryRun: false,
    liveStatus: "validated",
    docGroup: "auth",
    riskLevel: "medium",
    requiresExplicitLiveSample: false
  }
];

function createProductToolManifest(): ToolManifestEntry[] {
  return productToolSources.flatMap((source) =>
    source.names.map((name) => ({
      name,
      kind: "product" as const,
      module: source.module,
      transport: "all" as const,
      access: classifyToolAccess(name),
      supportsDryRun: classifyToolAccess(name) === "write",
      liveStatus: moduleLiveStatus[source.module],
      docGroup: inferDocGroup(name, source.family),
      riskLevel: inferRiskLevel(name),
      requiresExplicitLiveSample: requiresExplicitLiveSample(name),
      family: source.family
    }))
  );
}

function sortManifestEntries(entries: ToolManifestEntry[]) {
  return [...entries].sort((left, right) => left.name.localeCompare(right.name));
}

export const productToolManifest = sortManifestEntries(createProductToolManifest());
export const toolManifest = sortManifestEntries([
  ...productToolManifest,
  ...authToolManifest
]);

export function collectToolManifest(options?: {
  mode?: "http" | "stdio";
  kind?: ToolManifestKind;
}) {
  return toolManifest.filter((entry) => {
    if (options?.kind && entry.kind !== options.kind) {
      return false;
    }

    if (!options?.mode) {
      return true;
    }

    return entry.transport === "all" || entry.transport === options.mode;
  });
}

export function collectProductToolManifest() {
  return productToolManifest;
}

export function collectManifestToolNames(options?: Parameters<typeof collectToolManifest>[0]) {
  return collectToolManifest(options).map((entry) => entry.name);
}

export function findToolManifestEntry(toolName: string) {
  return toolManifest.find((entry) => entry.name === toolName);
}
