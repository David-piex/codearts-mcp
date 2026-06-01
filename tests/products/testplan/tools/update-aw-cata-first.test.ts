import { describe, expect, it } from "vitest";
import { createTestPlanUpdateAwCataFirstHandler } from "../../../../src/products/testplan/tools/update-aw-cata-first.js";

describe("createTestPlanUpdateAwCataFirstHandler", () => {
  it("returns a dry-run preview by default", async () => {
    const handler = createTestPlanUpdateAwCataFirstHandler({
      updateAwCataFirst: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    await expect(
      handler({
        project_id: "project-1",
        cata_id: "cata-1",
        cata_name: "Smoke Catalog"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: update AW catalog cata-1",
        item: { id: "cata-1", executed: false }
      }
    });
  });

  it("executes when dry_run is false", async () => {
    const handler = createTestPlanUpdateAwCataFirstHandler({
      updateAwCataFirst: async (input) => ({
        cata_id: input.cata_id,
        value: "ok",
        raw: { status: "success", result: "ok" }
      })
    });

    await expect(
      handler({
        project_id: "project-1",
        cata_id: "cata-1",
        cata_name: "Smoke Catalog",
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Updated AW catalog cata-1",
        item: { id: "cata-1", value: "ok", executed: true }
      }
    });
  });
});
