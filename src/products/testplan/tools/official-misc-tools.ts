import {
  testPlanBatchSendNotificationsInput,
  testPlanCreateResourceUriV4Input,
  testPlanDownloadClassesInput,
  testPlanUpdateUserInfosInput
} from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type ValueResponse = {
  value?: unknown;
  raw: Record<string, unknown>;
};

type BatchSendNotificationsInput = {
  project_id: string;
  type?: string;
  receivers?: string[];
  comment_id?: string;
  inner_text?: string;
  body?: Record<string, unknown>;
  dry_run: boolean;
};

type CreateResourceUriV4Input = {
  project_id: string;
  dry_run: boolean;
};

type DownloadClassesInput = {
  project_id: string;
  testcase_ids?: string[];
  body?: Record<string, unknown>;
};

type UpdateUserInfosInput = {
  project_id: string;
  old_user_num?: string;
  new_user_num?: string;
  update_business_type?: string;
  update_resource_id?: string;
  params?: Record<string, unknown>;
  body?: Record<string, unknown>;
  dry_run: boolean;
};

function createNotificationBody(input: BatchSendNotificationsInput) {
  return {
    ...(input.body ?? {}),
    ...(input.type !== undefined ? { type: input.type } : {}),
    ...(input.receivers !== undefined ? { receivers: input.receivers } : {}),
    ...(input.comment_id !== undefined ? { comment_id: input.comment_id } : {}),
    ...(input.inner_text !== undefined ? { inner_text: input.inner_text } : {})
  };
}

function createDownloadClassesBody(input: DownloadClassesInput) {
  return input.body ?? (input.testcase_ids !== undefined ? { DownloadClassesRequestBody: input.testcase_ids } : {});
}

function createUpdateUserInfosBody(input: UpdateUserInfosInput) {
  const params =
    input.params ??
    {
      ...(input.old_user_num !== undefined ? { old_user_num: input.old_user_num } : {}),
      ...(input.new_user_num !== undefined ? { new_user_num: input.new_user_num } : {}),
      ...(input.update_business_type !== undefined ? { update_business_type: input.update_business_type } : {}),
      ...(input.update_resource_id !== undefined ? { update_resource_id: input.update_resource_id } : {})
    };

  return input.body ?? { params };
}

export function createTestPlanBatchSendNotificationsHandler(client: {
  batchSendNotifications: (input: Omit<BatchSendNotificationsInput, "dry_run">) => Promise<ValueResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanBatchSendNotificationsInput.parse(input);

    if (parsed.dry_run) {
      const result = mapTestPlanRecordItem(
        "Dry run: batch send TestPlan notifications",
        parsed.comment_id ?? parsed.project_id,
        "notification",
        createNotificationBody(parsed),
        {
          projectId: parsed.project_id,
          receiverCount: parsed.receivers?.length ?? 0,
          executed: false
        }
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchSendNotifications(parsed);
    const result = mapTestPlanRecordItem(
      "Sent TestPlan notifications",
      parsed.comment_id ?? parsed.project_id,
      "notification",
      response.raw,
      {
        projectId: parsed.project_id,
        value: response.value,
        executed: true
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanCreateResourceUriV4Handler(client: {
  createResourceUriV4: (input: Omit<CreateResourceUriV4Input, "dry_run">) => Promise<ValueResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanCreateResourceUriV4Input.parse(input);

    if (parsed.dry_run) {
      const result = mapTestPlanRecordItem(
        "Dry run: create TestPlan v4 resource URI",
        parsed.project_id,
        "resourceUri",
        {},
        {
          projectId: parsed.project_id,
          executed: false
        }
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createResourceUriV4(parsed);
    const result = mapTestPlanRecordItem(
      `Created TestPlan v4 resource URI ${String(response.value ?? "")}`.trim(),
      String(response.value ?? parsed.project_id),
      "resourceUri",
      response.raw,
      {
        projectId: parsed.project_id,
        value: response.value,
        executed: true
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanDownloadClassesHandler(client: {
  downloadClasses: (input: DownloadClassesInput) => Promise<ValueResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDownloadClassesInput.parse(input);
    const response = await client.downloadClasses(parsed);
    const result = mapTestPlanRecordItem(
      "Loaded TestPlan classes download metadata",
      parsed.testcase_ids?.join(",") ?? parsed.project_id,
      "classes",
      response.raw,
      {
        projectId: parsed.project_id,
        value: response.value
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanUpdateUserInfosHandler(client: {
  updateUserInfos: (input: Omit<UpdateUserInfosInput, "dry_run">) => Promise<ValueResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanUpdateUserInfosInput.parse(input);

    if (parsed.dry_run) {
      const result = mapTestPlanRecordItem(
        "Dry run: update TestPlan user infos",
        parsed.update_resource_id ?? parsed.project_id,
        "userInfoUpdate",
        createUpdateUserInfosBody(parsed),
        {
          projectId: parsed.project_id,
          executed: false
        }
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateUserInfos(parsed);
    const result = mapTestPlanRecordItem(
      "Updated TestPlan user infos",
      parsed.update_resource_id ?? parsed.project_id,
      "userInfoUpdate",
      response.raw,
      {
        projectId: parsed.project_id,
        value: response.value,
        executed: true
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
