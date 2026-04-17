import { describe, expect, it } from "vitest";
import { createGovernListOsiItemVulnsHandler } from "../../../../src/products/govern/tools/list-osi-item-vulns.js";

describe("createGovernListOsiItemVulnsHandler", () => {
  it("maps govern osi item vulns into MCP output", async () => {
    const handler = createGovernListOsiItemVulnsHandler({
      listOsiItemVulns: async () => ({
        items: [
          {
            cve_id: "CVE-2026-0001",
            severity: "high",
            cvss_score: "7.5",
            publish_time: "2026-01-01"
          }
        ]
      })
    });

    const result = await handler({
      project_id: "project-1",
      software_name: "openssl",
      software_version: "openssl-3.0.19"
    });

    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "CVE-2026-0001",
      severity: "high",
      cvssScore: "7.5"
    });
  });

  it("rejects artifact_id-only input until group_id shape is confirmed", async () => {
    const handler = createGovernListOsiItemVulnsHandler({
      listOsiItemVulns: async () => {
        throw new Error("should not execute");
      }
    });

    await expect(
      handler({
        project_id: "project-1",
        artifact_id: "728d261152a6102ad4f7a64f11a3d35f"
      })
    ).rejects.toThrow(/software_name and software_version are required/i);
  });
});
