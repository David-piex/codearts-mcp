import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanDeleteWorkItemTestRelationInput } from "../schemas.js";

type DeleteWorkItemTestRelationInput = ReturnType<typeof testPlanDeleteWorkItemTestRelationInput.parse>;

export function previewDeleteWorkItemTestRelation(input: DeleteWorkItemTestRelationInput) {
  return asItemResult("Dry run: delete TestPlan work item testcase relations", {
    id: input.work_item_id,
    workItemId: input.work_item_id,
    projectUuid: input.project_uuid,
    versionUri: input.version_uri,
    relateType: input.relate_type,
    testCaseUris: input.test_case_uris,
    deletedCount: input.test_case_uris.length,
    executed: false
  });
}

export function mapDeletedWorkItemTestRelation(input: {
  work_item_id: string;
  test_case_uris: string[];
  project_uuid: string;
  version_uri?: string;
  relate_type?: string;
  value?: unknown;
  deleted: boolean;
  raw: Record<string, unknown>;
}) {
  return asItemResult("Deleted TestPlan work item testcase relations", {
    id: input.work_item_id,
    workItemId: input.work_item_id,
    projectUuid: input.project_uuid,
    versionUri: input.version_uri,
    relateType: input.relate_type,
    testCaseUris: input.test_case_uris,
    deletedCount: input.test_case_uris.length,
    value: input.value,
    deleted: input.deleted,
    executed: true
  }, input.raw);
}

export function createTestPlanDeleteWorkItemTestRelationHandler(client: {
  deleteWorkItemTestRelation: (input: Omit<DeleteWorkItemTestRelationInput, "dry_run">) => Promise<{
    work_item_id: string;
    test_case_uris: string[];
    project_uuid: string;
    version_uri?: string;
    relate_type?: string;
    value?: unknown;
    deleted: boolean;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteWorkItemTestRelationInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteWorkItemTestRelation(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteWorkItemTestRelation(parsed);
    const result = mapDeletedWorkItemTestRelation(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
