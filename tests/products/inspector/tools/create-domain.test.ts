import { describe, expect, it } from "vitest";
import { createInspectorCreateDomainHandler } from "../../../../src/products/inspector/tools/create-domain.js";

describe("createInspectorCreateDomainHandler", () => {
  it("maps created inspector domain into MCP output", async () => {
    const handler = createInspectorCreateDomainHandler({
      createDomain: async () => ({
        domain_id: "domain-1",
        domain_name: "https://example.com",
        alias: "main-site",
        auth_status: "unauth",
        create_time: "2026-04-16 10:00:00"
      })
    });

    const result = await handler({
      project_id: "project-1",
      domain_name: "https://example.com",
      alias: "main-site"
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "domain-1",
      name: "https://example.com",
      alias: "main-site",
      authStatus: "unauth",
      executed: true
    });
  });
});
