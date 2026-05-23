import { describe, expect, it, vi } from "vitest";
import { reqBatchUpdateChildUserNicknamesInput as reqBatchUpdateChildUserNicknamesInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqBatchUpdateChildUserNicknamesInput } from "../../../../src/products/req/schemas/member.js";
import {
  createReqBatchUpdateChildUserNicknamesHandler,
  mapBatchUpdatedChildUserNicknames,
  previewBatchUpdateChildUserNicknames
} from "../../../../src/products/req/tools/batch-update-child-user-nicknames.js";

const users = [
  { user_id: "user-1", nick_name: "Alice" },
  { user_id: "user-2", nick_name: "Bob" }
];

describe("batch update child user nicknames tool", () => {
  it("keeps the barrel export compatible with the member schema module", () => {
    const input = { users };

    expect(reqBatchUpdateChildUserNicknamesInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqBatchUpdateChildUserNicknamesInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });

  it("previews dry-run updates", () => {
    const result = previewBatchUpdateChildUserNicknames({ users, dry_run: true });

    expect(result.summary).toBe("Dry run: update 2 child user nicknames");
    expect(result.item).toEqual({
      users,
      updatedCount: 0,
      executed: false
    });
  });

  it("maps executed updates", () => {
    const result = mapBatchUpdatedChildUserNicknames({ users, updatedCount: 2 });

    expect(result.summary).toBe("Updated 2 child user nicknames");
    expect(result.item).toEqual({
      users,
      updatedCount: 2,
      executed: true
    });
  });

  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      batchUpdateChildUserNicknames: vi.fn()
    };
    const handler = createReqBatchUpdateChildUserNicknamesHandler(client);

    const result = await handler({ users, dry_run: true });

    expect(client.batchUpdateChildUserNicknames).not.toHaveBeenCalled();
    expect(result.content[0]?.text).toBe("Dry run: update 2 child user nicknames");
    expect(result.structuredContent.item).toEqual({
      users,
      updatedCount: 0,
      executed: false
    });
  });

  it("executes updates through the client", async () => {
    const client = {
      batchUpdateChildUserNicknames: vi.fn(async () => ({
        users,
        updatedCount: 2
      }))
    };
    const handler = createReqBatchUpdateChildUserNicknamesHandler(client);

    const result = await handler({ users, dry_run: false });

    expect(client.batchUpdateChildUserNicknames).toHaveBeenCalledWith({
      users,
      dry_run: false
    });
    expect(result.content[0]?.text).toBe("Updated 2 child user nicknames");
    expect(result.structuredContent.item).toEqual({
      users,
      updatedCount: 2,
      executed: true
    });
  });
});
