import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetProjectDueDaysAfterInput } from "../schemas.js";

type ReqProjectDueDaysAfter = {
  project_id: string;
  date_after?: number;
};

export function mapReqProjectDueDaysAfter(input: ReqProjectDueDaysAfter) {
  return asItemResult(`Loaded project due-days-after config for ${input.project_id}`, {
    projectId: input.project_id,
    dateAfter: input.date_after
  });
}

type ReqGetProjectDueDaysAfterClient = {
  getProjectDueDaysAfter: (input: { project_id: string }) => Promise<ReqProjectDueDaysAfter>;
};

export function createReqGetProjectDueDaysAfterHandler(client: ReqGetProjectDueDaysAfterClient) {
  return async (input: unknown) => {
    const parsed = reqGetProjectDueDaysAfterInput.parse(input);
    const response = await client.getProjectDueDaysAfter(parsed);
    const result = mapReqProjectDueDaysAfter(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
