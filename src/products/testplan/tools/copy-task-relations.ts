import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanCopyTaskRelationsInput } from "../schemas.js";

type CopyTaskRelationsInput = ReturnType<typeof testPlanCopyTaskRelationsInput.parse>;

export function createTestPlanCopyTaskRelationsHandler(client: {
  copyTaskRelations: (input: Omit<CopyTaskRelationsInput, "dry_run">) => Promise<{
    project_id: string;
    value?: string;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanCopyTaskRelationsInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(`Dry run: copy task relations ${parsed.original_task_uri} -> ${parsed.dest_task_uri}`, {
        projectId: parsed.project_id,
        originalTaskUri: parsed.original_task_uri,
        destTaskUri: parsed.dest_task_uri,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.copyTaskRelations(parsed);
    const result = asItemResult(`Copied task relations ${parsed.original_task_uri} -> ${parsed.dest_task_uri}`, {
      id: response.value ?? parsed.dest_task_uri,
      projectId: response.project_id,
      originalTaskUri: parsed.original_task_uri,
      destTaskUri: parsed.dest_task_uri,
      value: response.value,
      executed: true
    }, response.raw);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
