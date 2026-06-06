import { describe, expect, it } from "vitest";
import {
  createRepoGetRepositoryIdByNameHandler,
  mapRepositoryIdByNameResult
} from "../../../../src/products/repo/tools/get-repository-id-by-name.js";

describe("mapRepositoryIdByNameResult", () => {
  it("returns normalized repository id by name data", () => {
    const result = mapRepositoryIdByNameResult({
      group_name: "demo-group",
      repository_name: "demo-repo",
      repository_id: 101,
      status: "success"
    });

    expect(result.item).toEqual({
      groupName: "demo-group",
      repositoryName: "demo-repo",
      repositoryId: "101",
      status: "success",
      error: undefined
    });
  });
});

describe("createRepoGetRepositoryIdByNameHandler", () => {
  it("maps repository id by name into MCP output", async () => {
    const handler = createRepoGetRepositoryIdByNameHandler({
      getRepositoryIdByName: async (input) => {
        expect(input).toEqual({
          group_name: "demo-group",
          repository_name: "demo-repo"
        });
        return {
          repository_id: 1001,
          status: "success"
        };
      }
    });

    const result = await handler({
      group_name: "demo-group",
      repository_name: "demo-repo"
    });

    expect(result.structuredContent.item).toEqual({
      groupName: "demo-group",
      repositoryName: "demo-repo",
      repositoryId: "1001",
      status: "success",
      error: undefined
    });
  });
});
