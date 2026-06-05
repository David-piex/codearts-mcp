import { describe, expect, it } from "vitest";
import { createBuildEditKeystorePermissionHandler } from "../../../../src/products/build/tools/additional-mutation-tools.js";

describe("build token mutation tools", () => {
  it("previews token-only keystore permission edit by default", async () => {
    const handler = createBuildEditKeystorePermissionHandler({
      editKeystorePermission: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      x_auth_token: "token-123456",
      id: "perm-1",
      keystore_id: "key-1",
      user_name: "alice"
    });

    expect(result.structuredContent.item).toEqual({
      id: "perm-1",
      keystoreId: "key-1",
      userName: "alice",
      modify: true,
      usage: true,
      delete: false,
      canAbsent: true,
      executed: false
    });
  });

  it("executes token-only keystore permission edit when dry_run is false", async () => {
    const handler = createBuildEditKeystorePermissionHandler({
      editKeystorePermission: async () => ({
        id: "perm-1",
        keystore_id: "key-1",
        user_name: "alice",
        status: "success",
        result: "perm-1"
      })
    });

    const result = await handler({
      x_auth_token: "token-123456",
      id: "perm-1",
      keystore_id: "key-1",
      user_name: "alice",
      modify: true,
      usage: false,
      delete: false,
      can_absent: true,
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "perm-1",
      keystoreId: "key-1",
      userName: "alice",
      status: "success",
      result: "perm-1",
      executed: true
    });
  });
});
