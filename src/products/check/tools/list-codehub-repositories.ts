import { checkListCodehubRepositoriesInput } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  listCodehubRepositories: (input: {
    project_id?: string;
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    repositories: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckListCodehubRepositoriesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListCodehubRepositoriesInput.parse(input);
    const response = await client.listCodehubRepositories(parsed);
    const result = mapCheckRecordList(
      response.repositories,
      response.total,
      "CodeHub repositories",
      "repository"
    );

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: result
    };
  };
}
