import {
  testPlanDeleteAssetInput,
  testPlanDeleteBasicAwsV1Input,
  testPlanDeleteBasicAwsV2Input,
  testPlanDeleteMindmapBackupInput,
  testPlanDeleteMindmapInput,
  testPlanDeleteMindmapRecycleInput,
  testPlanDeleteTestDesignTemplateInput
} from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type DeleteByIdInput = {
  project_id: string;
  id: string;
  dry_run: boolean;
};

type DeleteBasicAwsInput = {
  project_id: string;
  aw_ids: string[];
  is_api?: boolean;
  dry_run: boolean;
};

type DeleteByIdResponse = {
  raw: Record<string, unknown>;
};

type DeleteBasicAwsResponse = {
  aw_ids: string[];
  value?: unknown;
  raw: Record<string, unknown>;
};

function previewDeleteById(input: DeleteByIdInput, label: string, key: string) {
  return mapTestPlanRecordItem(
    `${input.dry_run ? "Dry run" : "Executed"}: delete ${label} ${input.id}`,
    input.id,
    key,
    { id: input.id },
    {
      projectId: input.project_id,
      executed: !input.dry_run
    }
  );
}

function mapDeletedById(input: {
  project_id: string;
  id: string;
  label: string;
  key: string;
  raw: Record<string, unknown>;
}) {
  return mapTestPlanRecordItem(`Deleted ${input.label} ${input.id}`, input.id, input.key, input.raw, {
    projectId: input.project_id,
    executed: true
  });
}

function previewDeleteBasicAws(input: DeleteBasicAwsInput, label: string) {
  return mapTestPlanRecordItem(
    `${input.dry_run ? "Dry run" : "Executed"}: delete ${input.aw_ids.length} ${label}`,
    input.aw_ids.join(","),
    "basicAws",
    {
      aw_ids: input.aw_ids,
      is_api: input.is_api
    },
    {
      projectId: input.project_id,
      deletedCount: input.aw_ids.length,
      executed: !input.dry_run
    }
  );
}

function mapDeletedBasicAws(input: {
  project_id: string;
  label: string;
  response: DeleteBasicAwsResponse;
}) {
  return mapTestPlanRecordItem(
    `Deleted ${input.response.aw_ids.length} ${input.label}`,
    input.response.aw_ids.join(","),
    "basicAws",
    input.response.raw,
    {
      projectId: input.project_id,
      awIds: input.response.aw_ids,
      deletedCount: input.response.aw_ids.length,
      value: input.response.value,
      executed: true
    }
  );
}

export function createTestPlanDeleteAssetHandler(client: {
  deleteAsset: (input: Omit<DeleteByIdInput, "dry_run">) => Promise<DeleteByIdResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteAssetInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteById(parsed, "asset", "asset");

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteAsset(parsed);
    const result = mapDeletedById({
      project_id: parsed.project_id,
      id: parsed.id,
      label: "asset",
      key: "asset",
      raw: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanDeleteTestDesignTemplateHandler(client: {
  deleteTestDesignTemplate: (input: Omit<DeleteByIdInput, "dry_run">) => Promise<DeleteByIdResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteTestDesignTemplateInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteById(parsed, "test design template", "template");

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteTestDesignTemplate(parsed);
    const result = mapDeletedById({
      project_id: parsed.project_id,
      id: parsed.id,
      label: "test design template",
      key: "template",
      raw: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanDeleteMindmapHandler(client: {
  deleteMindmap: (input: Omit<DeleteByIdInput, "dry_run">) => Promise<DeleteByIdResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteMindmapInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteById(parsed, "mindmap", "mindmap");

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteMindmap(parsed);
    const result = mapDeletedById({
      project_id: parsed.project_id,
      id: parsed.id,
      label: "mindmap",
      key: "mindmap",
      raw: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanDeleteMindmapRecycleHandler(client: {
  deleteMindmapRecycle: (input: Omit<DeleteByIdInput, "dry_run">) => Promise<DeleteByIdResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteMindmapRecycleInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteById(parsed, "mindmap recycle", "recycle");

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteMindmapRecycle(parsed);
    const result = mapDeletedById({
      project_id: parsed.project_id,
      id: parsed.id,
      label: "mindmap recycle",
      key: "recycle",
      raw: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanDeleteMindmapBackupHandler(client: {
  deleteMindmapBackup: (input: Omit<DeleteByIdInput, "dry_run">) => Promise<DeleteByIdResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteMindmapBackupInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteById(parsed, "mindmap backup", "backup");

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteMindmapBackup(parsed);
    const result = mapDeletedById({
      project_id: parsed.project_id,
      id: parsed.id,
      label: "mindmap backup",
      key: "backup",
      raw: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanDeleteBasicAwsV1Handler(client: {
  deleteBasicAwsV1: (input: Omit<DeleteBasicAwsInput, "dry_run">) => Promise<DeleteBasicAwsResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteBasicAwsV1Input.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteBasicAws(parsed, "basic AW keywords via v1");

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteBasicAwsV1(parsed);
    const result = mapDeletedBasicAws({
      project_id: parsed.project_id,
      label: "basic AW keywords via v1",
      response
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanDeleteBasicAwsV2Handler(client: {
  deleteBasicAwsV2: (input: Omit<DeleteBasicAwsInput, "dry_run">) => Promise<DeleteBasicAwsResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteBasicAwsV2Input.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteBasicAws(parsed, "basic AW keywords via v2");

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteBasicAwsV2(parsed);
    const result = mapDeletedBasicAws({
      project_id: parsed.project_id,
      label: "basic AW keywords via v2",
      response
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
