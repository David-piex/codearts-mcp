import { repoShowUserEmailsInput } from "../schemas.js";
import { mapUserEmailsResult } from "./user-settings-result.js";

type Client = {
  showUserEmails: () => Promise<{
    emails: Array<{
      id?: number | string;
      email?: string;
      commit_email?: string;
      is_primary?: boolean;
      primary?: boolean;
      confirmed_at?: string;
      status?: string;
    }>;
    total?: number;
  }>;
};

export function createRepoShowUserEmailsHandler(client: Client) {
  return async (input: unknown) => {
    repoShowUserEmailsInput.parse(input);
    const response = await client.showUserEmails();
    const result = mapUserEmailsResult(
      response.total !== undefined
        ? `${response.emails.length} user email record(s) found (total: ${response.total})`
        : `${response.emails.length} user email record(s) found`,
      response.emails
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
