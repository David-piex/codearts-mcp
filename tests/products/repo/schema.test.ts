import { describe, expect, it } from "vitest";
import {
  repoCreateMergeRequestInput,
  repoImportRepositoryInput,
  repoListCommitsInput,
  repoListPersonalRepositoryImportRecordsInput,
  repoMergeMergeRequestInput,
  repoShowRepoLastStatisticsInput,
  repoStartRemoteMirrorSynchronizationInput,
  repoUpdateRemoteMirrorInput
} from "../../../src/products/repo/schemas.js";

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

  it("accepts repository last statistics branch query", () => {
    expect(
      repoShowRepoLastStatisticsInput.parse({
        repository_id: "100",
        branch_name: "feature/main"
      })
    ).toEqual({
      repository_id: "100",
      branch_name: "feature/main"
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

  it("accepts repository import record filters", () => {
    const parsed = repoListPersonalRepositoryImportRecordsInput.parse({
      page: 2,
      page_size: 50,
      state: "finished",
      source_type: "github",
      created_after: "2026-01-01T00:00:00Z",
      finished_before: "2026-02-01T00:00:00Z",
      search: "demo",
      order_by: "created_at",
      sort: "desc"
    });

    expect(parsed).toMatchObject({
      page: 2,
      page_size: 50,
      state: "finished",
      source_type: "github",
      order_by: "created_at",
      sort: "desc"
    });
  });

  it("accepts explicit repository import requests", () => {
    const parsed = repoImportRepositoryInput.parse({
      project_uuid: "project-1",
      name: "demo-repo",
      source_type: "github",
      source_url: "https://github.com/example/demo.git",
      source_username: "octo",
      source_token: "token-value",
      visibility_level: 20
    });

    expect(parsed).toMatchObject({
      project_uuid: "project-1",
      name: "demo-repo",
      source_type: "github",
      source_url: "https://github.com/example/demo.git",
      source_username: "octo",
      source_token: "token-value",
      visibility_level: 20,
      dry_run: true
    });
  });

  it("requires a source username when repository import token is provided", () => {
    expect(() =>
      repoImportRepositoryInput.parse({
        project_uuid: "project-1",
        name: "demo-repo",
        source_type: "github",
        source_url: "https://github.com/example/demo.git",
        source_token: "token-value"
      })
    ).toThrow("source_username is required when source_token is provided");
  });

  it("rejects non-HTTPS repository import URLs", () => {
    expect(() =>
      repoImportRepositoryInput.parse({
        project_uuid: "project-1",
        name: "demo-repo",
        source_type: "github",
        source_url: "http://github.com/example/demo.git"
      })
    ).toThrow("Repository import source_url must be an HTTPS URL");
  });

  it("defaults remote mirror write tools to dry run", () => {
    expect(
      repoStartRemoteMirrorSynchronizationInput.parse({
        repository_id: "repo-1",
        endpoint_uuid: "endpoint-1",
        force_fetch: true
      })
    ).toMatchObject({
      dry_run: true
    });

    expect(
      repoUpdateRemoteMirrorInput.parse({
        repository_id: "repo-1",
        mirroring_enabled: true,
        sync_branch_type: "all"
      })
    ).toMatchObject({
      dry_run: true,
      sync_branch_type: "all"
    });
  });
});
