import { describe, expect, it, vi } from "vitest";
import { reqListProjectDomainsInput as reqListProjectDomainsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListProjectDomainsInput } from "../../../../src/products/req/schemas/project.js";
import {
  createReqListProjectDomainsHandler,
  mapReqProjectDomains
} from "../../../../src/products/req/tools/list-project-domains.js";

describe("mapReqProjectDomains", () => {
  it("returns normalized project domains with pagination", () => {
    const result = mapReqProjectDomains(
      [
        {
          domain_id: "domain-1",
          domain_name: "性能"
        }
      ],
      1,
      20,
      2
    );

    expect(result.items).toEqual([
      {
        id: "domain-1",
        name: "性能"
      }
    ]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 2
    });
  });
});

describe("reqListProjectDomainsInput exports", () => {
  it("keeps the barrel export compatible with the project schema module", () => {
    const input = {
      project_id: "project-1",
      page: 1,
      page_size: 20
    };

    expect(reqListProjectDomainsInput.parse(input)).toEqual(input);
    expect(reqListProjectDomainsInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListProjectDomainsHandler", () => {
  it("returns content and structured output for normalized project domains", async () => {
    const client = {
      listProjectDomains: vi.fn(async () => ({
        total: 2,
        domains: [
          {
            domain_id: "domain-1",
            domain_name: "性能"
          }
        ]
      }))
    };
    const handler = createReqListProjectDomainsHandler(client);

    const result = await handler({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

    expect(client.listProjectDomains).toHaveBeenCalledWith({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });
    expect(result.content[0]?.text).toContain("1 project domains found");
    expect(result.structuredContent).toEqual({
      summary: "1 project domains found",
      items: [
        {
          id: "domain-1",
          name: "性能"
        }
      ],
      page_info: {
        page: 1,
        pageSize: 20,
        total: 2
      },
      raw: undefined
    });
  });

  it("adds a project-scoped hint when the domain list is empty", async () => {
    const handler = createReqListProjectDomainsHandler({
      listProjectDomains: async () => ({
        total: 0,
        domains: []
      })
    });

    const result = await handler({
      project_id: "project-empty",
      page: 1,
      page_size: 20
    });

    expect(result.content[0]?.text).toContain("0 project domains found");
    expect(result.content[0]?.text).toContain("If you expected project domains here");
    expect(result.content[0]?.text).toContain("project-empty");
  });
});
