import { describe, expect, it, vi } from "vitest";
import { reqExportWorkItemsNewV2Input as reqExportWorkItemsNewV2InputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqExportWorkItemsNewV2Input } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqExportWorkItemsNewV2Handler,
  mapExportedWorkItemsNewV2,
  previewExportWorkItemsNewV2
} from "../../../../src/products/req/tools/export-work-items-new-v2.js";

const input = {
  project_id: "project-1",
  fields: "id,subject,status",
  export_child: true,
  type: "list" as const,
  time_zone: 8,
  page: 1,
  page_size: 20,
  export_all: false,
  tracker_id: "5,6,7"
};

describe("export work items new V2 tool", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    expect(reqExportWorkItemsNewV2Input.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqExportWorkItemsNewV2InputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });

  it("previews dry-run export requests", () => {
    const result = previewExportWorkItemsNewV2({ ...input, dry_run: true });

    expect(result.summary).toBe("Dry run: export CodeArts Req work items");
    expect(result.item).toEqual({
      projectId: "project-1",
      fields: "id,subject,status",
      exportChild: true,
      type: "list",
      timeZone: 8,
      page: 1,
      pageSize: 20,
      exportAll: false,
      trackerId: "5,6,7",
      executed: false
    });
  });

  it("maps exported binary file metadata", () => {
    const result = mapExportedWorkItemsNewV2({
      project_id: "project-1",
      file_name: "work-items.xlsx",
      content_type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      size_bytes: 3,
      content_base64: "AQID"
    });

    expect(result.summary).toBe("Exported CodeArts Req work items to work-items.xlsx");
    expect(result.item).toEqual({
      projectId: "project-1",
      fileName: "work-items.xlsx",
      contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      sizeBytes: 3,
      contentBase64: "AQID",
      executed: true
    });
  });

  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      exportWorkItemsNewV2: vi.fn()
    };
    const handler = createReqExportWorkItemsNewV2Handler(client);

    const result = await handler({ ...input, dry_run: true });

    expect(client.exportWorkItemsNewV2).not.toHaveBeenCalled();
    expect(result.content[0]?.text).toBe("Dry run: export CodeArts Req work items");
    expect(result.structuredContent.item).toMatchObject({
      projectId: "project-1",
      pageSize: 20,
      executed: false
    });
  });

  it("executes export through the client", async () => {
    const client = {
      exportWorkItemsNewV2: vi.fn(async () => ({
        project_id: "project-1",
        file_name: "work-items.xlsx",
        content_type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        size_bytes: 3,
        content_base64: "AQID"
      }))
    };
    const handler = createReqExportWorkItemsNewV2Handler(client);

    const result = await handler({ ...input, dry_run: false });

    expect(client.exportWorkItemsNewV2).toHaveBeenCalledWith({
      ...input,
      dry_run: false
    });
    expect(result.content[0]?.text).toBe("Exported CodeArts Req work items to work-items.xlsx");
    expect(result.structuredContent.item).toMatchObject({
      projectId: "project-1",
      fileName: "work-items.xlsx",
      sizeBytes: 3,
      executed: true
    });
  });
});
