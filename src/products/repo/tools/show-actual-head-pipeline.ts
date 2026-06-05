import type { RepoActualHeadPipeline } from "../client.js";
import { repoShowActualHeadPipelineInput } from "../schemas.js";
import { mapActualHeadPipeline } from "./merge-request-read-result.js";

type RepoShowActualHeadPipelineClient = {
  showActualHeadPipeline: (input: {
    repository_id: string;
    merge_request_iid: string;
  }) => Promise<RepoActualHeadPipeline>;
};

export function createRepoShowActualHeadPipelineHandler(client: RepoShowActualHeadPipelineClient) {
  return async (input: unknown) => {
    const parsed = repoShowActualHeadPipelineInput.parse(input);
    const response = await client.showActualHeadPipeline(parsed);
    const result = mapActualHeadPipeline(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
