import {
  testPlanBatchDeleteFactorsInput,
  testPlanDeleteAssetInput,
  testPlanDeleteAttachmentInput,
  testPlanDeleteBasicAwsV1Input,
  testPlanDeleteBasicAwsV2Input,
  testPlanDeleteCustomizedFilterInput,
  testPlanDeleteFactorInput,
  testPlanDeleteIssueDynamicRecordsInput,
  testPlanDeleteMindmapBackupInput,
  testPlanDeleteMindmapInput,
  testPlanDeleteMindmapRecycleInput,
  testPlanDeleteRecycleResourceInput,
  testPlanDeleteTestDesignTemplateInput,
  testPlanDeleteTestcasesV3Input,
  testPlanDeleteVectorsInput
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

type DeleteFactorBatchInput = {
  project_id: string;
  factor_ids: string[];
  dry_run: boolean;
};

type DeleteAttachmentInput = {
  project_id: string;
  attachment_uri: string;
  dry_run: boolean;
};

type DeleteIssueDynamicRecordsInput = {
  project_id: string;
  issue_id: string;
  owner_id: string;
  dry_run: boolean;
};

type DeleteCustomizedFilterInput = {
  project_id: string;
  filter_uri: string;
  dry_run: boolean;
};

type DeleteVectorsInput = {
  project_uuid: string;
  case_uris: string[];
  dry_run: boolean;
};

type DeleteRecycleResourceInput = {
  project_uuid: string;
  resources: Array<{
    resource_type: string;
    resource_uris: string[];
  }>;
  is_async?: boolean;
  dry_run: boolean;
};

type DeleteTestcasesV3Input = {
  project_id: string;
  testcases: Array<Record<string, unknown>>;
  delete_git_script?: boolean;
  iterator_uri?: string;
  dry_run: boolean;
};

type DeleteValueResponse = {
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

function previewDeleteMany(input: {
  project_id?: string;
  project_uuid?: string;
  ids: string[];
  label: string;
  key: string;
  extra?: Record<string, unknown>;
  dry_run: boolean;
}) {
  return mapTestPlanRecordItem(
    `${input.dry_run ? "Dry run" : "Executed"}: delete ${input.ids.length} ${input.label}`,
    input.ids.join(","),
    input.key,
    {
      ids: input.ids,
      ...input.extra
    },
    {
      projectId: input.project_id ?? input.project_uuid,
      deletedCount: input.ids.length,
      executed: !input.dry_run
    }
  );
}

function mapDeletedValue(input: {
  id: string;
  label: string;
  key: string;
  project_id?: string;
  project_uuid?: string;
  raw: Record<string, unknown>;
  value?: unknown;
  extra?: Record<string, unknown>;
}) {
  return mapTestPlanRecordItem(`Deleted ${input.label} ${input.id}`, input.id, input.key, input.raw, {
    projectId: input.project_id ?? input.project_uuid,
    value: input.value,
    executed: true,
    ...input.extra
  });
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

export function createTestPlanDeleteFactorHandler(client: {
  deleteFactor: (input: Omit<DeleteByIdInput, "dry_run">) => Promise<DeleteByIdResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteFactorInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteById(parsed, "factor", "factor");

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteFactor(parsed);
    const result = mapDeletedById({
      project_id: parsed.project_id,
      id: parsed.id,
      label: "factor",
      key: "factor",
      raw: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanBatchDeleteFactorsHandler(client: {
  batchDeleteFactors: (input: Omit<DeleteFactorBatchInput, "dry_run">) => Promise<{
    factor_ids: string[];
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanBatchDeleteFactorsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteMany({
        project_id: parsed.project_id,
        ids: parsed.factor_ids,
        label: "factors",
        key: "factors",
        dry_run: parsed.dry_run
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchDeleteFactors(parsed);
    const result = mapDeletedValue({
      id: response.factor_ids.join(","),
      label: `${response.factor_ids.length} factors`,
      key: "factors",
      project_id: parsed.project_id,
      raw: response.raw,
      extra: {
        factorIds: response.factor_ids,
        deletedCount: response.factor_ids.length
      }
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

export function createTestPlanDeleteAttachmentHandler(client: {
  deleteAttachment: (input: Omit<DeleteAttachmentInput, "dry_run">) => Promise<DeleteValueResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteAttachmentInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteById(
        {
          project_id: parsed.project_id,
          id: parsed.attachment_uri,
          dry_run: parsed.dry_run
        },
        "attachment",
        "attachment"
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteAttachment(parsed);
    const result = mapDeletedValue({
      id: parsed.attachment_uri,
      label: "attachment",
      key: "attachment",
      project_id: parsed.project_id,
      raw: response.raw,
      value: response.value
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanDeleteIssueDynamicRecordsHandler(client: {
  deleteIssueDynamicRecords: (
    input: Omit<DeleteIssueDynamicRecordsInput, "dry_run">
  ) => Promise<DeleteValueResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteIssueDynamicRecordsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteById(
        {
          project_id: parsed.project_id,
          id: parsed.issue_id,
          dry_run: parsed.dry_run
        },
        "issue dynamic records",
        "issueDynamicRecords"
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteIssueDynamicRecords(parsed);
    const result = mapDeletedValue({
      id: parsed.issue_id,
      label: "issue dynamic records",
      key: "issueDynamicRecords",
      project_id: parsed.project_id,
      raw: response.raw,
      value: response.value,
      extra: { ownerId: parsed.owner_id }
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanDeleteCustomizedFilterHandler(client: {
  deleteCustomizedFilter: (input: Omit<DeleteCustomizedFilterInput, "dry_run">) => Promise<DeleteValueResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteCustomizedFilterInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteById(
        {
          project_id: parsed.project_id,
          id: parsed.filter_uri,
          dry_run: parsed.dry_run
        },
        "customized filter",
        "filter"
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteCustomizedFilter(parsed);
    const result = mapDeletedValue({
      id: parsed.filter_uri,
      label: "customized filter",
      key: "filter",
      project_id: parsed.project_id,
      raw: response.raw,
      value: response.value
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanDeleteVectorsHandler(client: {
  deleteVectors: (input: Omit<DeleteVectorsInput, "dry_run">) => Promise<DeleteValueResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteVectorsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteMany({
        project_uuid: parsed.project_uuid,
        ids: parsed.case_uris,
        label: "testcase vectors",
        key: "vectors",
        dry_run: parsed.dry_run
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteVectors(parsed);
    const result = mapDeletedValue({
      id: parsed.case_uris.join(","),
      label: `${parsed.case_uris.length} testcase vectors`,
      key: "vectors",
      project_uuid: parsed.project_uuid,
      raw: response.raw,
      value: response.value,
      extra: {
        caseUris: parsed.case_uris,
        deletedCount: parsed.case_uris.length
      }
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanDeleteRecycleResourceHandler(client: {
  deleteRecycleResource: (input: Omit<DeleteRecycleResourceInput, "dry_run">) => Promise<DeleteValueResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteRecycleResourceInput.parse(input);
    const resourceUris = parsed.resources.flatMap((resource) => resource.resource_uris);

    if (parsed.dry_run) {
      const result = previewDeleteMany({
        project_uuid: parsed.project_uuid,
        ids: resourceUris,
        label: "recycle resources",
        key: "recycleResources",
        extra: {
          resources: parsed.resources,
          is_async: parsed.is_async
        },
        dry_run: parsed.dry_run
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteRecycleResource(parsed);
    const result = mapDeletedValue({
      id: resourceUris.join(","),
      label: `${resourceUris.length} recycle resources`,
      key: "recycleResources",
      project_uuid: parsed.project_uuid,
      raw: response.raw,
      value: response.value,
      extra: {
        resources: parsed.resources,
        deletedCount: resourceUris.length
      }
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanDeleteTestcasesV3Handler(client: {
  deleteTestcasesV3: (input: Omit<DeleteTestcasesV3Input, "dry_run">) => Promise<DeleteValueResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteTestcasesV3Input.parse(input);
    const testcaseIds = parsed.testcases.map((testcase, index) =>
      String(testcase.id ?? testcase.uri ?? `testcase-${index + 1}`)
    );

    if (parsed.dry_run) {
      const result = previewDeleteMany({
        project_id: parsed.project_id,
        ids: testcaseIds,
        label: "v3 testcases",
        key: "testcases",
        extra: {
          delete_git_script: parsed.delete_git_script,
          iterator_uri: parsed.iterator_uri
        },
        dry_run: parsed.dry_run
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteTestcasesV3(parsed);
    const result = mapDeletedValue({
      id: testcaseIds.join(","),
      label: `${testcaseIds.length} v3 testcases`,
      key: "testcases",
      project_id: parsed.project_id,
      raw: response.raw,
      value: response.value,
      extra: {
        testcaseIds,
        deletedCount: testcaseIds.length
      }
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
