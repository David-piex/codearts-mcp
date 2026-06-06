import { describe, expect, it } from "vitest";
import { auditReqCoverage, renderReqCoverageAudit } from "../../src/server/req-coverage-audit.js";

describe("Req coverage audit", () => {
  it("separates weak endpoint/client matches from semantic tool matches", () => {
    const rows = auditReqCoverage({
      docText: [
        "GET /v4/projects/{project_id}/work-items",
        "GET /v2/issues/show",
        "POST /v1/custom/missing-endpoint"
      ].join("\n"),
      clientText: [
        "/v4/projects/${encodeURIComponent(input.project_id)}/work-items",
        "getWorkItemIssueDetails"
      ].join("\n"),
      toolNames: ["req_list_board_work_items", "req_get_work_item_issue_details"]
    });

    expect(rows).toEqual([
      {
        method: "GET",
        path: "/v2/issues/show",
        clientScore: 0,
        matchedTools: ["req_get_work_item_issue_details"],
        ignoredReason: undefined
      },
      {
        method: "POST",
        path: "/v1/custom/missing-endpoint",
        clientScore: 0,
        matchedTools: [],
        ignoredReason: undefined
      },
      {
        method: "GET",
        path: "/v4/projects/{project_id}/work-items",
        clientScore: 13,
        matchedTools: ["req_list_board_work_items", "req_get_work_item_issue_details"],
        ignoredReason: undefined
      }
    ]);
  });

  it("renders a compact markdown report for weak unmatched endpoints", () => {
    const report = renderReqCoverageAudit({
      docText: "POST /v1/custom/missing-endpoint\nGET /v4/projects/{project_id}/work-items",
      clientText: "/v4/projects/${encodeURIComponent(input.project_id)}/work-items",
      toolNames: ["req_list_board_work_items"]
    });

    expect(report).toContain("Req official endpoints: 2");
    expect(report).toContain("Weak client/tool matches: 1");
    expect(report).toContain("Low-confidence semantic matches: 0");
    expect(report).toContain("| POST | `/v1/custom/missing-endpoint` | 0 | - |");
    expect(report).not.toContain("| Suspect method | Suspect path | Client score | Matched tools |");
  });

  it("matches common official path abbreviations to semantic tool names", () => {
    const rows = auditReqCoverage({
      docText: "POST /v2/{project_id}/img\nGET /v4/irs/{ir_id}/",
      clientText: "",
      toolNames: ["req_upload_work_item_image", "req_get_ir"]
    });

    expect(rows).toEqual([
      {
        method: "GET",
        path: "/v4/irs/{ir_id}/",
        clientScore: 0,
        matchedTools: ["req_get_ir"]
      },
      {
        method: "POST",
        path: "/v2/{project_id}/img",
        clientScore: 0,
        matchedTools: ["req_upload_work_item_image"]
      }
    ]);
  });
});
