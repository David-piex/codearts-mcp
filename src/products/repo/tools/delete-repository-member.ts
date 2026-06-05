import { asItemResult } from "../../../contracts/tool-result.js";
import { repoDeleteRepositoryMemberInput } from "../schemas.js";

export function previewDeleteRepositoryMember(input: {
  repository_uuid: string;
  member_id: string;
  dry_run: boolean;
}) {
  return asItemResult("Dry run: delete repository member", {
    repositoryUuid: input.repository_uuid,
    memberId: input.member_id,
    executed: !input.dry_run
  });
}

export function mapDeletedRepositoryMember(input: {
  repository_uuid: string;
  member_id: string;
  deleted: boolean;
}) {
  return asItemResult("Deleted repository member", {
    repositoryUuid: input.repository_uuid,
    memberId: input.member_id,
    deleted: input.deleted,
    executed: true
  });
}

type RepoDeleteRepositoryMemberClient = {
  deleteRepositoryMember: (input: {
    repository_uuid: string;
    member_id: string;
  }) => Promise<{
    repository_uuid: string;
    member_id: string;
    deleted: boolean;
  }>;
};

export function createRepoDeleteRepositoryMemberHandler(client: RepoDeleteRepositoryMemberClient) {
  return async (input: unknown) => {
    const parsed = repoDeleteRepositoryMemberInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteRepositoryMember(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.deleteRepositoryMember(request);
    const result = mapDeletedRepositoryMember(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
