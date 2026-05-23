import { checkListTemplateTasksInput } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  listTemplateTasks: (input: {
    project_id?: string;
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    tasks: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckListTemplateTasksHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListTemplateTasksInput.parse(input);
    const response = await client.listTemplateTasks(parsed);
    const result = mapCheckRecordList(
      response.tasks,
      response.total,
      "template tasks",
      "templateTask"
    );

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: result
    };
  };
}
