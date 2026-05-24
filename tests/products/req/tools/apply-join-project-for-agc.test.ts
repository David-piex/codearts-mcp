import { describe, expect, it, vi } from "vitest";
import {
  createReqApplyJoinProjectForAgcHandler,
  mapAppliedJoinProjectForAgc,
  previewApplyJoinProjectForAgc
} from "../../../../src/products/req/tools/apply-join-project-for-agc.js";

const input = {
  project_id: "project-1",
  domain_id: "domain-1",
  user_id: "user-1",
  x_auth_token: "0123456789"
};

describe("apply join project for AGC tool", () => {
  it("previews AGC join requests without exposing the full token", () => {
    const result = previewApplyJoinProjectForAgc({ ...input, dry_run: true });

    expect(result.summary).toBe("Dry run: apply to join CodeArts Req project for AGC");
    expect(result.item).toEqual({
      projectId: "project-1",
      domainId: "domain-1",
      userId: "user-1",
      xAuthToken: "0123...6789",
      executed: false
    });
  });

  it("maps executed AGC join requests", () => {
    const response = { status: "success" };
    const result = mapAppliedJoinProjectForAgc({
      ...input,
      applied: true,
      response
    });

    expect(result.summary).toBe("Applied to join CodeArts Req project for AGC");
    expect(result.item).toEqual({
      projectId: "project-1",
      domainId: "domain-1",
      userId: "user-1",
      executed: true
    });
    expect(result.raw).toEqual(response);
  });

  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      applyJoinProjectForAgc: vi.fn()
    };
    const handler = createReqApplyJoinProjectForAgcHandler(client);

    const result = await handler({ ...input, dry_run: true });

    expect(client.applyJoinProjectForAgc).not.toHaveBeenCalled();
    expect(result.content[0]?.text).toBe("Dry run: apply to join CodeArts Req project for AGC");
  });

  it("executes AGC join through the client", async () => {
    const client = {
      applyJoinProjectForAgc: vi.fn(async () => ({
        ...input,
        applied: true as const,
        response: { status: "success" }
      }))
    };
    const handler = createReqApplyJoinProjectForAgcHandler(client);

    const result = await handler({ ...input, dry_run: false });

    expect(client.applyJoinProjectForAgc).toHaveBeenCalledWith({
      ...input,
      dry_run: false
    });
    expect(result.structuredContent.item).toMatchObject({
      projectId: "project-1",
      executed: true
    });
  });
});
