import { testPlanUpdateDynamicGlobalVariableInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type UpdateInput = {
  project_id: string;
  task_id: string;
  key: string;
  body: unknown;
  dry_run: boolean;
};

type Client = {
  updateDynamicGlobalVariable: (input: {
    project_id: string;
    task_id: string;
    key: string;
    body: unknown;
  }) => Promise<{
    project_id: string;
    task_id: string;
    key: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function previewUpdateDynamicGlobalVariable(input: UpdateInput) {
  return mapTestPlanRecordItem(
    `${input.dry_run ? "Dry run" : "Executed"}: update dynamic global variable ${input.key}`,
    input.key,
    "variable",
    { body: input.body },
    {
      projectId: input.project_id,
      taskId: input.task_id,
      executed: !input.dry_run
    }
  );
}

export function createTestPlanUpdateDynamicGlobalVariableHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanUpdateDynamicGlobalVariableInput.parse(input);
    if (parsed.body === undefined) {
      throw new Error("body is required");
    }

    if (parsed.dry_run) {
      const result = previewUpdateDynamicGlobalVariable({
        ...parsed,
        body: parsed.body
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateDynamicGlobalVariable({
      ...parsed,
      body: parsed.body
    });
    const result = mapTestPlanRecordItem(
      `Updated dynamic global variable ${parsed.key}`,
      parsed.key,
      "variable",
      response.raw,
      {
        projectId: parsed.project_id,
        taskId: parsed.task_id,
        value: response.value
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
