import { describe, expect, it, vi } from "vitest";
import { createRepoBatchValidateUserGroupPermissionsHandler } from "../../../../src/products/repo/tools/batch-validate-user-group-permissions.js";
import { createRepoCreateCommitHandler } from "../../../../src/products/repo/tools/create-commit.js";
import { createRepoCreateCommitRevertHandler } from "../../../../src/products/repo/tools/create-commit-revert.js";
import { createRepoListLatestPipelineJobsHandler } from "../../../../src/products/repo/tools/list-latest-pipeline-jobs.js";
import { createRepoListPipelineJobsHandler } from "../../../../src/products/repo/tools/list-pipeline-jobs.js";
import { createRepoListProductPermissionResourcesGrantedUsersHandler } from "../../../../src/products/repo/tools/list-product-permission-resources-granted-users.js";
import { createRepoShowCommitDiffMetadataHandler } from "../../../../src/products/repo/tools/show-commit-diff-metadata.js";
import { createRepoShowCommitFileDiffHandler } from "../../../../src/products/repo/tools/show-commit-file-diff.js";
import { createRepoShowDiffCommitHandler } from "../../../../src/products/repo/tools/show-diff-commit.js";

describe("repo commit and pipeline handlers", () => {
  it("supports dry run for create commit and revert", async () => {
    const createCommit = vi.fn();
    const createRevert = vi.fn();
    const createHandler = createRepoCreateCommitHandler({ createCommit });
    const revertHandler = createRepoCreateCommitRevertHandler({ createCommitRevert: createRevert });

    const createResult = await createHandler({
      repository_id: "100",
      branch: "main",
      commit_message: "msg",
      actions: [{ action: "create", file_path: "a.ts", content: "x" }],
      dry_run: true
    });
    const revertResult = await revertHandler({
      repository_id: "100",
      sha: "c1",
      branch: "main",
      dry_run: true
    });

    expect(createCommit).not.toHaveBeenCalled();
    expect(createRevert).not.toHaveBeenCalled();
    expect(createResult.structuredContent.item).toMatchObject({ repositoryId: "100", branch: "main", executed: false });
    expect(revertResult.structuredContent.item).toMatchObject({ repositoryId: "100", sha: "c1", branch: "main", executed: false });
  });

  it("maps commit diff tools", async () => {
    const diffMetadataHandler = createRepoShowCommitDiffMetadataHandler({
      showCommitDiffMetadata: async () => ({
        diffs: [{ old_path: "a.ts", new_path: "a.ts", added_lines: 2, removed_lines: 1, diff: "@@" }],
        change_file_count: 1,
        change_line_count: 3
      })
    });
    const fileDiffHandler = createRepoShowCommitFileDiffHandler({
      showCommitFileDiff: async () => ({ old_path: "a.ts", new_path: "a.ts", added_lines: 2, removed_lines: 1, diff: "@@" })
    });
    const diffCommitHandler = createRepoShowDiffCommitHandler({
      showDiffCommit: async () => ({
        diffs: [{ old_path: "a.ts", new_path: "a.ts", added_lines: 2, removed_lines: 1, diff: "@@" }],
        change_file_count: 1
      })
    });

    expect((await diffMetadataHandler({ repository_id: "100", sha: "c1" })).structuredContent.item).toMatchObject({
      diffs: [{ oldPath: "a.ts", newPath: "a.ts", addedLines: 2 }]
    });
    expect((await fileDiffHandler({ repository_id: "100", sha: "c1", path: "a.ts" })).structuredContent.item).toMatchObject({
      oldPath: "a.ts",
      newPath: "a.ts",
      addedLines: 2
    });
    expect((await diffCommitHandler({ repository_id: "100", sha: "c1", page: 1, page_size: 20 })).structuredContent.items?.[0]).toMatchObject({
      oldPath: "a.ts",
      newPath: "a.ts",
      addedLines: 2
    });
  });

  it("maps pipeline jobs and granted users", async () => {
    const latestHandler = createRepoListLatestPipelineJobsHandler({
      listLatestPipelineJobs: async () => ({
        id: 10,
        status: "success",
        stages: [{ id: 1, name: "build", jobs: [{ id: 9, name: "job-1", status: "success" }] }]
      })
    });
    const jobsHandler = createRepoListPipelineJobsHandler({
      listPipelineJobs: async () => ({
        jobs: [{ id: 9, name: "job-1", status: "success", stage: "build" }],
        total: 1
      })
    });
    const grantedUsersHandler = createRepoListProductPermissionResourcesGrantedUsersHandler({
      listProductPermissionResourcesGrantedUsers: async () => ({
        members: [{ id: 17, name: "qa", username: "iam-qa", nick_name: "QA" }],
        total: 1
      })
    });

    expect((await latestHandler({ repository_id: "100", pipeline_id: "10" })).structuredContent.item).toMatchObject({
      pipeline: {
        id: "10",
        stages: [{ id: "1", jobs: [{ id: "9", name: "job-1" }] }]
      }
    });
    expect((await jobsHandler({ repository_id: "100", pipeline_id: "10", page: 1, page_size: 20 })).structuredContent.items?.[0]).toMatchObject({
      id: "9",
      name: "job-1",
      stage: "build"
    });
    expect((await grantedUsersHandler({ project_id: "p-1", page: 1, page_size: 20 })).structuredContent.items?.[0]).toMatchObject({
      userId: "17",
      userName: "qa"
    });
  });

  it("maps batch validate user group permissions", async () => {
    const handler = createRepoBatchValidateUserGroupPermissionsHandler({
      batchValidateUserGroupPermissions: async (input) => {
        expect(input).toEqual({ items: [{ group_id: "7", project_id: "p-1" }] });
        return [{ group_id: 7, group_visibility: "private", can_create_group: true, can_craete_project: false, can_set_group: true }];
      }
    });

    const result = await handler({ items: [{ group_id: "7", project_id: "p-1" }] });

    expect(result.structuredContent.items?.[0]).toMatchObject({
      groupId: "7",
      groupVisibility: "private",
      canCreateGroup: true,
      canCraeteProject: false,
      canSetGroup: true
    });
  });
});
