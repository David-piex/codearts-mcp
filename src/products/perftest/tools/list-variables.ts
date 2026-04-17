import { asListResult } from "../../../contracts/tool-result.js";
import { perftestListVariablesInput } from "../schemas.js";

export function mapPerfTestVariables(
  items: Array<{
    id: number;
    name?: string;
    variable_type?: number;
    variable_mode?: number;
    share_mode?: number;
    is_quoted?: boolean;
    file_size?: number;
    variable?: unknown[];
  }>
) {
  return asListResult(
    `${items.length} perftest variables found`,
    items.map((item) => ({
      id: String(item.id),
      name: item.name,
      variableType: item.variable_type,
      variableMode: item.variable_mode,
      shareMode: item.share_mode,
      isQuoted: item.is_quoted,
      fileSize: item.file_size,
      values: item.variable ?? []
    }))
  );
}

type PerfTestListVariablesClient = {
  listVariables: (input: {
    project_id: string;
    test_suite_id: number;
    variable_type: number;
  }) => Promise<{
    variable_list: Array<{
      id: number;
      name?: string;
      variable_type?: number;
      variable_mode?: number;
      share_mode?: number;
      is_quoted?: boolean;
      file_size?: number;
      variable?: unknown[];
    }>;
  }>;
};

export function createPerfTestListVariablesHandler(client: PerfTestListVariablesClient) {
  return async (input: unknown) => {
    const parsed = perftestListVariablesInput.parse(input);
    const response = await client.listVariables(parsed);
    const result = mapPerfTestVariables(response.variable_list);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
