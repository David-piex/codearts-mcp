import { asItemResult } from "../../../contracts/tool-result.js";
import { repoStartRemoteMirrorSynchronizationInput } from "../schemas.js";

export function previewStartRemoteMirrorSynchronization(input: {
  x_auth_token?: string;
  repository_id: string;
  username?: string;
  password?: string;
  endpoint_uuid?: string;
  force_fetch?: boolean;
  dry_run: boolean;
}) {
  return asItemResult("Dry run: start remote mirror synchronization", {
    repositoryId: input.repository_id,
    tokenProvided: Boolean(input.x_auth_token),
    usernameProvided: input.username !== undefined,
    passwordProvided: input.password !== undefined,
    endpointUuid: input.endpoint_uuid,
    forceFetch: input.force_fetch,
    executed: !input.dry_run
  });
}

type RepoStartRemoteMirrorSynchronizationClient = {
  startRemoteMirrorSynchronization: (input: {
    x_auth_token: string;
    repository_id: string;
    username?: string;
    password?: string;
    endpoint_uuid?: string;
    force_fetch?: boolean;
  }) => Promise<{ jid: string }>;
};

export function createRepoStartRemoteMirrorSynchronizationHandler(
  client: RepoStartRemoteMirrorSynchronizationClient
) {
  return async (input: unknown) => {
    const parsed = repoStartRemoteMirrorSynchronizationInput.parse(input);

    if (parsed.dry_run) {
      const result = previewStartRemoteMirrorSynchronization(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.startRemoteMirrorSynchronization(parsed);
    const result = asItemResult("Started remote mirror synchronization", {
      id: response.jid,
      jid: response.jid,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
