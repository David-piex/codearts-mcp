import { describe, expect, it, vi } from "vitest";
import {
  createReqGetWorkItemHandler,
  mapReqWorkItem
} from "../../../../src/products/req/tools/get-work-item.js";

describe("mapReqWorkItem", () => {
  it("returns normalized work item detail data", () => {
    const result = mapReqWorkItem({
      id: 9,
      subject: "Refine login flow",
      status: { name: "Doing" },
      tracker_name: "Story",
      description: "Clarify edge cases",
      priority: { id: 2, name: "Medium" },
      severity: { id: 12, name: "Normal" },
      module: { id: 8, name: "Login" },
      domain: { id: 14, name: "Account" },
      fixed_version: { id: 4, name: "Sprint 1" },
      done_ratio: 30,
      created_on: "1779267066000",
      updated_on: "1779328509000",
      start_date: "1779379200000",
      due_date: "1779984000000",
      assigned_to: {
        id: 16666,
        identifier: "user-uuid-2",
        name: "tenant/bob",
        assigned_nick_name: "Bob"
      }
    });

    expect(result.item).toMatchObject({
      id: "9",
      title: "Refine login flow",
      status: "Doing",
      type: "Story",
      description: "Clarify edge cases",
      priority: { id: "2", name: "Medium" },
      priorityName: "Medium",
      severity: { id: "12", name: "Normal" },
      severityName: "Normal",
      module: { id: "8", name: "Login" },
      moduleName: "Login",
      domain: { id: "14", name: "Account" },
      domainName: "Account",
      fixedVersion: { id: "4", name: "Sprint 1" },
      fixedVersionName: "Sprint 1",
      doneRatio: 30,
      createdOn: "1779267066000",
      createdOnText: "2026-05-20 16:51:06 Asia/Shanghai",
      updatedOn: "1779328509000",
      updatedOnText: "2026-05-21 09:55:09 Asia/Shanghai",
      startDate: "1779379200000",
      startDateText: "2026-05-22 00:00:00 Asia/Shanghai",
      dueDate: "1779984000000",
      dueDateText: "2026-05-29 00:00:00 Asia/Shanghai",
      assignee: {
        id: "16666",
        userId: "user-uuid-2",
        userNumId: undefined,
        nickName: "Bob",
        name: "tenant/bob",
        displayName: "Bob"
      },
      assignedToName: "Bob",
      rawWorkItem: {
        id: 9,
        subject: "Refine login flow",
        status: { name: "Doing" },
        tracker_name: "Story",
        description: "Clarify edge cases",
        priority: { id: 2, name: "Medium" },
        severity: { id: 12, name: "Normal" },
        module: { id: 8, name: "Login" },
        domain: { id: 14, name: "Account" },
        fixed_version: { id: 4, name: "Sprint 1" },
        done_ratio: 30,
        created_on: "1779267066000",
        updated_on: "1779328509000",
        start_date: "1779379200000",
        due_date: "1779984000000",
        assigned_to: {
          id: 16666,
          identifier: "user-uuid-2",
          name: "tenant/bob",
          assigned_nick_name: "Bob"
        }
      }
    });
    expect(result.raw).toEqual(result.item?.rawWorkItem);
    expect(result.summary).toBe("Loaded work item 9 (assignee: Bob)");
  });
});

describe("createReqGetWorkItemHandler", () => {
  it("includes work item details in text output", async () => {
    const client = {
      getWorkItem: vi.fn(async () => ({
        id: 9,
        subject: "Refine login flow",
        status: { name: "Doing" },
        tracker_name: "Story",
        description: "Clarify edge cases",
        created_on: "1779267066000",
        updated_on: "1779328509000",
        assigned_to: {
          id: 16666,
          identifier: "user-uuid-2",
          name: "tenant/bob",
          assigned_nick_name: "Bob"
        }
      }))
    };
    const handler = createReqGetWorkItemHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_id: "9"
    });

    expect(client.getWorkItem).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_id: "9"
    });
    expect(result.content[0]?.text).toContain("Loaded work item 9 (assignee: Bob)");
    expect(result.content[0]?.text).toContain("title: Refine login flow");
    expect(result.content[0]?.text).toContain("assignee: Bob");
    expect(result.content[0]?.text).toContain("description: Clarify edge cases");
    expect(result.content[0]?.text).toContain("status: Doing");
    expect(result.content[0]?.text).toContain("type: Story");
    expect(result.structuredContent.item?.description).toBe("Clarify edge cases");
  });
});
