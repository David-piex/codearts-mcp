import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { repoListImpersonationTokensInput } from "../schemas.js";

type ImpersonationToken = {
  id: number | string;
  name?: string;
  revoked?: boolean;
  created_at?: string;
  scopes?: string[];
  active?: boolean;
  expires_at?: string;
  impersonation?: boolean;
  description?: string | null;
};

export function mapImpersonationTokens(
  items: ImpersonationToken[],
  page: number,
  pageSize: number,
  total?: number
) {
  const summary = total !== undefined
    ? `${items.length} impersonation tokens found in this page (total: ${total})`
    : `${items.length} impersonation tokens found`;

  return asListResult(
    summary,
    items.map((item) => ({
      id: String(item.id),
      name: item.name,
      revoked: item.revoked,
      active: item.active,
      scopes: item.scopes,
      createdAt: item.created_at,
      expiresAt: item.expires_at,
      impersonation: item.impersonation,
      description: item.description ?? undefined
    })),
    toPageInfo(page, pageSize, total)
  );
}

type RepoListImpersonationTokensClient = {
  listImpersonationTokens: (input: {
    page: number;
    page_size: number;
    state?: string;
    search?: string;
  }) => Promise<{
    tokens: ImpersonationToken[];
    total?: number;
  }>;
};

export function createRepoListImpersonationTokensHandler(
  client: RepoListImpersonationTokensClient
) {
  return async (input: unknown) => {
    const parsed = repoListImpersonationTokensInput.parse(input);
    const response = await client.listImpersonationTokens(parsed);
    const result = mapImpersonationTokens(response.tokens, parsed.page, parsed.page_size, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => item.id },
        { label: "name", get: (item) => item.name },
        { label: "active", get: (item) => item.active },
        { label: "revoked", get: (item) => item.revoked },
        { label: "expiresAt", get: (item) => item.expiresAt }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
