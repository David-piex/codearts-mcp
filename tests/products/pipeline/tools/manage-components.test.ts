import { describe, expect, it, vi } from "vitest";
import {
  createPipelineCreateComponentHandler,
  createPipelineUpdateComponentHandler,
  mapCreatedPipelineComponent,
  mapUpdatedPipelineComponent,
  previewCreatePipelineComponent,
  previewUpdatePipelineComponent
} from "../../../../src/products/pipeline/tools/manage-components.js";
import { expectDryRunPreview, expectMappedItem } from "./tool-test-helpers.js";

describe("pipeline component previews and mappings", () => {
  it("returns a dry-run preview for creating a component", () => {
    const result = previewCreatePipelineComponent({
      cloud_project_id: "project-1",
      name: "mall-order",
      type: "microservice",
      parent_id: null,
      desc: "order service",
      repos: [
        {
          type: "codehub",
          repo_id: "repo-1",
          http_url: "https://example.com/repo.git",
          git_url: "git@example.com:repo.git",
          branch: "master",
          language: "java"
        }
      ],
      dry_run: true
    });

    expectDryRunPreview(result, {
      cloudProjectId: "project-1",
      name: "mall-order",
      type: "microservice",
      parentId: null,
      description: "order service",
      repoCount: 1,
      executed: false
    });
  });

  it("returns normalized created component data", () => {
    const result = mapCreatedPipelineComponent({
      cloud_project_id: "project-1",
      item: {
        id: "component-1",
        name: "mall-order",
        type: "microservice",
        description: "order service",
        status: "active"
      },
      raw: { id: "component-1" }
    });

    expectMappedItem(result, {
      id: "component-1",
      cloudProjectId: "project-1",
      componentId: "component-1",
      name: "mall-order",
      type: "microservice",
      description: "order service",
      status: "active",
      executed: true
    });
  });

  it("returns a dry-run preview for updating a component", () => {
    const result = previewUpdatePipelineComponent({
      cloud_project_id: "project-1",
      component_id: "component-1",
      desc: "updated service",
      dry_run: true
    });

    expectDryRunPreview(result, {
      cloudProjectId: "project-1",
      componentId: "component-1",
      description: "updated service",
      executed: false
    });
  });

  it("returns normalized updated component data", () => {
    const result = mapUpdatedPipelineComponent({
      cloud_project_id: "project-1",
      component_id: "component-1",
      item: {
        id: "component-1",
        name: "mall-order",
        type: "microservice",
        description: "updated service",
        status: "active"
      },
      raw: { id: "component-1" }
    });

    expectMappedItem(result, {
      id: "component-1",
      cloudProjectId: "project-1",
      componentId: "component-1",
      name: "mall-order",
      type: "microservice",
      description: "updated service",
      status: "active",
      executed: true
    });
  });
});

describe("pipeline component handlers", () => {
  it("keeps component write handlers in dry-run mode by default", async () => {
    const createComponent = vi.fn();
    const updateComponent = vi.fn();

    const createResult = await createPipelineCreateComponentHandler({
      createComponent,
      updateComponent
    })({
      cloud_project_id: "project-1",
      name: "mall-order",
      type: "microservice",
      repos: [
        {
          type: "codehub",
          repo_id: "repo-1",
          http_url: "https://example.com/repo.git",
          git_url: "git@example.com:repo.git",
          branch: "master",
          language: "java"
        }
      ]
    });

    const updateResult = await createPipelineUpdateComponentHandler({
      createComponent,
      updateComponent
    })({
      cloud_project_id: "project-1",
      component_id: "component-1",
      desc: "updated service"
    });

    expect(createResult.structuredContent.item?.executed).toBe(false);
    expect(updateResult.structuredContent.item?.executed).toBe(false);
    expect(createComponent).not.toHaveBeenCalled();
    expect(updateComponent).not.toHaveBeenCalled();
  });

  it("executes component write handlers when dry_run is false", async () => {
    const createComponent = vi.fn().mockResolvedValue({
      item: { id: "component-1", name: "mall-order", type: "microservice", description: "order service", status: "active" },
      raw: { id: "component-1" }
    });
    const updateComponent = vi.fn().mockResolvedValue({
      item: { id: "component-1", name: "mall-order", type: "microservice", description: "updated service", status: "active" },
      raw: { id: "component-1" }
    });

    const client = { createComponent, updateComponent };

    const createResult = await createPipelineCreateComponentHandler(client)({
      cloud_project_id: "project-1",
      name: "mall-order",
      type: "microservice",
      desc: "order service",
      repos: [
        {
          type: "codehub",
          repo_id: "repo-1",
          http_url: "https://example.com/repo.git",
          git_url: "git@example.com:repo.git",
          branch: "master",
          language: "java"
        }
      ],
      dry_run: false
    });

    const updateResult = await createPipelineUpdateComponentHandler(client)({
      cloud_project_id: "project-1",
      component_id: "component-1",
      desc: "updated service",
      dry_run: false
    });

    expect(createComponent).toHaveBeenCalledWith({
      cloud_project_id: "project-1",
      name: "mall-order",
      type: "microservice",
      desc: "order service",
      repos: [
        {
          type: "codehub",
          repo_id: "repo-1",
          http_url: "https://example.com/repo.git",
          git_url: "git@example.com:repo.git",
          branch: "master",
          language: "java"
        }
      ],
      dry_run: false
    });
    expect(updateComponent).toHaveBeenCalledWith({
      cloud_project_id: "project-1",
      component_id: "component-1",
      desc: "updated service",
      dry_run: false
    });
    expect(createResult.structuredContent.item?.executed).toBe(true);
    expect(updateResult.structuredContent.item?.executed).toBe(true);
  });
});
