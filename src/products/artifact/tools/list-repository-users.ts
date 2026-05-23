import { artifactListRepositoryUsersInput } from "../schemas.js";
import { formatArtifactRecordListText, mapArtifactRecordList } from "./generic-record-tools.js";

type Client = {
  listRepositoryUsers: (input: {
    page: number;
    page_size: number;
    user_name?: string;
  }) => Promise<{
    users: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createArtifactListRepositoryUsersHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactListRepositoryUsersInput.parse(input);
    const response = await client.listRepositoryUsers(parsed);
    const result = mapArtifactRecordList(response.users, response.total, "repository users", "user");

    return {
      content: [{ type: "text" as const, text: formatArtifactRecordListText(result) }],
      structuredContent: result
    };
  };
}
