import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoValidateHttpsInfoResult } from "../client.js";
import { repoValidateHttpsInfoInput } from "../schemas.js";

export function previewValidateHttpsInfo(input: {
  iam_user_uuid: string;
  pwd: string;
  dry_run: boolean;
}) {
  return asItemResult("Dry run: validate HTTPS info", {
    iamUserUuid: input.iam_user_uuid,
    passwordProvided: input.pwd.length > 0,
    executed: !input.dry_run
  });
}

export function mapValidatedHttpsInfo(input: RepoValidateHttpsInfoResult) {
  return asItemResult("Validated HTTPS info", {
    result: input.result,
    status: input.status,
    executed: true
  });
}

type RepoValidateHttpsInfoClient = {
  validateHttpsInfo: (input: {
    iam_user_uuid: string;
    pwd: string;
  }) => Promise<RepoValidateHttpsInfoResult>;
};

export function createRepoValidateHttpsInfoHandler(client: RepoValidateHttpsInfoClient) {
  return async (input: unknown) => {
    const parsed = repoValidateHttpsInfoInput.parse(input);

    if (parsed.dry_run) {
      const result = previewValidateHttpsInfo(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.validateHttpsInfo(request);
    const result = mapValidatedHttpsInfo(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
