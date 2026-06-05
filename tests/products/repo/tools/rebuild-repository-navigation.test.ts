import { describe, expect, it } from "vitest";
import { createRepoRebuildRepositoryNavigationHandler } from "../../../../src/products/repo/tools/rebuild-repository-navigation.js";

describe("createRepoRebuildRepositoryNavigationHandler", () => {
  it("returns dry-run preview", async () => {
    const handler = createRepoRebuildRepositoryNavigationHandler({
      rebuildRepositoryNavigation: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      repository_id: "100",
      dry_run: true
    });

    expect(result.structuredContent.summary).toBe("Dry run: rebuild repository navigation");
  });

  it("rebuilds repository navigation", async () => {
    const handler = createRepoRebuildRepositoryNavigationHandler({
      rebuildRepositoryNavigation: async () => ({
        result: "success",
        message: "queued",
        duration: 12,
        size: 34
      })
    });

    const result = await handler({
      repository_id: "100",
      dry_run: false
    });

    expect(result.structuredContent.item).toMatchObject({
      result: "success",
      message: "queued",
      duration: 12,
      size: 34,
      executed: true
    });
  });
});
