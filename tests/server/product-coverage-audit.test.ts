import { describe, expect, it } from "vitest";
import {
  auditProductCoverage,
  findIgnoredProductCoverageRows,
  findWeakProductCoverageRows,
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
        path: "/v2/repositories/{repository_id}/branches",
        clientScore: 3,
        matchedTools: ["repo_list_branches", "repo_get_repository"],
        ignoredReason: undefined
      },
      {
        method: "GET",
        path: "/v2/repositories/{repository_id}",
        clientScore: 12,
        matchedTools: ["repo_get_repository"],
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
    expect(report).toContain("Explicitly ignored endpoints: 0");
    expect(report).toContain("| GET | `/v1/missing` | 0 | - |");
  });

  it("renders the real all-product coverage overview", () => {
    const report = renderAllProductCoverageAudit();

    expect(report).toContain(
      "| Module | Official endpoints | Weak client/tool matches | Explicitly ignored endpoints |"
    );
    expect(report).toContain("| Req |");
    expect(report).toContain("| Repo |");
    expect(report).toContain("| TestPlan |");
    expect(report).toContain("## Repo ignored endpoints");
    expect(report).toContain("requires raw SSH private key input");
  });
});
