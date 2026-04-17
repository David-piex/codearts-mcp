import { asItemResult } from "../../../contracts/tool-result.js";
import { buildGetRecordScriptInput } from "../schemas.js";

export function mapBuildRecordScript(input: {
  record_id: string;
  script?: string;
  status?: string;
}) {
  return asItemResult(`Loaded build record script ${input.record_id}`, {
    id: input.record_id,
    script: input.script,
    status: input.status
  });
}

type BuildGetRecordScriptClient = {
  getRecordScript: (input: { record_id: string }) => Promise<{
    record_id: string;
    script?: string;
    status?: string;
  }>;
};

export function createBuildGetRecordScriptHandler(client: BuildGetRecordScriptClient) {
  return async (input: unknown) => {
    const parsed = buildGetRecordScriptInput.parse(input);
    const response = await client.getRecordScript(parsed);
    const result = mapBuildRecordScript(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
