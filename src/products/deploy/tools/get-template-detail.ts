import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetTemplateDetailInput } from "../schemas.js";
import { extractDeployOperationParameters } from "./step-parameters.js";

type DeployGetTemplateDetailClient = {
  getTemplateDetail: (input: { template_id: string; task_id?: string }) => Promise<{
    template_id: string;
    task_id?: string;
    name?: string;
    operation_list: unknown[];
    raw: unknown;
  }>;
};

export function createDeployGetTemplateDetailHandler(client: DeployGetTemplateDetailClient) {
  return async (input: unknown) => {
    const parsed = deployGetTemplateDetailInput.parse(input);
    const response = await client.getTemplateDetail(parsed);
    const parameterHints = extractDeployOperationParameters(response.operation_list);
    const operationNames = response.operation_list
      .map((item) => {
        if (typeof item !== "object" || item === null || Array.isArray(item)) {
          return undefined;
        }

        const record = item as Record<string, unknown>;
        return [record.name, record.display_name, record.step_name, record.type].find(
          (value): value is string => typeof value === "string" && value.length > 0
        );
      })
      .filter((value): value is string => Boolean(value));

    const result = asItemResult(
      `Loaded deploy template ${response.template_id}`,
      {
        id: response.template_id,
        templateId: response.template_id,
        taskId: response.task_id,
        name: response.name,
        operationCount: response.operation_list.length,
        operationNames,
        parameterCount: parameterHints.parameterCount,
        parameterNames: parameterHints.parameterNames,
        parameters: parameterHints.parameters,
        operations: response.operation_list
      },
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
