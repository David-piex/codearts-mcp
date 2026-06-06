import { describe, expect, it } from "vitest";
import {
  createTestPlanCreateCasesTaskHandler,
  createTestPlanDeleteProjectNoticeHandler,
  createTestPlanListCaseHistoryHandler,
  createTestPlanListCasesByStidHandler,
  createTestPlanListCasesStatusHandler,
  createTestPlanListCasesStatusV3Handler,
  createTestPlanStopCaseTaskHandler
} from "../../../../src/products/testplan/tools/legacy-case-tools.js";

describe("testplan legacy case handlers", () => {
  it("maps legacy case read handlers", async () => {
    const listStatusHandler = createTestPlanListCasesStatusHandler({
      listCasesStatus: async () => ({
        statuses: [{ id: "case-1", name: "case one", status: "PASSED" }],
        total: 1,
        status: "success"
      })
    });
    const listStatusV3Handler = createTestPlanListCasesStatusV3Handler({
      listCasesStatusV3: async () => ({
        statuses: [{ id: "case-2", name: "case two", status: "FAILED" }],
        total: 1,
        status: "success"
      })
    });
    const listHistoryHandler = createTestPlanListCaseHistoryHandler({
      listCaseHistory: async () => ({
        histories: [{ id: "history-1", name: "round 1", result: "PASSED" }],
        total: 3,
        status: "success"
      })
    });
    const listByStidHandler = createTestPlanListCasesByStidHandler({
      listCasesByStid: async () => ({
        cases: [{ id: "case-3", name: "suite case" }],
        total: 4,
        status: "success"
      })
    });

    await expect(
      listStatusHandler({
        testServiceId: "service-1",
        x_auth_token: "token",
        cases: ["case-1"]
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "1 legacy case statuses found",
        items: [{ id: "case-1", name: "case one" }],
        page_info: { page: 1, pageSize: 1, total: 1 }
      }
    });
    await expect(
      listStatusV3Handler({
        testServiceId: "service-1",
        x_auth_token: "token",
        cases: ["case-2"]
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "1 legacy case statuses found",
        items: [{ id: "case-2", name: "case two" }],
        page_info: { page: 1, pageSize: 1, total: 1 }
      }
    });
    await expect(
      listHistoryHandler({
        testServiceId: "service-1",
        x_auth_token: "token",
        case_id: "case-1",
        page: 2,
        page_size: 5
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "1 legacy case histories found",
        items: [{ id: "history-1", name: "round 1" }],
        page_info: { page: 2, pageSize: 5, total: 3 }
      }
    });
    await expect(
      listByStidHandler({
        testServiceId: "service-1",
        x_auth_token: "token",
        suiteid: "suite-1",
        page: 3,
        page_size: 10
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "1 legacy suite cases found",
        items: [{ id: "case-3", name: "suite case" }],
        page_info: { page: 3, pageSize: 10, total: 4 }
      }
    });
  });

  it("returns dry-run preview for create cases task by default", async () => {
    const handler = createTestPlanCreateCasesTaskHandler({
      createCasesTask: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    await expect(
      handler({
        testServiceId: "service-1",
        x_auth_token: "token",
        cases: ["case-1", "case-2"],
        task_name: "legacy task"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: create legacy TestPlan cases task",
        item: {
          id: "legacy task",
          testServiceId: "service-1",
          caseCount: 2,
          taskName: "legacy task",
          executed: false
        }
      }
    });
  });

  it("executes create cases task when dry_run is false", async () => {
    const handler = createTestPlanCreateCasesTaskHandler({
      createCasesTask: async (input) => ({
        task_id: "task-legacy-1",
        need_approve: true,
        warn: ["quota warning"],
        package_type: "PUBLIC",
        is_popup: false,
        status: "success",
        raw: {
          taskId: "task-legacy-1",
          taskName: input.task_name
        }
      })
    });

    await expect(
      handler({
        testServiceId: "service-1",
        x_auth_token: "token",
        cases: ["case-1"],
        task_name: "legacy task",
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Created legacy TestPlan cases task task-legacy-1",
        item: {
          id: "task-legacy-1",
          taskId: "task-legacy-1",
          needApprove: true,
          warn: ["quota warning"],
          packageType: "PUBLIC",
          isPopup: false,
          executed: true
        }
      }
    });
  });

  it("returns dry-run previews for additional legacy write tools", async () => {
    const deleteNoticeHandler = createTestPlanDeleteProjectNoticeHandler({
      deleteProjectNotice: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const stopCaseTaskHandler = createTestPlanStopCaseTaskHandler({
      stopCaseTask: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    await expect(
      deleteNoticeHandler({
        testServiceId: "service-1",
        x_auth_token: "token-1"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: delete legacy TestPlan project notice",
        item: { id: "service-1", testServiceId: "service-1", executed: false }
      }
    });
    await expect(
      stopCaseTaskHandler({
        testServiceId: "service-1",
        caseId: "case-1",
        x_auth_token: "token-1"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: stop legacy TestPlan case task",
        item: { id: "case-1", testServiceId: "service-1", caseId: "case-1", executed: false }
      }
    });
  });

  it("executes additional legacy write tools when dry_run is false", async () => {
    const deleteNoticeHandler = createTestPlanDeleteProjectNoticeHandler({
      deleteProjectNotice: async () => ({
        status: "success",
        value: "ok",
        raw: { result: "ok" }
      })
    });
    const stopCaseTaskHandler = createTestPlanStopCaseTaskHandler({
      stopCaseTask: async () => ({
        status: "success",
        value: "stopped",
        raw: { result: "stopped" }
      })
    });

    await expect(
      deleteNoticeHandler({
        testServiceId: "service-1",
        x_auth_token: "token-1",
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Deleted legacy TestPlan project notice",
        item: { id: "service-1", value: "ok", status: "success", executed: true }
      }
    });
    await expect(
      stopCaseTaskHandler({
        testServiceId: "service-1",
        caseId: "case-1",
        x_auth_token: "token-1",
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Stopped legacy TestPlan case task case-1",
        item: { id: "case-1", value: "stopped", status: "success", executed: true }
      }
    });
  });
});
