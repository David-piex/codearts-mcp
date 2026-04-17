import { describe, expect, it } from "vitest";
import { createGovernListSbcVulnMapHandler } from "../../../../src/products/govern/tools/list-sbc-vuln-map.js";

describe("createGovernListSbcVulnMapHandler", () => {
  it("maps vuln map items into MCP output", async () => {
    const handler = createGovernListSbcVulnMapHandler({
      listSbcVulnMap: async () => [
        {
          name: "openEuler:vim",
          version: "vim-9.0-1.oe2203",
          cve_id: "CVE-2023-4751",
          is_affected: "W",
          update_time: "2023-09-04 16:05:07"
        }
      ]
    });

    const result = await handler({
      project_id: "project-1",
      start_time: "2023-09-04 16:00:00",
      end_time: "2023-09-05 00:00:00"
    });

    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "CVE-2023-4751",
      name: "openEuler:vim"
    });
  });
});
