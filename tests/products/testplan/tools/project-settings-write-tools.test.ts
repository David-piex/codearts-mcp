import { describe, expect, it } from "vitest";
import {
  createTestPlanAddProjectUsersHandler,
  createTestPlanDeleteProjectUsersHandler,
  createTestPlanUpdateProjectIssueUpdateNotificationHandler,
  createTestPlanUpdateProjectMessageNoticesHandler
} from "../../../../src/products/testplan/tools/project-settings-write-tools.js";

describe("testplan project settings write handlers", () => {
  it("returns dry-run previews by default", async () => {
    const addHandler = createTestPlanAddProjectUsersHandler({
      addProjectUsers: async () => {
        throw new Error("should not execute");
      }
    });
    const deleteHandler = createTestPlanDeleteProjectUsersHandler({
      deleteProjectUsers: async () => {
        throw new Error("should not execute");
      }
    });
    const issueHandler = createTestPlanUpdateProjectIssueUpdateNotificationHandler({
      updateProjectIssueUpdateNotification: async () => {
        throw new Error("should not execute");
      }
    });
    const noticeHandler = createTestPlanUpdateProjectMessageNoticesHandler({
      updateProjectMessageNotices: async () => {
        throw new Error("should not execute");
      }
    });

    await expect(
      addHandler({ project_id: "project-1", user_id_List: ["user-1", "user-2"] })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: add TestPlan project users",
        item: { id: "project-1", userCount: 2, executed: false }
      }
    });
    await expect(
      deleteHandler({ project_id: "project-1", user_id_List: ["user-1"] })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: delete TestPlan project users",
        item: { id: "project-1", userCount: 1, executed: false }
      }
    });
    await expect(
      issueHandler({
        project_id: "project-1",
        owner_id: "user-1",
        is_display: "1"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: update TestPlan issue update notification",
        item: { id: "project-1:user-1", isDisplay: "1", executed: false }
      }
    });
    await expect(
      noticeHandler({
        project_id: "project-1",
        id: "notice-1",
        type: 1,
        send_email: true,
        send_message: false,
        notice_users: [{ id: "user-1", name: "alice" }]
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: update TestPlan project message notices",
        item: { id: "notice-1", userCount: 1, sendEmail: true, sendMessage: false, executed: false }
      }
    });
  });

  it("executes when dry_run is false", async () => {
    const addHandler = createTestPlanAddProjectUsersHandler({
      addProjectUsers: async (input) => ({
        project_id: input.project_id,
        user_id_List: input.user_id_List,
        value: "success",
        status: "success",
        raw: { value: "success", status: "success" }
      })
    });
    const deleteHandler = createTestPlanDeleteProjectUsersHandler({
      deleteProjectUsers: async (input) => ({
        project_id: input.project_id,
        user_id_List: input.user_id_List,
        value: "success",
        status: "success",
        raw: { value: "success", status: "success" }
      })
    });
    const issueHandler = createTestPlanUpdateProjectIssueUpdateNotificationHandler({
      updateProjectIssueUpdateNotification: async (input) => ({
        project_id: input.project_id,
        owner_id: input.owner_id,
        value: "success",
        status: "success",
        raw: { value: "success", status: "success" }
      })
    });
    const noticeHandler = createTestPlanUpdateProjectMessageNoticesHandler({
      updateProjectMessageNotices: async (input) => ({
        project_id: input.project_id,
        id: input.id,
        value: "success",
        status: "success",
        raw: { value: "success", status: "success" }
      })
    });

    await expect(
      addHandler({
        project_id: "project-1",
        user_id_List: ["user-1", "user-2"],
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Added TestPlan project users",
        item: { id: "project-1", userCount: 2, value: "success", executed: true }
      }
    });
    await expect(
      deleteHandler({
        project_id: "project-1",
        user_id_List: ["user-1"],
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Deleted TestPlan project users",
        item: { id: "project-1", userCount: 1, value: "success", executed: true }
      }
    });
    await expect(
      issueHandler({
        project_id: "project-1",
        owner_id: "user-1",
        is_display: "0",
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Updated TestPlan issue update notification",
        item: { id: "project-1:user-1", value: "success", executed: true }
      }
    });
    await expect(
      noticeHandler({
        project_id: "project-1",
        id: "notice-1",
        type: 1,
        send_email: true,
        send_message: true,
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Updated TestPlan project message notice notice-1",
        item: { id: "notice-1", value: "success", executed: true }
      }
    });
  });
});
