import { describe, expect, it } from "vitest";
import { createDeployClient } from "../../../src/products/deploy/client.js";

describe("createDeployClient legacy task list", () => {
  it("maps legacy deploy task list responses", async () => {
    const client = createDeployClient({
      get: async () => ({
        result: [
          {
            task_id: "task-1",
            application_id: "app-1",
            application_name: "gateway-prod",
            project_id: "project-1",
            status: "available",
            deploy_type: "docker"
          }
        ],
        total_num: 1
      })
    } as never);

    const result = await client.listTasks({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.tasks).toEqual([
      {
        task_id: "task-1",
        application_id: "app-1",
        application_name: "gateway-prod",
        project_id: "project-1",
        status: "available",
        deploy_type: "docker"
      }
    ]);
    expect(result.total).toBe(1);
  });
});
