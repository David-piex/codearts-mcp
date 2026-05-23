import { artifactGetRepositoryUserInfoInput } from "../schemas.js";
import { mapArtifactRecordItem } from "./generic-record-tools.js";

type Client = {
  getRepositoryUserInfo: () => Promise<{
    username?: string;
    raw: unknown;
  }>;
};

export function createArtifactGetRepositoryUserInfoHandler(client: Client) {
  return async (input: unknown) => {
    artifactGetRepositoryUserInfoInput.parse(input);
    const response = await client.getRepositoryUserInfo();
    const result = mapArtifactRecordItem(
      "Loaded Artifact repository user info",
      response.username ?? "repository-user-info",
      "userInfo",
      response.raw,
      { username: response.username }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
