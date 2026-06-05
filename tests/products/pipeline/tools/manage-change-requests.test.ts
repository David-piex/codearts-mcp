import { describe, expect, it, vi } from "vitest";
import {
  createPipelineCreateChangeRequestHandler,
  createPipelineUpdateChangeRequestStatusHandler,
  createPipelineUpdateChangeRequestWorkItemsHandler,
  mapCreatedPipelineChangeRequest,
  mapUpdatedPipelineChangeRequestStatus,
  mapUpdatedPipelineChangeRequestWorkItems,
  previewCreatePipelineChangeRequest,
  previewUpdatePipelineChangeRequestStatus,
  previewUpdatePipelineChangeRequestWorkItems
} from "../../../../src/products/pipeline/tools/manage-change-requests.js";
import { expectDryRunPreview, expectMappedItem } from "./tool-test-helpers.js";

describe("pipeline change request previews and mappings", () => {
  it("returns a dry-run preview for creating a change request", () => {
    const result = previewCreatePipelineChangeRequest({
      cloud_project_id: "project-1",
      component_id: "component-1",
      title: "Release CR",
      type: "feature",
      workitem_ids: ["70844211"],
      repos: [
        {
          repo_id: "repo-1",
          http_url: "https://example.com/repo.git",
          git_url: "git@example.com:repo.git",
          feature_branch: "feature/release",
          main_branch: "main"
        }
      ],
      dry_run: true
    });

    expectDryRunPreview(result, {
      cloudProjectId: "project-1",
      componentId: "component-1",
      title: "Release CR",
      type: "feature",
      workItemIds: ["70844211"],
      repoCount: 1,
      executed: false
    });
  });

  it("returns normalized created change request data", () => {
    const result = mapCreatedPipelineChangeRequest({
      cloud_project_id: "project-1",
      change_request_id: "cr-1",
      title: "Release CR",
      status: "developing",
      raw: { id: "cr-1", title: "Release CR", status: "developing" }
    });

    expectMappedItem(result, {
      cloudProjectId: "project-1",
      changeRequestId: "cr-1",
      title: "Release CR",
      status: "developing",
      executed: true
    });
  });

  it("returns a dry-run preview for updating change request status", () => {
    const result = previewUpdatePipelineChangeRequestStatus({
      cloud_project_id: "project-1",
      change_request_id: "cr-1",
      status: "released",
      dry_run: true
    });

    expectDryRunPreview(result, {
      cloudProjectId: "project-1",
      changeRequestId: "cr-1",
      status: "released",
      executed: false
    });
  });

  it("returns normalized updated status data", () => {
    const result = mapUpdatedPipelineChangeRequestStatus({
      cloud_project_id: "project-1",
      change_request_id: "cr-1",
      status: "released",
      title: "Release CR",
      raw: { id: "cr-1", title: "Release CR", status: "released" }
    });

    expectMappedItem(result, {
      cloudProjectId: "project-1",
      changeRequestId: "cr-1",
      status: "released",
      title: "Release CR",
      executed: true
    });
  });

  it("returns a dry-run preview for updating change request work items", () => {
    const result = previewUpdatePipelineChangeRequestWorkItems({
      cloud_project_id: "project-1",
      change_request_id: "cr-1",
      work_item_ids: ["70844211", "70844212"],
      dry_run: true
    });

    expectDryRunPreview(result, {
      cloudProjectId: "project-1",
      changeRequestId: "cr-1",
      workItemIds: ["70844211", "70844212"],
      executed: false
    });
  });

  it("returns normalized updated work item data", () => {
    const result = mapUpdatedPipelineChangeRequestWorkItems({
      cloud_project_id: "project-1",
      change_request_id: "cr-1",
      work_item_ids: ["70844211", "70844212"],
      result: "success",
      raw: { result: "success" }
    });

    expectMappedItem(result, {
      cloudProjectId: "project-1",
      changeRequestId: "cr-1",
      workItemIds: ["70844211", "70844212"],
      result: "success",
      executed: true
    });
  });
});

describe("pipeline change request handlers", () => {
  it("keeps write handlers in dry-run mode by default", async () => {
    const createChangeRequest = vi.fn();
    const updateChangeRequestStatus = vi.fn();
    const updateChangeRequestWorkItems = vi.fn();

    const createResult = await createPipelineCreateChangeRequestHandler({
      createChangeRequest,
      updateChangeRequestStatus,
      updateChangeRequestWorkItems
    })({
      cloud_project_id: "project-1",
      component_id: "component-1",
      title: "Release CR",
      workitem_ids: ["70844211"],
      repos: [
        {
          repo_id: "repo-1",
          http_url: "https://example.com/repo.git",
          git_url: "git@example.com:repo.git",
          feature_branch: "feature/release",
          main_branch: "main"
        }
      ]
    });

    const statusResult = await createPipelineUpdateChangeRequestStatusHandler({
      createChangeRequest,
      updateChangeRequestStatus,
      updateChangeRequestWorkItems
    })({
      cloud_project_id: "project-1",
      change_request_id: "cr-1",
      status: "released"
    });

    const workItemResult = await createPipelineUpdateChangeRequestWorkItemsHandler({
      createChangeRequest,
      updateChangeRequestStatus,
      updateChangeRequestWorkItems
    })({
      cloud_project_id: "project-1",
      change_request_id: "cr-1",
      work_item_ids: ["70844211"]
    });

    expect(createResult.structuredContent.item?.executed).toBe(false);
    expect(statusResult.structuredContent.item?.executed).toBe(false);
    expect(workItemResult.structuredContent.item?.executed).toBe(false);
    expect(createChangeRequest).not.toHaveBeenCalled();
    expect(updateChangeRequestStatus).not.toHaveBeenCalled();
    expect(updateChangeRequestWorkItems).not.toHaveBeenCalled();
  });

  it("executes write handlers when dry_run is false", async () => {
    const createChangeRequest = vi.fn().mockResolvedValue({
      item: { id: "cr-1", title: "Release CR", status: "developing" },
      raw: { id: "cr-1", title: "Release CR", status: "developing" }
    });
    const updateChangeRequestStatus = vi.fn().mockResolvedValue({
      item: { id: "cr-1", title: "Release CR", status: "released" },
      raw: { id: "cr-1", title: "Release CR", status: "released" }
    });
    const updateChangeRequestWorkItems = vi.fn().mockResolvedValue({
      result: "success",
      raw: { result: "success" }
    });

    const client = {
      createChangeRequest,
      updateChangeRequestStatus,
      updateChangeRequestWorkItems
    };

    const createResult = await createPipelineCreateChangeRequestHandler(client)({
      cloud_project_id: "project-1",
      component_id: "component-1",
      title: "Release CR",
      workitem_ids: ["70844211"],
      repos: [
        {
          repo_id: "repo-1",
          http_url: "https://example.com/repo.git",
          git_url: "git@example.com:repo.git",
          feature_branch: "feature/release",
          main_branch: "main"
        }
      ],
      dry_run: false
    });

    const statusResult = await createPipelineUpdateChangeRequestStatusHandler(client)({
      cloud_project_id: "project-1",
      change_request_id: "cr-1",
      status: "released",
      dry_run: false
    });

    const workItemResult = await createPipelineUpdateChangeRequestWorkItemsHandler(client)({
      cloud_project_id: "project-1",
      change_request_id: "cr-1",
      work_item_ids: ["70844211", "70844212"],
      dry_run: false
    });

    expect(createChangeRequest).toHaveBeenCalledWith({
      cloud_project_id: "project-1",
      component_id: "component-1",
      title: "Release CR",
      workitem_ids: ["70844211"],
      repos: [
        {
          repo_id: "repo-1",
          http_url: "https://example.com/repo.git",
          git_url: "git@example.com:repo.git",
          feature_branch: "feature/release",
          main_branch: "main"
        }
      ],
      dry_run: false
    });
    expect(updateChangeRequestStatus).toHaveBeenCalledWith({
      cloud_project_id: "project-1",
      change_request_id: "cr-1",
      status: "released",
      dry_run: false
    });
    expect(updateChangeRequestWorkItems).toHaveBeenCalledWith({
      cloud_project_id: "project-1",
      change_request_id: "cr-1",
      work_item_ids: ["70844211", "70844212"],
      dry_run: false
    });

    expect(createResult.structuredContent.item?.executed).toBe(true);
    expect(statusResult.structuredContent.item?.executed).toBe(true);
    expect(workItemResult.structuredContent.item?.executed).toBe(true);
  });
});
