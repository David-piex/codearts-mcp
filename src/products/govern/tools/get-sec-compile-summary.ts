import { asItemResult } from "../../../contracts/tool-result.js";
import { governGetSecCompileSummaryInput } from "../schemas.js";

export function mapGovernSecCompileSummary(input: {
  version?: string;
  all_file_nums?: number;
  items?: Array<{
    index?: string;
    name?: string;
    severity?: string;
    result?: unknown;
  }>;
}) {
  return asItemResult("Loaded govern sec compile summary", {
    id: "seccompile-summary",
    version: input.version,
    fileCount: input.all_file_nums ?? 0,
    itemCount: input.items?.length ?? 0,
    items: input.items ?? []
  });
}

type GovernGetSecCompileSummaryClient = {
  getSecCompileSummary: (input: { project_id: string; task_id: string }) => Promise<{
    version?: string;
    all_file_nums?: number;
    items?: Array<{
      index?: string;
      name?: string;
      severity?: string;
      result?: unknown;
    }>;
  }>;
};

export function createGovernGetSecCompileSummaryHandler(client: GovernGetSecCompileSummaryClient) {
  return async (input: unknown) => {
    const parsed = governGetSecCompileSummaryInput.parse(input);
    const response = await client.getSecCompileSummary(parsed);
    const result = mapGovernSecCompileSummary(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
