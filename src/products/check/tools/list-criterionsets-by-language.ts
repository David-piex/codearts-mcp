import { checkListCriterionsetsByLanguageInput } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  listCriterionsetsByLanguage: (input: {
    project_id: string;
    language: string;
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    criterionsets: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckListCriterionsetsByLanguageHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListCriterionsetsByLanguageInput.parse(input);
    const response = await client.listCriterionsetsByLanguage(parsed);
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
