import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineCreateProjectStrategyInput } from "../schemas.js";

type PipelineStrategyRuleReference = {
  id?: string;
  is_valid?: boolean;
};

export function previewCreateProjectPipelineStrategy(input: {
  project_id: string;
  name: string;
  rules: PipelineStrategyRuleReference[];
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create project pipeline strategy ${input.name}`, {
    projectId: input.project_id,
    name: input.name,
    ruleCount: input.rules.length,
    executed: !input.dry_run
  });
}

export function mapCreatedProjectPipelineStrategy(input: {
  project_id: string;
  rule_set_id?: string;
  status?: boolean;
}) {
  return asItemResult(`Created project pipeline strategy ${input.rule_set_id ?? ""}`, {
    id: input.rule_set_id ?? "",
    projectId: input.project_id,
    ruleSetId: input.rule_set_id ?? "",
    status: input.status ?? true,
    executed: true
  });
}

type PipelineCreateProjectStrategyClient = {
  createProjectStrategy: (input: {
    project_id: string;
    name: string;
    rules: PipelineStrategyRuleReference[];
  }) => Promise<{
    status?: boolean;
    rule_set_id?: string;
  }>;
};

export function createPipelineCreateProjectStrategyHandler(
  client: PipelineCreateProjectStrategyClient
) {
  return async (input: unknown) => {
    const parsed = pipelineCreateProjectStrategyInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateProjectPipelineStrategy(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createProjectStrategy(parsed);
    const result = mapCreatedProjectPipelineStrategy({
      project_id: parsed.project_id,
      rule_set_id: response.rule_set_id,
      status: response.status
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
