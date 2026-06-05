import { asItemResult } from "../../../contracts/tool-result.js";
import { repoStartHouseKeepingInput } from "../schemas.js";
import { previewRepositorySimpleMutation } from "./repository-settings-result.js";

type RepoStartHouseKeepingClient = {
  startHouseKeeping: (input: {
    repository_id: string;
  }) => Promise<{
    repository_id: string;
    started: boolean;
  }>;
};

export function createRepoStartHouseKeepingHandler(client: RepoStartHouseKeepingClient) {
  return async (input: unknown) => {
    const parsed = repoStartHouseKeepingInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRepositorySimpleMutation("Dry run: start repository house keeping", {
        repositoryId: parsed.repository_id,
        started: true
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.startHouseKeeping(parsed);
    const result = asItemResult("Started repository house keeping", {
      repositoryId: response.repository_id,
      started: response.started,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
