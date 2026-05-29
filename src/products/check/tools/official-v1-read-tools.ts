import { type ToolResult } from "../../../contracts/tool-result.js";
import {
  checkGetDefectTaskMeasuresV1Input,
  checkGetTaskPdfFileV1Input,
  checkListTaskMeasureFilesV1Input
} from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordItem, mapCheckRecordList } from "./generic-read-tools.js";

type RawRecord = Record<string, unknown>;

type Client = {
  getPdfFile: (input: {
    task_id: string;
    job_file: string;
  }) => Promise<{
    task_id: string;
    job_file: string;
    raw: RawRecord | string;
  }>;
  getTaskMeasures: (input: {
    task_id: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    task_id: string;
    raw: RawRecord;
  }>;
  listMeasureFiles: (input: {
    task_id: string;
    page: number;
    page_size: number;
    job_id?: string;
  }) => Promise<{
    task_id: string;
    files: RawRecord[];
    total?: number;
    raw: RawRecord;
  }>;
};

function listResponse<T extends { id?: string; name?: string }>(result: ToolResult<T>, raw?: RawRecord) {
  return {
    content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
    structuredContent: raw ? { ...result, raw } : result
  };
}

function rawRecord(input: RawRecord | string): RawRecord {
  return typeof input === "string" ? { content: input } : input;
}

export function createCheckGetTaskPdfFileV1Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetTaskPdfFileV1Input.parse(input);
    const response = await client.getPdfFile(parsed);
    const result = mapCheckRecordItem(
      "Loaded Check task PDF file via official v1 API",
      response.task_id,
      "pdfFile",
      rawRecord(response.raw),
      { jobFile: response.job_file }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createCheckGetDefectTaskMeasuresV1Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetDefectTaskMeasuresV1Input.parse(input);
    const response = await client.getTaskMeasures(parsed);
    const result = mapCheckRecordItem(
      "Loaded Check defect task measures via official v1 API",
      response.task_id,
      "measures",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createCheckListTaskMeasureFilesV1Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListTaskMeasureFilesV1Input.parse(input);
    const response = await client.listMeasureFiles(parsed);

    return listResponse(
      mapCheckRecordList(response.files, response.total, "task measure files v1", "measureFile"),
      response.raw
    );
  };
}
