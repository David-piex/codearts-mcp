import {
  testPlanBatchSendNotificationsInput,
  testPlanCreateResourceUriV4Input,
  testPlanDownloadClassesInput,
  testPlanGetDesignDataInput,
  testPlanListIpdIssuesTreeInput,
  testPlanListIssuesTreeInput,
  testPlanListIteratorStageCountsInput,
  testPlanGetTepRegisterCodeInput,
  testPlanGetTestSuitesVarListForPipelineInput,
  testPlanListTepsInput,
  testPlanQueryTesthubEtlDataInput,
  testPlanSearchAutotaskInput,
  testPlanUpdateTepShareInput,
  testPlanUpdateUserInfosInput
} from "../schemas.js";
import {
  mapTestPlanRecordItem,
  mapTestPlanRecordList,
  mapTestPlanValueItem,
  formatTestPlanRecordListText
} from "./generic-read-tools.js";

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

type UpdateTepShareInput = {
  x_auth_tenantid: string;
  x_auth_groups: string;
  x_user_name: string;
  x_auth_token: string;
  isShare: boolean;
  dry_run: boolean;
};

type GetTepRegisterCodeInput = {
  x_auth_tenantid: string;
  x_auth_groups: string;
  x_user_name: string;
  x_auth_token: string;
};

type ListTepsInput = {
  x_auth_tenantid: string;
  x_auth_groups: string;
  x_user_name: string;
  x_auth_token: string;
  where?: Array<Record<string, unknown>>;
  option?: Record<string, unknown>;
  body?: Record<string, unknown>;
};

type GetDesignDataInput = {
  project_id: string;
  x_auth_token: string;
  variableGroupID?: string;
  testcaseId?: string;
  testcaseIds?: string[];
  body?: Record<string, unknown>;
};

type SearchAutotaskInput = {
  project_uuid: string;
  versionUri: string;
  page: number;
  page_size: number;
  ticcTaskId?: string;
  result?: string;
  condition?: Record<string, unknown>;
  order?: string;
  by?: string;
  offset?: number;
  limit?: number;
  [key: string]: unknown;
};

type IssuesTreeInput = {
  project_id: string;
  service_type?: number;
  service_types?: number[];
  parent_id?: string;
  page_number?: number;
  page_size?: number;
  filter?: Record<string, unknown>;
  tracker_id?: string;
  module_id?: string;
  task_uri?: string;
  include_sub_issue?: boolean;
  [key: string]: unknown;
};

type IpdIssuesTreeInput = {
  project_id: string;
  page_number?: number;
  page_size?: number;
  filter?: Record<string, unknown>;
  tracker_id?: string | number;
  [key: string]: unknown;
};

type IteratorStageCountsInput = {
  project_uuid: string;
  name?: string;
  filter?: Record<string, unknown>;
  branch_uri?: string;
  iterator_uri?: string;
  owner_ids?: string[];
  [key: string]: unknown;
};

type QueryTesthubEtlDataInput = {
  offset: number;
  limit: number;
  table_name: string;
  is_bak?: boolean | string;
  start_time: string;
  end_time: string;
  filter_time_field: string;
  sort_field?: string;
  schema_no: string;
  [key: string]: unknown;
};

type RecordListResponse = {
  total?: number;
  status?: string;
  teps: Array<Record<string, unknown>>;
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

function createDesignDataBody(input: GetDesignDataInput) {
  return (
    input.body ?? {
      ...(input.variableGroupID !== undefined ? { variableGroupID: input.variableGroupID } : {}),
      ...(input.testcaseId !== undefined ? { testcaseId: input.testcaseId } : {}),
      ...(input.testcaseIds !== undefined ? { testcaseIds: input.testcaseIds } : {})
    }
  );
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

export function createTestPlanUpdateTepShareHandler(client: {
  updateTepShare: (input: Omit<UpdateTepShareInput, "dry_run">) => Promise<ValueResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanUpdateTepShareInput.parse(input);

    if (parsed.dry_run) {
      const result = mapTestPlanRecordItem(
        "Dry run: update TestPlan TEP share setting",
        parsed.x_auth_tenantid,
        "tepShare",
        { isShare: parsed.isShare },
        {
          tenantId: parsed.x_auth_tenantid,
          isShare: parsed.isShare,
          executed: false
        }
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateTepShare(parsed);
    const result = mapTestPlanRecordItem(
      "Updated TestPlan TEP share setting",
      parsed.x_auth_tenantid,
      "tepShare",
      response.raw,
      {
        tenantId: parsed.x_auth_tenantid,
        isShare: parsed.isShare,
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

export function createTestPlanGetTepRegisterCodeHandler(client: {
  getTepRegisterCode: (input: GetTepRegisterCodeInput) => Promise<{
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanGetTepRegisterCodeInput.parse(input);
    const response = await client.getTepRegisterCode(parsed);
    const result = mapTestPlanRecordItem(
      "Loaded TestPlan TEP register code",
      parsed.x_auth_tenantid,
      "tepRegisterCode",
      response.raw,
      {
        tenantId: parsed.x_auth_tenantid,
        userName: parsed.x_user_name
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanListTepsHandler(client: {
  listTeps: (input: ListTepsInput) => Promise<RecordListResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanListTepsInput.parse(input);
    const response = await client.listTeps(parsed);
    const result = mapTestPlanRecordList(
      response.teps,
      response.total,
      "TEP executors",
      "tep"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}

export function createTestPlanGetDesignDataHandler(client: {
  getDesignData: (input: GetDesignDataInput) => Promise<{
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanGetDesignDataInput.parse(input);
    const response = await client.getDesignData(parsed);
    const result = mapTestPlanRecordItem(
      "Loaded TestPlan design data",
      parsed.testcaseId ?? parsed.variableGroupID ?? parsed.project_id,
      "designData",
      response.raw,
      {
        projectId: parsed.project_id,
        testcaseIds: parsed.testcaseIds,
        requestBody: createDesignDataBody(parsed)
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanGetTestSuitesVarListForPipelineHandler(client: {
  getTestSuitesVarListForPipeline: (input: {
    testServiceId: string;
    x_auth_token: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanGetTestSuitesVarListForPipelineInput.parse(input);
    const response = await client.getTestSuitesVarListForPipeline(parsed);
    const result = mapTestPlanRecordItem(
      "Loaded TestPlan pipeline test suite variables",
      parsed.testServiceId,
      "pipelineVariables",
      response.raw,
      {
        testServiceId: parsed.testServiceId
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanSearchAutotaskHandler(client: {
  searchAutotask: (input: SearchAutotaskInput) => Promise<{
    tasks: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanSearchAutotaskInput.parse(input);
    const response = await client.searchAutotask(parsed);
    const result = mapTestPlanRecordList(
      response.tasks,
      response.total,
      "TestPlan autotasks",
      "task",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: {
        ...result,
        response: response.raw
      }
    };
  };
}

export function createTestPlanListIssuesTreeHandler(client: {
  listIssuesTree: (input: IssuesTreeInput) => Promise<{
    issues: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanListIssuesTreeInput.parse(input);
    const response = await client.listIssuesTree(parsed);
    const result = mapTestPlanRecordList(
      response.issues,
      response.total,
      "TestPlan issues tree records",
      "issue",
      parsed.page_number ?? 1,
      parsed.page_size ?? response.issues.length ?? response.total ?? 1
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: {
        ...result,
        response: response.raw
      }
    };
  };
}

export function createTestPlanListIpdIssuesTreeHandler(client: {
  listIpdIssuesTree: (input: IpdIssuesTreeInput) => Promise<{
    issues: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanListIpdIssuesTreeInput.parse(input);
    const response = await client.listIpdIssuesTree(parsed);
    const result = mapTestPlanRecordList(
      response.issues,
      response.total,
      "TestPlan IPD issues tree records",
      "issue",
      parsed.page_number ?? 1,
      parsed.page_size ?? response.issues.length ?? response.total ?? 1
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: {
        ...result,
        response: response.raw
      }
    };
  };
}

export function createTestPlanListIteratorStageCountsHandler(client: {
  listIteratorStageCounts: (input: IteratorStageCountsInput) => Promise<{
    value?: Record<string, unknown>;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanListIteratorStageCountsInput.parse(input);
    const response = await client.listIteratorStageCounts(parsed);
    const value = response.value ?? {};
    const result = mapTestPlanValueItem(
      "Loaded TestPlan iterator stage counts",
      parsed.iterator_uri ?? parsed.branch_uri ?? parsed.project_uuid,
      "stageCounts",
      value,
      response.raw,
      {
        projectUuid: parsed.project_uuid
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanQueryTesthubEtlDataHandler(client: {
  queryTesthubEtlData: (input: QueryTesthubEtlDataInput) => Promise<{
    rows: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanQueryTesthubEtlDataInput.parse(input);
    const response = await client.queryTesthubEtlData(parsed);
    const result = mapTestPlanRecordList(response.rows, response.total, "TestHub ETL rows", "row");

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: {
        ...result,
        response: response.raw
      }
    };
  };
}
