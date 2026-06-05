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
const recommendedClientAlias = "codearts";
const inferHubFunctionNameLimit = 64;
const approvedOverLimitNames = [
  "codearts_repo_list_project_merge_request_can_be_assigned_reviewers"
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

  it("keeps recommended client-prefixed function names within InferHub's limit", () => {
    const overLimitNames = collectManifestToolNames({ mode: "http" })
      .map((name) => `${recommendedClientAlias}_${name}`)
      .filter((name) => name.length > inferHubFunctionNameLimit);

    expect(overLimitNames).toEqual(approvedOverLimitNames);
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
    expect(findToolManifestEntry("deploy_start_app")).toMatchObject({
      riskLevel: "high",
      requiresExplicitLiveSample: true
    });
  });
});
