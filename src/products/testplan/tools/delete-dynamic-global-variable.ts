import { testPlanDeleteDynamicGlobalVariableInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type DeleteInput = {
  project_id: string;
  task_id: string;
  key: string;
  dry_run: boolean;
};

type Client = {
  deleteDynamicGlobalVariable: (input: {
    project_id: string;
    task_id: string;
    key: string;
  }) => Promise<{
    project_id: string;
    task_id: string;
    key: string;
    raw: Record<string, unknown>;
  }>;
};

export function previewDeleteDynamicGlobalVariable(input: DeleteInput) {
  return mapTestPlanRecordItem(
    `${input.dry_run ? "Dry run" : "Executed"}: delete dynamic global variable ${input.key}`,
    input.key,
    "variable",
    {},
    {
      projectId: input.project_id,
      taskId: input.task_id,
      executed: !input.dry_run
    }
  );
}

export function createTestPlanDeleteDynamicGlobalVariableHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteDynamicGlobalVariableInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteDynamicGlobalVariable(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteDynamicGlobalVariable(parsed);
    const result = mapTestPlanRecordItem(
      `Deleted dynamic global variable ${parsed.key}`,
      parsed.key,
      "variable",
      response.raw,
      {
        projectId: parsed.project_id,
        taskId: parsed.task_id
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
