import { describe, expect, it } from "vitest";
import { createDeployClient } from "../../../src/products/deploy/client.js";

describe("createDeployClient app operations log", () => {
  it("uses the documented app operations log endpoint", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createDeployClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          result: [],
          total_num: 0
        };
      }
    } as never);

    await client.listAppOperationsLog({
      app_id: "app-1",
      page_size: 10,
      page_index: 1
    });

    expect(requestedPath).toBe("/v1/applications/app-1/operations/log");
    expect(requestedBody).toEqual({
      operation_type: undefined,
      data_type: undefined,
      operator_id: undefined,
      start_time: undefined,
      end_time: undefined,
      sort_type: undefined,
      sort_by: undefined,
      page_size: 10,
      page_index: 1
    });
  });

  it("maps app operations log responses", async () => {
    const client = createDeployClient({
      post: async () => ({
        result: [
          {
            operator: "yao",
            operator_id: "user-1",
            operation_type: "modify",
            data_type: "application",
            operation_time: "1713420888000"
          }
        ],
        total_num: 1
      })
    } as never);

    const result = await client.listAppOperationsLog({
      app_id: "app-1",
      page_size: 10,
      page_index: 1
    });

    expect(result.logs).toEqual([
      {
        operator: "yao",
        operator_id: "user-1",
        operation_type: "modify",
        data_type: "application",
        operation_time: "1713420888000"
      }
    ]);
    expect(result.total).toBe(1);
  });
});
