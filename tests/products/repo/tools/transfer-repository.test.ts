import { describe, expect, it } from "vitest";
import { createRepoTransferRepositoryHandler } from "../../../../src/products/repo/tools/transfer-repository.js";

describe("createRepoTransferRepositoryHandler", () => {
  it("returns dry-run preview", async () => {
    const handler = createRepoTransferRepositoryHandler({
      transferRepository: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      repository_id: "100",
      namespace: "target-group",
      dry_run: true
    });

    expect(result.structuredContent.summary).toBe("Dry run: transfer repository");
  });

  it("transfers repository", async () => {
    const handler = createRepoTransferRepositoryHandler({
      transferRepository: async () => ({
        id: 100,
        name: "demo",
        namespace: "target-group",
        full_path: "target-group/demo"
      })
    });

    const result = await handler({
      repository_id: "100",
      namespace: "target-group",
      dry_run: false
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "100",
      name: "demo",
      namespace: "target-group",
      fullPath: "target-group/demo"
    });
  });
});
