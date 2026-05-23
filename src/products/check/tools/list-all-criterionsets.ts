import { checkListAllCriterionsetsInput } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  listAllCriterionsets: (input: {
    page: number;
    page_size: number;
    languages?: string;
    search?: string;
    my_create?: boolean;
    project_id?: string;
    is_call_status?: boolean;
    sort_field?: string;
    sort_order?: "up" | "down";
    operator?: string;
  }) => Promise<{
    criterionsets: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckListAllCriterionsetsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListAllCriterionsetsInput.parse(input);
    const response = await client.listAllCriterionsets(parsed);
    const result = mapCheckRecordList(
      response.criterionsets,
      response.total,
      "criterionsets",
      "criterionset"
    );

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: result
    };
  };
}
