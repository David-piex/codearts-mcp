import { describe, expect, it } from "vitest";
import {
  createTestPlanBatchCloseTestcaseReviewsHandler,
  createTestPlanBatchCreateTestcaseReviewsHandler,
  createTestPlanBatchCreateTestcasesHandler,
  createTestPlanBatchDeleteBranchesV4Handler,
  createTestPlanBatchDeleteIteratorsV4Handler,
  createTestPlanBatchDeleteTestcasesV4Handler,
  createTestPlanBatchUpdateTestcasesV4Handler,
  createTestPlanCreateApiTestcaseV4Handler,
  createTestPlanCreateExecutionTaskV1Handler,
  createTestPlanListIteratorsV4WithStatsHandler
} from "../../../../src/products/testplan/tools/official-batch-tools.js";

describe("official TestPlan batch handlers", () => {
  it("returns dry-run previews for mutation tools by default", async () => {
    const createHandler = createTestPlanBatchCreateTestcasesHandler({
      batchCreateTestcases: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const deleteCasesHandler = createTestPlanBatchDeleteTestcasesV4Handler({
      batchDeleteTestcasesV4: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const updateCasesHandler = createTestPlanBatchUpdateTestcasesV4Handler({
      batchUpdateTestcasesV4: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const deleteIteratorsHandler = createTestPlanBatchDeleteIteratorsV4Handler({
      batchDeleteIteratorsV4: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const deleteBranchesHandler = createTestPlanBatchDeleteBranchesV4Handler({
      batchDeleteBranchesV4: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const createReviewsHandler = createTestPlanBatchCreateTestcaseReviewsHandler({
      batchCreateTestcaseReviews: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const closeReviewsHandler = createTestPlanBatchCloseTestcaseReviewsHandler({
      batchCloseTestcaseReviews: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const createApiCaseHandler = createTestPlanCreateApiTestcaseV4Handler({
      createApiTestcaseV4: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const createExecutionTaskHandler = createTestPlanCreateExecutionTaskV1Handler({
      createExecutionTaskV1: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    await expect(
      createHandler({ project_id: "project-1", testcases: [{ name: "case one" }] })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: batch create TestPlan testcases",
        item: { id: "project-1", testcaseCount: 1, executed: false }
      }
    });
    await expect(
      deleteCasesHandler({ project_id: "project-1", testcase_uris: ["case-1", "case-2"] })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: batch delete 2 TestPlan testcases",
        item: { deletedCount: 2, executed: false }
      }
    });
    await expect(
      updateCasesHandler({ project_id: "project-1", testcase_list: [{ uri: "case-1" }] })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: batch update TestPlan testcases",
        item: { testcaseCount: 1, executed: false }
      }
    });
    await expect(
      deleteIteratorsHandler({ project_id: "project-1", iterator_uris: ["iterator-1"] })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: batch delete 1 TestPlan iterators",
        item: { deletedCount: 1, executed: false }
      }
    });
    await expect(
      deleteBranchesHandler({ project_id: "project-1", branch_uris: ["branch-1"], is_async: false })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: batch delete 1 TestPlan branches",
        item: { deletedCount: 1, isAsync: false, executed: false }
      }
    });
    await expect(
      createReviewsHandler({ project_id: "project-1", testcase_uris: ["case-1"], reviewer_ids: ["user-1"] })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: batch create TestPlan testcase reviews",
        item: { reviewCount: 1, executed: false }
      }
    });
    await expect(
      closeReviewsHandler({ project_id: "project-1", review_ids: ["review-1"] })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: batch close 1 TestPlan testcase reviews",
        item: { closedCount: 1, executed: false }
      }
    });
    await expect(
      createApiCaseHandler({ project_id: "project-1", name: "api case" })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: create TestPlan API testcase api case",
        item: { name: "api case", executed: false }
      }
    });
    await expect(
      createExecutionTaskHandler({ project_id: "project-1", name: "task one" })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: create TestPlan execution task task one",
        item: { name: "task one", executed: false }
      }
    });
  });

  it("maps executed mutation results and iterator list results", async () => {
    const createHandler = createTestPlanBatchCreateTestcasesHandler({
      batchCreateTestcases: async (input) => ({
        project_id: typeof input.project_id === "string" ? input.project_id : undefined,
        testcase_count: Array.isArray(input.testcases) ? input.testcases.length : 0,
        value: "ok",
        raw: { value: "ok" }
      })
    });
    const deleteCasesHandler = createTestPlanBatchDeleteTestcasesV4Handler({
      batchDeleteTestcasesV4: async (input) => ({
        project_id: input.project_id,
        testcase_uris: input.testcase_uris ?? [],
        deleted: true,
        value: "ok",
        raw: { value: "ok" }
      })
    });
    const updateCasesHandler = createTestPlanBatchUpdateTestcasesV4Handler({
      batchUpdateTestcasesV4: async (input) => ({
        project_id: String(input.project_id),
        testcase_count: Array.isArray(input.case_list) ? input.case_list.length : 0,
        updated: true,
        value: "ok",
        raw: { value: "ok" }
      })
    });
    const listIteratorsHandler = createTestPlanListIteratorsV4WithStatsHandler({
      listIteratorsV4WithStats: async () => ({
        iterators: [{ uri: "iterator-1", name: "Sprint 1", current_stage: "execute" }],
        total: 1,
        raw: { value: [{ uri: "iterator-1" }], total: 1 }
      })
    });
    const createReviewsHandler = createTestPlanBatchCreateTestcaseReviewsHandler({
      batchCreateTestcaseReviews: async (input) => ({
        project_id: typeof input.project_id === "string" ? input.project_id : undefined,
        review_count: Array.isArray(input.testcase_uris) ? input.testcase_uris.length : 0,
        value: "ok",
        raw: { value: "ok" }
      })
    });
    const closeReviewsHandler = createTestPlanBatchCloseTestcaseReviewsHandler({
      batchCloseTestcaseReviews: async (input) => ({
        project_id: typeof input.project_id === "string" ? input.project_id : undefined,
        review_ids: Array.isArray(input.review_ids) ? input.review_ids : [],
        closed: true,
        value: "ok",
        raw: { value: "ok" }
      })
    });
    const createApiCaseHandler = createTestPlanCreateApiTestcaseV4Handler({
      createApiTestcaseV4: async (input) => ({
        project_id: String(input.project_id),
        testcase_id: "case-1",
        name: typeof input.name === "string" ? input.name : undefined,
        value: "ok",
        raw: { value: "ok" }
      })
    });
    const createExecutionTaskHandler = createTestPlanCreateExecutionTaskV1Handler({
      createExecutionTaskV1: async (input) => ({
        task_id: "task-1",
        name: typeof input.name === "string" ? input.name : undefined,
        version_uri: typeof input.version_uri === "string" ? input.version_uri : undefined,
        value: "ok",
        raw: { value: "ok" }
      })
    });

    await expect(
      createHandler({
        project_id: "project-1",
        testcases: [{ name: "case one" }],
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        item: { id: "project-1", testcaseCount: 1, value: "ok", executed: true }
      }
    });
    await expect(
      deleteCasesHandler({
        project_id: "project-1",
        testcase_uris: ["case-1"],
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        item: { id: "project-1", testcaseUris: ["case-1"], deleted: true, executed: true }
      }
    });
    await expect(
      updateCasesHandler({
        project_id: "project-1",
        case_list: [{ uri: "case-1" }],
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        item: { id: "project-1", testcaseCount: 1, updated: true, executed: true }
      }
    });
    await expect(
      listIteratorsHandler({ project_id: "project-1", page: 1, page_size: 20 })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "1 TestPlan v4 iterators found",
        items: [{ id: "iterator-1", name: "Sprint 1", currentStage: "execute" }]
      }
    });
    await expect(
      createReviewsHandler({
        project_id: "project-1",
        testcase_uris: ["case-1"],
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        item: { id: "project-1", reviewCount: 1, value: "ok", executed: true }
      }
    });
    await expect(
      closeReviewsHandler({
        project_id: "project-1",
        review_ids: ["review-1"],
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        item: { id: "project-1", reviewIds: ["review-1"], closed: true, executed: true }
      }
    });
    await expect(
      createApiCaseHandler({
        project_id: "project-1",
        name: "api case",
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        item: { id: "case-1", testcaseId: "case-1", name: "api case", executed: true }
      }
    });
    await expect(
      createExecutionTaskHandler({
        project_id: "project-1",
        name: "task one",
        version_uri: "version-1",
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        item: { id: "task-1", name: "task one", versionUri: "version-1", executed: true }
      }
    });
  });
});
