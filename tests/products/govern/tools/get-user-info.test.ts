import { describe, expect, it } from "vitest";
import { createGovernGetUserInfoHandler } from "../../../../src/products/govern/tools/get-user-info.js";

describe("createGovernGetUserInfoHandler", () => {
  it("maps user info into MCP output", async () => {
    const handler = createGovernGetUserInfoHandler({
      getUserInfo: async () => ({
        user_id: "user-1",
        white_list: true
      })
    });

    const result = await handler({
      project_id: "project-1",
      user_id: "user-1"
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "user-1",
      whiteList: true
    });
  });
});
