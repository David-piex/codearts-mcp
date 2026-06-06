import { describe, expect, it } from "vitest";
import {
  createCheckDownloadLogFileHandler,
  createCheckExtractTaskAssistantSummaryHandler,
  createCheckGetAsyncJobHandler,
  createCheckGetMeasureTotalHandler,
  createCheckGetPdfFileHandler,
  createCheckGetProjectConfigHandler,
  createCheckGetSingleDefectHandler,
  createCheckGetTaskByIdHandler,
  createCheckListConfigItemsHandler,
  createCheckListCriterionsetsByIdsHandler,
  createCheckListRulesetsV3Handler,
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

  it("maps V1 async job and PDF file reads", async () => {
    const asyncJobHandler = createCheckGetAsyncJobHandler({
      getAsyncJob: async () => ({
        task_id: "task-1",
        async_job_id: "123",
        raw: { id: 123, jobStatus: "SUCCESS" }
      })
    } as never);
    const pdfHandler = createCheckGetPdfFileHandler({
      getPdfFile: async () => ({
        task_id: "task-1",
        job_file: "defects/PdfFiles/report.pdf",
        raw: "%PDF-1.7"
      })
    } as never);

    await expect(asyncJobHandler({ task_id: "task-1", async_job_id: "123" })).resolves.toMatchObject({
      structuredContent: {
        item: {
          id: "123",
          taskId: "task-1",
          job: { id: 123, jobStatus: "SUCCESS" }
        }
      }
    });
    await expect(pdfHandler({ task_id: "task-1", job_file: "defects/PdfFiles/report.pdf" })).resolves.toMatchObject({
      structuredContent: {
        item: {
          id: "task-1",
          jobFile: "defects/PdfFiles/report.pdf",
          pdfFile: { content: "%PDF-1.7" }
        }
      }
    });
  });

  it("maps assistant summary text", async () => {
    const handler = createCheckExtractTaskAssistantSummaryHandler({
      extractTaskAssistantSummary: async () => ({
        task_id: "task-1",
        summary: "风险：低 建议：保持",
        raw: { summary: "风险：低 建议：保持" }
      })
    } as never);

    const result = await handler({ project_id: "project-1", task_id: "task-1" });

    expect(result.content[0]?.text).toContain("Loaded Check task assistant summary");
    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      summary: { summary: "风险：低 建议：保持" }
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

  it("maps criterionsets by ids and v3 rulesets with raw payloads", async () => {
    const byIdsHandler = createCheckListCriterionsetsByIdsHandler({
      listCriterionsetsByIds: async () => ({
        criterionsets: [{ id: "set-1", name: "Java default", language: "JAVA" }],
        total: 1,
        raw: {
          status: "success",
          result: [{ id: "set-1", name: "Java default", language: "JAVA" }]
        }
      })
    } as never);
    const rulesetsV3Handler = createCheckListRulesetsV3Handler({
      listRulesetsV3: async () => ({
        rulesets: [{
          id: "ruleset-1",
          name: "Java Default",
          template_id: "ruleset-1",
          template_name: "Java Default"
        }],
        total: 1,
        raw: {
          info: [{ template_id: "ruleset-1", template_name: "Java Default" }],
          total: 1
        }
      })
    } as never);

    const byIds = await byIdsHandler({
      ids: ["set-1"],
      project_id: "project-1",
      arch: "X86"
    });
    const rulesetsV3 = await rulesetsV3Handler({
      project_id: "project-1",
      page: 1,
      page_size: 10
    });

    expect(byIds.content[0]?.text).toContain("1 criterionsets found");
    expect(byIds.structuredContent.items?.[0]).toMatchObject({
      id: "set-1",
      name: "Java default",
      criterionset: { id: "set-1", name: "Java default", language: "JAVA" }
    });
    expect(byIds.structuredContent.raw).toEqual({
      status: "success",
      result: [{ id: "set-1", name: "Java default", language: "JAVA" }]
    });
    expect(rulesetsV3.content[0]?.text).toContain("1 v3 rulesets found");
    expect(rulesetsV3.structuredContent.items?.[0]).toMatchObject({
      id: "ruleset-1",
      name: "Java Default",
      ruleset: {
        id: "ruleset-1",
        name: "Java Default",
        template_id: "ruleset-1",
        template_name: "Java Default"
      }
    });
    expect(rulesetsV3.structuredContent.raw).toEqual({
      info: [{ template_id: "ruleset-1", template_name: "Java Default" }],
      total: 1
    });
  });
});
