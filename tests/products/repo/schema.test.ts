import { describe, expect, it } from "vitest";
import {
  repoCreateMergeRequestInput,
  repoForkRepositoryInput,
  repoImportRepositoryInput,
  repoListCommitAssociatedRefsInput,
  repoListCommitsInput,
  repoListCurrentUserRepositoriesInput,
  repoListDefaultReviewCategoriesInput,
  repoListGroupAddableMembersInput,
  repoListGroupAddableUserGroupsInput,
  repoListGroupRepositoriesInput,
  repoListGroupSubgroupsAndRepositoriesInput,
  repoListGroupWebhookLogsInput,
  repoListGroupWebhooksInput,
  repoListMergeRequestCommitsInput,
  repoListMembersInput,
  repoListRefsInput,
  repoAddRepositoryMembersInput,
  repoListRepositoryContributorsInput,
  repoListRepositoryCommitRulesInput,
  repoListRepositoryFileListInput,
  repoListRepositoryForksInput,
  repoListRepositoryLogsTreeInput,
  repoListRepositoryMembersInput,
  repoListRepositoryNavigationReferencesInput,
  repoListRepositoryReviewAuthorsInput,
  repoListRepositoryReviewsInput,
  repoListRepositoryTreesInput,
  repoListRepositoryUserGroupsInput,
  repoListSubmodulesInput,
  repoListUserGpgKeysInput,
  repoListUserSshKeysInput,
  repoCreateUserSshKeyInput,
  repoDeleteUserSshKeyInput,
  repoDeleteRepositoryInput,
  repoValidateHttpsInfoInput,
  repoValidateProjectRepositoryNameInput,
  repoDeleteRepositoryMemberInput,
  repoUpdateRepositoryMemberInput,
  repoVerifyUserSshPrivateKeyInput,
  repoAddRepositoryDeployKeyInput,
  repoListPersonalRepositoryImportRecordsInput,
  repoListProjectMergeRequestsInput,
  repoListPersonalRecentPushEventsInput,
  repoListProjectRepositoriesInput,
  repoListProjectTemplateStatusRepositoriesInput,
  repoListRepositoryRelatedCommitsInput,
  repoListRepositoryTemplatesInput,
  repoListProjectWebhookLogsInput,
  repoListProjectWebhooksInput,
  repoListProjectMembersInput,
  repoMergeMergeRequestInput,
  repoShowNotificationSubscriptionInput,
  repoShowNotificationSubscriptionsStatusInput,
  repoShowGroupInheritSettingInput,
  repoShowGroupsInheritInput,
  repoExecuteRepositoryStatisticsInput,
  repoShowMergeRequestStatisticInput,
  repoShowMergeRequestVotesInput,
  repoShowBlobsInput,
  repoShowDiffLinesInput,
  repoShowNoteRequiredAttributesInput,
  repoShowReviewSettingInput,
  repoShowRepositoryGeneralCommitRuleInput,
  repoShowRepositoryGeneralPolicyInput,
  repoShowRepositoryInheritSettingInput,
  repoShowRepositoryInheritSettingSourceInput,
  repoShowRepositoryNavigationLanguageInput,
  repoShowRepositoryNavigationOutlineInput,
  repoShowRepositoryNavigationSchemaInput,
  repoShowRepositoryReadmeFileInput,
  repoShowRepositoryCommitLinesInput,
  repoShowRepositoryMasterInput,
  repoShowRepositoryStatusInput,
  repoShowRepositoryStatisticDataInput,
  repoShowRepositoryWatermarkInput,
  repoAssociateRemoteMirrorInput,
  repoShowRepoLastStatisticsInput,
  repoShowUserRefPermissionInput,
  repoGetRepositoryBlameInput,
  repoGetRepositoryFileContentV4Input,
  repoShowBranchFileInput,
  repoStartRemoteMirrorSynchronizationInput,
  repoTransferRepositoryInput,
  repoRebuildRepositoryNavigationInput,
  repoUpdateMergeRequestInput,
  repoUpdateRepositoryPipelineInput,
  repoUpdateRepositoryTemplateStatusInput,
  repoDeleteMergeRequestDiscussionInput,
  repoUpdateRemoteMirrorInput,
  repoListBranchSubFilesInput
} from "../../../src/products/repo/schemas.js";

describe("repo schemas", () => {
  it("accepts official commit list query fields", () => {
    const parsed = repoListCommitsInput.parse({
      repository_id: "repo-1",
      ref_name: "master",
      since: "2026-01-01T00:00:00Z",
      until: "2026-02-01T00:00:00Z",
      path: "src/index.ts",
      message: "fix checkout",
      author: "alice",
      order_by_date: true,
      follow: true,
      with_stats: true
    });

    expect(parsed).toMatchObject({
      ref_name: "master",
      since: "2026-01-01T00:00:00Z",
      until: "2026-02-01T00:00:00Z",
      path: "src/index.ts",
      message: "fix checkout",
      author: "alice",
      order_by_date: true,
      follow: true,
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

    expect(repoShowRepositoryStatisticDataInput.parse({ repository_uuid: "repo-uuid-1" })).toEqual({
      repository_uuid: "repo-uuid-1"
    });

    expect(repoShowRepositoryMasterInput.parse({ repository_uuid: "repo-uuid-1" })).toEqual({
      repository_uuid: "repo-uuid-1"
    });

    expect(repoShowRepositoryCommitLinesInput.parse({
      repository_id: "100",
      ref_name: "feature/main",
      begin_date: "2026-06-01",
      end_date: "2026-06-30"
    })).toEqual({
      repository_id: "100",
      ref_name: "feature/main",
      begin_date: "2026-06-01",
      end_date: "2026-06-30"
    });
  });

  it("accepts repository content read query fields", () => {
    expect(
      repoListProjectRepositoriesInput.parse({
        x_auth_token: "token-1",
        project_uuid: "project-uuid-1",
        search: "demo",
        page_size: 100
      })
    ).toMatchObject({
      x_auth_token: "token-1",
      project_uuid: "project-uuid-1",
      search: "demo",
      page: 1,
      page_size: 100
    });

    expect(
      repoListProjectRepositoriesInput.parse({
        x_auth_token: "token-1",
        project_id: "project-id-1",
        search: "demo",
        offset: 20,
        limit: 10,
        order_by: "updated_at",
        sort: "desc"
      })
    ).toMatchObject({
      x_auth_token: "token-1",
      project_id: "project-id-1",
      search: "demo",
      offset: 20,
      limit: 10,
      order_by: "updated_at",
      sort: "desc"
    });

    expect(
      repoListProjectTemplateStatusRepositoriesInput.parse({
        x_auth_token: "token-1",
        project_uuid: "project-uuid-1",
        page_size: 100
      })
    ).toMatchObject({
      x_auth_token: "token-1",
      project_uuid: "project-uuid-1",
      page_no: 1,
      page_size: 100
    });

    expect(
      repoListRepositoryRelatedCommitsInput.parse({
        x_auth_token: "token-1",
        repository_uuid: "repo-uuid-1",
        type: 1,
        search: "feature",
        per_page: 50
      })
    ).toMatchObject({
      x_auth_token: "token-1",
      repository_uuid: "repo-uuid-1",
      type: 1,
      search: "feature",
      page: 1,
      per_page: 50
    });

    expect(
      repoListMembersInput.parse({
        x_auth_token: "token-1",
        repository_uuid: "repo-uuid-1",
        subject: "dev",
        page_size: 50
      })
    ).toMatchObject({
      x_auth_token: "token-1",
      repository_uuid: "repo-uuid-1",
      subject: "dev",
      page: 1,
      page_size: 50
    });

    expect(
      repoListMembersInput.parse({
        x_auth_token: "token-1",
        repository_id: "repo-id-1",
        search: "dev",
        permission: "member",
        action: "update",
        offset: 10,
        limit: 5
      })
    ).toMatchObject({
      x_auth_token: "token-1",
      repository_id: "repo-id-1",
      search: "dev",
      permission: "member",
      action: "update",
      offset: 10,
      limit: 5
    });

    expect(
      repoAddRepositoryMembersInput.parse({
        x_auth_token: "token-1",
        repository_uuid: "repo-uuid-1",
        users: [{ id: "u-1", name: "dev", role: 40, domain_id: "d-1", domain_name: "tenant-a" }]
      })
    ).toMatchObject({
      x_auth_token: "token-1",
      repository_uuid: "repo-uuid-1",
      dry_run: true,
      users: [{ id: "u-1", name: "dev", role: 40, domain_id: "d-1", domain_name: "tenant-a" }]
    });

    expect(
      repoUpdateRepositoryTemplateStatusInput.parse({
        x_auth_token: "token-1",
        repository_uuid: "repo-uuid-1",
        template_type: "SHARE",
        code_title: "Demo Template",
        languages: ["TypeScript"]
      })
    ).toMatchObject({
      x_auth_token: "token-1",
      repository_uuid: "repo-uuid-1",
      template_type: "SHARE",
      code_title: "Demo Template",
      dry_run: true
    });

    expect(
      repoShowBranchFileInput.parse({
        x_auth_token: "token-1",
        repository_uuid: "repo-uuid-1",
        branch_name: "feature/demo",
        file_path: "src/index.ts"
      })
    ).toEqual({
      x_auth_token: "token-1",
      repository_uuid: "repo-uuid-1",
      branch_name: "feature/demo",
      file_path: "src/index.ts"
    });

    expect(
      repoListBranchSubFilesInput.parse({
        x_auth_token: "token-1",
        repository_uuid: "repo-uuid-1",
        branch_name: "feature/demo",
        path: "src",
        page_size: 50
      })
    ).toMatchObject({
      x_auth_token: "token-1",
      repository_uuid: "repo-uuid-1",
      branch_name: "feature/demo",
      path: "src",
      page: 1,
      page_size: 50
    });

    expect(
      repoShowRepositoryStatusInput.parse({
        x_auth_token: "token-1",
        repository_uuid: "repo-uuid-1"
      })
    ).toEqual({
      x_auth_token: "token-1",
      repository_uuid: "repo-uuid-1"
    });

    expect(
      repoUpdateRepositoryPipelineInput.parse({
        x_auth_token: "token-1",
        repository_uuid: "repo-uuid-1"
      })
    ).toEqual({
      x_auth_token: "token-1",
      repository_uuid: "repo-uuid-1",
      dry_run: true
    });

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

  it("accepts official group, project member and user key read fields", () => {
    expect(
      repoListGroupAddableMembersInput.parse({
        group_id: "9",
        project_id: "project-uuid",
        page_size: 100
      })
    ).toMatchObject({
      group_id: "9",
      project_id: "project-uuid",
      page: 1,
      page_size: 100
    });

    expect(
      repoListGroupAddableUserGroupsInput.parse({
        group_id: "9",
        project_id: "project-uuid"
      })
    ).toMatchObject({
      group_id: "9",
      project_id: "project-uuid"
    });

    expect(
      repoListGroupSubgroupsAndRepositoriesInput.parse({
        group_id: "9",
        filter: "service",
        order_by: "updated_at",
        sort: "desc",
        archived: false
      })
    ).toMatchObject({
      group_id: "9",
      filter: "service",
      order_by: "updated_at",
      sort: "desc",
      archived: false
    });

    expect(
      repoShowGroupInheritSettingInput.parse({
        group_id: "9"
      })
    ).toEqual({
      group_id: "9"
    });

    expect(
      repoShowGroupsInheritInput.parse({
        group_id: "9",
        setting_type: "merge_requests"
      })
    ).toEqual({
      group_id: "9",
      setting_type: "merge_requests"
    });

    expect(
      repoExecuteRepositoryStatisticsInput.parse({
        repository_id: "100",
        branch_name: "feature/main",
        dry_run: false
      })
    ).toEqual({
      repository_id: "100",
      branch_name: "feature/main",
      dry_run: false
    });

    expect(
      repoListProjectMembersInput.parse({
        project_id: "project-uuid",
        query: "dev"
      })
    ).toMatchObject({
      project_id: "project-uuid",
      query: "dev"
    });

    expect(repoListUserGpgKeysInput.parse({ query: "signing" })).toEqual({ query: "signing" });
    expect(repoListUserSshKeysInput.parse({ query: "laptop", page_size: 10 })).toMatchObject({
      page: 1,
      page_size: 10,
      query: "laptop"
    });
    expect(repoCreateUserSshKeyInput.parse({ title: "laptop", key: "ssh-rsa AAA", dry_run: false })).toEqual({
      title: "laptop",
      key: "ssh-rsa AAA",
      dry_run: false
    });
    expect(repoDeleteUserSshKeyInput.parse({ key_id: 123 })).toEqual({
      key_id: "123",
      dry_run: true
    });
    expect(repoVerifyUserSshPrivateKeyInput.parse({
      x_auth_token: "token-1",
      repository_uuid: "repo-uuid-1",
      private_key: "-----BEGIN PRIVATE KEY-----demo"
    })).toMatchObject({
      x_auth_token: "token-1",
      repository_uuid: "repo-uuid-1",
      private_key: "-----BEGIN PRIVATE KEY-----demo",
      dry_run: true
    });
    expect(repoUpdateRepositoryMemberInput.parse({
      x_auth_token: "token-1",
      repository_uuid: "repo-uuid-1",
      member_id: "member-1",
      role: 40
    })).toMatchObject({
      x_auth_token: "token-1",
      repository_uuid: "repo-uuid-1",
      member_id: "member-1",
      role: 40,
      dry_run: true
    });
    expect(repoValidateProjectRepositoryNameInput.parse({
      x_auth_token: "token-1",
      project_uuid: "project-uuid-1",
      repository_name: "demo-repo"
    })).toEqual({
      x_auth_token: "token-1",
      project_uuid: "project-uuid-1",
      repository_name: "demo-repo"
    });
  });

  it("accepts official repository log tree, v4 file content and blame fields", () => {
    expect(
      repoListRepositoryLogsTreeInput.parse({
        repository_id: "100",
        ref: "feature/main"
      })
    ).toMatchObject({
      repository_id: "100",
      ref: "feature/main",
      page: 1,
      page_size: 20
    });

    expect(
      repoGetRepositoryFileContentV4Input.parse({
        repository_id: "100",
        file_path: "src/index.ts",
        sha: "master"
      })
    ).toEqual({
      repository_id: "100",
      file_path: "src/index.ts",
      sha: "master"
    });

    expect(
      repoGetRepositoryBlameInput.parse({
        repository_id: "100",
        file_path: "src/index.ts",
        sha: "master"
      })
    ).toEqual({
      repository_id: "100",
      file_path: "src/index.ts",
      sha: "master"
    });
  });

  it("accepts project and group webhook read query fields", () => {
    expect(repoListProjectWebhooksInput.parse({ project_id: "project-uuid" })).toMatchObject({
      project_id: "project-uuid",
      page: 1,
      page_size: 20
    });

    expect(repoListGroupWebhooksInput.parse({ group_id: "group-1", page: 2, page_size: 100 })).toMatchObject({
      group_id: "group-1",
      page: 2,
      page_size: 100
    });

    expect(
      repoListProjectWebhookLogsInput.parse({
        project_id: "project-uuid",
        hook_id: "7",
        repository_id: "100",
        uuid: "merge-request-1",
        created_after: "2026-05-01T00:00:00+08:00",
        created_before: "2026-05-02T00:00:00+08:00"
      })
    ).toMatchObject({
      project_id: "project-uuid",
      hook_id: "7",
      repository_id: "100",
      uuid: "merge-request-1",
      page: 1,
      page_size: 20
    });

    expect(
      repoListGroupWebhookLogsInput.parse({
        group_id: "group-1",
        hook_id: "7",
        page_size: 100
      })
    ).toMatchObject({
      group_id: "group-1",
      hook_id: "7",
      page: 1,
      page_size: 100
    });
  });

  it("accepts repository content and navigation read query fields", () => {
    expect(
      repoShowBlobsInput.parse({
        repository_id: "100",
        blob_id: "63c469b50f8a4f2c2e734c05cab664939ffe5256"
      })
    ).toEqual({
      repository_id: "100",
      blob_id: "63c469b50f8a4f2c2e734c05cab664939ffe5256"
    });

    expect(
      repoShowDiffLinesInput.parse({
        repository_id: "100",
        file_path: "src/index.ts",
        commit_id: "abc123",
        start: 1,
        end: 1000
      })
    ).toMatchObject({
      file_path: "src/index.ts",
      commit_id: "abc123",
      start: 1,
      end: 1000
    });

    expect(
      repoListRefsInput.parse({
        repository_id: "100",
        type: "tag",
        search: "v1",
        page: 2,
        page_size: 50
      })
    ).toMatchObject({
      repository_id: "100",
      type: "tag",
      search: "v1",
      page: 2,
      page_size: 50
    });

    expect(
      repoListRepositoryTreesInput.parse({
        repository_id: "100",
        ref: "master",
        path: "a".repeat(100000),
        recursive: true,
        page: 2,
        page_size: 50
      })
    ).toMatchObject({
      repository_id: "100",
      ref: "master",
      path: "a".repeat(100000),
      recursive: true,
      page: 2,
      page_size: 50
    });

    expect(
      repoListRepositoryFileListInput.parse({
        repository_id: "100",
        ref_name: "m".repeat(200),
        search: "index",
        page_size: 50
      })
    ).toMatchObject({
      repository_id: "100",
      ref_name: "m".repeat(200),
      search: "index",
      page: 1,
      page_size: 50
    });

    expect(repoShowRepositoryReadmeFileInput.parse({ repository_id: "100" })).toEqual({
      repository_id: "100"
    });

    expect(
      repoListCommitAssociatedRefsInput.parse({
        repository_id: "100",
        sha: "abc123",
        type: "branch",
        page_size: 20
      })
    ).toMatchObject({
      repository_id: "100",
      sha: "abc123",
      type: "branch",
      page: 1,
      page_size: 20
    });

    expect(
      repoShowReviewSettingInput.parse({
        repository_id: "100",
        with_default_review_categories: true
      })
    ).toEqual({
      repository_id: "100",
      with_default_review_categories: true
    });

    expect(repoShowNoteRequiredAttributesInput.parse({ repository_id: "100" })).toEqual({
      repository_id: "100"
    });

    expect(repoListDefaultReviewCategoriesInput.parse({})).toEqual({});

    expect(
      repoListRepositoryReviewsInput.parse({
        repository_id: "100",
        noteable_type: "MergeRequest",
        search: "fix",
        start_date: "2026-05-01",
        end_date: "2026-05-19",
        only_count: false,
        review_categories: "realize",
        review_modules: "security",
        severity: "suggestion",
        assignee_id: 9124,
        proposer_id: "9125",
        target_branch: "master",
        include_reply: true,
        order_by: "updated",
        sort: "desc",
        page: 2,
        page_size: 50
      })
    ).toMatchObject({
      repository_id: "100",
      noteable_type: "MergeRequest",
      review_categories: "realize",
      review_modules: "security",
      assignee_id: 9124,
      proposer_id: "9125",
      target_branch: "master",
      include_reply: true,
      order_by: "updated",
      sort: "desc",
      page: 2,
      page_size: 50
    });

    expect(
      repoListRepositoryReviewAuthorsInput.parse({
        repository_id: "100",
        noteable_type: "Commit",
        resolved_status: "all",
        reviewers_filter: "dev",
        page_size: 50
      })
    ).toMatchObject({
      repository_id: "100",
      noteable_type: "Commit",
      resolved_status: "all",
      reviewers_filter: "dev",
      page: 1,
      page_size: 50
    });

    expect(
      repoListRepositoryNavigationReferencesInput.parse({
        repository_id: "100",
        symbol: "Demo",
        language: "Java",
        blob: "blob-1",
        file_path: "src/Demo.java",
        path: "src/Demo.java",
        revision: "abc123",
        ref: "master"
      })
    ).toMatchObject({
      symbol: "Demo",
      language: "Java",
      blob: "blob-1",
      file_path: "src/Demo.java"
    });

    expect(
      repoShowRepositoryNavigationOutlineInput.parse({
        repository_id: "100",
        language: "Go",
        blob: "blob-1",
        file_path: "main.go"
      })
    ).toMatchObject({
      repository_id: "100",
      language: "Go",
      blob: "blob-1",
      file_path: "main.go"
    });

    expect(repoShowRepositoryNavigationSchemaInput.parse({ repository_id: "100" })).toEqual({
      repository_id: "100"
    });
    expect(repoShowRepositoryNavigationLanguageInput.parse({ repository_id: "100" })).toEqual({
      repository_id: "100"
    });
  });

  it("rejects overlarge diff line ranges", () => {
    expect(() =>
      repoShowDiffLinesInput.parse({
        repository_id: "100",
        file_path: "src/index.ts",
        commit_id: "abc123",
        start: 1,
        end: 1001
      })
    ).toThrow("diff line range must not exceed 1000 lines");
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
      work_item_ids: ["70824317"],
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
      work_item_ids: ["70824317"],
      assignee_id: 1001,
      reviewer_ids: [1002, "1003"],
      remove_source_branch: true,
      squash: true,
      draft: false,
      labels: ["feat", "api"],
      milestone_id: 7
    });
  });

  it("accepts merge request update optional fields", () => {
    const parsed = repoUpdateMergeRequestInput.parse({
      repository_id: "repo-1",
      merge_request_iid: "2",
      title: "Update demo",
      state_event: "reopen",
      assignee_ids: [1001, "1002"],
      reviewer_ids: [1003, "1004"],
      description: "Updated demo",
      milestone_id: 7,
      labels: ["feat", "api"],
      force_remove_source_branch: true,
      squash: true,
      squash_commit_message: "Squash demo",
      work_item_ids: ["70824317"]
    });

    expect(parsed).toMatchObject({
      repository_id: "repo-1",
      merge_request_iid: "2",
      title: "Update demo",
      state_event: "reopen",
      assignee_ids: [1001, "1002"],
      reviewer_ids: [1003, "1004"],
      description: "Updated demo",
      milestone_id: 7,
      labels: ["feat", "api"],
      force_remove_source_branch: true,
      squash: true,
      squash_commit_message: "Squash demo",
      work_item_ids: ["70824317"],
      dry_run: true
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

    expect(
      repoListProjectMergeRequestsInput.parse({
        project_id: "project-uuid-1",
        state: "opened",
        order_by: "updated_at",
        sort: "desc",
        author_id: 1001,
        source_branch: "feature/demo",
        target_branch: "main",
        search: "demo",
        source_repository_id: "100",
        page: 2,
        page_size: 50
      })
    ).toMatchObject({
      project_id: "project-uuid-1",
      state: "opened",
      order_by: "updated_at",
      sort: "desc",
      author_id: 1001,
      source_branch: "feature/demo",
      target_branch: "main",
      search: "demo",
      source_repository_id: "100",
      page: 2,
      page_size: 50
    });
  });

  it("accepts repository transfer and navigation rebuild mutations", () => {
    expect(
      repoTransferRepositoryInput.parse({
        repository_id: "100",
        namespace: "demo-group/subgroup",
        dry_run: false
      })
    ).toEqual({
      repository_id: "100",
      namespace: "demo-group/subgroup",
      dry_run: false
    });

    expect(
      repoRebuildRepositoryNavigationInput.parse({
        repository_id: "100"
      })
    ).toEqual({
      repository_id: "100",
      dry_run: true
    });

    expect(
      repoDeleteMergeRequestDiscussionInput.parse({
        repository_id: "100",
        merge_request_iid: "7",
        discussion_id: "discussion-1",
        note_id: "99"
      })
    ).toEqual({
      repository_id: "100",
      merge_request_iid: "7",
      discussion_id: "discussion-1",
      note_id: "99",
      dry_run: true
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
      repoAssociateRemoteMirrorInput.parse({
        x_auth_token: "token-1",
        repository_id: "repo-1",
        url: "https://example.com/repo.git"
      })
    ).toMatchObject({
      x_auth_token: "token-1",
      repository_id: "repo-1",
      url: "https://example.com/repo.git",
      dry_run: true
    });

    expect(
      repoStartRemoteMirrorSynchronizationInput.parse({
        x_auth_token: "token-1",
        repository_id: "repo-1",
        endpoint_uuid: "endpoint-1",
        force_fetch: true
      })
    ).toMatchObject({
      x_auth_token: "token-1",
      dry_run: true
    });

    expect(
      repoUpdateRemoteMirrorInput.parse({
        x_auth_token: "token-1",
        repository_id: "repo-1",
        mirroring_enabled: true,
        sync_branch_type: "all"
      })
    ).toMatchObject({
      x_auth_token: "token-1",
      dry_run: true,
      sync_branch_type: "all"
    });
  });

  it("defaults new repository mutation tools to dry run", () => {
    expect(
      repoDeleteRepositoryInput.parse({
        repository_uuid: "repo-uuid-1"
      })
    ).toMatchObject({
      repository_uuid: "repo-uuid-1",
      dry_run: true
    });

    expect(
      repoValidateHttpsInfoInput.parse({
        iam_user_uuid: "iam-1",
        pwd: "secret"
      })
    ).toMatchObject({
      iam_user_uuid: "iam-1",
      pwd: "secret",
      dry_run: true
    });

    expect(
      repoDeleteRepositoryMemberInput.parse({
        repository_uuid: "repo-uuid-1",
        member_id: "member-1"
      })
    ).toMatchObject({
      repository_uuid: "repo-uuid-1",
      member_id: "member-1",
      dry_run: true
    });

    expect(
      repoAddRepositoryDeployKeyInput.parse({
        repository_id: "100",
        key_title: "ci",
        key: "ssh-rsa AAA"
      })
    ).toMatchObject({
      repository_id: "100",
      key_title: "ci",
      key: "ssh-rsa AAA",
      dry_run: true
    });

    expect(
      repoForkRepositoryInput.parse({
        project_uuid: "project-1",
        project_name: "demo-project",
        repo_name: "demo-repo",
        template_id: "template-1",
        visibility_level: 20
      })
    ).toMatchObject({
      project_uuid: "project-1",
      project_name: "demo-project",
      repo_name: "demo-repo",
      template_id: "template-1",
      visibility_level: 20,
      dry_run: true
    });
  });
});
