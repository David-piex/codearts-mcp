import { describe, expect, it } from "vitest";
import { createReqClient } from "../../../src/products/req/client.js";

describe("createReqClient", () => {
  it("normalizes project_name into name when listing projects", async () => {
    const client = createReqClient({
      get: async () => ({
        projects: [{ project_id: "p-1", project_name: "Demo", project_num_id: 7 }],
        total: 1
      })
    } as never);

    const result = await client.listProjects({ page: 1, page_size: 20 });

    expect(result.projects).toEqual([{ project_id: "p-1", name: "Demo", project_num_id: 7 }]);
  });
});
