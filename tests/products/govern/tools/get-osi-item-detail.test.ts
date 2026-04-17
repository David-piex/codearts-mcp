import { describe, expect, it } from "vitest";
import { createGovernGetOsiItemDetailHandler } from "../../../../src/products/govern/tools/get-osi-item-detail.js";

describe("createGovernGetOsiItemDetailHandler", () => {
  it("maps govern osi item detail into MCP output", async () => {
    const handler = createGovernGetOsiItemDetailHandler({
      getOsiItemDetail: async () => ({
        software_code: "728d261152a6102ad4f7a64f11a3d35f",
        software_name: "OpenSSL",
        software_version: "openssl-3.0.19",
        language: "C/C++",
        level: "L3",
        vuln_amount: 0
      })
    });

    const result = await handler({
      project_id: "project-1",
      software_name: "openssl",
      software_version: "openssl-3.0.19"
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "728d261152a6102ad4f7a64f11a3d35f",
      name: "OpenSSL",
      version: "openssl-3.0.19"
    });
  });

  it("rejects artifact_id-only input until group_id shape is confirmed", async () => {
    const handler = createGovernGetOsiItemDetailHandler({
      getOsiItemDetail: async () => {
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
