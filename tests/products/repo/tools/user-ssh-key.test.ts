import { describe, expect, it, vi } from "vitest";
import {
  createRepoCreateUserSshKeyHandler,
  mapCreatedUserSshKey,
  previewCreateUserSshKey
} from "../../../../src/products/repo/tools/create-user-ssh-key.js";
import {
  createRepoDeleteUserSshKeyHandler,
  mapDeletedUserSshKey,
  previewDeleteUserSshKey
} from "../../../../src/products/repo/tools/delete-user-ssh-key.js";

describe("user SSH key tool previews", () => {
  it("redacts key material in create previews", () => {
    const result = previewCreateUserSshKey({
      title: "laptop",
      key: "ssh-rsa AAA",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      title: "laptop",
      keyProvided: true,
      executed: false
    });
  });

  it("returns delete previews", () => {
    const result = previewDeleteUserSshKey({
      key_id: "123",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      id: "123",
      keyId: "123",
      executed: false
    });
  });
});

describe("user SSH key tool mappers", () => {
  it("maps created SSH keys", () => {
    const result = mapCreatedUserSshKey({
      id: 123,
      title: "laptop",
      key: "ssh-rsa AAA",
      created_at: "2026-05-24T10:00:00.000+08:00"
    });

    expect(result.item).toEqual({
      id: "123",
      title: "laptop",
      key: "ssh-rsa AAA",
      createdAt: "2026-05-24T10:00:00.000+08:00",
      executed: true
    });
  });

  it("maps deleted SSH keys", () => {
    const result = mapDeletedUserSshKey({
      key_id: "123",
      deleted: true
    });

    expect(result.item).toEqual({
      id: "123",
      keyId: "123",
      deleted: true,
      executed: true
    });
  });
});

describe("user SSH key handlers", () => {
  it("skips client calls for dry-run writes", async () => {
    const createUserSshKey = vi.fn();
    const deleteUserSshKey = vi.fn();

    await createRepoCreateUserSshKeyHandler({ createUserSshKey })({
      title: "laptop",
      key: "ssh-rsa AAA"
    });
    await createRepoDeleteUserSshKeyHandler({ deleteUserSshKey })({
      key_id: "123"
    });

    expect(createUserSshKey).not.toHaveBeenCalled();
    expect(deleteUserSshKey).not.toHaveBeenCalled();
  });
});
