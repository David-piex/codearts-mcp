import { checkListTaskLastJobsInput } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  listTaskLastJobs: (input: { task_id: string }) => Promise<{
    jobs: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckListTaskLastJobsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListTaskLastJobsInput.parse(input);
    const response = await client.listTaskLastJobs(parsed);
    const result = mapCheckRecordList(response.jobs, response.total, "task last jobs", "job");

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: result
    };
  };
}
