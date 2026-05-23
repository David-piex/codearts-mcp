import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { checkListSupportedLanguagesInput } from "../schemas.js";

type Client = {
  listSupportedLanguages: () => Promise<{ languages: string[] }>;
};

export function createCheckListSupportedLanguagesHandler(client: Client) {
  return async (input: unknown) => {
    checkListSupportedLanguagesInput.parse(input);
    const response = await client.listSupportedLanguages();
    const result = asListResult(
      `${response.languages.length} supported languages found`,
      response.languages.map((language) => ({
        id: language,
        name: language,
        language
      })),
      toPageInfo(1, response.languages.length || 1, response.languages.length)
    );

    return {
      content: [{
        type: "text" as const,
        text: formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => item.id },
            { label: "name", get: (item) => item.name }
          ]
        })
      }],
      structuredContent: result
    };
  };
}
