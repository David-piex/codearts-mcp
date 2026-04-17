import { describe, expect, it } from "vitest";
import { createBuildGetFullStagesHandler } from "../../../../src/products/build/tools/get-full-stages.js";

describe("createBuildGetFullStagesHandler", () => {
  it("maps build full stages into MCP output", async () => {
    const handler = createBuildGetFullStagesHandler({
      getFullStages: async () => ({
        record_id: "record-1",
        build_stages: {
          stage1: {
            id: "stage-1",
            status: "SUCCESS",
            display_name: "Code CheckOut",
            execution_id: "exec-1",
            sequence: 0,
            duration: 10000
          },
          stage2: {
            id: "stage-2",
            status: "FAIL",
            display_name: "Maven Build",
            execution_id: "exec-2",
            sequence: 1,
            duration: 20000
          }
        }
      })
    });

    const result = await handler({ record_id: "record-1", cascade: true });

    expect(result.structuredContent.items).toEqual([
      {
        id: "stage-1",
        name: "Code CheckOut",
        status: "SUCCESS",
        executionId: "exec-1",
        sequence: 0,
        duration: 10000
      },
      {
        id: "stage-2",
        name: "Maven Build",
        status: "FAIL",
        executionId: "exec-2",
        sequence: 1,
        duration: 20000
      }
    ]);
  });
});
