import { asItemResult } from "../../../contracts/tool-result.js";
import { governGetVulnInfoInput } from "../schemas.js";

export function mapGovernVulnInfo(input: {
  cve_id?: string;
  hw_psirt_id?: string;
  cvss_ver?: string;
  cvss_value?: string;
  priority?: number;
  vuln_source?: string;
  platform?: string;
}) {
  return asItemResult(`Loaded govern vuln info ${input.cve_id ?? "vuln"}`, {
    id: input.cve_id ?? "vuln",
    hwPsirtId: input.hw_psirt_id,
    cvssVersion: input.cvss_ver,
    cvssValue: input.cvss_value,
    priority: input.priority,
    source: input.vuln_source,
    platform: input.platform
  });
}

type GovernGetVulnInfoClient = {
  getVulnInfo: (input: { project_id: string; cve_id: string }) => Promise<{
    cve_id?: string;
    hw_psirt_id?: string;
    cvss_ver?: string;
    cvss_value?: string;
    priority?: number;
    vuln_source?: string;
    platform?: string;
  }>;
};

export function createGovernGetVulnInfoHandler(client: GovernGetVulnInfoClient) {
  return async (input: unknown) => {
    const parsed = governGetVulnInfoInput.parse(input);
    const result = mapGovernVulnInfo(await client.getVulnInfo(parsed));
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}
