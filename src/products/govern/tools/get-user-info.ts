import { asItemResult } from "../../../contracts/tool-result.js";
import { governGetUserInfoInput } from "../schemas.js";

export function mapGovernUserInfo(input: {
  user_id?: string;
  white_list?: boolean;
}) {
  return asItemResult(`Loaded govern user info ${input.user_id ?? "user"}`, {
    id: input.user_id ?? "user",
    whiteList: input.white_list
  });
}

type GovernGetUserInfoClient = {
  getUserInfo: (input: { project_id: string; user_id: string }) => Promise<{
    user_id?: string;
    white_list?: boolean;
  }>;
};

export function createGovernGetUserInfoHandler(client: GovernGetUserInfoClient) {
  return async (input: unknown) => {
    const parsed = governGetUserInfoInput.parse(input);
    const result = mapGovernUserInfo(await client.getUserInfo(parsed));
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}
