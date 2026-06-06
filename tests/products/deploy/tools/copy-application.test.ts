import { describe, expect, it } from "vitest";
import { createDeployCopyApplicationHandler } from "../../../../src/products/deploy/tools/copy-application.js";

describe("createDeployCopyApplicationHandler", () => {
  it("returns a dry-run preview by default", async () => {
    const handler = createDeployCopyApplicationHandler({
      copyApplication: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    const result = await handler({
      app_id: "app-1"
    });

    expect(result.structuredContent.item).toEqual({
      appId: "app-1",
      executed: false
    });
  });

  it("maps copy application response into MCP output", async () => {
    let receivedInput: unknown;
    const handler = createDeployCopyApplicationHandler({
      copyApplication: async (input) => {
        receivedInput = input;
        return {
          id: "app-copy-1",
          name: "Test_Copy_92131",
          region: "region-a",
          is_disable: false,
          status: "success"
        };
      }
    });

    const result = await handler({
      app_id: "app-1",
      dry_run: false
    });

    expect(receivedInput).toEqual({
      app_id: "app-1",
      dry_run: false
    });
    expect(result.structuredContent.item).toEqual({
      id: "app-copy-1",
      name: "Test_Copy_92131",
      region: "region-a",
      isDisable: false,
      status: "success",
      executed: true
    });
  });
});
