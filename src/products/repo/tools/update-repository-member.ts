import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoUpdateRepositoryMemberResult } from "../client.js";
import { repoUpdateRepositoryMemberInput } from "../schemas.js";

export function previewUpdateRepositoryMember(input: {
  x_auth_token: string;
  repository_uuid: string;
  member_id: string;
  role: 20 | 30 | 40;
  dry_run: boolean;
}) {
  return asItemResult("Dry run: update repository member", {
    repositoryUuid: input.repository_uuid,
    memberId: input.member_id,
    role: input.role,
    tokenProvided: input.x_auth_token.length > 0,
    executed: !input.dry_run
  });
}

export function mapUpdatedRepositoryMember(input: RepoUpdateRepositoryMemberResult) {
  return asItemResult("Updated repository member", {
    repositoryUuid: input.repository_uuid,
    memberId: input.member_id,
    role: input.role,
    status: input.status,
    result: input.result,
    executed: true
  });
}

type RepoUpdateRepositoryMemberClient = {
  updateRepositoryMember: (input: {
    x_auth_token: string;
    repository_uuid: string;
    member_id: string;
    role: 20 | 30 | 40;
  }) => Promise<RepoUpdateRepositoryMemberResult>;
};

export function createRepoUpdateRepositoryMemberHandler(client: RepoUpdateRepositoryMemberClient) {
  return async (input: unknown) => {
    const parsed = repoUpdateRepositoryMemberInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateRepositoryMember(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.updateRepositoryMember(request);
    const result = mapUpdatedRepositoryMember(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
