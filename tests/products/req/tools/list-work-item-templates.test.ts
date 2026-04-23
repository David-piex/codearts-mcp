import { describe, expect, it, vi } from "vitest";
import { reqListWorkItemTemplatesInput as reqListWorkItemTemplatesInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListWorkItemTemplatesInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListWorkItemTemplatesHandler,
  mapReqWorkItemTemplates
} from "../../../../src/products/req/tools/list-work-item-templates.js";

describe("mapReqWorkItemTemplates", () => {
  it("returns normalized work item templates", () => {
    const result = mapReqWorkItemTemplates([
      {
        id: 1793674,
        project_id: 30384422,
        tracker_id: 2,
        description: "",
        issue_field_config: "{\"fields\":[]}"
      }
    ]);

    expect(result.items).toEqual([
      {
        id: "1793674",
        projectId: 30384422,
        trackerId: 2,
        description: "",
        issueFieldConfig: "{\"fields\":[]}"
      }
    ]);
  });
});

describe("reqListWorkItemTemplatesInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      tracker_id: 2
    };

    expect(reqListWorkItemTemplatesInput.parse(input)).toEqual(input);
    expect(reqListWorkItemTemplatesInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListWorkItemTemplatesHandler", () => {
  it("returns normalized work item templates", async () => {
    const client = {
      listWorkItemTemplates: vi.fn(async () => ({
        templates: [
          {
            id: 1793674,
            project_id: 30384422,
            tracker_id: 2,
            description: "",
            issue_field_config: "{\"fields\":[]}"
          }
        ]
      }))
    };
    const handler = createReqListWorkItemTemplatesHandler(client);

    const result = await handler({
      project_id: "project-1",
      tracker_id: 2
    });

    expect(client.listWorkItemTemplates).toHaveBeenCalledWith({
      project_id: "project-1",
      tracker_id: 2
    });
    expect(result.content[0]?.text).toContain("1 work item templates found");
    expect(result.structuredContent.items).toEqual([
      {
        id: "1793674",
        projectId: 30384422,
        trackerId: 2,
        description: "",
        issueFieldConfig: "{\"fields\":[]}"
      }
    ]);
  });
});
