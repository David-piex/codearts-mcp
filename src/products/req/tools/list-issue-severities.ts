import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqListIssueSeveritiesInput } from "../schemas.js";

type ReqIssueSeverity = {
  id?: number;
  name?: string;
};

type ReqListIssueSeveritiesClient = {
  listIssueSeverities: (input: {}) => Promise<{
    severities: ReqIssueSeverity[];
  }>;
};

export function createReqListIssueSeveritiesHandler(client: ReqListIssueSeveritiesClient) {
  return async (input: unknown) => {
    reqListIssueSeveritiesInput.parse(input);
    const response = await client.listIssueSeverities({});
    const result = asListResult(
      `${response.severities.length} issue severities found`,
      response.severities.map((item) => ({
        id: item.id,
        name: item.name
      })),
      undefined,
      response
    );

    return {
      content: [
        {
          type: "text" as const,
          text: formatListToolText(result, {
            fields: [
              { label: "id", get: (item) => (item as { id?: number }).id },
              { label: "name", get: (item) => (item as { name?: string }).name }
            ]
          })
        }
      ],
      structuredContent: result
    };
  };
}
