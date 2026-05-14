import { testPlanListApiTestAwNameViewsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listApiTestAwNameViews: (input: {
    project_id: string;
  }) => Promise<{ views: Array<Record<string, unknown>>; total?: number }>;
};

export function createTestPlanListApiTestAwNameViewsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListApiTestAwNameViewsInput.parse(input);
    const response = await client.listApiTestAwNameViews(parsed);
    const result = mapTestPlanRecordList(
      response.views,
      response.total,
      "API test AW name view settings",
      "view"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
