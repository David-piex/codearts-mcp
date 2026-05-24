import { describe, expect, it } from "vitest";
import {
  createCheckDownloadLogFileHandler,
  createCheckGetSingleDefectHandler,
  createCheckGetTaskByIdHandler,
  createCheckListDefectNextStatusesHandler
} from "../../../../src/products/check/tools/additional-read-tools.js";

describe("Check additional read tool handlers", () => {
  it("maps task by id as a raw item", async () => {
    const handler = createCheckGetTaskByIdHandler({
      getTaskById: async () => ({
        task_id: "task-1",
        raw: { task_id: "task-1", task_name: "scan" }
      })
    } as never);

    const result = await handler({ task_id: "task-1" });

    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      task: { task_id: "task-1", task_name: "scan" }
    });
  });

  it("maps defect next statuses as a list with raw payload", async () => {
    const handler = createCheckListDefectNextStatusesHandler({
      listDefectNextStatuses: async () => ({
        statuses: [{ id: "1", name: "Fixed" }],
        total: 1,
        raw: { statuses: [{ id: "1", name: "Fixed" }] }
      })
    } as never);

    const result = await handler({ query: { status_id: 1 } });

    expect(result.content[0]?.text).toContain("1 defect next statuses found");
    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "1",
      name: "Fixed",
      status: { id: "1", name: "Fixed" }
    });
    expect(result.structuredContent.raw).toEqual({
      statuses: [{ id: "1", name: "Fixed" }]
    });
  });

  it("maps single defect detail", async () => {
    const handler = createCheckGetSingleDefectHandler({
      getSingleDefect: async () => ({
        defect_id: "defect-1",
        raw: { id: "defect-1", rule_name: "AvoidHardcode" }
      })
    } as never);

    const result = await handler({ defect_id: "defect-1" });

    expect(result.structuredContent.item).toEqual({
      id: "defect-1",
      defect: { id: "defect-1", rule_name: "AvoidHardcode" }
    });
  });

  it("wraps log text responses", async () => {
    const handler = createCheckDownloadLogFileHandler({
      downloadLogFile: async () => ({
        sub_job_id: "sub-job-1",
        raw: "line 1"
      })
    } as never);

    const result = await handler({ sub_job_id: "sub-job-1" });

    expect(result.structuredContent.item).toEqual({
      id: "sub-job-1",
      log: { content: "line 1" }
    });
  });
});
