import { describe, expect, it } from "vitest";
import { repoCreateMergeRequestInput, repoListCommitsInput, repoMergeMergeRequestInput } from "../../../src/products/repo/schemas.js";

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

  it("accepts merge request creation optional fields", () => {
    const parsed = repoCreateMergeRequestInput.parse({
      repository_id: "repo-1",
      source_branch: "feature/demo",
      target_branch: "main",
      title: "Add demo",
      target_project_id: "target-project-1",
      assignee_id: 1001,
      reviewer_ids: [1002, "1003"],
      remove_source_branch: true,
      squash: true,
      draft: false,
      labels: ["feat", "api"],
      milestone_id: 7
    });

    expect(parsed).toMatchObject({
      target_project_id: "target-project-1",
      assignee_id: 1001,
      reviewer_ids: [1002, "1003"],
      remove_source_branch: true,
      squash: true,
      draft: false,
      labels: ["feat", "api"],
      milestone_id: 7
    });
  });

  it("accepts merge request merge optional fields", () => {
    const parsed = repoMergeMergeRequestInput.parse({
      repository_id: "repo-1",
      merge_request_iid: "2",
      squash: true,
      force_merge: false,
      sha: "abc123",
      merge_commit_message: "Merge feature/demo",
      squash_commit_message: "Squash feature/demo",
      should_remove_source_branch: true
    });

    expect(parsed).toMatchObject({
      sha: "abc123",
      merge_commit_message: "Merge feature/demo",
      squash_commit_message: "Squash feature/demo",
      should_remove_source_branch: true
    });
  });
});
