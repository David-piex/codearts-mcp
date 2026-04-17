import { asListResult } from "../../../contracts/tool-result.js";
import { governListOsiItemDependencyInput } from "../schemas.js";

export function mapGovernOsiItemDependency(
  items: Array<{
    software_name?: string;
    software_version?: string;
    provider?: string;
    language?: string;
    relation?: string;
  }>
) {
  return asListResult(
    `${items.length} govern osi item dependency entries found`,
    items.map((item) => ({
      id: `${item.software_name ?? ""}@${item.software_version ?? ""}`,
      softwareName: item.software_name,
      softwareVersion: item.software_version,
      provider: item.provider,
      language: item.language,
      relation: item.relation
    }))
  );
}

type GovernListOsiItemDependencyClient = {
  listOsiItemDependency: (input: {
    project_id: string;
    software_name?: string;
    software_version?: string;
    artifact_id?: string;
  }) => Promise<{
    items: Array<{
      software_name?: string;
      software_version?: string;
      provider?: string;
      language?: string;
      relation?: string;
    }>;
  }>;
};

export function createGovernListOsiItemDependencyHandler(
  client: GovernListOsiItemDependencyClient
) {
  return async (input: unknown) => {
    const parsed = governListOsiItemDependencyInput.parse(input);
    const response = await client.listOsiItemDependency(parsed);
    const result = mapGovernOsiItemDependency(response.items);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
