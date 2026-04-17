import { describe, expect, it } from "vitest";
import { createInspectorListDomainsHandler } from "../../../../src/products/inspector/tools/list-domains.js";

describe("createInspectorListDomainsHandler", () => {
  it("maps inspector domains into MCP output", async () => {
    const handler = createInspectorListDomainsHandler({
      listDomains: async () => ({
        total: 1,
        domains: [
          {
            domain_id: "domain-1",
            domain_name: "https://example.com",
            auth_status: "auth",
            high: 1,
            middle: 2,
            low: 3,
            hint: 4
          }
        ]
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "domain-1",
      authStatus: "auth"
    });
  });
});
