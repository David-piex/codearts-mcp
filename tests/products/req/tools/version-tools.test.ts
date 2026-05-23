import { describe, expect, it, vi } from "vitest";
import {
  createReqGetVersionDetailV2Handler,
  mapReqVersionDetailResult
} from "../../../../src/products/req/tools/get-version-detail-v2.js";
import {
  createReqListProjectVersionsHandler,
  mapReqProjectVersions
} from "../../../../src/products/req/tools/list-project-versions.js";

describe("mapReqProjectVersions", () => {
  it("returns normalized versions with readable timestamps", () => {
    const result = mapReqProjectVersions(
      [
        {
          id: 21727203,
          name: "test",
          status: "0",
          project_id: "project-1",
          start_date: "1755100800000",
          due_date: "1756310400000",
          created_on: "1755133939000",
          updated_on: "1755133939000"
        }
      ],
      1
    );

    expect(result.items?.[0]).toMatchObject({
      id: "21727203",
      name: "test",
      status: "0",
      projectId: "project-1",
      startDate: "1755100800000",
      startDateText: "2025-08-14 00:00:00 Asia/Shanghai",
      dueDateText: "2025-08-28 00:00:00 Asia/Shanghai",
      createdOnText: "2025-08-14 09:12:19 Asia/Shanghai"
    });
    expect(result.raw).toEqual({ total: 1 });
  });
});

describe("mapReqVersionDetailResult", () => {
  it("returns normalized V2 version detail with raw payload", () => {
    const result = mapReqVersionDetailResult({
      id: 21727203,
      projectNumId: 13096279,
      name: "test",
      status: "0",
      start_date: "1755100800000",
      due_date: "1756310400000",
      total: 0
    });

    expect(result.item).toMatchObject({
      id: "21727203",
      projectNumId: 13096279,
      startDateText: "2025-08-14 00:00:00 Asia/Shanghai",
      dueDateText: "2025-08-28 00:00:00 Asia/Shanghai",
      total: 0
    });
  });
});

describe("version tool handlers", () => {
  it("lists project versions", async () => {
    const client = {
      listProjectVersions: vi.fn(async () => ({
        versions: [{ id: 1, name: "Sprint 1", status: "1" }],
        total: 1
      }))
    };
    const handler = createReqListProjectVersionsHandler(client);

    const result = await handler({ project_id: "project-1" });

    expect(client.listProjectVersions).toHaveBeenCalledWith({ project_id: "project-1" });
    expect(result.content[0]?.text).toContain("1 project versions found");
    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "1",
      name: "Sprint 1"
    });
  });

  it("gets V2 version detail", async () => {
    const client = {
      getVersionDetailV2: vi.fn(async () => ({
        id: 1,
        name: "Sprint 1",
        status: "1",
        total: 3
      }))
    };
    const handler = createReqGetVersionDetailV2Handler(client);

    const result = await handler({ version_id: "1" });

    expect(client.getVersionDetailV2).toHaveBeenCalledWith({ version_id: "1" });
    expect(result.content[0]?.text).toContain("Loaded version 1");
    expect(result.structuredContent.item).toMatchObject({
      id: "1",
      name: "Sprint 1",
      total: 3
    });
  });
});
