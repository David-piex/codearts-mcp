import { describe, expect, it, vi } from "vitest";
import {
  createRepoAddRepositoryDeployKeyHandler,
  mapAddedRepositoryDeployKey,
  previewAddRepositoryDeployKey
} from "../../../../src/products/repo/tools/add-repository-deploy-key.js";
import {
  createRepoDeleteRepositoryHandler,
  mapDeletedRepository,
  previewDeleteRepository
} from "../../../../src/products/repo/tools/delete-repository.js";
import {
  createRepoDeleteRepositoryMemberHandler,
  mapDeletedRepositoryMember,
  previewDeleteRepositoryMember
} from "../../../../src/products/repo/tools/delete-repository-member.js";
import {
  createRepoUpdateRepositoryMemberHandler,
  mapUpdatedRepositoryMember,
  previewUpdateRepositoryMember
} from "../../../../src/products/repo/tools/update-repository-member.js";
import {
  createRepoForkRepositoryHandler,
  mapForkedRepository,
  previewForkRepository
} from "../../../../src/products/repo/tools/fork-repository.js";
import {
  createRepoValidateHttpsInfoHandler,
  mapValidatedHttpsInfo,
  previewValidateHttpsInfo
} from "../../../../src/products/repo/tools/validate-https-info.js";
import {
  createRepoValidateProjectRepositoryNameHandler,
  mapValidatedProjectRepositoryName
} from "../../../../src/products/repo/tools/validate-project-repository-name.js";

describe("repo admin mutation tool previews", () => {
  it("redacts deploy key content in previews", () => {
    const result = previewAddRepositoryDeployKey({
      repository_id: "100",
      key_title: "ci",
      key: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC",
      can_push: true,
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toMatchObject({
      repositoryId: "100",
      keyTitle: "ci",
      canPush: true,
      executed: false
    });
    expect(result.item).not.toHaveProperty("key");
    expect(result.item).toHaveProperty("keyFingerprint");
  });

  it("returns dry-run previews for delete/fork/validate flows", () => {
    expect(previewDeleteRepository({
      repository_uuid: "repo-1",
      dry_run: true
    }).item).toEqual({
      repositoryUuid: "repo-1",
      executed: false
    });

    expect(previewDeleteRepositoryMember({
      repository_uuid: "repo-1",
      member_id: "member-1",
      dry_run: true
    }).item).toEqual({
      repositoryUuid: "repo-1",
      memberId: "member-1",
      executed: false
    });

    expect(previewUpdateRepositoryMember({
      x_auth_token: "token-1",
      repository_uuid: "repo-1",
      member_id: "member-1",
      role: 40,
      dry_run: true
    }).item).toEqual({
      repositoryUuid: "repo-1",
      memberId: "member-1",
      role: 40,
      tokenProvided: true,
      executed: false
    });

    expect(previewForkRepository({
      project_uuid: "project-1",
      project_name: "demo-project",
      repo_name: "demo-repo",
      template_id: "template-1",
      dry_run: true
    }).item).toMatchObject({
      projectUuid: "project-1",
      projectName: "demo-project",
      repoName: "demo-repo",
      templateId: "template-1",
      executed: false
    });

    expect(previewValidateHttpsInfo({
      iam_user_uuid: "iam-1",
      pwd: "secret",
      dry_run: true
    }).item).toEqual({
      iamUserUuid: "iam-1",
      passwordProvided: true,
      executed: false
    });
  });
});

describe("repo admin mutation tool mappers", () => {
  it("maps add/delete/fork/validate responses", () => {
    expect(mapAddedRepositoryDeployKey({
      key_id: 123,
      key_title: "ci",
      fingerprint: "fp",
      can_push: true
    }).item).toEqual({
      id: "123",
      keyId: "123",
      title: "ci",
      keyTitle: "ci",
      fingerprint: "fp",
      canPush: true,
      application: undefined,
      createdAt: undefined,
      executed: true
    });

    expect(mapDeletedRepository({
      repository_uuid: "repo-1",
      result: "true",
      status: "success"
    }).item).toEqual({
      repositoryUuid: "repo-1",
      result: "true",
      status: "success",
      deleted: true,
      executed: true
    });

    expect(mapDeletedRepositoryMember({
      repository_uuid: "repo-1",
      member_id: "member-1",
      deleted: true
    }).item).toEqual({
      repositoryUuid: "repo-1",
      memberId: "member-1",
      deleted: true,
      executed: true
    });

    expect(mapUpdatedRepositoryMember({
      repository_uuid: "repo-1",
      member_id: "member-1",
      role: 40,
      status: "success",
      result: {}
    }).item).toEqual({
      repositoryUuid: "repo-1",
      memberId: "member-1",
      role: 40,
      status: "success",
      result: {},
      executed: true
    });

    expect(mapForkedRepository({
      repository_uuid: "repo-uuid-1",
      project_uuid: "project-1",
      name: "demo-repo",
      path_with_namespace: "team/demo-repo"
    }, {
      project_uuid: "project-1",
      project_name: "demo-project",
      repo_name: "demo-repo"
    }).item).toEqual({
      id: "repo-uuid-1",
      repositoryUuid: "repo-uuid-1",
      projectUuid: "project-1",
      projectName: "demo-project",
      name: "demo-repo",
      path: undefined,
      namespace: undefined,
      pathWithNamespace: "team/demo-repo",
      visibility: undefined,
      archived: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      executed: true
    });

    expect(mapValidatedHttpsInfo({
      result: "true",
      status: "success"
    }).item).toEqual({
      result: "true",
      status: "success",
      executed: true
    });

    expect(mapValidatedProjectRepositoryName({
      project_uuid: "project-1",
      repository_name: "demo-repo",
      result: true,
      status: "success"
    }).item).toEqual({
      projectUuid: "project-1",
      repositoryName: "demo-repo",
      available: true,
      status: "success",
      executed: true
    });
  });
});

describe("repo admin mutation handlers", () => {
  it("skips client calls for dry-run writes", async () => {
    const addRepositoryDeployKey = vi.fn();
    const deleteRepository = vi.fn();
    const deleteRepositoryMember = vi.fn();
    const updateRepositoryMember = vi.fn();
    const forkRepository = vi.fn();
    const validateHttpsInfo = vi.fn();

    await createRepoAddRepositoryDeployKeyHandler({ addRepositoryDeployKey })({
      repository_id: "100",
      key_title: "ci",
      key: "ssh-rsa AAA"
    });
    await createRepoDeleteRepositoryHandler({ deleteRepository })({
      repository_uuid: "repo-1"
    });
    await createRepoDeleteRepositoryMemberHandler({ deleteRepositoryMember })({
      repository_uuid: "repo-1",
      member_id: "member-1"
    });
    await createRepoUpdateRepositoryMemberHandler({ updateRepositoryMember })({
      x_auth_token: "token-1",
      repository_uuid: "repo-1",
      member_id: "member-1",
      role: 40
    });
    await createRepoForkRepositoryHandler({ forkRepository })({
      project_name: "demo-project",
      repo_name: "demo-repo",
      template_id: "template-1"
    });
    await createRepoValidateHttpsInfoHandler({ validateHttpsInfo })({
      iam_user_uuid: "iam-1",
      pwd: "secret"
    });

    expect(addRepositoryDeployKey).not.toHaveBeenCalled();
    expect(deleteRepository).not.toHaveBeenCalled();
    expect(deleteRepositoryMember).not.toHaveBeenCalled();
    expect(updateRepositoryMember).not.toHaveBeenCalled();
    expect(forkRepository).not.toHaveBeenCalled();
    expect(validateHttpsInfo).not.toHaveBeenCalled();
  });

  it("calls repository name validation reads without dry-run", async () => {
    const validateProjectRepositoryName = vi.fn(async () => ({
      project_uuid: "project-1",
      repository_name: "demo-repo",
      result: true,
      status: "success"
    }));

    const result = await createRepoValidateProjectRepositoryNameHandler({
      validateProjectRepositoryName
    })({
      x_auth_token: "token-1",
      project_uuid: "project-1",
      repository_name: "demo-repo"
    });

    expect(validateProjectRepositoryName).toHaveBeenCalledWith({
      x_auth_token: "token-1",
      project_uuid: "project-1",
      repository_name: "demo-repo"
    });
    expect(result.structuredContent.item).toEqual({
      projectUuid: "project-1",
      repositoryName: "demo-repo",
      available: true,
      status: "success",
      executed: true
    });
  });
});
