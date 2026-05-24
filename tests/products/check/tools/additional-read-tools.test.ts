import { describe, expect, it } from "vitest";
import {
  createCheckDownloadLogFileHandler,
  createCheckGetMeasureTotalHandler,
  createCheckGetProjectConfigHandler,
  createCheckGetSingleDefectHandler,
  createCheckGetTaskByIdHandler,
  createCheckListConfigItemsHandler,
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

  it("maps project config and measure total as raw items", async () => {
    const configHandler = createCheckGetProjectConfigHandler({
      getProjectConfig: async () => ({
        id: "config-1",
        raw: { id: "config-1", name: "Default config" }
      })
    } as never);
    const measureHandler = createCheckGetMeasureTotalHandler({
      getMeasureTotal: async () => ({
        task_id: "task-1",
        raw: { taskId: "task-1", defectCount: 2 }
      })
    } as never);

    await expect(configHandler({ id: "config-1" })).resolves.toMatchObject({
      structuredContent: {
        item: {
          id: "config-1",
          config: { id: "config-1", name: "Default config" }
        }
      }
    });
    await expect(measureHandler({ task_id: "task-1" })).resolves.toMatchObject({
      structuredContent: {
        item: {
          id: "task-1",
          measures: { taskId: "task-1", defectCount: 2 }
        }
      }
    });
  });

  it("maps config items as a list with raw payload", async () => {
    const handler = createCheckListConfigItemsHandler({
      listConfigItems: async () => ({
        items: [{ id: "rule-1", name: "AvoidHardcode" }],
        total: 1,
        raw: { data: [{ id: "rule-1", name: "AvoidHardcode" }] }
      })
    } as never);

    const result = await handler({ ids: ["ruleset-1"] });

    expect(result.content[0]?.text).toContain("1 config items found");
    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "rule-1",
      name: "AvoidHardcode",
      configItem: { id: "rule-1", name: "AvoidHardcode" }
    });
    expect(result.structuredContent.raw).toEqual({
      data: [{ id: "rule-1", name: "AvoidHardcode" }]
    });
  });
});
