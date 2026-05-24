import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUpdateCurrentUserNicknameInput } from "../schemas.js";

export function previewUpdateCurrentUserNickname(input: {
  nick_name: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update current Req user nickname to ${input.nick_name}`, {
    nickName: input.nick_name,
    executed: false
  });
}

export function mapUpdatedCurrentUserNickname(input: {
  nick_name: string;
  updated: true;
  response: unknown;
}) {
  return asItemResult(`Updated current Req user nickname to ${input.nick_name}`, {
    nickName: input.nick_name,
    executed: true
  }, input.response);
}

type ReqUpdateCurrentUserNicknameClient = {
  updateCurrentUserNickname: (input: {
    nick_name: string;
    x_auth_token: string;
  }) => Promise<{
    nick_name: string;
    updated: true;
    response: unknown;
  }>;
};

export function createReqUpdateCurrentUserNicknameHandler(client: ReqUpdateCurrentUserNicknameClient) {
  return async (input: unknown) => {
    const parsed = reqUpdateCurrentUserNicknameInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateCurrentUserNickname(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateCurrentUserNickname(parsed);
    const result = mapUpdatedCurrentUserNickname(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
