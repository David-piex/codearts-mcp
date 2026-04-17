import { describe, expect, it } from "vitest";
import { createArtifactShowAuditHandler } from "../../../../src/products/artifact/tools/show-audit.js";

describe("createArtifactShowAuditHandler", () => {
  it("maps artifact audit logs into MCP output", async () => {
    const handler = createArtifactShowAuditHandler({
      showAudit: async () => ({
        records: [
          {
            id: "audit-1",
            operation: "deleteArtifactFile",
            user_id: "user-1",
            user_name: "yao",
            op_time: "1713420888000",
            resource_path: "/com/demo/gateway/1.0.0/gateway.jar"
          }
        ],
        total: 1
      })
    });

    const result = await handler({
      tenant_id: "tenant-1",
      project_id: "project-1",
      module: "file",
      repo: "libs-release",
      page: 1,
      page_size: 20
    });

    expect(result.structuredContent.summary).toContain("1 artifact audit logs");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "audit-1",
      operation: "deleteArtifactFile",
      userId: "user-1",
      userName: "yao",
      operatedAt: "1713420888000",
      resourcePath: "/com/demo/gateway/1.0.0/gateway.jar"
    });
  });
});
