import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanRunCasesInput } from "../schemas.js";

export function previewRunCases(input: {
  project_id: string;
  execute_list: Array<{ case_id: string }>;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: run ${input.execute_list.length} test cases`, {
    projectId: input.project_id,
    acceptedCount: input.execute_list.length,
    executed: !input.dry_run
  });
}

export function mapRunCasesResult(input: {
  run_id?: string;
  accepted_count?: number;
  status?: string;
}) {
  return asItemResult(`Executed test cases ${input.run_id ?? ""}`.trim(), {
    id: input.run_id,
    acceptedCount: input.accepted_count,
    status: input.status,
    executed: true
  });
}

type TestPlanRunCasesClient = {
  runCases: (input: {
    project_id: string;
    execute_list: Array<{ case_id: string }>;
  }) => Promise<{
    run_id?: string;
    accepted_count?: number;
    status?: string;
  }>;
};

export function createTestPlanRunCasesHandler(client: TestPlanRunCasesClient) {
  return async (input: unknown) => {
    const parsed = testPlanRunCasesInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRunCases(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.runCases(parsed);
    const result = mapRunCasesResult(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
