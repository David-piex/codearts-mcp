import { describe, expect, it } from "vitest";
import { expectedToolNames } from "./expected-tool-names.js";
import { checkToolManifestRegistration } from "../../src/server/check-tool-manifest.js";
import {
  collectManifestToolNames,
  collectProductToolManifest,
  collectToolManifest,
  findToolManifestEntry,
  toolManifest,
  type ToolLiveStatus,
  type ToolRiskLevel
} from "../../src/server/tool-manifest.js";

const liveStatuses: ToolLiveStatus[] = ["validated", "partial", "unpublished", "unknown"];
const riskLevels: ToolRiskLevel[] = ["low", "medium", "high"];
const inferHubFunctionNameLimit = 64;
const recommendedServerNamesByFamily = {
  artifact: "artifact",
  build: "build",
  check: "check",
  deploy: "deploy",
  pipeline: "pipeline",
  repo: "repo",
  req: "req",
  testplan: "testplan"
} as const;
const officialPipelineReadToolNames = [
  "pipeline_list_artifact_versions",
  "pipeline_query_manifest_versions",
  "pipeline_get_manifest_versions",
  "pipeline_list_plugin_version_numbers",
  "pipeline_list_templates_v3",
  "pipeline_show_template_detail_v3",
  "pipeline_batch_show_pipelines_status",
  "pipeline_list_pipelines_v3",
  "pipeline_show_pipeline_status",
  "pipeline_list_pipeline_build_results",
  "pipeline_show_pipeline_detail_v3",
  "pipeline_list_pipeline_build_records"
] as const;

describe("ToolManifest", () => {
  it("is the product tool-name source of truth", () => {
    expect(collectManifestToolNames({ kind: "product" })).toEqual(expectedToolNames);
    expect(collectProductToolManifest()).toHaveLength(expectedToolNames.length);
  });

  it("adds HTTP-only auth tools to the HTTP manifest", () => {
    expect(collectManifestToolNames({ mode: "stdio" })).toEqual(expectedToolNames);
    expect(collectManifestToolNames({ mode: "http" })).toEqual(
      [...expectedToolNames, "auth_clear_session", "auth_configure_session"].sort()
    );
  });

  it("keeps tool names unique and mapped to modules", () => {
    const names = toolManifest.map((entry) => entry.name);

    expect(new Set(names).size).toBe(names.length);
    expect(findToolManifestEntry("auth_configure_session")?.module).toBe("Auth / Session");
    expect(findToolManifestEntry("req_list_projects")?.module).toBe("Req");
    expect(
      collectToolManifest({ kind: "product" }).every((entry) => entry.family !== undefined)
    ).toBe(true);
  });

  it("keeps recommended product-scoped server-prefixed function names within InferHub's limit", () => {
    const overLimitNames = collectProductToolManifest()
      .map((entry) => ({
        family: entry.family!,
        combinedName: `${recommendedServerNamesByFamily[entry.family!]}_${entry.name}`
      }))
      .filter((entry) => entry.combinedName.length > inferHubFunctionNameLimit);

    expect(overLimitNames).toEqual([]);
  });

  it("matches actual stdio and HTTP server registration", () => {
    expect(() => checkToolManifestRegistration()).not.toThrow();
  });

  it("carries operational metadata for docs and live governance", () => {
    expect(
      toolManifest.every(
        (entry) =>
          entry.docGroup.length > 0 &&
          liveStatuses.includes(entry.liveStatus) &&
          riskLevels.includes(entry.riskLevel)
      )
    ).toBe(true);
    expect(
      collectProductToolManifest()
        .filter((entry) => entry.access === "write")
        .every((entry) => entry.supportsDryRun)
    ).toBe(true);

    expect(findToolManifestEntry("auth_configure_session")?.supportsDryRun).toBe(false);
    expect(findToolManifestEntry("req_list_projects")).toMatchObject({
      docGroup: "req:project",
      riskLevel: "low",
      liveStatus: "partial",
      requiresExplicitLiveSample: false
    });
    for (const toolName of officialPipelineReadToolNames) {
      expect(findToolManifestEntry(toolName)).toMatchObject({
        access: "read",
        supportsDryRun: false,
        riskLevel: "low",
        docGroup: "pipeline"
      });
    }
    expect(findToolManifestEntry("deploy_start_app")).toMatchObject({
      riskLevel: "high",
      requiresExplicitLiveSample: true
    });
  });
});
