import { describe, expect, it } from "vitest";
import {
  createArtifactCreateRepositoryHandler,
  createArtifactDeleteTrashRepositoriesHandler,
  createArtifactRestoreTrashRepositoriesHandler,
  createArtifactUpdateRepositoryHandler
} from "../../../../src/products/artifact/tools/repository-mutations.js";

function createFailingClient() {
  return {
    createRepository: async () => {
      throw new Error("dry run should not create repositories");
    },
    updateRepository: async () => {
      throw new Error("dry run should not update repositories");
    },
    restoreTrashRepositories: async () => {
      throw new Error("dry run should not restore trash repositories");
    },
    deleteTrashRepositories: async () => {
      throw new Error("dry run should not delete trash repositories");
    }
  };
}

const trashItem = {
  id: "repo-1",
  format: "maven2",
  uri: "libs-release",
  status: "deleted"
};

describe("Artifact repository mutation tools", () => {
  it("previews repository mutations by default without calling the client", async () => {
    const client = createFailingClient();

    const createResult = await createArtifactCreateRepositoryHandler(client)({
      format: "maven2",
      type: "hosted",
      repository_name: "libs-release",
      includes_pattern: "**/*",
      project_id: "project-1"
    });
    const updateResult = await createArtifactUpdateRepositoryHandler(client)({
      repo_name: "libs-release",
      format: "maven2",
      repository_ids: ["repo-1"],
      includes_pattern: "**/*"
    });
    const restoreResult = await createArtifactRestoreTrashRepositoriesHandler(client)({
      items: [trashItem]
    });
    const deleteResult = await createArtifactDeleteTrashRepositoriesHandler(client)({
      items: [trashItem]
    });

    expect(createResult.content[0]?.text).toContain("Dry run: create Artifact repository libs-release");
    expect(createResult.structuredContent.item).toEqual(expect.objectContaining({
      repositoryName: "libs-release",
      format: "maven2",
      type: "hosted",
      projectId: "project-1",
      includesPattern: "**/*",
      executed: false
    }));
    expect(updateResult.content[0]?.text).toContain("Dry run: update Artifact repository libs-release");
    expect(updateResult.structuredContent.item).toEqual(expect.objectContaining({
      repositoryName: "libs-release",
      format: "maven2",
      repositoryIds: ["repo-1"],
      includesPattern: "**/*",
      executed: false
    }));
    expect(restoreResult.content[0]?.text).toContain("Dry run: restore 1 Artifact trash repositories");
    expect(restoreResult.structuredContent.item).toEqual(expect.objectContaining({
      count: 1,
      repositoryIds: ["repo-1"],
      executed: false
    }));
    expect(deleteResult.content[0]?.text).toContain("Dry run: permanently delete 1 Artifact trash repositories");
    expect(deleteResult.structuredContent.item).toEqual(expect.objectContaining({
      count: 1,
      repositoryIds: ["repo-1"],
      executed: false
    }));
  });

  it("executes repository mutations only when dry_run is false", async () => {
    const calls: Array<{ method: string; input: unknown }> = [];
    const client = {
      createRepository: async (input: unknown) => {
        calls.push({ method: "create", input });
        return { status: "ok", trace_id: "trace-create", raw: { id: "repo-1" } };
      },
      updateRepository: async (input: unknown) => {
        calls.push({ method: "update", input });
        return { status: "ok", trace_id: "trace-update", raw: { id: "repo-1" } };
      },
      restoreTrashRepositories: async (input: unknown) => {
        calls.push({ method: "restore", input });
        return { status: "ok", trace_id: "trace-restore", raw: { restored: 1 } };
      },
      deleteTrashRepositories: async (input: unknown) => {
        calls.push({ method: "delete", input });
        return { status: "ok", trace_id: "trace-delete", raw: { deleted: 1 } };
      }
    };

    const createResult = await createArtifactCreateRepositoryHandler(client)({
      format: "maven2",
      type: "hosted",
      repository_name: "libs-release",
      includes_pattern: "**/*",
      params: { custom_flag: true },
      dry_run: false
    });
    const updateResult = await createArtifactUpdateRepositoryHandler(client)({
      repo_name: "libs-release",
      format: "maven2",
      repository_ids: ["repo-1"],
      includes_pattern: "**/*",
      params: { custom_flag: false },
      dry_run: false
    });
    const restoreResult = await createArtifactRestoreTrashRepositoriesHandler(client)({
      items: [trashItem],
      dry_run: false
    });
    const deleteResult = await createArtifactDeleteTrashRepositoriesHandler(client)({
      items: [trashItem],
      dry_run: false
    });

    expect(createResult.structuredContent.item).toEqual(expect.objectContaining({
      executed: true,
      status: "ok",
      traceId: "trace-create",
      raw: { id: "repo-1" }
    }));
    expect(updateResult.structuredContent.item).toEqual(expect.objectContaining({
      executed: true,
      status: "ok",
      traceId: "trace-update",
      raw: { id: "repo-1" }
    }));
    expect(restoreResult.structuredContent.item).toEqual(expect.objectContaining({
      executed: true,
      status: "ok",
      traceId: "trace-restore",
      raw: { restored: 1 }
    }));
    expect(deleteResult.structuredContent.item).toEqual(expect.objectContaining({
      executed: true,
      status: "ok",
      traceId: "trace-delete",
      raw: { deleted: 1 }
    }));

    expect(calls).toEqual([
      {
        method: "create",
        input: {
          format: "maven2",
          type: "hosted",
          repository_name: "libs-release",
          includes_pattern: "**/*",
          params: { custom_flag: true }
        }
      },
      {
        method: "update",
        input: {
          repo_name: "libs-release",
          format: "maven2",
          repository_ids: ["repo-1"],
          includes_pattern: "**/*",
          params: { custom_flag: false }
        }
      },
      {
        method: "restore",
        input: { items: [trashItem] }
      },
      {
        method: "delete",
        input: { items: [trashItem] }
      }
    ]);
  });
});
