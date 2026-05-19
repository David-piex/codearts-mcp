import { describe, expect, it, vi } from "vitest";
import { createRepoGetGroupWebhookHandler } from "../../../../src/products/repo/tools/get-group-webhook.js";
import { createRepoGetGroupWebhookLogHandler } from "../../../../src/products/repo/tools/get-group-webhook-log.js";
import { createRepoGetProjectWebhookHandler } from "../../../../src/products/repo/tools/get-project-webhook.js";
import { createRepoGetProjectWebhookLogHandler } from "../../../../src/products/repo/tools/get-project-webhook-log.js";
import { createRepoListGroupWebhookLogsHandler } from "../../../../src/products/repo/tools/list-group-webhook-logs.js";
import { createRepoListGroupWebhooksHandler } from "../../../../src/products/repo/tools/list-group-webhooks.js";
import { createRepoListProjectWebhookLogsHandler } from "../../../../src/products/repo/tools/list-project-webhook-logs.js";
import { createRepoListProjectWebhooksHandler } from "../../../../src/products/repo/tools/list-project-webhooks.js";

describe("project and group webhook read tools", () => {
  it("lists project and group webhooks with structured output", async () => {
    const listProjectWebhooks = vi.fn(async () => ({
      hooks: [{ id: 7, name: "audit", token: "******", token_type: "X-Repo-Token" }],
      total: 1
    }));
    const listGroupWebhooks = vi.fn(async () => ({
      hooks: [{ id: 8, name: "group-audit", service: "repo" }],
      total: 1
    }));

    const projectResult = await createRepoListProjectWebhooksHandler({ listProjectWebhooks })({
      project_id: "project-uuid",
      page: 2,
      page_size: 10
    });
    const groupResult = await createRepoListGroupWebhooksHandler({ listGroupWebhooks })({
      group_id: "group-1"
    });

    expect(listProjectWebhooks).toHaveBeenCalledWith({
      project_id: "project-uuid",
      page: 2,
      page_size: 10
    });
    expect(projectResult.structuredContent.summary).toBe("1 project webhooks found");
    expect(projectResult.structuredContent.items?.[0]).toMatchObject({
      id: "7",
      tokenMasked: "******",
      tokenType: "X-Repo-Token"
    });
    expect(groupResult.structuredContent.summary).toBe("1 group webhooks found");
    expect(groupResult.structuredContent.items?.[0]).toMatchObject({
      id: "8",
      service: "repo"
    });
  });

  it("gets project and group webhook details", async () => {
    const getProjectWebhook = vi.fn(async () => ({
      id: 7,
      name: "audit",
      event_cfgs: [{ event_type: "push_hooks" }]
    }));
    const getGroupWebhook = vi.fn(async () => ({
      id: 8,
      name: "group-audit",
      branch_cfgs: [{ branch_type: 0, branch: "master" }]
    }));

    const projectResult = await createRepoGetProjectWebhookHandler({ getProjectWebhook })({
      project_id: "project-uuid",
      hook_id: "7"
    });
    const groupResult = await createRepoGetGroupWebhookHandler({ getGroupWebhook })({
      group_id: "group-1",
      hook_id: "8"
    });

    expect(projectResult.structuredContent.summary).toBe("Fetched project webhook");
    expect(projectResult.structuredContent.item).toMatchObject({
      id: "7",
      eventConfigs: [{ event_type: "push_hooks" }]
    });
    expect(groupResult.structuredContent.summary).toBe("Fetched group webhook");
    expect(groupResult.structuredContent.item).toMatchObject({
      id: "8",
      branchConfigs: [{ branch_type: 0, branch: "master" }]
    });
  });

  it("lists project and group webhook logs with filters", async () => {
    const listProjectWebhookLogs = vi.fn(async () => ({
      logs: [{
        id: 1,
        web_hook_id: 7,
        uuid: "uuid-1",
        repository: { id: 100, namespace: "group/demo" }
      }],
      total: 1
    }));
    const listGroupWebhookLogs = vi.fn(async () => ({
      logs: [{ id: 2, web_hook_id: 8, response_status: "200" }],
      total: 1
    }));

    const projectResult = await createRepoListProjectWebhookLogsHandler({ listProjectWebhookLogs })({
      project_id: "project-uuid",
      hook_id: "7",
      repository_id: "100",
      uuid: "uuid-1",
      created_after: "2026-05-01T00:00:00+08:00"
    });
    const groupResult = await createRepoListGroupWebhookLogsHandler({ listGroupWebhookLogs })({
      group_id: "group-1",
      hook_id: "8"
    });

    expect(listProjectWebhookLogs).toHaveBeenCalledWith(expect.objectContaining({
      project_id: "project-uuid",
      hook_id: "7",
      repository_id: "100",
      uuid: "uuid-1",
      page: 1,
      page_size: 20
    }));
    expect(projectResult.structuredContent.summary).toBe("1 project webhook logs found");
    expect(projectResult.structuredContent.items?.[0]).toMatchObject({
      id: "1",
      webHookId: "7",
      repository: { id: "100", namespace: "group/demo" }
    });
    expect(groupResult.structuredContent.summary).toBe("1 group webhook logs found");
    expect(groupResult.structuredContent.items?.[0]).toMatchObject({
      id: "2",
      responseStatus: "200"
    });
  });

  it("gets project and group webhook log details", async () => {
    const getProjectWebhookLog = vi.fn(async () => ({
      id: 1,
      web_hook_id: 7,
      request_data: { ref: "master" },
      response_body: "ok"
    }));
    const getGroupWebhookLog = vi.fn(async () => ({
      id: 2,
      web_hook_id: 8,
      response_headers: { "content-type": "application/json" }
    }));

    const projectResult = await createRepoGetProjectWebhookLogHandler({ getProjectWebhookLog })({
      project_id: "project-uuid",
      hook_id: "7",
      log_id: "1"
    });
    const groupResult = await createRepoGetGroupWebhookLogHandler({ getGroupWebhookLog })({
      group_id: "group-1",
      hook_id: "8",
      log_id: "2"
    });

    expect(projectResult.structuredContent.summary).toBe("Fetched project webhook log");
    expect(projectResult.structuredContent.item).toMatchObject({
      id: "1",
      webHookId: "7",
      requestData: { ref: "master" },
      responseBody: "ok"
    });
    expect(groupResult.structuredContent.summary).toBe("Fetched group webhook log");
    expect(groupResult.structuredContent.item).toMatchObject({
      id: "2",
      responseHeaders: { "content-type": "application/json" }
    });
  });
});
