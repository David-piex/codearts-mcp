import { describe, expect, it } from "vitest";
import {
  createTestPlanBatchSendNotificationsHandler,
  createTestPlanCreateResourceUriV4Handler,
  createTestPlanDownloadClassesHandler,
  createTestPlanUpdateUserInfosHandler
} from "../../../../src/products/testplan/tools/official-misc-tools.js";

describe("official TestPlan misc handlers", () => {
  it("returns dry-run previews for write tools by default", async () => {
    const notificationHandler = createTestPlanBatchSendNotificationsHandler({
      batchSendNotifications: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const resourceUriHandler = createTestPlanCreateResourceUriV4Handler({
      createResourceUriV4: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const updateUserHandler = createTestPlanUpdateUserInfosHandler({
      updateUserInfos: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    await expect(
      notificationHandler({
        project_id: "project-1",
        type: "casecomment",
        receivers: ["user-1"],
        comment_id: "comment-1",
        inner_text: "hello"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: batch send TestPlan notifications",
        item: { id: "comment-1", receiverCount: 1, executed: false }
      }
    });
    await expect(resourceUriHandler({ project_id: "project-1" })).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: create TestPlan v4 resource URI",
        item: { id: "project-1", executed: false }
      }
    });
    await expect(
      updateUserHandler({
        project_id: "project-1",
        old_user_num: "old-user",
        new_user_num: "new-user",
        update_business_type: "mindmap",
        update_resource_id: "mindmap-1"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: update TestPlan user infos",
        item: { id: "mindmap-1", executed: false }
      }
    });
  });

  it("maps read download metadata and executed write results", async () => {
    const downloadHandler = createTestPlanDownloadClassesHandler({
      downloadClasses: async () => ({
        value: "ok",
        raw: { status: "success", result: "ok" }
      })
    });
    const resourceUriHandler = createTestPlanCreateResourceUriV4Handler({
      createResourceUriV4: async () => ({
        value: "v902000109n477f8",
        raw: { value: "v902000109n477f8" }
      })
    });

    await expect(
      downloadHandler({ project_id: "project-1", testcase_ids: ["case-1"] })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Loaded TestPlan classes download metadata",
        item: { id: "case-1", value: "ok" }
      }
    });
    await expect(
      resourceUriHandler({ project_id: "project-1", dry_run: false })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Created TestPlan v4 resource URI v902000109n477f8",
        item: { id: "v902000109n477f8", value: "v902000109n477f8", executed: true }
      }
    });
  });
});
