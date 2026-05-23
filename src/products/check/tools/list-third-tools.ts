import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { checkListThirdToolsInput } from "../schemas.js";

type Client = {
  listThirdTools: (input: { rule_type: 0 | 1 | 3; language?: string }) => Promise<{
    tools: string[];
  }>;
};

export function createCheckListThirdToolsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListThirdToolsInput.parse(input);
    const response = await client.listThirdTools(parsed);
    const result = asListResult(
      `${response.tools.length} third tools found`,
      response.tools.map((tool) => ({
        id: tool,
        name: tool,
        tool
      })),
      toPageInfo(1, response.tools.length || 1, response.tools.length)
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
