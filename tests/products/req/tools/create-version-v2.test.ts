import { describe, expect, it, vi } from "vitest";
import { reqCreateVersionV2Input as reqCreateVersionV2InputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqCreateVersionV2Input } from "../../../../src/products/req/schemas/iteration.js";
import {
  createReqCreateVersionV2Handler,
  mapCreatedVersionV2,
  previewCreateVersionV2
} from "../../../../src/products/req/tools/create-version-v2.js";

const input = {
  project_id: "project-1",
  name: "Sprint V2",
  start_date: 1779379200000,
  due_date: 1779984000000
};

describe("create V2 version tool", () => {
  it("keeps the barrel export compatible with the iteration schema module", () => {
    expect(reqCreateVersionV2Input.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqCreateVersionV2InputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });

  it("previews dry-run creation", () => {
    const result = previewCreateVersionV2({ ...input, dry_run: true });

    expect(result.summary).toBe("Dry run: create V2 version Sprint V2");
    expect(result.item).toEqual({
      projectId: "project-1",
      name: "Sprint V2",
      startDate: 1779379200000,
      dueDate: 1779984000000,
      executed: false
    });
  });

  it("maps executed creation", () => {
    const result = mapCreatedVersionV2({
      id: 401,
      project_id: "project-1",
      name: "Sprint V2",
      start_date: "1779379200000",
      due_date: "1779984000000",
      status: "0"
    });

    expect(result.summary).toBe("Created V2 version Sprint V2");
    expect(result.item).toEqual({
      id: "401",
      projectId: "project-1",
      name: "Sprint V2",
      startDate: "1779379200000",
      dueDate: "1779984000000",
      status: "0",
      executed: true
    });
  });

  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      createVersionV2: vi.fn()
    };
    const handler = createReqCreateVersionV2Handler(client);

    const result = await handler({ ...input, dry_run: true });

    expect(client.createVersionV2).not.toHaveBeenCalled();
    expect(result.content[0]?.text).toBe("Dry run: create V2 version Sprint V2");
    expect(result.structuredContent.item).toMatchObject({
      projectId: "project-1",
      name: "Sprint V2",
      executed: false
    });
  });

  it("executes creation through the client", async () => {
    const client = {
      createVersionV2: vi.fn(async () => ({
        id: 401,
        project_id: "project-1",
        name: "Sprint V2",
        start_date: "1779379200000",
        due_date: "1779984000000",
        status: "0"
      }))
    };
    const handler = createReqCreateVersionV2Handler(client);

    const result = await handler({ ...input, dry_run: false });

    expect(client.createVersionV2).toHaveBeenCalledWith({
      ...input,
      dry_run: false
    });
    expect(result.content[0]?.text).toBe("Created V2 version Sprint V2");
    expect(result.structuredContent.item).toMatchObject({
      id: "401",
      projectId: "project-1",
      name: "Sprint V2",
      executed: true
    });
  });
});
