import { artifactListAttentionsInput } from "../schemas.js";
import { formatArtifactRecordListText, mapArtifactRecordList } from "./generic-record-tools.js";

type Client = {
  listAttentions: (input: {
    project_id?: string;
    page: number;
    page_size: number;
  }) => Promise<{
    attentions: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createArtifactListAttentionsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactListAttentionsInput.parse(input);
    const response = await client.listAttentions(parsed);
    const result = mapArtifactRecordList(response.attentions, response.total, "attentions", "attention");

    return {
      content: [{ type: "text" as const, text: formatArtifactRecordListText(result) }],
      structuredContent: result
    };
  };
}
