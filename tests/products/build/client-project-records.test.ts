import { describe, expect, it } from "vitest";
import { createBuildClient } from "../../../src/products/build/client.js";

describe("createBuildClient project-level build APIs", () => {
  it("prefers build_project_id when listing project records", async () => {
    let requestedPath = "";
    const client = createBuildClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          records: [],
          total: 0
        };
      }
    } as never);

    await client.listProjectRecords({
      project_id: "project-1",
      build_project_id: "build-project-1",
      page: 1,
      page_size: 20
    });

    expect(requestedPath).toBe("/v1/record/build-project-1/records?offset=0&limit=20");
  });

  it("prefers build_project_id when loading project record statistics", async () => {
    let requestedPath = "";
    const client = createBuildClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          total: 0
        };
      }
    } as never);

    await client.getProjectRecordStatistics({
      project_id: "project-1",
      build_project_id: "build-project-1"
    });

    expect(requestedPath).toBe("/v1/record/build-project-1/statistics");
  });
});
