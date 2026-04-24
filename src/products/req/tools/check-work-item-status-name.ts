import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCheckWorkItemStatusNameInput } from "../schemas.js";

export function mapCheckedWorkItemStatusName(input: {
  project_id: string;
  status_name: string;
  exist: boolean;
}) {
  return asItemResult(
    input.exist
      ? `Work item status name ${input.status_name} already exists`
      : `Work item status name ${input.status_name} is available`,
    {
      projectId: input.project_id,
      statusName: input.status_name,
      exists: input.exist,
      available: !input.exist
    }
  );
}

type ReqCheckWorkItemStatusNameClient = {
  checkWorkItemStatusName: (input: {
    project_id: string;
    status_name: string;
  }) => Promise<{
    exist: boolean;
  }>;
};

export function createReqCheckWorkItemStatusNameHandler(
  client: ReqCheckWorkItemStatusNameClient
) {
  return async (input: unknown) => {
    const parsed = reqCheckWorkItemStatusNameInput.parse(input);
    const response = await client.checkWorkItemStatusName(parsed);
    const result = mapCheckedWorkItemStatusName({
      project_id: parsed.project_id,
      status_name: parsed.status_name,
      exist: response.exist
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
