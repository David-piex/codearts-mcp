import type { RepoGroupPermissionResourcesResponse } from "../client.js";
import { repoListGroupPermissionResourcesInput } from "../schemas.js";
import { mapGroupPermissionResources } from "./user-settings-result.js";

type Client = {
  listGroupPermissionResources: (input: {
    scope?: "group" | "project" | "all";
  }) => Promise<RepoGroupPermissionResourcesResponse>;
};

export function createRepoListGroupPermissionResourcesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListGroupPermissionResourcesInput.parse(input);
    const response = await client.listGroupPermissionResources(parsed);
    const result = mapGroupPermissionResources(
      `${response.resources?.length ?? 0} group permission resources found`,
      response
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
