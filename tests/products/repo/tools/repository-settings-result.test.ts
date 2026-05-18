import { describe, expect, it } from "vitest";
import { createRepoListPersonalRecentPushEventsHandler } from "../../../../src/products/repo/tools/list-personal-recent-push-events.js";
import { createRepoListRepositoryCommitRulesHandler } from "../../../../src/products/repo/tools/list-repository-commit-rules.js";
import { createRepoListRepositoryTemplatesHandler } from "../../../../src/products/repo/tools/list-repository-templates.js";
import { createRepoShowNotificationSubscriptionHandler } from "../../../../src/products/repo/tools/show-notification-subscription.js";
import { createRepoShowNotificationSubscriptionsStatusHandler } from "../../../../src/products/repo/tools/show-notification-subscriptions-status.js";
import { createRepoShowRepositoryGeneralCommitRuleHandler } from "../../../../src/products/repo/tools/show-repository-general-commit-rule.js";
import { createRepoShowRepositoryGeneralPolicyHandler } from "../../../../src/products/repo/tools/show-repository-general-policy.js";
import { createRepoShowRepositoryInheritSettingSourceHandler } from "../../../../src/products/repo/tools/show-repository-inherit-setting-source.js";
import { createRepoShowRepositoryInheritSettingHandler } from "../../../../src/products/repo/tools/show-repository-inherit-setting.js";
import { createRepoShowRepositoryWatermarkHandler } from "../../../../src/products/repo/tools/show-repository-watermark.js";
import { createRepoShowUserRefPermissionHandler } from "../../../../src/products/repo/tools/show-user-ref-permission.js";
import {
  mapNotificationSubscriptionsStatus,
  mapNotificationSubscription,
  mapPersonalRecentPushEventsList,
  mapRepositoryCommitRulesList,
  mapRepositoryGeneralCommitRule,
  mapRepositoryInheritSettingSource,
  mapRepositoryTemplatesList,
  mapRepositoryWatermark,
  mapUserRefPermission
} from "../../../../src/products/repo/tools/repository-settings-result.js";

describe("repository settings result mappers", () => {
  it("maps notification subscription details", () => {
    const result = mapNotificationSubscription({
      repository_id: 100,
      enabled: true,
      config_source: "repository",
      webhook_config: {
        url: "https://example.com/hook",
        mention_users: "all",
        mention_phone: "12345678901",
        has_token: true
      },
      waring_repo_usage_rate: 80,
      subscript_events: [
        {
          resource_type: "merge_request",
          action: "open",
          enabled: true,
          role_ids: ["1"],
          role_names: ["Maintainer"]
        }
      ]
    }).item;

    expect(result).toEqual({
      repositoryId: "100",
      enabled: true,
      configSource: "repository",
      webhookConfig: {
        url: "https://example.com/hook",
        mentionUsers: "all",
        mentionPhone: "12345678901",
        hasToken: true
      },
      warningRepoUsageRate: 80,
      subscriptEvents: [
        {
          resourceType: "merge_request",
          action: "open",
          enabled: true,
          roleIds: ["1"],
          roleNames: ["Maintainer"]
        }
      ]
    });
  });

  it("maps inherit source and user ref permission", () => {
    expect(
      mapRepositoryInheritSettingSource({
        source_type: "project",
        source_id: "project-1",
        upward_inherit_editable: true
      }).item
    ).toEqual({
      sourceType: "project",
      sourceId: "project-1",
      upwardInheritEditable: true
    });

    expect(
      mapUserRefPermission({
        push: { has_permission: true, is_protect: true },
        merge: { has_permission: false, is_protect: true }
      }).item
    ).toMatchObject({
      push: { hasPermission: true, protect: true },
      merge: { hasPermission: false, protect: true }
    });
  });

  it("maps repository rule, watermark, push event and template reads", () => {
    expect(mapNotificationSubscriptionsStatus({
      email: { config_source: "repo", enabled: true }
    }).item).toMatchObject({
      email: { configSource: "repo", enabled: true }
    });

    expect(mapRepositoryGeneralCommitRule({
      reject_unsigned_commits: true,
      reject_not_signed_by_gpg: false,
      deny_delete_tag: true,
      prevent_secrets: true,
      deny_force_push: false
    }).item).toMatchObject({
      rejectUnsignedCommits: true,
      rejectNotSignedByGpg: false,
      denyDeleteTag: true,
      preventSecrets: true,
      denyForcePush: false
    });

    expect(mapRepositoryCommitRulesList([
      {
        id: 1,
        repository_id: 100,
        name: "main",
        branch_name: "master",
        privileged_users: [{ id: 9, username: "dev" }]
      }
    ], 1, 20, 1).items?.[0]).toMatchObject({
      id: "1",
      repositoryId: "100",
      name: "main",
      branchName: "master",
      privilegedUsers: [{ id: "9", username: "dev" }]
    });

    expect(mapRepositoryWatermark({ watermark: false, view_watermark: true }).item).toEqual({
      watermark: false,
      viewWatermark: true,
      canUpdate: undefined
    });

    expect(mapPersonalRecentPushEventsList([
      {
        author: { id: 1, username: "dev" },
        repository: { id: 100, name: "demo", project_id: "project-1" },
        push_data: { ref: "master", commit_count: 1 },
        created_at: "2026-05-18T00:00:00Z"
      }
    ], 1).items?.[0]).toMatchObject({
      author: { id: "1", username: "dev" },
      repository: { id: "100", name: "demo", projectId: "project-1" },
      pushData: { ref: "master", commitCount: 1 },
      createdAt: "2026-05-18T00:00:00Z"
    });

    expect(mapRepositoryTemplatesList([
      { repository_id: 10, name: "Java Web Demo", system: true, tags: ["Java"] }
    ], 1, 20, 1).items?.[0]).toMatchObject({
      repositoryId: "10",
      name: "Java Web Demo",
      system: true,
      tags: ["Java"]
    });
  });
});

describe("repository settings handlers", () => {
  it("calls notification subscription client with parsed input", async () => {
    const handler = createRepoShowNotificationSubscriptionHandler({
      showNotificationSubscription: async (input) => {
        expect(input).toEqual({ repository_id: "100", type: "email" });
        return { repository_id: 100, enabled: true };
      }
    });

    const result = await handler({ repository_id: "100", type: "email" });

    expect(result.content[0]?.text).toBe("Fetched repository notification subscription");
    expect(result.structuredContent.item).toMatchObject({ repositoryId: "100", enabled: true });
  });

  it("calls repository rule and watermark handlers with parsed input", async () => {
    const statusHandler = createRepoShowNotificationSubscriptionsStatusHandler({
      showNotificationSubscriptionsStatus: async (input) => {
        expect(input).toEqual({ repository_id: "100" });
        return { email: { enabled: true } };
      }
    });
    const generalRuleHandler = createRepoShowRepositoryGeneralCommitRuleHandler({
      showRepositoryGeneralCommitRule: async (input) => {
        expect(input).toEqual({ repository_id: "100" });
        return { deny_force_push: true };
      }
    });
    const rulesHandler = createRepoListRepositoryCommitRulesHandler({
      listRepositoryCommitRules: async (input) => {
        expect(input).toMatchObject({ repository_id: "100", page: 1, page_size: 20 });
        return { rules: [{ id: 1, name: "main" }], total: 1 };
      }
    });
    const watermarkHandler = createRepoShowRepositoryWatermarkHandler({
      showRepositoryWatermark: async (input) => {
        expect(input).toEqual({ repository_id: "100" });
        return { watermark: true };
      }
    });

    expect((await statusHandler({ repository_id: "100" })).structuredContent.item).toMatchObject({
      email: { enabled: true }
    });
    expect((await generalRuleHandler({ repository_id: "100" })).structuredContent.item).toMatchObject({
      denyForcePush: true
    });
    expect((await rulesHandler({ repository_id: "100" })).structuredContent.items?.[0]).toMatchObject({
      id: "1",
      name: "main"
    });
    expect((await watermarkHandler({ repository_id: "100" })).structuredContent.item).toMatchObject({
      watermark: true
    });
  });

  it("calls personal push event and repository template handlers with parsed input", async () => {
    const pushEventsHandler = createRepoListPersonalRecentPushEventsHandler({
      listPersonalRecentPushEvents: async (input) => {
        expect(input).toEqual({ project_id: "project-1", size: 5 });
        return { events: [{ push_data: { ref: "master" } }], total: 1 };
      }
    });
    const templatesHandler = createRepoListRepositoryTemplatesHandler({
      listRepositoryTemplates: async (input) => {
        expect(input).toMatchObject({
          page: 1,
          page_size: 20,
          type: "SYSTEM,USER",
          search: "demo"
        });
        return { templates: [{ repository_id: 10, name: "demo" }], total: 1 };
      }
    });

    expect(
      (await pushEventsHandler({ project_id: "project-1", size: 5 })).structuredContent.items?.[0]
    ).toMatchObject({
      pushData: { ref: "master" }
    });
    expect((await templatesHandler({ search: "demo" })).structuredContent.items?.[0]).toMatchObject({
      repositoryId: "10",
      name: "demo"
    });
  });

  it("calls inherit setting handlers with parsed input", async () => {
    const sourceHandler = createRepoShowRepositoryInheritSettingSourceHandler({
      showRepositoryInheritSettingSource: async (input) => {
        expect(input).toEqual({ repository_id: "100", name: "merge_requests" });
        return { source_type: "project", source_id: "project-1", upward_inherit_editable: true };
      }
    });
    const settingHandler = createRepoShowRepositoryInheritSettingHandler({
      showRepositoryInheritSetting: async (input) => {
        expect(input).toEqual({ repository_id: "100" });
        return { settings: [{ name: "merge_requests", inherit_mod: "inherit" }], total: 1 };
      }
    });

    const source = await sourceHandler({ repository_id: "100", name: "merge_requests" });
    const settings = await settingHandler({ repository_id: "100" });

    expect(source.structuredContent.item).toMatchObject({ sourceType: "project" });
    expect(settings.structuredContent.items?.[0]).toEqual({
      name: "merge_requests",
      inheritMod: "inherit"
    });
  });

  it("calls general policy and user ref permission handlers with parsed input", async () => {
    const policyHandler = createRepoShowRepositoryGeneralPolicyHandler({
      showRepositoryGeneralPolicy: async (input) => {
        expect(input).toEqual({ repository_id: "100" });
        return { disable_fork: false, generate_pre_merge_ref: true };
      }
    });
    const permissionHandler = createRepoShowUserRefPermissionHandler({
      showUserRefPermission: async (input) => {
        expect(input).toEqual({
          repository_id: "100",
          target_ref: "refs/heads/master",
          action: "push"
        });
        return { push: { has_permission: true, is_protect: true } };
      }
    });

    const policy = await policyHandler({ repository_id: "100" });
    const permission = await permissionHandler({
      repository_id: "100",
      target_ref: "refs/heads/master",
      action: "push"
    });

    expect(policy.structuredContent.item).toMatchObject({
      disableFork: false,
      generatePreMergeRef: true
    });
    expect(permission.structuredContent.item).toMatchObject({
      push: { hasPermission: true, protect: true }
    });
  });
});
