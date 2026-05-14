import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListApiTestBasicAwParamPropertiesInput } from "../schemas.js";

type Client = {
  listApiTestBasicAwParamProperties: (input: {
    project_id: string;
    aw_id: string;
  }) => Promise<{ properties: string[]; total?: number }>;
};

export function createTestPlanListApiTestBasicAwParamPropertiesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListApiTestBasicAwParamPropertiesInput.parse(input);
    const response = await client.listApiTestBasicAwParamProperties(parsed);
    const items = response.properties.map((name) => ({
      id: name,
      name,
      property: name
    }));
    const result = asListResult(
      `${items.length} API test basic AW parameter properties found`,
      items,
      toPageInfo(1, Math.max(items.length, 1), response.total)
    );

    return {
      content: [
        {
          type: "text" as const,
          text: formatListToolText(result, {
            fields: [
              {
                label: "name",
                get: (item) => item.name
              }
            ]
          })
        }
      ],
      structuredContent: result
    };
  };
}
