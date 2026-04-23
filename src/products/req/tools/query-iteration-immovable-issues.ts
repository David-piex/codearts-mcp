import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqQueryIterationImmovableIssuesInput } from "../schemas.js";

export function mapReqIterationImmovableIssues(
  items: Array<{
    number?: string;
    id: number | string;
    status_id?: number;
    status_name?: string;
  }>
) {
  return asListResult(
    `${items.length} immovable issues found`,
    items.map((item) => ({
      number: item.number,
      id: String(item.id),
      statusId: item.status_id,
      statusName: item.status_name
    }))
  );
}

type ReqQueryIterationImmovableIssuesClient = {
  queryIterationImmovableIssues: (input: { project_id: string; version_id: string }) => Promise<{
    items: Array<{
      number?: string;
      id: number | string;
      status_id?: number;
      status_name?: string;
    }>;
  }>;
};

export function createReqQueryIterationImmovableIssuesHandler(
  client: ReqQueryIterationImmovableIssuesClient
) {
  return async (input: unknown) => {
    const parsed = reqQueryIterationImmovableIssuesInput.parse(input);
    const response = await client.queryIterationImmovableIssues(parsed);
    const result = mapReqIterationImmovableIssues(response.items);
    const text = formatListToolText(result, {
      fields: [
        { label: "number", get: (item) => (item as { number?: string }).number },
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "statusName", get: (item) => (item as { statusName?: string }).statusName }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
