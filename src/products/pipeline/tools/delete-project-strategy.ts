import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineDeleteProjectStrategyInput } from "../schemas.js";

export function previewDeleteProjectPipelineStrategy(input: {
  project_id: string;
  rule_set_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete project pipeline strategy ${input.rule_set_id}`, {
    projectId: input.project_id,
    ruleSetId: input.rule_set_id,
    executed: !input.dry_run
  });
}

export function mapDeletedProjectPipelineStrategy(input: {
  project_id: string;
  rule_set_id: string;
  status?: boolean;
}) {
  return asItemResult(`Deleted project pipeline strategy ${input.rule_set_id}`, {
    id: input.rule_set_id,
    projectId: input.project_id,
    ruleSetId: input.rule_set_id,
    status: input.status ?? true,
    executed: true
  });
}

type PipelineDeleteProjectStrategyClient = {
  deleteProjectStrategy: (input: { project_id: string; rule_set_id: string }) => Promise<{
    status?: boolean;
    rule_set_id?: string;
  }>;
};

export function createPipelineDeleteProjectStrategyHandler(
  client: PipelineDeleteProjectStrategyClient
) {
  return async (input: unknown) => {
    const parsed = pipelineDeleteProjectStrategyInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteProjectPipelineStrategy(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteProjectStrategy(parsed);
    const result = mapDeletedProjectPipelineStrategy({
      project_id: parsed.project_id,
      rule_set_id: response.rule_set_id ?? parsed.rule_set_id,
      status: response.status
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
