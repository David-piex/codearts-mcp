import { describe, expect, it, vi } from "vitest";
import { createRepoGetMergeRequestTemplateHandler } from "../../../../src/products/repo/tools/get-merge-request-template.js";
import { createRepoListDiscussionTemplatesHandler } from "../../../../src/products/repo/tools/list-discussion-templates.js";
import { createRepoListMergeRequestTemplatesHandler } from "../../../../src/products/repo/tools/list-merge-request-templates.js";
import { createRepoShowGroupApproverSettingsHandler } from "../../../../src/products/repo/tools/show-group-approver-settings.js";
import { createRepoShowGroupMergeRequestSettingHandler } from "../../../../src/products/repo/tools/show-group-merge-request-setting.js";
import { createRepoShowProjectApproverSettingsHandler } from "../../../../src/products/repo/tools/show-project-approver-settings.js";
import { createRepoShowProjectMergeRequestSettingHandler } from "../../../../src/products/repo/tools/show-project-merge-request-setting.js";
import { createRepoShowRepositoryApproverSettingsHandler } from "../../../../src/products/repo/tools/show-repository-approver-settings.js";
import { createRepoShowRepositoryMergeRequestSettingHandler } from "../../../../src/products/repo/tools/show-repository-merge-request-setting.js";

describe("merge request setting and template tools", () => {
  it("shows repository, group and project merge request settings", async () => {
    const repository = vi.fn(async () => ({ can_reopen: true }));
    const group = vi.fn(async () => ({ squash_enabled: false }));
    const project = vi.fn(async () => ({ merge_method: "merge" }));

    const repositoryResult = await createRepoShowRepositoryMergeRequestSettingHandler({
      showRepositoryMergeRequestSetting: repository
    })({ repository_id: "200" });
    const groupResult = await createRepoShowGroupMergeRequestSettingHandler({
      showGroupMergeRequestSetting: group
    })({ group_id: "100" });
    const projectResult = await createRepoShowProjectMergeRequestSettingHandler({
      showProjectMergeRequestSetting: project
    })({ project_id: "project-uuid-1" });

    expect(repository).toHaveBeenCalledWith({ repository_id: "200" });
    expect(group).toHaveBeenCalledWith({ group_id: "100" });
    expect(project).toHaveBeenCalledWith({ project_id: "project-uuid-1" });
    expect(repositoryResult.structuredContent.summary).toBe("Fetched repository merge request setting");
    expect(repositoryResult.structuredContent.item).toMatchObject({ can_reopen: true });
    expect(groupResult.structuredContent.summary).toBe("Fetched group merge request setting");
    expect(projectResult.structuredContent.item).toMatchObject({ merge_method: "merge" });
  });

  it("shows repository, group and project approver settings", async () => {
    const repository = vi.fn(async () => ({ approvers: [{ id: 1, name: "Reviewer" }] }));
    const group = vi.fn(async () => ({ approvals_before_merge: 1 }));
    const project = vi.fn(async () => ({ reset_approvals_on_push: true }));

    const repositoryResult = await createRepoShowRepositoryApproverSettingsHandler({
      showRepositoryApproverSettings: repository
    })({ repository_id: "200" });
    const groupResult = await createRepoShowGroupApproverSettingsHandler({
      showGroupApproverSettings: group
    })({ group_id: "100" });
    const projectResult = await createRepoShowProjectApproverSettingsHandler({
      showProjectApproverSettings: project
    })({ project_id: "project-uuid-1" });

    expect(repositoryResult.structuredContent.summary).toBe("Fetched repository approver settings");
    expect(repositoryResult.structuredContent.item).toMatchObject({
      approvers: [{ id: 1, name: "Reviewer" }]
    });
    expect(groupResult.structuredContent.summary).toBe("Fetched group approver settings");
    expect(projectResult.structuredContent.item).toMatchObject({ reset_approvals_on_push: true });
  });

  it("lists merge request and discussion templates", async () => {
    const listMergeRequestTemplates = vi.fn(async () => ({
      templates: [{ id: 7, name: "default", file_name: "default.md" }],
      total: 1
    }));
    const listDiscussionTemplates = vi.fn(async () => ({
      templates: [{ id: 8, title: "discussion", file_path: ".codehub/discussions/demo.md" }],
      total: 1
    }));

    const mergeResult = await createRepoListMergeRequestTemplatesHandler({ listMergeRequestTemplates })({
      repository_id: "200",
      page: 2,
      page_size: 10
    });
    const discussionResult = await createRepoListDiscussionTemplatesHandler({ listDiscussionTemplates })({
      repository_id: "200"
    });

    expect(listMergeRequestTemplates).toHaveBeenCalledWith({
      repository_id: "200",
      page: 2,
      page_size: 10
    });
    expect(listDiscussionTemplates).toHaveBeenCalledWith({
      repository_id: "200",
      page: 1,
      page_size: 20
    });
    expect(mergeResult.structuredContent.summary).toBe("1 merge request templates found");
    expect(mergeResult.structuredContent.items?.[0]).toMatchObject({
      id: "7",
      name: "default",
      fileName: "default.md"
    });
    expect(discussionResult.structuredContent.summary).toBe("1 discussion templates found");
    expect(discussionResult.structuredContent.items?.[0]).toMatchObject({
      id: "8",
      title: "discussion",
      filePath: ".codehub/discussions/demo.md"
    });
  });

  it("gets a merge request template", async () => {
    const getMergeRequestTemplate = vi.fn(async () => ({
      id: "template-1",
      title: "Default MR",
      content: "## Summary"
    }));

    const result = await createRepoGetMergeRequestTemplateHandler({ getMergeRequestTemplate })({
      repository_id: "200",
      template_id: "template-1"
    });

    expect(getMergeRequestTemplate).toHaveBeenCalledWith({
      repository_id: "200",
      template_id: "template-1"
    });
    expect(result.structuredContent.summary).toBe("Fetched merge request template");
    expect(result.structuredContent.item).toMatchObject({
      id: "template-1",
      title: "Default MR",
      content: "## Summary"
    });
  });
});
