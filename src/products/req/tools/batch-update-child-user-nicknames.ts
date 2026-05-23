import { asItemResult } from "../../../contracts/tool-result.js";
import { reqBatchUpdateChildUserNicknamesInput } from "../schemas.js";

type ChildUserNicknameUpdate = {
  user_id: string;
  nick_name: string;
};

export function previewBatchUpdateChildUserNicknames(input: {
  users: ChildUserNicknameUpdate[];
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update ${input.users.length} child user nicknames`, {
    users: input.users,
    updatedCount: 0,
    executed: false
  });
}

export function mapBatchUpdatedChildUserNicknames(input: {
  users: ChildUserNicknameUpdate[];
  updatedCount?: number;
}) {
  return asItemResult(`Updated ${input.updatedCount ?? input.users.length} child user nicknames`, {
    users: input.users,
    updatedCount: input.updatedCount ?? input.users.length,
    executed: true
  });
}

type ReqBatchUpdateChildUserNicknamesClient = {
  batchUpdateChildUserNicknames: (input: { users: ChildUserNicknameUpdate[] }) => Promise<{
    users: ChildUserNicknameUpdate[];
    updatedCount?: number;
  }>;
};

export function createReqBatchUpdateChildUserNicknamesHandler(
  client: ReqBatchUpdateChildUserNicknamesClient
) {
  return async (input: unknown) => {
    const parsed = reqBatchUpdateChildUserNicknamesInput.parse(input);

    if (parsed.dry_run) {
      const result = previewBatchUpdateChildUserNicknames(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchUpdateChildUserNicknames(parsed);
    const result = mapBatchUpdatedChildUserNicknames(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
