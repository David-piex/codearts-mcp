import { asItemResult } from "../../../contracts/tool-result.js";
import { repoUpdateUserEmailsInput } from "../schemas.js";
import {
  mapUserEmailOperationResult,
  previewUserEmailMutation
} from "./user-settings-result.js";

type Client = {
  updateUserEmails: (input: {
    email: string;
    verify_code: string;
  }) => Promise<{
    result?: string;
  }>;
};

export function createRepoUpdateUserEmailsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoUpdateUserEmailsInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(
        "Dry run: update user emails",
        previewUserEmailMutation({
          email: parsed.email,
          verifyCode: parsed.verify_code
        })
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.updateUserEmails(request);
    const result = mapUserEmailOperationResult("Updated user emails", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
