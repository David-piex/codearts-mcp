import { describe, expect, it } from "vitest";
import { createArtifactClient } from "../../../src/products/artifact/client.js";

describe("createArtifactClient audit", () => {
  it("maps audit responses with nested result", async () => {
    const client = createArtifactClient({
      get: async () => ({
        result: {
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
          total_count: 1
        }
      })
    } as never);

    const result = await client.showAudit({
      tenant_id: "tenant-1",
      project_id: "project-1",
      module: "file",
      repo: "libs-release",
      page: 1,
      page_size: 20
    });

    expect(result.records).toEqual([
      {
        id: "audit-1",
        operation: "deleteArtifactFile",
        user_id: "user-1",
        user_name: "yao",
        op_time: "1713420888000",
        resource_path: "/com/demo/gateway/1.0.0/gateway.jar"
      }
    ]);
    expect(result.total).toBe(1);
  });
});
