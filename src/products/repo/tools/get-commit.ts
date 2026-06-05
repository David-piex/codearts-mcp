import { asItemResult } from "../../../contracts/tool-result.js";
import { repoGetCommitInput } from "../schemas.js";

export function mapRepoCommit(input: {
  id: string;
  short_id?: string;
  title?: string;
  author_name?: string;
  message?: string;
  parent_ids?: string[];
  authored_date?: string;
  author_email?: string | null;
  committed_date?: string;
  committer_name?: string;
  committer_email?: string | null;
  open_gpg_verified?: boolean;
  verification_status?: string | number;
  gpg_primary_key_id?: string;
  name?: string;
  gpg_nick_name?: string | null;
  gpg_tenant_name?: string | null;
  gpg_user_name?: string | null;
  created_at?: string;
  author_avatar_url?: string | null;
  committer_avatar_url?: string | null;
  nick_name?: string | null;
  tenant_name?: string | null;
  user_name?: string | null;
  author_id?: string | number;
  stats?: {
    additions?: number;
    deletions?: number;
    total?: number;
  };
  state?: string;
  cherry_pick_branch_name?: string;
  revert_branch_name?: string;
  iid?: string | number;
}) {
  return asItemResult(`Loaded commit ${input.id}`, {
    id: input.id,
    shortId: input.short_id,
    title: input.title,
    authorName: input.author_name,
    message: input.message,
    parentIds: input.parent_ids ?? [],
    authoredDate: input.authored_date,
    authorEmail: input.author_email,
    committedDate: input.committed_date,
    committerName: input.committer_name,
    committerEmail: input.committer_email,
    openGpgVerified: input.open_gpg_verified,
    verificationStatus: input.verification_status,
    gpgPrimaryKeyId: input.gpg_primary_key_id,
    name: input.name,
    gpgNickName: input.gpg_nick_name,
    gpgTenantName: input.gpg_tenant_name,
    gpgUserName: input.gpg_user_name,
    createdAt: input.created_at,
    authorAvatarUrl: input.author_avatar_url,
    committerAvatarUrl: input.committer_avatar_url,
    nickName: input.nick_name,
    tenantName: input.tenant_name,
    userName: input.user_name,
    authorId: input.author_id !== undefined ? String(input.author_id) : undefined,
    stats: input.stats,
    state: input.state,
    cherryPickBranchName: input.cherry_pick_branch_name,
    revertBranchName: input.revert_branch_name,
    iid: input.iid !== undefined ? String(input.iid) : undefined
  });
}

type RepoGetCommitClient = {
  getCommit: (input: { repository_id: string; commit_sha: string }) => Promise<{
    id: string;
    short_id?: string;
    title?: string;
    author_name?: string;
    message?: string;
    parent_ids?: string[];
    authored_date?: string;
    author_email?: string | null;
    committed_date?: string;
    committer_name?: string;
    committer_email?: string | null;
    open_gpg_verified?: boolean;
    verification_status?: string | number;
    gpg_primary_key_id?: string;
    name?: string;
    gpg_nick_name?: string | null;
    gpg_tenant_name?: string | null;
    gpg_user_name?: string | null;
    created_at?: string;
    author_avatar_url?: string | null;
    committer_avatar_url?: string | null;
    nick_name?: string | null;
    tenant_name?: string | null;
    user_name?: string | null;
    author_id?: string | number;
    stats?: {
      additions?: number;
      deletions?: number;
      total?: number;
    };
    state?: string;
    cherry_pick_branch_name?: string;
    revert_branch_name?: string;
    iid?: string | number;
  }>;
};

export function createRepoGetCommitHandler(client: RepoGetCommitClient) {
  return async (input: unknown) => {
    const parsed = repoGetCommitInput.parse(input);
    const response = await client.getCommit(parsed);
    const result = mapRepoCommit(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
