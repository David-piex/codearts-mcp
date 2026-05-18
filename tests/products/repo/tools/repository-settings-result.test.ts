import { describe, expect, it } from "vitest";
import { createRepoShowNotificationSubscriptionHandler } from "../../../../src/products/repo/tools/show-notification-subscription.js";
import { createRepoShowRepositoryGeneralPolicyHandler } from "../../../../src/products/repo/tools/show-repository-general-policy.js";
import { createRepoShowRepositoryInheritSettingSourceHandler } from "../../../../src/products/repo/tools/show-repository-inherit-setting-source.js";
import { createRepoShowRepositoryInheritSettingHandler } from "../../../../src/products/repo/tools/show-repository-inherit-setting.js";
import { createRepoShowUserRefPermissionHandler } from "../../../../src/products/repo/tools/show-user-ref-permission.js";
import {
  mapNotificationSubscription,
  mapRepositoryInheritSettingSource,
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
