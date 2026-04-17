import { describe, expect, it } from "vitest";
import { createDeployGetExecutionParamsHandler } from "../../../../src/products/deploy/tools/get-execution-params.js";

describe("createDeployGetExecutionParamsHandler", () => {
  it("maps deploy execution params into MCP output", async () => {
    const handler = createDeployGetExecutionParamsHandler({
      getExecutionParams: async () => ({
        task_id: "task-1",
        record_id: "record-1",
        params: [
          { name: "service_port", type: "text", value: "8080" },
          { name: "env", type: "host_group", value: "group-1" }
        ]
      })
    });

    const result = await handler({
      task_id: "task-1",
      record_id: "record-1"
    });

    expect(result.structuredContent.summary).toContain("2 deploy execution params");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "service_port",
      name: "service_port",
      type: "text",
      value: "8080"
    });
  });
});
