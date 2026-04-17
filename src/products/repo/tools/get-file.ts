import { asItemResult } from "../../../contracts/tool-result.js";
import { repoGetFileInput } from "../schemas.js";

export function mapRepoFile(input: {
  file_path: string;
  branch_name: string;
  content: string;
}) {
  return asItemResult(`Loaded file ${input.file_path}`, {
    path: input.file_path,
    branch: input.branch_name,
    content: input.content
  });
}

type RepoGetFileClient = {
  getFile: (input: { repository_id: string; file_path: string; branch: string }) => Promise<{
    file_path: string;
    branch_name: string;
    content: string;
  }>;
};

export function createRepoGetFileHandler(client: RepoGetFileClient) {
  return async (input: unknown) => {
    const parsed = repoGetFileInput.parse(input);
    const response = await client.getFile(parsed);
    const result = mapRepoFile(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
