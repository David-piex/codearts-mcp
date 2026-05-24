import { describe, expect, it, vi } from "vitest";
import {
  createReqDeleteVersionV2Handler,
  createReqUpdateVersionV2Handler,
  mapDeletedVersionV2,
  mapUpdatedVersionV2,
  previewDeleteVersionV2,
  previewUpdateVersionV2
} from "../../../../src/products/req/tools/version-v2-token-tools.js";

describe("V2 version token-header tools", () => {
  it("previews V2 version updates", () => {
    const result = previewUpdateVersionV2({
      project_id: "project-1",
      version_id: 26664721,
      name: "iteration",
      start_date: 1752854400000,
      due_date: 1754064000000,
      update_workitem_date: false,
      dry_run: true
    });

    expect(result.summary).toBe("Dry run: update V2 version iteration");
    expect(result.item).toMatchObject({
      projectId: "project-1",
      versionId: 26664721,
      executed: false
    });
  });

  it("maps executed V2 version updates", () => {
    const response = { status: "success", result: "" };
    const result = mapUpdatedVersionV2({
      project_id: "project-1",
      version_id: 26664721,
      name: "iteration",
      status: "success",
      response
    });

    expect(result.summary).toBe("Updated V2 version iteration");
    expect(result.item).toMatchObject({
      projectId: "project-1",
      versionId: 26664721,
      status: "success",
      executed: true
    });
    expect(result.raw).toEqual(response);
  });

  it("short-circuits V2 version update dry runs", async () => {
    const client = {
      updateVersionV2: vi.fn()
    };
    const handler = createReqUpdateVersionV2Handler(client);

    const result = await handler({
      project_id: "project-1",
      version_id: 26664721,
      name: "iteration",
      start_date: 1752854400000,
      due_date: 1754064000000,
      update_workitem_date: false,
      x_auth_token: "token-123456",
      dry_run: true
    });

    expect(client.updateVersionV2).not.toHaveBeenCalled();
    expect(result.content[0]?.text).toBe("Dry run: update V2 version iteration");
  });

  it("previews V2 version deletions", () => {
    const result = previewDeleteVersionV2({
      project_id: "project-1",
      version_id: "26658661",
      dry_run: true
    });

    expect(result.summary).toBe("Dry run: delete V2 version 26658661");
    expect(result.item).toEqual({
      projectId: "project-1",
      versionId: "26658661",
      executed: false
    });
  });

  it("maps executed V2 version deletions", () => {
    const response = { status: "success", result: "" };
    const result = mapDeletedVersionV2({
      project_id: "project-1",
      version_id: "26658661",
      deleted: true,
      status: "success",
      response
    });

    expect(result.summary).toBe("Deleted V2 version 26658661");
    expect(result.item).toEqual({
      projectId: "project-1",
      versionId: "26658661",
      status: "success",
      executed: true
    });
    expect(result.raw).toEqual(response);
  });

  it("executes V2 version deletion through the client", async () => {
    const client = {
      deleteVersionV2: vi.fn(async () => ({
        project_id: "project-1",
        version_id: "26658661",
        deleted: true as const,
        status: "success",
        response: { status: "success" }
      }))
    };
    const handler = createReqDeleteVersionV2Handler(client);

    const result = await handler({
      project_id: "project-1",
      version_id: "26658661",
      x_auth_token: "token-123456",
      dry_run: false
    });

    expect(client.deleteVersionV2).toHaveBeenCalledWith({
      project_id: "project-1",
      version_id: "26658661",
      x_auth_token: "token-123456",
      dry_run: false
    });
    expect(result.structuredContent.item).toMatchObject({
      versionId: "26658661",
      executed: true
    });
  });
});
