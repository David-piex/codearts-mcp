import { artifactListStorageStatisticsInput } from "../schemas.js";
import { formatArtifactRecordListText, mapArtifactRecordList } from "./generic-record-tools.js";

type Client = {
  listStorageStatistics: (input: { tenant_id: string; project_id: string }) => Promise<{
    statistics: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createArtifactListStorageStatisticsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactListStorageStatisticsInput.parse(input);
    const response = await client.listStorageStatistics(parsed);
    const result = mapArtifactRecordList(response.statistics, response.total, "storage statistics", "statistic");

    return {
      content: [{ type: "text" as const, text: formatArtifactRecordListText(result) }],
      structuredContent: result
    };
  };
}
