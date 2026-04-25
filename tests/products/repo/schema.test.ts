import { describe, expect, it } from "vitest";
import { repoListCommitsInput } from "../../../src/products/repo/schemas.js";

describe("repo schemas", () => {
  it("accepts official commit list query fields", () => {
    const parsed = repoListCommitsInput.parse({
      repository_id: "repo-1",
      ref_name: "master",
      since: "2026-01-01T00:00:00Z",
      until: "2026-02-01T00:00:00Z",
      order_by_date: true,
      with_stats: true
    });

    expect(parsed).toMatchObject({
      ref_name: "master",
      since: "2026-01-01T00:00:00Z",
      until: "2026-02-01T00:00:00Z",
      order_by_date: true,
      with_stats: true,
      page: 1,
      page_size: 20
    });
  });
});
