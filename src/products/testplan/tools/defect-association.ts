import { asItemResult } from "../../../contracts/tool-result.js";
import {
  testPlanCreateDefectAssociationInput,
  testPlanDeleteDefectAssociationInput,
  testPlanUpdateDefectAssociationInput
} from "../schemas.js";

type CreateInput = {
  project_id: string;
  defect_id: string;
  iterator_uri: string;
  dry_run: boolean;
};

type UpdateInput = {
  project_id: string;
  defect_id: string;
  old_iterator_uri: string;
  new_iterator_uri: string;
  dry_run: boolean;
};

type DeleteInput = {
  project_id: string;
  defect_id: string;
  iterator_uri: string;
  dry_run: boolean;
};

export function previewCreateDefectAssociation(input: CreateInput) {
  return asItemResult(
    `${input.dry_run ? "Dry run" : "Executed"}: associate defect ${input.defect_id} to iterator ${input.iterator_uri}`,
    {
      id: input.defect_id,
      defectId: input.defect_id,
      projectId: input.project_id,
      iteratorUri: input.iterator_uri,
      executed: !input.dry_run
    }
  );
}

export function previewUpdateDefectAssociation(input: UpdateInput) {
  return asItemResult(
    `${input.dry_run ? "Dry run" : "Executed"}: move defect ${input.defect_id} association from ${input.old_iterator_uri} to ${input.new_iterator_uri}`,
    {
      id: input.defect_id,
      defectId: input.defect_id,
      projectId: input.project_id,
      oldIteratorUri: input.old_iterator_uri,
      newIteratorUri: input.new_iterator_uri,
      executed: !input.dry_run
    }
  );
}

export function previewDeleteDefectAssociation(input: DeleteInput) {
  return asItemResult(
    `${input.dry_run ? "Dry run" : "Executed"}: remove defect ${input.defect_id} association from iterator ${input.iterator_uri}`,
    {
      id: input.defect_id,
      defectId: input.defect_id,
      projectId: input.project_id,
      iteratorUri: input.iterator_uri,
      executed: !input.dry_run
    }
  );
}

export function mapCreatedDefectAssociation(input: {
  project_id: string;
  defect_id: string;
  iterator_uri: string;
  status?: string;
  value?: unknown;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Associated defect ${input.defect_id} to iterator ${input.iterator_uri}`, {
    id: input.defect_id,
    defectId: input.defect_id,
    projectId: input.project_id,
    iteratorUri: input.iterator_uri,
    status: input.status,
    value: input.value,
    response: input.raw,
    executed: true
  });
}

export function mapUpdatedDefectAssociation(input: {
  project_id: string;
  defect_id: string;
  old_iterator_uri: string;
  new_iterator_uri: string;
  status?: string;
  value?: unknown;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Moved defect ${input.defect_id} association to iterator ${input.new_iterator_uri}`, {
    id: input.defect_id,
    defectId: input.defect_id,
    projectId: input.project_id,
    oldIteratorUri: input.old_iterator_uri,
    newIteratorUri: input.new_iterator_uri,
    status: input.status,
    value: input.value,
    response: input.raw,
    executed: true
  });
}

export function mapDeletedDefectAssociation(input: {
  project_id: string;
  defect_id: string;
  iterator_uri: string;
  status?: string;
  value?: unknown;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Removed defect ${input.defect_id} association from iterator ${input.iterator_uri}`, {
    id: input.defect_id,
    defectId: input.defect_id,
    projectId: input.project_id,
    iteratorUri: input.iterator_uri,
    status: input.status,
    value: input.value,
    response: input.raw,
    executed: true
  });
}

type CreateClient = {
  createDefectAssociation: (input: Omit<CreateInput, "dry_run">) => Promise<{
    project_id: string;
    defect_id: string;
    iterator_uri: string;
    status?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

type UpdateClient = {
  updateDefectAssociation: (input: Omit<UpdateInput, "dry_run">) => Promise<{
    project_id: string;
    defect_id: string;
    old_iterator_uri: string;
    new_iterator_uri: string;
    status?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

type DeleteClient = {
  deleteDefectAssociation: (input: Omit<DeleteInput, "dry_run">) => Promise<{
    project_id: string;
    defect_id: string;
    iterator_uri: string;
    status?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanCreateDefectAssociationHandler(client: CreateClient) {
  return async (input: unknown) => {
    const parsed = testPlanCreateDefectAssociationInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateDefectAssociation(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createDefectAssociation(parsed);
    const result = mapCreatedDefectAssociation(response);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanUpdateDefectAssociationHandler(client: UpdateClient) {
  return async (input: unknown) => {
    const parsed = testPlanUpdateDefectAssociationInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateDefectAssociation(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateDefectAssociation(parsed);
    const result = mapUpdatedDefectAssociation(response);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanDeleteDefectAssociationHandler(client: DeleteClient) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteDefectAssociationInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteDefectAssociation(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteDefectAssociation(parsed);
    const result = mapDeletedDefectAssociation(response);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
