import { artifactListSecGuardTasksInput } from "../schemas.js";
import { formatArtifactRecordListText, mapArtifactRecordList } from "./generic-record-tools.js";

type Client = {
  listSecGuardTasks: (input: {
    date?: string;
    page: number;
    page_size: number;
  }) => Promise<{
    tasks: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createArtifactListSecGuardTasksHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactListSecGuardTasksInput.parse(input);
    const response = await client.listSecGuardTasks(parsed);
    const result = mapArtifactRecordList(response.tasks, response.total, "security guard tasks", "task");

    return {
      content: [{ type: "text" as const, text: formatArtifactRecordListText(result) }],
      structuredContent: result
    };
  };
}
