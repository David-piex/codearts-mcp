import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineSwitchProjectStrategyInput } from "../schemas.js";

export function previewSwitchProjectPipelineStrategy(input: {
  project_id: string;
  rule_set_id: string;
  is_valid: boolean;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: switch project pipeline strategy ${input.rule_set_id}`, {
    projectId: input.project_id,
    ruleSetId: input.rule_set_id,
    isValid: input.is_valid,
    executed: !input.dry_run
  });
}

export function mapSwitchedProjectPipelineStrategy(input: {
  project_id: string;
  rule_set_id: string;
  is_valid: boolean;
  status?: boolean;
}) {
  return asItemResult(`Switched project pipeline strategy ${input.rule_set_id}`, {
    id: input.rule_set_id,
    projectId: input.project_id,
    ruleSetId: input.rule_set_id,
    isValid: input.is_valid,
    status: input.status ?? true,
    executed: true
  });
}

type PipelineSwitchProjectStrategyClient = {
  switchProjectStrategy: (input: {
    project_id: string;
    rule_set_id: string;
    is_valid: boolean;
  }) => Promise<{
    status?: boolean;
    rule_set_id?: string;
  }>;
};

export function createPipelineSwitchProjectStrategyHandler(
  client: PipelineSwitchProjectStrategyClient
) {
  return async (input: unknown) => {
    const parsed = pipelineSwitchProjectStrategyInput.parse(input);

    if (parsed.dry_run) {
      const result = previewSwitchProjectPipelineStrategy(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.switchProjectStrategy(parsed);
    const result = mapSwitchedProjectPipelineStrategy({
      project_id: parsed.project_id,
      rule_set_id: response.rule_set_id ?? parsed.rule_set_id,
      is_valid: parsed.is_valid,
      status: response.status
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
