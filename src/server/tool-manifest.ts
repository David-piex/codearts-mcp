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
  "approve",
  "batch",
  "bind",
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
  "inherit",
  "import",
  "leave",
  "merge",
  "modify",
  "move",
  "pass",
  "prepare",
  "refuse",
  "reject",
  "retry",
  "review",
  "rollback",
  "run",
  "set",
  "start",
  "stop",
  "switch",
  "transfer",
  "upload",
  "update"
]);

export function classifyToolAccess(toolName: string): ToolAccess {
  const [, action = ""] = toolName.split("_");
  return WRITE_ACTIONS.has(action) ? "write" : "read";
}

const authToolManifest: ToolManifestEntry[] = [
  {
    name: "auth_clear_session",
    kind: "auth",
    module: "Auth / Session",
    transport: "http",
    access: "write"
  },
  {
    name: "auth_configure_session",
    kind: "auth",
    module: "Auth / Session",
    transport: "http",
    access: "write"
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
