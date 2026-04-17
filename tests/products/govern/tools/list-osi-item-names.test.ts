import { describe, expect, it } from "vitest";
import { createGovernListOsiItemNamesHandler } from "../../../../src/products/govern/tools/list-osi-item-names.js";

describe("createGovernListOsiItemNamesHandler", () => {
  it("maps govern osi item names into MCP output", async () => {
    const handler = createGovernListOsiItemNamesHandler({
      listOsiItemNames: async () => ({
        items: [
          {
            software_name: "OpenSSL",
            language: "C/C++",
            description: "TLS/SSL and crypto library",
            version_count: 4,
            provider: "openssl"
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
      id: "OpenSSL",
      name: "OpenSSL",
      versionCount: 4
    });
    expect(result.structuredContent.page_info).toMatchObject({ page: 1, pageSize: 5, total: 1 });
  });
});
