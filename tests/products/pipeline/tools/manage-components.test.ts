import { describe, expect, it, vi } from "vitest";
import {
  createPipelineCreateComponentHandler,
  createPipelineDeleteComponentHandler,
  createPipelineFollowComponentHandler,
  createPipelineUnfollowComponentHandler,
  createPipelineUpdateComponentHandler,
  createPipelineUpdateComponentReposHandler,
  mapCreatedPipelineComponent,
  mapDeletedPipelineComponent,
  mapUpdatedPipelineComponentFavorite,
  mapUpdatedPipelineComponent,
  previewCreatePipelineComponent,
  previewDeletePipelineComponent,
  previewFollowPipelineComponent,
  previewUpdatePipelineComponent
  ,
  previewUpdatePipelineComponentRepos
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

  it("returns dry-run previews for repo update, follow, unfollow, and delete", () => {
    expectDryRunPreview(
      previewUpdatePipelineComponentRepos({
        cloud_project_id: "project-1",
        component_id: "component-1",
        repos: [{ repo_id: "repo-1" }],
        dry_run: true
      }),
      {
        cloudProjectId: "project-1",
        componentId: "component-1",
        repoCount: 1,
        executed: false
      }
    );

    expectDryRunPreview(
      previewFollowPipelineComponent({
        cloud_project_id: "project-1",
        component_id: "component-1",
        favorite: true,
        dry_run: true
      }),
      {
        cloudProjectId: "project-1",
        componentId: "component-1",
        favorite: true,
        executed: false
      }
    );

    expectDryRunPreview(
      previewDeletePipelineComponent({
        cloud_project_id: "project-1",
        component_id: "component-1",
        dry_run: true
      }),
      {
        cloudProjectId: "project-1",
        componentId: "component-1",
        deleted: false,
        executed: false
      }
    );
  });

  it("returns normalized favorite and deleted component data", () => {
    expectMappedItem(
      mapUpdatedPipelineComponentFavorite({
        cloud_project_id: "project-1",
        component_id: "component-1",
        favorite: true,
        raw: { result: "component-1" }
      }),
      {
        id: "component-1",
        cloudProjectId: "project-1",
        componentId: "component-1",
        favorite: true,
        executed: true
      }
    );

    expectMappedItem(
      mapDeletedPipelineComponent({
        cloud_project_id: "project-1",
        component_id: "component-1",
        raw: { result: "component-1" }
      }),
      {
        id: "component-1",
        cloudProjectId: "project-1",
        componentId: "component-1",
        deleted: true,
        executed: true
      }
    );
  });
});

describe("pipeline component handlers", () => {
  it("keeps component write handlers in dry-run mode by default", async () => {
    const createComponent = vi.fn();
    const updateComponent = vi.fn();
    const updateComponentRepos = vi.fn();
    const followComponent = vi.fn();
    const unfollowComponent = vi.fn();
    const deleteComponent = vi.fn();

    const createResult = await createPipelineCreateComponentHandler({
      createComponent,
      updateComponent,
      updateComponentRepos,
      followComponent,
      unfollowComponent,
      deleteComponent
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
      updateComponent,
      updateComponentRepos,
      followComponent,
      unfollowComponent,
      deleteComponent
    })({
      cloud_project_id: "project-1",
      component_id: "component-1",
      desc: "updated service"
    });

    const updateReposResult = await createPipelineUpdateComponentReposHandler({
      createComponent,
      updateComponent,
      updateComponentRepos,
      followComponent,
      unfollowComponent,
      deleteComponent
    })({
      cloud_project_id: "project-1",
      component_id: "component-1",
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

    const followResult = await createPipelineFollowComponentHandler({
      createComponent,
      updateComponent,
      updateComponentRepos,
      followComponent,
      unfollowComponent,
      deleteComponent
    })({
      cloud_project_id: "project-1",
      component_id: "component-1"
    });

    const unfollowResult = await createPipelineUnfollowComponentHandler({
      createComponent,
      updateComponent,
      updateComponentRepos,
      followComponent,
      unfollowComponent,
      deleteComponent
    })({
      cloud_project_id: "project-1",
      component_id: "component-1"
    });

    const deleteResult = await createPipelineDeleteComponentHandler({
      createComponent,
      updateComponent,
      updateComponentRepos,
      followComponent,
      unfollowComponent,
      deleteComponent
    })({
      cloud_project_id: "project-1",
      component_id: "component-1"
    });

    expect(createResult.structuredContent.item?.executed).toBe(false);
    expect(updateResult.structuredContent.item?.executed).toBe(false);
    expect(updateReposResult.structuredContent.item?.executed).toBe(false);
    expect(followResult.structuredContent.item?.executed).toBe(false);
    expect(unfollowResult.structuredContent.item?.executed).toBe(false);
    expect(deleteResult.structuredContent.item?.executed).toBe(false);
    expect(createComponent).not.toHaveBeenCalled();
    expect(updateComponent).not.toHaveBeenCalled();
    expect(updateComponentRepos).not.toHaveBeenCalled();
    expect(followComponent).not.toHaveBeenCalled();
    expect(unfollowComponent).not.toHaveBeenCalled();
    expect(deleteComponent).not.toHaveBeenCalled();
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
    const updateComponentRepos = vi.fn().mockResolvedValue({
      item: { id: "component-1", name: "mall-order", type: "microservice", description: "updated service", status: "active" },
      raw: { id: "component-1" }
    });
    const followComponent = vi.fn().mockResolvedValue({
      component_id: "component-1",
      favorite: true,
      raw: { result: "component-1" }
    });
    const unfollowComponent = vi.fn().mockResolvedValue({
      component_id: "component-1",
      favorite: false,
      raw: { result: "component-1" }
    });
    const deleteComponent = vi.fn().mockResolvedValue({
      component_id: "component-1",
      deleted: true,
      raw: { result: "component-1" }
    });

    const client = { createComponent, updateComponent, updateComponentRepos, followComponent, unfollowComponent, deleteComponent };

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

    const updateReposResult = await createPipelineUpdateComponentReposHandler(client)({
      cloud_project_id: "project-1",
      component_id: "component-1",
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

    const followResult = await createPipelineFollowComponentHandler(client)({
      cloud_project_id: "project-1",
      component_id: "component-1",
      dry_run: false
    });

    const unfollowResult = await createPipelineUnfollowComponentHandler(client)({
      cloud_project_id: "project-1",
      component_id: "component-1",
      dry_run: false
    });

    const deleteResult = await createPipelineDeleteComponentHandler(client)({
      cloud_project_id: "project-1",
      component_id: "component-1",
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
    expect(updateComponentRepos).toHaveBeenCalledWith({
      cloud_project_id: "project-1",
      component_id: "component-1",
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
    expect(followComponent).toHaveBeenCalledWith({
      cloud_project_id: "project-1",
      component_id: "component-1",
      dry_run: false
    });
    expect(unfollowComponent).toHaveBeenCalledWith({
      cloud_project_id: "project-1",
      component_id: "component-1",
      dry_run: false
    });
    expect(deleteComponent).toHaveBeenCalledWith({
      cloud_project_id: "project-1",
      component_id: "component-1",
      dry_run: false
    });
    expect(createResult.structuredContent.item?.executed).toBe(true);
    expect(updateResult.structuredContent.item?.executed).toBe(true);
    expect(updateReposResult.structuredContent.item?.executed).toBe(true);
    expect(followResult.structuredContent.item?.favorite).toBe(true);
    expect(unfollowResult.structuredContent.item?.favorite).toBe(false);
    expect(deleteResult.structuredContent.item?.deleted).toBe(true);
  });
});
