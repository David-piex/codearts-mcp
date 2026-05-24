import { asItemResult } from "../../../contracts/tool-result.js";
import { reqApplyJoinProjectForAgcInput } from "../schemas.js";

function redactToken(token: string) {
  return token.length <= 8 ? "***" : `${token.slice(0, 4)}...${token.slice(-4)}`;
}

export function previewApplyJoinProjectForAgc(input: {
  project_id: string;
  domain_id: string;
  user_id: string;
  x_auth_token: string;
  dry_run: boolean;
}) {
  return asItemResult("Dry run: apply to join CodeArts Req project for AGC", {
    projectId: input.project_id,
    domainId: input.domain_id,
    userId: input.user_id,
    xAuthToken: redactToken(input.x_auth_token),
    executed: false
  });
}

export function mapAppliedJoinProjectForAgc(input: {
  project_id: string;
  domain_id: string;
  user_id: string;
  applied: true;
  response: unknown;
}) {
  return asItemResult("Applied to join CodeArts Req project for AGC", {
    projectId: input.project_id,
    domainId: input.domain_id,
    userId: input.user_id,
    executed: true
  }, input.response);
}

type ReqApplyJoinProjectForAgcClient = {
  applyJoinProjectForAgc: (input: {
    project_id: string;
    domain_id: string;
    user_id: string;
    x_auth_token: string;
  }) => Promise<{
    project_id: string;
    domain_id: string;
    user_id: string;
    applied: true;
    response: unknown;
  }>;
};

export function createReqApplyJoinProjectForAgcHandler(client: ReqApplyJoinProjectForAgcClient) {
  return async (input: unknown) => {
    const parsed = reqApplyJoinProjectForAgcInput.parse(input);

    if (parsed.dry_run) {
      const result = previewApplyJoinProjectForAgc(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.applyJoinProjectForAgc(parsed);
    const result = mapAppliedJoinProjectForAgc(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
