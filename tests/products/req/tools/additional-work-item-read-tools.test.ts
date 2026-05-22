import { describe, expect, it, vi } from "vitest";
import {
  reqGetProjectDueDaysAfterInput as reqGetProjectDueDaysAfterInputFromBarrel,
  reqGetProjectWorkhourConfigInput as reqGetProjectWorkhourConfigInputFromBarrel,
  reqGetWorkItemIndexCountsInput as reqGetWorkItemIndexCountsInputFromBarrel,
  reqListWorkItemTagsInput as reqListWorkItemTagsInputFromBarrel,
  reqListWorkItemTreeInput as reqListWorkItemTreeInputFromBarrel
} from "../../../../src/products/req/schemas.js";
import {
  reqGetProjectDueDaysAfterInput,
  reqGetProjectWorkhourConfigInput,
  reqGetWorkItemIndexCountsInput,
  reqListWorkItemTagsInput,
  reqListWorkItemTreeInput
} from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqGetProjectDueDaysAfterHandler,
  mapReqProjectDueDaysAfter
} from "../../../../src/products/req/tools/get-project-due-days-after.js";
import {
  createReqGetProjectWorkhourConfigHandler,
  mapReqProjectWorkhourConfig
} from "../../../../src/products/req/tools/get-project-workhour-config.js";
import {
  createReqGetWorkItemIndexCountsHandler,
  mapReqWorkItemIndexCounts
} from "../../../../src/products/req/tools/get-work-item-index-counts.js";
import {
  createReqListWorkItemTagsHandler,
  mapReqWorkItemTags
} from "../../../../src/products/req/tools/list-work-item-tags.js";
import {
  createReqListWorkItemTreeHandler,
  mapReqWorkItemTree
} from "../../../../src/products/req/tools/list-work-item-tree.js";

describe("additional Req work-item read tool schema exports", () => {
  it("keeps tree list schema exports compatible", () => {
    const input = {
      project_id: "project-1",
      page: 1,
      page_size: 20,
      tracker_ids: [7, 2] as const
    };

    expect(reqListWorkItemTreeInput.parse(input)).toEqual(input);
    expect(reqListWorkItemTreeInputFromBarrel.parse(input)).toEqual(input);
  });

  it("keeps tag list schema exports compatible", () => {
    const input = {
      project_id: "project-1",
      page: 1,
      page_size: 10,
      name: "backend"
    };

    expect(reqListWorkItemTagsInput.parse(input)).toEqual(input);
    expect(reqListWorkItemTagsInputFromBarrel.parse(input)).toEqual(input);
  });

  it("keeps work item index count schema exports compatible", () => {
    const input = {
      project_id: "project-1",
      work_item_id: "1001"
    };

    expect(reqGetWorkItemIndexCountsInput.parse(input)).toEqual(input);
    expect(reqGetWorkItemIndexCountsInputFromBarrel.parse(input)).toEqual(input);
  });

  it("keeps project due-days-after schema exports compatible", () => {
    const input = {
      project_id: "project-1"
    };

    expect(reqGetProjectDueDaysAfterInput.parse(input)).toEqual(input);
    expect(reqGetProjectDueDaysAfterInputFromBarrel.parse(input)).toEqual(input);
  });

  it("keeps project workhour config schema exports compatible", () => {
    const input = {
      project_id: "project-1"
    };

    expect(reqGetProjectWorkhourConfigInput.parse(input)).toEqual(input);
    expect(reqGetProjectWorkhourConfigInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("mapReqWorkItemTree", () => {
  it("returns normalized work item tree data", () => {
    const result = mapReqWorkItemTree({
      project_id: "project-1",
      page: 1,
      page_size: 20,
      tracker_ids: [7, 2],
      total: 2,
      work_items: [
        {
          id: 101,
          subject: "Parent story",
          status: { name: "新建" },
          tracker: { name: "Story" },
          assigned_to: { name: "alice" },
          isParent: true
        }
      ]
    });

    expect(result.items).toEqual([
      {
        id: "101",
        subject: "Parent story",
        statusName: "新建",
        trackerName: "Story",
        createdOn: undefined,
        createdOnText: undefined,
        updatedOn: undefined,
        updatedOnText: undefined,
        startDate: undefined,
        startDateText: undefined,
        dueDate: undefined,
        dueDateText: undefined,
        assignee: {
          id: undefined,
          userId: undefined,
          userNumId: undefined,
          nickName: undefined,
          name: "alice",
          displayName: "alice"
        },
        assignedToName: "alice",
        hasChildren: true,
        rawWorkItem: {
          id: 101,
          subject: "Parent story",
          status: { name: "新建" },
          tracker: { name: "Story" },
          assigned_to: { name: "alice" },
          isParent: true
        }
      }
    ]);
    expect(result.raw).toEqual({
      workItems: [
        {
          id: 101,
          subject: "Parent story",
          status: { name: "新建" },
          tracker: { name: "Story" },
          assigned_to: { name: "alice" },
          isParent: true
        }
      ]
    });
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 2
    });
  });
});

describe("createReqListWorkItemTreeHandler", () => {
  it("returns normalized work item tree output", async () => {
    const client = {
      listWorkItemTree: vi.fn(async () => ({
        project_id: "project-1",
        page: 1,
        page_size: 20,
        tracker_ids: [7, 2],
        total: 2,
        work_items: [
          {
            id: 101,
            subject: "Parent story",
            status: { name: "新建" },
            tracker: { name: "Story" },
            assigned_to: { name: "alice" },
            isParent: true
          }
        ]
      }))
    };
    const handler = createReqListWorkItemTreeHandler(client);

    const result = await handler({
      project_id: "project-1",
      page: 1,
      page_size: 20,
      tracker_ids: [7, 2]
    });

    expect(client.listWorkItemTree).toHaveBeenCalledWith({
      project_id: "project-1",
      page: 1,
      page_size: 20,
      tracker_ids: [7, 2]
    });
    expect(result.content[0]?.text).toContain("1 work items found in tree mode");
    expect(result.content[0]?.text).toContain("assignee: alice");
    expect(result.structuredContent.items).toEqual([
      expect.objectContaining({
        id: "101",
        subject: "Parent story"
      })
    ]);
  });
});

describe("mapReqWorkItemTags", () => {
  it("returns normalized work item tag data", () => {
    const result = mapReqWorkItemTags([
      {
        id: 1,
        name: "backend",
        encode_name: "backend",
        tag_count: 3
      }
    ]);

    expect(result.items).toEqual([
      {
        id: "1",
        name: "backend",
        encodeName: "backend",
        tagCount: 3
      }
    ]);
  });
});

describe("createReqListWorkItemTagsHandler", () => {
  it("returns normalized work item tag output", async () => {
    const client = {
      listWorkItemTags: vi.fn(async () => ({
        tags: [
          {
            id: 1,
            name: "backend",
            encode_name: "backend",
            tag_count: 3
          }
        ],
        total: 1
      }))
    };
    const handler = createReqListWorkItemTagsHandler(client);

    const result = await handler({
      project_id: "project-1",
      page: 1,
      page_size: 10,
      name: "back"
    });

    expect(client.listWorkItemTags).toHaveBeenCalledWith({
      project_id: "project-1",
      page: 1,
      page_size: 10,
      name: "back"
    });
    expect(result.content[0]?.text).toContain("1 work item tags found");
    expect(result.structuredContent.items).toEqual([
      {
        id: "1",
        name: "backend",
        encodeName: "backend",
        tagCount: 3
      }
    ]);
  });
});

describe("mapReqWorkItemIndexCounts", () => {
  it("returns normalized work item index counts data", () => {
    const result = mapReqWorkItemIndexCounts({
      project_id: "project-1",
      work_item_id: "1001",
      related_issue_count: 1,
      related_wiki_count: 2,
      related_test_case_count: 3,
      related_test_plan_count: 4,
      code_commit_count: 5,
      code_branch_count: 6,
      code_mergerequest_count: 7
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      workItemId: "1001",
      relatedIssueCount: 1,
      relatedWikiCount: 2,
      relatedTestCaseCount: 3,
      relatedTestPlanCount: 4,
      codeCommitCount: 5,
      codeBranchCount: 6,
      codeMergeRequestCount: 7
    });
  });
});

describe("createReqGetWorkItemIndexCountsHandler", () => {
  it("returns normalized work item index counts output", async () => {
    const client = {
      getWorkItemIndexCounts: vi.fn(async () => ({
        project_id: "project-1",
        work_item_id: "1001",
        related_issue_count: 1,
        related_wiki_count: 2,
        related_test_case_count: 3,
        related_test_plan_count: 4,
        code_commit_count: 5,
        code_branch_count: 6,
        code_mergerequest_count: 7
      }))
    };
    const handler = createReqGetWorkItemIndexCountsHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_id: "1001"
    });

    expect(client.getWorkItemIndexCounts).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_id: "1001"
    });
    expect(result.content[0]?.text).toContain("Loaded work item index counts for 1001");
    expect(result.structuredContent.item).toEqual(
      expect.objectContaining({
        projectId: "project-1",
        workItemId: "1001",
        codeMergeRequestCount: 7
      })
    );
  });
});

describe("mapReqProjectDueDaysAfter", () => {
  it("returns normalized project due-days-after data", () => {
    const result = mapReqProjectDueDaysAfter({
      project_id: "project-1",
      date_after: 7
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      dateAfter: 7
    });
  });
});

describe("createReqGetProjectDueDaysAfterHandler", () => {
  it("returns normalized project due-days-after output", async () => {
    const client = {
      getProjectDueDaysAfter: vi.fn(async () => ({
        project_id: "project-1",
        date_after: 7
      }))
    };
    const handler = createReqGetProjectDueDaysAfterHandler(client);

    const result = await handler({
      project_id: "project-1"
    });

    expect(client.getProjectDueDaysAfter).toHaveBeenCalledWith({
      project_id: "project-1"
    });
    expect(result.content[0]?.text).toContain("Loaded project due-days-after config for project-1");
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      dateAfter: 7
    });
  });
});

describe("mapReqProjectWorkhourConfig", () => {
  it("returns normalized project workhour config data", () => {
    const result = mapReqProjectWorkhourConfig({
      project_id: "project-1",
      workhour_type_required: false,
      workhour_readonly_mode: true
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      workhourTypeRequired: false,
      workhourReadonlyMode: true
    });
  });
});

describe("createReqGetProjectWorkhourConfigHandler", () => {
  it("returns normalized project workhour config output", async () => {
    const client = {
      getProjectWorkhourConfig: vi.fn(async () => ({
        project_id: "project-1",
        workhour_type_required: false,
        workhour_readonly_mode: true
      }))
    };
    const handler = createReqGetProjectWorkhourConfigHandler(client);

    const result = await handler({
      project_id: "project-1"
    });

    expect(client.getProjectWorkhourConfig).toHaveBeenCalledWith({
      project_id: "project-1"
    });
    expect(result.content[0]?.text).toContain("Loaded project workhour config for project-1");
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      workhourTypeRequired: false,
      workhourReadonlyMode: true
    });
  });
});
