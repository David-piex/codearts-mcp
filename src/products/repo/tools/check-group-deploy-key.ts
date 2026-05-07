import { repoCheckGroupDeployKeyInput } from "../schemas.js";
import {
  mapGroupDeployKeyCheck,
  previewCheckGroupDeployKey
} from "./check-repository-deploy-key.js";

type RepoCheckGroupDeployKeyClient = {
  checkGroupDeployKey: (input: {
    group_id: string;
    key: string;
  }) => Promise<{
    exists: boolean;
  }>;
};

export function createRepoCheckGroupDeployKeyHandler(client: RepoCheckGroupDeployKeyClient) {
  return async (input: unknown) => {
    const parsed = repoCheckGroupDeployKeyInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCheckGroupDeployKey(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.checkGroupDeployKey(parsed);
    const result = mapGroupDeployKeyCheck({ ...parsed, exists: response.exists });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
