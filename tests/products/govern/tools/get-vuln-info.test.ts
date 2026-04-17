import { describe, expect, it } from "vitest";
import { createGovernGetVulnInfoHandler } from "../../../../src/products/govern/tools/get-vuln-info.js";

describe("createGovernGetVulnInfoHandler", () => {
  it("maps vuln info into MCP output", async () => {
    const handler = createGovernGetVulnInfoHandler({
      getVulnInfo: async () => ({
        hw_psirt_id: "xxxx",
        cve_id: "CVE-xxxx-xxxx",
        cvss_ver: "3.1",
        cvss_value: "7.5",
        priority: 1,
        vuln_source: "vuln",
        platform: "vuln"
      })
    });

    const result = await handler({
      project_id: "project-1",
      cve_id: "CVE-xxxx-xxxx"
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "CVE-xxxx-xxxx",
      cvssValue: "7.5"
    });
  });
});
