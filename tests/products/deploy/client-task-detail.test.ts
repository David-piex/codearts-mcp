import { describe, expect, it } from "vitest";
import { createDeployClient } from "../../../src/products/deploy/client.js";

describe("createDeployClient task detail", () => {
  it("maps legacy deploy task detail responses", async () => {
    const client = createDeployClient({
      get: async () => ({
        result: {
          task_id: "task-1",
          application_id: "app-1",
          application_name: "gateway-prod",
          project_id: "project-1",
          status: "available",
          deploy_type: "docker",
          description: "production task"
        }
      })
    } as never);

    const result = await client.getTask({ task_id: "task-1" });

    expect(result).toEqual({
      task_id: "task-1",
      application_id: "app-1",
      name: "gateway-prod",
      project_id: "project-1",
      status: "available",
      deploy_type: "docker",
      description: "production task"
    });
  });
});
