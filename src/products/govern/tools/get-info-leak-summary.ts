import { asItemResult } from "../../../contracts/tool-result.js";
import { governGetInfoLeakSummaryInput } from "../schemas.js";

export function mapGovernInfoLeakSummary(input: {
  file_count?: number;
  start_time?: string;
  end_time?: string;
  items?: Array<{
    name?: string;
    result?: number;
  }>;
}) {
  return asItemResult("Loaded govern info leak summary", {
    id: "infoleak-summary",
    fileCount: input.file_count ?? 0,
    itemCount: input.items?.length ?? 0,
    items: input.items ?? [],
    startTime: input.start_time,
    endTime: input.end_time
  });
}

type GovernGetInfoLeakSummaryClient = {
  getInfoLeakSummary: (input: { project_id: string; task_id: string }) => Promise<{
    file_count?: number;
    start_time?: string;
    end_time?: string;
    items?: Array<{
      name?: string;
      result?: number;
    }>;
  }>;
};

export function createGovernGetInfoLeakSummaryHandler(client: GovernGetInfoLeakSummaryClient) {
  return async (input: unknown) => {
    const parsed = governGetInfoLeakSummaryInput.parse(input);
    const response = await client.getInfoLeakSummary(parsed);
    const result = mapGovernInfoLeakSummary(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
