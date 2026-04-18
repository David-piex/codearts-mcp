import { describe, expect, it } from "vitest";
import { createDeployListAppOperationsLogHandler } from "../../../../src/products/deploy/tools/list-app-operations-log.js";

describe("createDeployListAppOperationsLogHandler", () => {
  it("maps deploy app operation logs into MCP output", async () => {
    const handler = createDeployListAppOperationsLogHandler({
      listAppOperationsLog: async () => ({
        logs: [
          {
            operator: "yao",
            operator_id: "user-1",
            operation_type: "modify",
            data_type: "application",
            operation_time: "1713420888000"
          }
        ],
        total: 1
      })
    });

    const result = await handler({ app_id: "app-1", page_size: 10, page_index: 1 });

    expect(result.structuredContent.summary).toContain("1 deploy app operation logs");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "user-1:1713420888000:modify",
      appId: "app-1",
      operator: "yao",
      operatorId: "user-1",
      operationType: "modify",
      dataType: "application",
      operationTime: "1713420888000"
    });
  });
});
