import { asItemResult } from "../../../contracts/tool-result.js";
import {
  testPlanAddProjectUsersInput,
  testPlanDeleteProjectUsersInput,
  testPlanUpdateProjectIssueUpdateNotificationInput,
  testPlanUpdateProjectMessageNoticesInput
} from "../schemas.js";

export function createTestPlanAddProjectUsersHandler(client: {
  addProjectUsers: (input: Omit<
    ReturnType<typeof testPlanAddProjectUsersInput.parse>,
    "dry_run"
  >) => Promise<{
    project_id: string;
    user_id_List: string[];
    value?: unknown;
    status?: string;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanAddProjectUsersInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: add TestPlan project users", {
        id: parsed.project_id,
        projectId: parsed.project_id,
        userIds: parsed.user_id_List,
        userCount: parsed.user_id_List.length,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.addProjectUsers(parsed);
    const result = asItemResult("Added TestPlan project users", {
      id: response.project_id,
      projectId: response.project_id,
      userIds: response.user_id_List,
      userCount: response.user_id_List.length,
      value: response.value,
      status: response.status,
      executed: true
    }, response.raw);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanDeleteProjectUsersHandler(client: {
  deleteProjectUsers: (input: Omit<
    ReturnType<typeof testPlanDeleteProjectUsersInput.parse>,
    "dry_run"
  >) => Promise<{
    project_id: string;
    user_id_List: string[];
    value?: unknown;
    status?: string;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteProjectUsersInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: delete TestPlan project users", {
        id: parsed.project_id,
        projectId: parsed.project_id,
        userIds: parsed.user_id_List,
        userCount: parsed.user_id_List.length,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteProjectUsers(parsed);
    const result = asItemResult("Deleted TestPlan project users", {
      id: response.project_id,
      projectId: response.project_id,
      userIds: response.user_id_List,
      userCount: response.user_id_List.length,
      value: response.value,
      status: response.status,
      executed: true
    }, response.raw);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanUpdateProjectIssueUpdateNotificationHandler(client: {
  updateProjectIssueUpdateNotification: (input: Omit<
    ReturnType<typeof testPlanUpdateProjectIssueUpdateNotificationInput.parse>,
    "dry_run"
  >) => Promise<{
    project_id: string;
    owner_id: string;
    value?: unknown;
    status?: string;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanUpdateProjectIssueUpdateNotificationInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: update TestPlan issue update notification", {
        id: `${parsed.project_id}:${parsed.owner_id}`,
        projectId: parsed.project_id,
        ownerId: parsed.owner_id,
        isDisplay: parsed.is_display,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateProjectIssueUpdateNotification(parsed);
    const result = asItemResult("Updated TestPlan issue update notification", {
      id: `${response.project_id}:${response.owner_id}`,
      projectId: response.project_id,
      ownerId: response.owner_id,
      value: response.value,
      status: response.status,
      executed: true
    }, response.raw);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanUpdateProjectMessageNoticesHandler(client: {
  updateProjectMessageNotices: (input: Omit<
    ReturnType<typeof testPlanUpdateProjectMessageNoticesInput.parse>,
    "dry_run"
  >) => Promise<{
    project_id: string;
    id: string;
    value?: unknown;
    status?: string;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanUpdateProjectMessageNoticesInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: update TestPlan project message notices", {
        id: parsed.id,
        projectId: parsed.project_id,
        name: parsed.name,
        type: parsed.type,
        sendEmail: parsed.send_email,
        sendMessage: parsed.send_message,
        userCount: parsed.notice_users?.length ?? 0,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateProjectMessageNotices(parsed);
    const result = asItemResult(`Updated TestPlan project message notice ${response.id}`, {
      id: response.id,
      projectId: response.project_id,
      value: response.value,
      status: response.status,
      executed: true
    }, response.raw);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
