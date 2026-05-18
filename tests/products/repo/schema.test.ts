import { describe, expect, it } from "vitest";
import {
  repoCreateMergeRequestInput,
  repoImportRepositoryInput,
  repoListCommitsInput,
  repoListCurrentUserRepositoriesInput,
  repoListGroupRepositoriesInput,
  repoListMergeRequestCommitsInput,
  repoListRepositoryContributorsInput,
  repoListRepositoryCommitRulesInput,
  repoListRepositoryForksInput,
  repoListRepositoryMembersInput,
  repoListRepositoryUserGroupsInput,
  repoListSubmodulesInput,
  repoListPersonalRepositoryImportRecordsInput,
  repoListPersonalRecentPushEventsInput,
  repoListRepositoryTemplatesInput,
  repoMergeMergeRequestInput,
  repoShowNotificationSubscriptionInput,
  repoShowNotificationSubscriptionsStatusInput,
  repoShowMergeRequestStatisticInput,
  repoShowMergeRequestVotesInput,
  repoShowRepositoryGeneralCommitRuleInput,
  repoShowRepositoryGeneralPolicyInput,
  repoShowRepositoryInheritSettingInput,
  repoShowRepositoryInheritSettingSourceInput,
  repoShowRepositoryWatermarkInput,
  repoShowRepoLastStatisticsInput,
  repoShowUserRefPermissionInput,
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

  it("accepts repository content read query fields", () => {
    expect(
      repoListSubmodulesInput.parse({
        repository_id: "100",
        sha: "master",
        page_size: 100
      })
    ).toMatchObject({
      repository_id: "100",
      sha: "master",
      page: 1,
      page_size: 100
    });

    expect(
      repoListRepositoryContributorsInput.parse({
        repository_id: "100",
        order_by: "commits",
        sort: "desc",
        ref_name: "master",
        skip_merge: true,
        author: "dev"
      })
    ).toMatchObject({
      order_by: "commits",
      sort: "desc",
      ref_name: "master",
      skip_merge: true,
      author: "dev"
    });

    expect(
      repoListRepositoryForksInput.parse({
        repository_id: "100",
        order_by: "updated_at",
        sort: "asc",
        view: "basic"
      })
    ).toMatchObject({
      order_by: "updated_at",
      sort: "asc",
      view: "basic"
    });
  });

  it("accepts repository list and member read query fields", () => {
    expect(
      repoListCurrentUserRepositoriesInput.parse({
        page_size: 100,
        order_by: "updated_at",
        sort: "desc",
        archived: false,
        search: "demo",
        starred: true,
        membership: true,
        user_created: false,
        include_abnormal: true
      })
    ).toMatchObject({
      page: 1,
      page_size: 100,
      order_by: "updated_at",
      sort: "desc",
      search: "demo"
    });

    expect(
      repoListGroupRepositoriesInput.parse({
        group_id: "group-1",
        order_by: "name",
        sort: "asc",
        search: "demo"
      })
    ).toMatchObject({
      group_id: "group-1",
      order_by: "name",
      sort: "asc"
    });

    expect(
      repoListRepositoryUserGroupsInput.parse({
        repository_id: "100",
        search: "team"
      })
    ).toMatchObject({
      repository_id: "100",
      search: "team"
    });

    expect(
      repoListRepositoryMembersInput.parse({
        repository_id: "100",
        permission: "mr",
        action: "approve",
        search: "dev"
      })
    ).toMatchObject({
      repository_id: "100",
      permission: "mr",
      action: "approve",
      search: "dev"
    });
  });

  it("accepts repository setting read query fields", () => {
    expect(
      repoShowNotificationSubscriptionInput.parse({
        repository_id: "100",
        type: "email"
      })
    ).toEqual({
      repository_id: "100",
      type: "email"
    });

    expect(
      repoShowRepositoryInheritSettingSourceInput.parse({
        repository_id: "100",
        name: "merge_requests"
      })
    ).toEqual({
      repository_id: "100",
      name: "merge_requests"
    });

    expect(repoShowRepositoryInheritSettingInput.parse({ repository_id: "100" })).toEqual({
      repository_id: "100"
    });

    expect(repoShowRepositoryGeneralPolicyInput.parse({ repository_id: "100" })).toEqual({
      repository_id: "100"
    });

    expect(repoShowNotificationSubscriptionsStatusInput.parse({ repository_id: "100" })).toEqual({
      repository_id: "100"
    });

    expect(repoShowRepositoryGeneralCommitRuleInput.parse({ repository_id: "100" })).toEqual({
      repository_id: "100"
    });

    expect(
      repoListRepositoryCommitRulesInput.parse({
        repository_id: "100",
        page: 2,
        page_size: 100
      })
    ).toMatchObject({
      repository_id: "100",
      page: 2,
      page_size: 100
    });

    expect(repoShowRepositoryWatermarkInput.parse({ repository_id: "100" })).toEqual({
      repository_id: "100"
    });

    expect(
      repoListPersonalRecentPushEventsInput.parse({
        project_id: "project-uuid-1",
        size: 10
      })
    ).toEqual({
      project_id: "project-uuid-1",
      size: 10
    });

    expect(
      repoListRepositoryTemplatesInput.parse({
        page_size: 100,
        type: "SYSTEM",
        platform: "Web",
        pipeline: "SupportPipeline",
        search: "demo",
        enter_type: "AI",
        date_order: "down",
        language: "Java",
        project_id: "project-uuid-1"
      })
    ).toMatchObject({
      page: 1,
      page_size: 100,
      type: "SYSTEM",
      pipeline: "SupportPipeline",
      date_order: "down"
    });

    expect(
      repoShowUserRefPermissionInput.parse({
        repository_id: "100",
        target_ref: "refs/heads/master",
        action: "push",
        change_request_iid: 7
      })
    ).toEqual({
      repository_id: "100",
      target_ref: "refs/heads/master",
      action: "push",
      change_request_iid: 7
    });
  });

  it("requires repository setting read discriminators", () => {
    expect(() =>
      repoShowNotificationSubscriptionInput.parse({
        repository_id: "100",
        type: "sms"
      })
    ).toThrow();

    expect(() =>
      repoShowRepositoryInheritSettingSourceInput.parse({
        repository_id: "100",
        name: "branches"
      })
    ).toThrow();

    expect(() =>
      repoShowUserRefPermissionInput.parse({
        repository_id: "100",
        target_ref: "refs/heads/master",
        action: "delete"
      })
    ).toThrow();
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

  it("accepts merge request read query fields", () => {
    expect(
      repoListMergeRequestCommitsInput.parse({
        repository_id: "100",
        merge_request_iid: "7",
        view: "simple",
        page: 2,
        page_size: 100
      })
    ).toMatchObject({
      repository_id: "100",
      merge_request_iid: "7",
      view: "simple",
      page: 2,
      page_size: 100
    });

    expect(
      repoShowMergeRequestVotesInput.parse({
        repository_id: "100",
        merge_request_iid: "7"
      })
    ).toEqual({
      repository_id: "100",
      merge_request_iid: "7"
    });

    expect(
      repoShowMergeRequestStatisticInput.parse({
        repository_id: "100",
        iids: "7,8",
        fields: "commits_count,changed_files_count"
      })
    ).toEqual({
      repository_id: "100",
      iids: "7,8",
      fields: "commits_count,changed_files_count"
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
