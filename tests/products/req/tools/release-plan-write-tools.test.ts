import { describe, expect, it, vi } from "vitest";
import {
  reqBatchDeleteReleasePlansInput as reqBatchDeleteReleasePlansInputFromBarrel,
  reqBatchUpdateReleasePlanBaselineInput as reqBatchUpdateReleasePlanBaselineInputFromBarrel,
  reqChangeReleasePlanStatusInput as reqChangeReleasePlanStatusInputFromBarrel,
  reqCreateReleasePlanInput as reqCreateReleasePlanInputFromBarrel,
  reqUpdateReleasePlanInput as reqUpdateReleasePlanInputFromBarrel
} from "../../../../src/products/req/schemas.js";
import {
  reqBatchDeleteReleasePlansInput,
  reqBatchUpdateReleasePlanBaselineInput,
  reqChangeReleasePlanStatusInput,
  reqCreateReleasePlanInput,
  reqUpdateReleasePlanInput
} from "../../../../src/products/req/schemas/plan.js";
import {
  createReqBatchDeleteReleasePlansHandler,
  previewBatchDeleteReleasePlans
} from "../../../../src/products/req/tools/batch-delete-release-plans.js";
import {
  createReqBatchUpdateReleasePlanBaselineHandler,
  previewBatchUpdateReleasePlanBaseline
} from "../../../../src/products/req/tools/batch-update-release-plan-baseline.js";
import {
  createReqChangeReleasePlanStatusHandler,
  previewChangeReleasePlanStatus
} from "../../../../src/products/req/tools/change-release-plan-status.js";
import {
  createReqCreateReleasePlanHandler,
  previewCreateReleasePlan
} from "../../../../src/products/req/tools/create-release-plan.js";
import {
  createReqUpdateReleasePlanHandler,
  previewUpdateReleasePlan
} from "../../../../src/products/req/tools/update-release-plan.js";

describe("release plan write input exports", () => {
  it("keeps the barrel exports compatible with the plan schema module", () => {
    const createInput = {
      project_id: "project-1",
      title: "R1",
      category: "PI" as const,
      plan_start_date: "2026-01-01",
      plan_end_date: "2026-01-31"
    };
    const updateInput = {
      project_id: "project-1",
      plan_id: "plan-1",
      status: "going" as const
    };
    const batchInput = {
      project_id: "project-1",
      plan_ids: ["plan-1"]
    };
    const baselineInput = {
      ...batchInput,
      baseline: "baselined" as const
    };
    const statusInput = {
      project_id: "project-1",
      plan_id: "plan-1",
      operate: "move"
    };

    expect(reqCreateReleasePlanInput.parse(createInput)).toEqual({ ...createInput, dry_run: true });
    expect(reqCreateReleasePlanInputFromBarrel.parse(createInput)).toEqual({ ...createInput, dry_run: true });
    expect(reqUpdateReleasePlanInput.parse(updateInput)).toEqual({ ...updateInput, dry_run: true });
    expect(reqUpdateReleasePlanInputFromBarrel.parse(updateInput)).toEqual({ ...updateInput, dry_run: true });
    expect(reqBatchDeleteReleasePlansInput.parse(batchInput)).toEqual({ ...batchInput, dry_run: true });
    expect(reqBatchDeleteReleasePlansInputFromBarrel.parse(batchInput)).toEqual({ ...batchInput, dry_run: true });
    expect(reqBatchUpdateReleasePlanBaselineInput.parse(baselineInput)).toEqual({ ...baselineInput, dry_run: true });
    expect(reqBatchUpdateReleasePlanBaselineInputFromBarrel.parse(baselineInput)).toEqual({
      ...baselineInput,
      dry_run: true
    });
    expect(reqChangeReleasePlanStatusInput.parse(statusInput)).toEqual({ ...statusInput, dry_run: true });
    expect(reqChangeReleasePlanStatusInputFromBarrel.parse(statusInput)).toEqual({ ...statusInput, dry_run: true });
  });
});

describe("release plan write previews", () => {
  it("previews release plan mutations without execution", () => {
    expect(
      previewCreateReleasePlan({
        project_id: "project-1",
        title: "R1",
        category: "PI",
        plan_start_date: "2026-01-01",
        plan_end_date: "2026-01-31",
        dry_run: true
      }).item
    ).toMatchObject({
      projectId: "project-1",
      title: "R1",
      category: "PI",
      executed: false
    });

    expect(previewUpdateReleasePlan({ project_id: "project-1", plan_id: "plan-1", status: "going", dry_run: true }).item)
      .toMatchObject({
        projectId: "project-1",
        id: "plan-1",
        status: "going",
        executed: false
      });

    expect(previewBatchDeleteReleasePlans({ project_id: "project-1", plan_ids: ["plan-1"], dry_run: true }).item)
      .toMatchObject({
        projectId: "project-1",
        planIds: ["plan-1"],
        executed: false
      });

    expect(
      previewBatchUpdateReleasePlanBaseline({
        project_id: "project-1",
        plan_ids: ["plan-1"],
        baseline: "baselined",
        dry_run: true
      }).item
    ).toMatchObject({
      projectId: "project-1",
      planIds: ["plan-1"],
      baseline: "baselined",
      executed: false
    });

    expect(
      previewChangeReleasePlanStatus({
        project_id: "project-1",
        plan_id: "plan-1",
        operate: "move",
        dry_run: true
      }).item
    ).toMatchObject({
      projectId: "project-1",
      id: "plan-1",
      operate: "move",
      executed: false
    });
  });
});

describe("release plan write handlers", () => {
  it("short-circuits dry-run mutations", async () => {
    const createClient = { createReleasePlan: vi.fn() };
    const updateClient = { updateReleasePlan: vi.fn() };
    const deleteClient = { batchDeleteReleasePlans: vi.fn() };
    const baselineClient = { batchUpdateReleasePlanBaseline: vi.fn() };
    const statusClient = { changeReleasePlanStatus: vi.fn() };

    await createReqCreateReleasePlanHandler(createClient)({
      project_id: "project-1",
      title: "R1",
      category: "PI",
      plan_start_date: "2026-01-01",
      plan_end_date: "2026-01-31"
    });
    await createReqUpdateReleasePlanHandler(updateClient)({
      project_id: "project-1",
      plan_id: "plan-1",
      status: "going"
    });
    await createReqBatchDeleteReleasePlansHandler(deleteClient)({
      project_id: "project-1",
      plan_ids: ["plan-1"]
    });
    await createReqBatchUpdateReleasePlanBaselineHandler(baselineClient)({
      project_id: "project-1",
      plan_ids: ["plan-1"],
      baseline: "baselined"
    });
    await createReqChangeReleasePlanStatusHandler(statusClient)({
      project_id: "project-1",
      plan_id: "plan-1",
      operate: "move"
    });

    expect(createClient.createReleasePlan).not.toHaveBeenCalled();
    expect(updateClient.updateReleasePlan).not.toHaveBeenCalled();
    expect(deleteClient.batchDeleteReleasePlans).not.toHaveBeenCalled();
    expect(baselineClient.batchUpdateReleasePlanBaseline).not.toHaveBeenCalled();
    expect(statusClient.changeReleasePlanStatus).not.toHaveBeenCalled();
  });

  it("executes release plan mutations when dry_run is false", async () => {
    const createClient = {
      createReleasePlan: vi.fn(async () => ({
        project_id: "project-1",
        status: "success",
        plan: { id: "plan-1", title: "R1", category: "PI" }
      }))
    };
    const updateClient = {
      updateReleasePlan: vi.fn(async () => ({
        project_id: "project-1",
        status: "success",
        plan: { id: "plan-1", title: "R1 updated", status: "going" }
      }))
    };
    const batchResult = {
      project_id: "project-1",
      plan_ids: ["plan-1"],
      status: "success",
      success_num: 1,
      fail_num: 0,
      success: [{ id: "plan-1" }],
      failed: []
    };
    const deleteClient = { batchDeleteReleasePlans: vi.fn(async () => batchResult) };
    const baselineClient = { batchUpdateReleasePlanBaseline: vi.fn(async () => batchResult) };
    const statusClient = {
      changeReleasePlanStatus: vi.fn(async () => ({
        project_id: "project-1",
        plan_id: "plan-1",
        operate: "move",
        status: "success"
      }))
    };

    const createResult = await createReqCreateReleasePlanHandler(createClient)({
      project_id: "project-1",
      title: "R1",
      category: "PI",
      plan_start_date: "2026-01-01",
      plan_end_date: "2026-01-31",
      dry_run: false
    });
    const updateResult = await createReqUpdateReleasePlanHandler(updateClient)({
      project_id: "project-1",
      plan_id: "plan-1",
      status: "going",
      dry_run: false
    });
    const deleteResult = await createReqBatchDeleteReleasePlansHandler(deleteClient)({
      project_id: "project-1",
      plan_ids: ["plan-1"],
      dry_run: false
    });
    const baselineResult = await createReqBatchUpdateReleasePlanBaselineHandler(baselineClient)({
      project_id: "project-1",
      plan_ids: ["plan-1"],
      baseline: "baselined",
      dry_run: false
    });
    const statusResult = await createReqChangeReleasePlanStatusHandler(statusClient)({
      project_id: "project-1",
      plan_id: "plan-1",
      operate: "move",
      dry_run: false
    });

    expect(createClient.createReleasePlan).toHaveBeenCalledWith({
      project_id: "project-1",
      title: "R1",
      category: "PI",
      plan_start_date: "2026-01-01",
      plan_end_date: "2026-01-31",
      dry_run: false
    });
    expect(updateClient.updateReleasePlan).toHaveBeenCalledWith({
      project_id: "project-1",
      plan_id: "plan-1",
      status: "going",
      dry_run: false
    });
    expect(deleteClient.batchDeleteReleasePlans).toHaveBeenCalledWith({
      project_id: "project-1",
      plan_ids: ["plan-1"],
      dry_run: false
    });
    expect(baselineClient.batchUpdateReleasePlanBaseline).toHaveBeenCalledWith({
      project_id: "project-1",
      plan_ids: ["plan-1"],
      baseline: "baselined",
      dry_run: false
    });
    expect(statusClient.changeReleasePlanStatus).toHaveBeenCalledWith({
      project_id: "project-1",
      plan_id: "plan-1",
      operate: "move",
      dry_run: false
    });
    expect(createResult.structuredContent.item?.executed).toBe(true);
    expect(updateResult.structuredContent.item?.executed).toBe(true);
    expect(deleteResult.structuredContent.item?.executed).toBe(true);
    expect(baselineResult.structuredContent.item?.executed).toBe(true);
    expect(statusResult.structuredContent.item?.executed).toBe(true);
  });
});
