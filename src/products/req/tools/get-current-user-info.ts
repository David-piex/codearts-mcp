import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetCurrentUserInfoInput } from "../schemas.js";

type ReqCurrentUserInfo = {
  domain_id?: string;
  domain_name?: string;
  user_num_id?: number;
  user_id?: string;
  user_name?: string;
  nick_name?: string;
  created_time?: number;
  updated_time?: number;
  gender?: string;
  user_type?: string;
};

export function mapReqCurrentUserInfo(input: ReqCurrentUserInfo) {
  return asItemResult("Loaded current CodeArts Req user info", {
    domainId: input.domain_id,
    domainName: input.domain_name,
    userNumId: input.user_num_id,
    userId: input.user_id,
    userName: input.user_name,
    nickName: input.nick_name,
    createdTime: input.created_time,
    updatedTime: input.updated_time,
    gender: input.gender,
    userType: input.user_type
  });
}

type ReqGetCurrentUserInfoClient = {
  getCurrentUserInfo: (input: {}) => Promise<ReqCurrentUserInfo>;
};

export function createReqGetCurrentUserInfoHandler(client: ReqGetCurrentUserInfoClient) {
  return async (input: unknown) => {
    const parsed = reqGetCurrentUserInfoInput.parse(input);
    const response = await client.getCurrentUserInfo(parsed);
    const result = mapReqCurrentUserInfo(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
