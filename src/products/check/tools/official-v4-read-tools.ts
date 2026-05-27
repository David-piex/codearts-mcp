import {
  checkGetTaskWebhookInfoV4Input,
  checkListTaskAllFilesV4Input,
  checkListTaskBranchesV4Input,
  checkListTaskFileListV4Input,
  checkListTaskJobsV4Input,
  checkListTaskLastJobsV4Input
} from "../schemas.js";
import { type ToolResult } from "../../../contracts/tool-result.js";
import { formatCheckRecordListText, mapCheckRecordItem, mapCheckRecordList } from "./generic-read-tools.js";

type RawRecord = Record<string, unknown>;

type Client = {
  listTaskJobs: (input: { task_id: string }) => Promise<{
    jobs: RawRecord[];
    total?: number;
  }>;
  listTaskLastJobs: (input: { task_id: string }) => Promise<{
    jobs: RawRecord[];
    total?: number;
  }>;
  listTaskFiles: (input: { task_id: string }) => Promise<{
    files: RawRecord[];
    total?: number;
  }>;
  listTaskAllFiles: (input: {
    task_id: string;
    file_path?: string;
    get_son?: boolean;
  }) => Promise<{
    files: RawRecord[];
    total?: number;
  }>;
  getTaskWebhookInfo: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: RawRecord;
  }>;
  listTaskRepositoryBranches: (input: {
    task_id: string;
    page: number;
    page_size: number;
    is_uncreated_only?: boolean;
    search?: string;
    repo_type?: string;
  }) => Promise<{
    branches: RawRecord[];
    total?: number;
  }>;
};

function listResponse<T extends { id?: string; name?: string }>(result: ToolResult<T>) {
  return {
    content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
    structuredContent: result
  };
}

export function createCheckListTaskJobsV4Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListTaskJobsV4Input.parse(input);
    const response = await client.listTaskJobs(parsed);

    return listResponse(mapCheckRecordList(response.jobs, response.total, "task jobs v4", "job"));
  };
}

export function createCheckListTaskLastJobsV4Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListTaskLastJobsV4Input.parse(input);
    const response = await client.listTaskLastJobs(parsed);

    return listResponse(mapCheckRecordList(response.jobs, response.total, "task last jobs v4", "job"));
  };
}

export function createCheckListTaskFileListV4Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListTaskFileListV4Input.parse(input);
    const response = await client.listTaskFiles(parsed);

    return listResponse(mapCheckRecordList(response.files, response.total, "task file list v4", "file"));
  };
}

export function createCheckListTaskAllFilesV4Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListTaskAllFilesV4Input.parse(input);
    const response = await client.listTaskAllFiles(parsed);

    return listResponse(mapCheckRecordList(response.files, response.total, "task all files v4", "file"));
  };
}

export function createCheckGetTaskWebhookInfoV4Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetTaskWebhookInfoV4Input.parse(input);
    const response = await client.getTaskWebhookInfo(parsed);
    const result = mapCheckRecordItem(
      `Loaded Check task webhook info v4 ${response.task_id}`,
      response.task_id,
      "taskWebhookInfo",
      response.raw,
      { taskId: response.task_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createCheckListTaskBranchesV4Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListTaskBranchesV4Input.parse(input);
    const response = await client.listTaskRepositoryBranches(parsed);

    return listResponse(mapCheckRecordList(response.branches, response.total, "task branches v4", "branch"));
  };
}
