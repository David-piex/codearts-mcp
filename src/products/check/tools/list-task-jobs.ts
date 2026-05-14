import { checkListTaskJobsInput } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  listTaskJobs: (input: { task_id: string }) => Promise<{
    jobs: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckListTaskJobsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListTaskJobsInput.parse(input);
    const response = await client.listTaskJobs(parsed);
    const result = mapCheckRecordList(response.jobs, response.total, "task jobs", "job");

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: result
    };
  };
}
