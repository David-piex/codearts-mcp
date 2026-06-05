import { basename } from "node:path";
import { readFile } from "node:fs/promises";
import { asItemResult } from "../../../contracts/tool-result.js";
import {
  testPlanCreateTestStepByCollectionInput,
  testPlanImportTasksInput,
  testPlanUploadBackgroundInput,
  testPlanUploadFileToGitInput,
  testPlanUploadFileV3Input
} from "../schemas.js";

function detectContentType(fileName: string) {
  const normalized = fileName.toLowerCase();

  if (normalized.endsWith(".png")) return "image/png";
  if (normalized.endsWith(".jpg") || normalized.endsWith(".jpeg")) return "image/jpeg";
  if (normalized.endsWith(".gif")) return "image/gif";
  if (normalized.endsWith(".webp")) return "image/webp";
  if (normalized.endsWith(".svg")) return "image/svg+xml";
  if (normalized.endsWith(".bmp")) return "image/bmp";
  if (normalized.endsWith(".json")) return "application/json";
  if (normalized.endsWith(".yaml") || normalized.endsWith(".yml")) return "application/yaml";
  if (normalized.endsWith(".txt")) return "text/plain";

  return "application/octet-stream";
}

function previewFile(summary: string, input: { project_id: string; file_path: string }, extra?: Record<string, unknown>) {
  return asItemResult(summary, {
    projectId: input.project_id,
    filePath: input.file_path,
    fileName: basename(input.file_path),
    executed: false,
    ...extra
  });
}

function mapUploadResult(summary: string, id: string, raw: Record<string, unknown>, extra?: Record<string, unknown>) {
  return asItemResult(summary, {
    id,
    executed: true,
    ...extra
  }, raw);
}

export function createTestPlanImportTasksHandler(client: {
  importTasks: (input: Omit<ReturnType<typeof testPlanImportTasksInput.parse>, "dry_run">) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanImportTasksInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: import TestPlan tasks", {
        projectUuid: parsed.project_uuid,
        sourceVersionUri: parsed.source_version_uri,
        destVersionUri: parsed.dest_version_uri,
        sourceTaskUris: parsed.source_task_uris,
        isCopy: parsed.is_copy,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.importTasks(request);
    const identifier = String(response.value ?? parsed.dest_version_uri);
    const result = mapUploadResult("Imported TestPlan tasks", identifier, response.raw, {
      value: response.value,
      projectUuid: parsed.project_uuid,
      sourceTaskUris: parsed.source_task_uris
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanUploadBackgroundHandler(client: {
  uploadBackground: (input: {
    project_id: string;
    background_type: string;
    file_name: string;
    file_content: Uint8Array;
    content_type?: string;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanUploadBackgroundInput.parse(input);

    if (parsed.dry_run) {
      const result = previewFile("Dry run: upload TestPlan background image", parsed, {
        backgroundType: parsed.background_type
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const fileName = basename(parsed.file_path);
    const fileContent = await readFile(parsed.file_path);
    const response = await client.uploadBackground({
      project_id: parsed.project_id,
      background_type: parsed.background_type,
      file_name: fileName,
      file_content: new Uint8Array(fileContent),
      content_type: detectContentType(fileName)
    });
    const result = mapUploadResult("Uploaded TestPlan background image", parsed.project_id, response.raw, {
      projectId: parsed.project_id,
      backgroundType: parsed.background_type,
      fileName,
      value: response.value
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanCreateTestStepByCollectionHandler(client: {
  createTestStepByCollection: (input: {
    project_id: string;
    x_auth_token: string;
    file_name: string;
    file_content: Uint8Array;
    branch_uri?: string;
    tmss_case_uri?: string;
    content_type?: string;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanCreateTestStepByCollectionInput.parse(input);

    if (parsed.dry_run) {
      const result = previewFile("Dry run: create TestPlan steps by Postman collection", parsed, {
        branchUri: parsed.branch_uri,
        tmssCaseUri: parsed.tmss_case_uri
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const fileName = basename(parsed.file_path);
    const fileContent = await readFile(parsed.file_path);
    const response = await client.createTestStepByCollection({
      project_id: parsed.project_id,
      x_auth_token: parsed.x_auth_token,
      file_name: fileName,
      file_content: new Uint8Array(fileContent),
      branch_uri: parsed.branch_uri,
      tmss_case_uri: parsed.tmss_case_uri,
      content_type: detectContentType(fileName)
    });
    const result = mapUploadResult("Created TestPlan steps by Postman collection", parsed.project_id, response.raw, {
      projectId: parsed.project_id,
      fileName,
      branchUri: parsed.branch_uri,
      tmssCaseUri: parsed.tmss_case_uri,
      value: response.value
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanUploadFileToGitHandler(client: {
  uploadFileToGit: (input: {
    project_id: string;
    x_auth_token: string;
    file_name: string;
    file_content: Uint8Array;
    aw_ins_id?: string;
    case_id?: string;
    is_combined_aw?: boolean;
    content_type?: string;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanUploadFileToGitInput.parse(input);

    if (parsed.dry_run) {
      const result = previewFile("Dry run: upload TestPlan file to git", parsed, {
        awInsId: parsed.aw_ins_id,
        caseId: parsed.case_id,
        isCombinedAw: parsed.is_combined_aw
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const fileName = basename(parsed.file_path);
    const fileContent = await readFile(parsed.file_path);
    const response = await client.uploadFileToGit({
      project_id: parsed.project_id,
      x_auth_token: parsed.x_auth_token,
      file_name: fileName,
      file_content: new Uint8Array(fileContent),
      aw_ins_id: parsed.aw_ins_id,
      case_id: parsed.case_id,
      is_combined_aw: parsed.is_combined_aw,
      content_type: detectContentType(fileName)
    });
    const result = mapUploadResult("Uploaded TestPlan file to git", parsed.project_id, response.raw, {
      projectId: parsed.project_id,
      fileName,
      awInsId: parsed.aw_ins_id,
      caseId: parsed.case_id,
      isCombinedAw: parsed.is_combined_aw,
      value: response.value
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanUploadFileV3Handler(client: {
  uploadFileV3: (input: {
    project_id: string;
    x_auth_token: string;
    file_name: string;
    file_content: Uint8Array;
    content_type?: string;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanUploadFileV3Input.parse(input);

    if (parsed.dry_run) {
      const result = previewFile("Dry run: upload TestPlan v3 file", parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const fileName = basename(parsed.file_path);
    const fileContent = await readFile(parsed.file_path);
    const response = await client.uploadFileV3({
      project_id: parsed.project_id,
      x_auth_token: parsed.x_auth_token,
      file_name: fileName,
      file_content: new Uint8Array(fileContent),
      content_type: detectContentType(fileName)
    });
    const result = mapUploadResult("Uploaded TestPlan v3 file", parsed.project_id, response.raw, {
      projectId: parsed.project_id,
      fileName,
      value: response.value
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
