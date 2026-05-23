import { artifactSearchByChecksumInput } from "../schemas.js";
import { formatArtifactRecordListText, mapArtifactRecordList } from "./generic-record-tools.js";

type Client = {
  searchByChecksum: (input: {
    checksum: string;
    page: number;
    page_size: number;
    format?: string;
    in_project?: boolean;
    project_id?: string;
  }) => Promise<{
    artifacts: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createArtifactSearchByChecksumHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactSearchByChecksumInput.parse(input);
    const response = await client.searchByChecksum(parsed);
    const result = mapArtifactRecordList(response.artifacts, response.total, "checksum artifacts", "artifact");

    return {
      content: [{ type: "text" as const, text: formatArtifactRecordListText(result) }],
      structuredContent: result
    };
  };
}
