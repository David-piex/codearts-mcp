import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineUpdateProjectStrategyInput } from "../schemas.js";

type PipelineStrategyRuleReference = {
  id?: string;
  is_valid?: boolean;
};

export function previewUpdateProjectPipelineStrategy(input: {
  project_id: string;
  rule_set_id: string;
  name: string;
  rules: PipelineStrategyRuleReference[];
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update project pipeline strategy ${input.rule_set_id}`, {
    projectId: input.project_id,
    ruleSetId: input.rule_set_id,
    name: input.name,
    ruleCount: input.rules.length,
    executed: !input.dry_run
  });
}

export function mapUpdatedProjectPipelineStrategy(input: {
  project_id: string;
  rule_set_id: string;
  status?: boolean;
}) {
  return asItemResult(`Updated project pipeline strategy ${input.rule_set_id}`, {
    id: input.rule_set_id,
    projectId: input.project_id,
    ruleSetId: input.rule_set_id,
    status: input.status ?? true,
    executed: true
  });
}

type PipelineUpdateProjectStrategyClient = {
  updateProjectStrategy: (input: {
    project_id: string;
    rule_set_id: string;
    name: string;
    rules: PipelineStrategyRuleReference[];
  }) => Promise<{
    status?: boolean;
    rule_set_id?: string;
  }>;
};

export function createPipelineUpdateProjectStrategyHandler(
  client: PipelineUpdateProjectStrategyClient
) {
  return async (input: unknown) => {
    const parsed = pipelineUpdateProjectStrategyInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateProjectPipelineStrategy(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateProjectStrategy(parsed);
    const result = mapUpdatedProjectPipelineStrategy({
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
