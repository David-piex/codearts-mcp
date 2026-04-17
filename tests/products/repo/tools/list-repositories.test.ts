import { describe, expect, it } from "vitest";
import { mapRepositories } from "../../../../src/products/repo/tools/list-repositories.js";

describe("mapRepositories", () => {
  it("returns normalized repositories with pagination", () => {
    const result = mapRepositories(
      [
        {
          id: 7,
          name: "demo-repo",
          ssh_url: "git@example.com:demo-repo.git",
          http_url: "https://example.com/demo-repo.git"
        }
      ],
      2,
      10,
      12
    );

    expect(result.items).toEqual([
      {
        id: "7",
        name: "demo-repo",
        sshUrl: "git@example.com:demo-repo.git",
        httpUrl: "https://example.com/demo-repo.git"
      }
    ]);
    expect(result.page_info).toEqual({
      page: 2,
      pageSize: 10,
      total: 12
    });
  });
});
