import { describe, expect, it } from "vitest";
import { createPerfTestListTasksHandler } from "../../../../src/products/perftest/tools/list-tasks.js";

describe("createPerfTestListTasksHandler", () => {
  it("maps perftest tasks into MCP output", async () => {
    const handler = createPerfTestListTasksHandler({
      listTasks: async () => ({
        total: 1,
        tasks: [{ id: 11, name: "task-a", bench_concurrent: 100, task_run_info: { id: 99, run_type: 0 } }]
      })
    });

    const result = await handler({
      project_id: "project-1",
      test_suite_id: 1,
      page: 1,
      page_size: 20
    });

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "11", benchConcurrent: 100 });
  });
});
