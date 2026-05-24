import { describe, expect, it, vi } from "vitest";
import {
  createReqUpdateCurrentUserNicknameHandler,
  mapUpdatedCurrentUserNickname,
  previewUpdateCurrentUserNickname
} from "../../../../src/products/req/tools/update-current-user-nickname.js";

describe("update current user nickname tool", () => {
  it("previews nickname updates", () => {
    const result = previewUpdateCurrentUserNickname({
      nick_name: "Tom",
      dry_run: true
    });

    expect(result.summary).toBe("Dry run: update current Req user nickname to Tom");
    expect(result.item).toEqual({
      nickName: "Tom",
      executed: false
    });
  });

  it("maps executed nickname updates", () => {
    const result = mapUpdatedCurrentUserNickname({
      nick_name: "Tom",
      updated: true,
      response: null
    });

    expect(result.summary).toBe("Updated current Req user nickname to Tom");
    expect(result.item).toEqual({
      nickName: "Tom",
      executed: true
    });
  });

  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      updateCurrentUserNickname: vi.fn()
    };
    const handler = createReqUpdateCurrentUserNicknameHandler(client);

    const result = await handler({
      nick_name: "Tom",
      x_auth_token: "token-123456",
      dry_run: true
    });

    expect(client.updateCurrentUserNickname).not.toHaveBeenCalled();
    expect(result.content[0]?.text).toBe("Dry run: update current Req user nickname to Tom");
  });

  it("executes nickname updates through the client", async () => {
    const client = {
      updateCurrentUserNickname: vi.fn(async () => ({
        nick_name: "Tom",
        updated: true as const,
        response: null
      }))
    };
    const handler = createReqUpdateCurrentUserNicknameHandler(client);

    const result = await handler({
      nick_name: "Tom",
      x_auth_token: "token-123456",
      dry_run: false
    });

    expect(client.updateCurrentUserNickname).toHaveBeenCalledWith({
      nick_name: "Tom",
      x_auth_token: "token-123456",
      dry_run: false
    });
    expect(result.structuredContent.item).toEqual({
      nickName: "Tom",
      executed: true
    });
  });
});
