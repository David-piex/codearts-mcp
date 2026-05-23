import { checkListCriterionsInput } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  listCriterions: (input: {
    page: number;
    page_size: number;
    languages?: string;
    search?: string;
  }) => Promise<{
    criterions: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckListCriterionsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListCriterionsInput.parse(input);
    const response = await client.listCriterions(parsed);
    const result = mapCheckRecordList(
      response.criterions,
      response.total,
      "criterions",
      "criterion"
    );

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: result
    };
  };
}
