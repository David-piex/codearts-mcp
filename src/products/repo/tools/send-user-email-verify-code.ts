import { asItemResult } from "../../../contracts/tool-result.js";
import { repoSendUserEmailVerifyCodeInput } from "../schemas.js";
import {
  mapUserEmailOperationResult,
  previewUserEmailMutation
} from "./user-settings-result.js";

type Client = {
  sendUserEmailVerifyCode: (input: {
    email: string;
  }) => Promise<{
    result?: string;
  }>;
};

export function createRepoSendUserEmailVerifyCodeHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoSendUserEmailVerifyCodeInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(
        "Dry run: send user email verify code",
        previewUserEmailMutation({ email: parsed.email })
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.sendUserEmailVerifyCode(request);
    const result = mapUserEmailOperationResult("Sent user email verify code", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
