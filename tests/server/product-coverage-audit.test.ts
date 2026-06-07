import { describe, expect, it } from "vitest";
import {
  auditProductCoverage,
  findIgnoredProductCoverageRows,
  findSuspectProductCoverageRows,
  findWeakProductCoverageRows,
  productCoverageConfigs,
  renderAllProductCoverageAudit,
  renderProductCoverageAudit,
  type ProductCoverageConfig
} from "../../src/server/product-coverage-audit.js";

const config: ProductCoverageConfig = {
  family: "repo",
  module: "Repo",
  docPath: "unused",
  clientPaths: [],
  toolNames: ["repo_list_branches", "repo_get_repository"]
};

describe("product coverage audit", () => {
  it("audits arbitrary product endpoint text against semantic tool names", () => {
    const rows = auditProductCoverage({
      config,
      docText: [
        "GET /v2/repositories/{repository_id}/branches",
        "GET /v2/repositories/{repository_id}",
        "POST /v2/repositories/{repository_id}/missing-operation"
      ].join("\n"),
      clientText: "/v2/repositories/${encodeURIComponent(input.repository_id)}/branches"
    });

    expect(rows).toEqual([
      {
        method: "POST",
        path: "/v2/repositories/{repository_id}/missing-operation",
        clientScore: 2,
        matchedTools: ["repo_get_repository"],
        ignoredReason: undefined
      },
      {
        method: "GET",
        path: "/v2/repositories/{repository_id}",
        clientScore: 12,
        matchedTools: ["repo_get_repository"],
        ignoredReason: undefined
      },
      {
        method: "GET",
        path: "/v2/repositories/{repository_id}/branches",
        clientScore: 13,
        matchedTools: ["repo_list_branches", "repo_get_repository"],
        ignoredReason: undefined
      }
    ]);
  });

  it("filters weak rows only when both client and tool matching are absent", () => {
    const weakRows = findWeakProductCoverageRows([
      { method: "GET", path: "/v1/missing", clientScore: 0, matchedTools: [] },
      { method: "GET", path: "/v1/semantic", clientScore: 0, matchedTools: ["repo_get_repository"] },
      { method: "GET", path: "/v1/client", clientScore: 4, matchedTools: [] }
    ]);

    expect(weakRows).toEqual([
      { method: "GET", path: "/v1/missing", clientScore: 0, matchedTools: [] }
    ]);
  });

  it("surfaces low-confidence semantic matches separately from weak rows", () => {
    const rows = [
      { method: "GET", path: "/v1/suspect", clientScore: 0, matchedTools: ["repo_get_repository"] },
      { method: "GET", path: "/v1/weak", clientScore: 0, matchedTools: [] },
      { method: "GET", path: "/v1/client", clientScore: 4, matchedTools: ["repo_get_repository"] }
    ];

    expect(findSuspectProductCoverageRows(rows)).toEqual([
      { method: "GET", path: "/v1/suspect", clientScore: 0, matchedTools: ["repo_get_repository"] }
    ]);
    expect(findWeakProductCoverageRows(rows)).toEqual([
      { method: "GET", path: "/v1/weak", clientScore: 0, matchedTools: [] }
    ]);
  });

  it("maps deprecated official endpoints to their replacement tool surface", () => {
    const rows = auditProductCoverage({
      config: {
        ...config,
        toolNames: ["repo_list_user_ssh_keys"],
        endpointAliases: {
          "GET /v1/users/sshkey": "GET /v4/user/keys"
        }
      },
      docText: "GET /v1/users/sshkey",
      clientText: ""
    });

    expect(rows).toEqual([
      {
        method: "GET",
        path: "/v1/users/sshkey",
        clientScore: 0,
        matchedTools: ["repo_list_user_ssh_keys"],
        ignoredReason: undefined
      }
    ]);
    expect(findWeakProductCoverageRows(rows)).toEqual([]);
  });

  it("excludes explicitly unsafe endpoints from weak coverage rows", () => {
    const rows = auditProductCoverage({
      config: {
        ...config,
        ignoredEndpoints: {
          "POST /v1/users/sshkey/privatekey/verify": "requires raw private key input"
        }
      },
      docText: "POST /v1/users/sshkey/privatekey/verify",
      clientText: ""
    });

    expect(rows[0]).toMatchObject({
      method: "POST",
      path: "/v1/users/sshkey/privatekey/verify",
      ignoredReason: "requires raw private key input"
    });
    expect(findWeakProductCoverageRows(rows)).toEqual([]);
    expect(findIgnoredProductCoverageRows(rows)).toEqual(rows);
  });

  it("renders product markdown summaries", () => {
    const report = renderProductCoverageAudit({
      config,
      docText: "GET /v1/missing\nGET /v2/repositories/{repository_id}",
      clientText: ""
    });

    expect(report).toContain("Repo official endpoints: 2");
    expect(report).toContain("Weak client/tool matches: 1");
    expect(report).toContain("Low-confidence semantic matches: 1");
    expect(report).toContain("Explicitly ignored endpoints: 0");
    expect(report).toContain("| GET | `/v1/missing` | 0 | - |");
    expect(report).toContain("| Suspect method | Suspect path | Client score | Matched tools |");
  });

  it("renders the real all-product coverage overview", () => {
    const report = renderAllProductCoverageAudit();

    expect(report).toContain(
      "| Module | Official endpoints | Weak client/tool matches | Low-confidence semantic matches | Explicitly ignored endpoints |"
    );
    expect(report).toContain("| Req |");
    expect(report).toContain("| Repo |");
    expect(report).toContain("| TestPlan |");
    expect(report).toContain("| TestPlan | 570 | 0 | 0 | 0 |");
    expect(report).toContain("## Repo ignored endpoints");
    expect(report).toContain("requires raw SSH private key input");
  }, 15_000);

  it("maps Repo legacy and sample documentation paths to existing MCP tools", () => {
    const repoConfig = productCoverageConfigs.find((item) => item.family === "repo");
    expect(repoConfig).toBeDefined();

    const rows = auditProductCoverage({
      config: repoConfig!,
      docText: [
        "GET /v1/repositories/{repository_id}/branches",
        "POST /v2/repositories/{repository_id}/branches",
        "GET /v2/repositories/{repository_id}/merge_request",
        "PUT /v4/repositories/123/protected-branch?branch_name=tt*",
        "POST /v4/repositories/123/file-push-permissions",
        "PUT /v4/repositories/123/general-policy"
      ].join("\n"),
      clientText: [
        "/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/branches",
        "/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests",
        "/v4/repositories/${encodeURIComponent(input.repository_id)}/protected-branch",
        "/v4/repositories/${encodeURIComponent(input.repository_id)}/file-push-permissions",
        "/v4/repositories/${encodeURIComponent(input.repository_id)}/general-policy"
      ].join("\n")
    });

    expect(findWeakProductCoverageRows(rows)).toEqual([]);
    expect(findSuspectProductCoverageRows(rows)).toEqual([]);
    expect(rows.find((row) => row.path === "/v1/repositories/{repository_id}/branches")?.matchedTools).toContain("repo_list_branches");
    expect(rows.find((row) => row.path === "/v2/repositories/{repository_id}/branches")?.matchedTools).toContain("repo_create_branch");
    expect(rows.find((row) => row.path === "/v2/repositories/{repository_id}/merge_request")?.matchedTools).toContain("repo_list_merge_requests");
    expect(rows.find((row) => row.path === "/v4/repositories/123/protected-branch?branch_name=tt*")?.matchedTools).toContain("repo_update_protected_branch");
    expect(rows.find((row) => row.path === "/v4/repositories/123/file-push-permissions")?.matchedTools).toContain("repo_create_file_push_permission");
    expect(rows.find((row) => row.path === "/v4/repositories/123/general-policy")?.matchedTools).toContain("repo_update_repository_general_policy");
  });

  it("recognizes TestPlan official endpoint tools as implemented coverage", () => {
    const testPlanConfig = productCoverageConfigs.find((item) => item.family === "testplan");
    expect(testPlanConfig).toBeDefined();

    const rows = auditProductCoverage({
      config: testPlanConfig!,
      docText: [
        "POST /v4/{project_id}/images/upload",
        "GET /v1/{project_id}/excel/template",
        "PUT /v4/projects/{project_id}/field-configs/option-value"
      ].join("\n"),
      clientText: ""
    });

    expect(findWeakProductCoverageRows(rows)).toEqual([]);
    expect(findSuspectProductCoverageRows(rows)).toEqual([]);
    expect(rows.find((row) => row.path === "/v4/{project_id}/images/upload")?.matchedTools).toContain("testplan_upload_images_v4");
    expect(rows.find((row) => row.path === "/v1/{project_id}/excel/template")?.matchedTools).toContain("testplan_get_excel_template_v1");
    expect(rows.find((row) => row.path === "/v4/projects/{project_id}/field-configs/option-value")?.matchedTools).toContain("testplan_update_project_field_config_option_value_v4");
  });
});
