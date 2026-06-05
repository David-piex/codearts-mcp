import type { RepoMergeRequestCandidateUser } from "../client.js";
import { repoListProjectMergeRequestCanBeAssignedUsersInput } from "../schemas.js";
import { mapMergeRequestCandidates } from "./merge-request-read-result.js";

type Client = {
  listProjectMergeRequestCanBeAssignedUsers: (input: {
    project_id: string;
  }) => Promise<{ users: RepoMergeRequestCandidateUser[]; total?: number }>;
};

export function createRepoListProjectMergeRequestCanBeAssignedUsersHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListProjectMergeRequestCanBeAssignedUsersInput.parse(input);
    const response = await client.listProjectMergeRequestCanBeAssignedUsers(parsed);
    const result = mapMergeRequestCandidates(
      `${response.users.length} project merge request assignee candidates found`,
      response.users,
      1,
      response.users.length || 20,
      response.total ?? response.users.length
    );
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

