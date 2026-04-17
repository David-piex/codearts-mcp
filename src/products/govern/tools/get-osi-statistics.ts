import { asItemResult } from "../../../contracts/tool-result.js";
import { governGetOsiStatisticsInput } from "../schemas.js";

export function mapGovernOsiStatistics(input: {
  total?: {
    software?: number;
  };
}) {
  return asItemResult("Loaded govern osi statistics", {
    id: "osi-statistics",
    totalSoftware: input.total?.software
  });
}

type GovernGetOsiStatisticsClient = {
  getOsiStatistics: (input: { project_id: string }) => Promise<{
    total?: {
      software?: number;
    };
  }>;
};

export function createGovernGetOsiStatisticsHandler(client: GovernGetOsiStatisticsClient) {
  return async (input: unknown) => {
    const parsed = governGetOsiStatisticsInput.parse(input);
    const response = await client.getOsiStatistics(parsed);
    const result = mapGovernOsiStatistics(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
