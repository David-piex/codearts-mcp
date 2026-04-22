import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineInheritProjectStrategyInput } from "../schemas.js";

export function previewInheritProjectPipelineStrategy(input: {
  project_id: string;
  name: string;
  parent_id: string;
  rules?: string[];
  is_valid: boolean;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: inherit project pipeline strategy ${input.name}`, {
    projectId: input.project_id,
    name: input.name,
    parentId: input.parent_id,
    rules: input.rules ?? [],
    isValid: input.is_valid,
    executed: !input.dry_run
  });
}

export function mapInheritedProjectPipelineStrategy(input: {
  project_id: string;
  rule_set_id?: string;
  status?: boolean;
}) {
  return asItemResult(`Inherited project pipeline strategy ${input.rule_set_id ?? ""}`, {
    id: input.rule_set_id ?? "",
    projectId: input.project_id,
    ruleSetId: input.rule_set_id ?? "",
    status: input.status ?? true,
    executed: true
  });
}

type PipelineInheritProjectStrategyClient = {
  inheritProjectStrategy: (input: {
    project_id: string;
    name: string;
    parent_id: string;
    rules?: string[];
    is_valid: boolean;
  }) => Promise<{
    status?: boolean;
    rule_set_id?: string;
  }>;
};

export function createPipelineInheritProjectStrategyHandler(
  client: PipelineInheritProjectStrategyClient
) {
  return async (input: unknown) => {
    const parsed = pipelineInheritProjectStrategyInput.parse(input);

    if (parsed.dry_run) {
      const result = previewInheritProjectPipelineStrategy(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.inheritProjectStrategy(parsed);
    const result = mapInheritedProjectPipelineStrategy({
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
