import { describe, expect, it } from "vitest";
import { createGovernListOsiItemVersionsHandler } from "../../../../src/products/govern/tools/list-osi-item-versions.js";

describe("createGovernListOsiItemVersionsHandler", () => {
  it("maps govern osi item versions into MCP output", async () => {
    const handler = createGovernListOsiItemVersionsHandler({
      listOsiItemVersions: async () => ({
        items: [
          {
            software_code: "728d261152a6102ad4f7a64f11a3d35f",
            software_name: "OpenSSL",
            software_version: "openssl-3.0.19",
            language: "C/C++",
            release_time: "2026-01-27 00:00:00",
            license_list: ["OpenSSL Combined License"],
            level: "L3",
            provider: "openssl",
            scorecard: 6.3,
            criticality: 0.709,
            vuln_amount: 0,
            scm: "https://github.com/openssl/openssl"
          }
        ],
        total: 1
      })
    });

    const result = await handler({
      project_id: "project-1",
      page: 1,
      page_size: 5,
      software_name: "openssl"
    });

    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "728d261152a6102ad4f7a64f11a3d35f",
      name: "OpenSSL",
      version: "openssl-3.0.19"
    });
    expect(result.structuredContent.page_info).toMatchObject({ page: 1, pageSize: 5, total: 1 });
  });
});
