import { asListResult } from "../../../contracts/tool-result.js";
import { governListOsiItemVulnsInput } from "../schemas.js";

export function mapGovernOsiItemVulns(
  items: Array<{
    cve_id?: string;
    severity?: string;
    cvss_score?: string;
    publish_time?: string;
  }>
) {
  return asListResult(
    `${items.length} govern osi item vulns found`,
    items.map((item) => ({
      id: item.cve_id ?? "vuln",
      cveId: item.cve_id,
      severity: item.severity,
      cvssScore: item.cvss_score,
      publishTime: item.publish_time
    }))
  );
}

type GovernListOsiItemVulnsClient = {
  listOsiItemVulns: (input: {
    project_id: string;
    software_name?: string;
    software_version?: string;
    artifact_id?: string;
  }) => Promise<{
    items: Array<{
      cve_id?: string;
      severity?: string;
      cvss_score?: string;
      publish_time?: string;
    }>;
  }>;
};

export function createGovernListOsiItemVulnsHandler(client: GovernListOsiItemVulnsClient) {
  return async (input: unknown) => {
    const parsed = governListOsiItemVulnsInput.parse(input);
    const response = await client.listOsiItemVulns(parsed);
    const result = mapGovernOsiItemVulns(response.items);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
