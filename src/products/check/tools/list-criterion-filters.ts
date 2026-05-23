import { checkListCriterionFiltersInput } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  listCriterionFilters: (input: {
    project_id: string;
    language: string;
    checker_name?: string;
    key?: string;
    operator: string;
  }) => Promise<{
    filters: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckListCriterionFiltersHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListCriterionFiltersInput.parse(input);
    const response = await client.listCriterionFilters(parsed);
    const result = mapCheckRecordList(
      response.filters,
      response.total,
      "criterion filters",
      "filter"
    );

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: result
    };
  };
}
