import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type { RepoUserSshKey } from "../client.js";
import { repoListUserSshKeysInput } from "../schemas.js";

type Client = {
  listUserSshKeys: (input: {
    page: number;
    page_size: number;
    query?: string;
  }) => Promise<{
    keys: RepoUserSshKey[];
    total?: number;
  }>;
};

export function createRepoListUserSshKeysHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListUserSshKeysInput.parse(input);
    const response = await client.listUserSshKeys(parsed);
    const result = asListResult(
      `${response.keys.length} user SSH keys found`,
      response.keys.map((item) => ({
        id: item.id !== undefined ? String(item.id) : undefined,
        title: item.title,
        key: item.key,
        createdAt: item.created_at
      })),
      toPageInfo(parsed.page, parsed.page_size, response.total)
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
