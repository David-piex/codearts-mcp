import { describe, expect, it, vi } from "vitest";
import {
  reqListAssociatedCodeV2Input,
  reqListAssociatedWikisV5Input,
  reqListChildWorkItemsDirectV4Input,
  reqListChildWorkItemsV4Input,
  reqListModuleSettingsV2Input,
  reqListProjectDomainsV2Input,
  reqListProjectWorkHourTypesV5Input,
  reqListWorkItemAssignedStatusConfigsInput,
  reqListWorkItemCommentsV2Input,
  reqListWorkItemCustomFieldsV4Input,
  reqListWorkItemQueriesInput,
  reqListWorkItemRecordsV2Input,
  reqListWorkSettingTemplatesV2Input,
  reqQueryScrumVersionWorkItemsV2Input
} from "../../../../src/products/req/schemas.js";
import {
  createReqListAssociatedCodeV2Handler,
  createReqListAssociatedWikisV5Handler,
  createReqListChildWorkItemsDirectV4Handler,
  createReqListChildWorkItemsV4Handler,
  createReqListModuleSettingsV2Handler,
  createReqListProjectDomainsV2Handler,
  createReqListProjectWorkHourTypesV5Handler,
  createReqListWorkItemAssignedStatusConfigsHandler,
  createReqListWorkItemCommentsV2Handler,
  createReqListWorkItemCustomFieldsV4Handler,
  createReqListWorkItemQueriesHandler,
  createReqListWorkItemRecordsV2Handler,
  createReqListWorkSettingTemplatesV2Handler,
  createReqQueryScrumVersionWorkItemsV2Handler,
  mapReqAssociatedCodeV2,
  mapReqAssociatedWikisV5,
  mapReqChildWorkItemsDirectV4,
  mapReqChildWorkItemsV4,
  mapReqModuleSettingsV2,
  mapReqProjectDomainsV2,
  mapReqProjectWorkHourTypesV5,
  mapReqScrumVersionWorkItemsV2,
  mapReqWorkItemAssignedStatusConfigs,
  mapReqWorkItemCommentsV2,
  mapReqWorkItemCustomFieldsV4,
  mapReqWorkItemQueries,
  mapReqWorkItemRecordsV2,
  mapReqWorkSettingTemplatesV2
} from "../../../../src/products/req/tools/official-v2-read-tools.js";

describe("official V2/V4 Req read mappers", () => {
  it("maps work setting templates with raw payloads", () => {
    const result = mapReqWorkSettingTemplatesV2([
      {
        name: "Scrum template",
        description: "Default",
        creator: { nick_name: "szh" },
        source_project: { project_name: "mall4cloud" },
        count: 1
      }
    ]);

    expect(result.items?.[0]).toMatchObject({
      name: "Scrum template",
      description: "Default",
      creatorName: "szh",
      sourceProjectName: "mall4cloud",
      count: 1
    });
    expect(result.items?.[0]).toHaveProperty("rawTemplate");
  });

  it("maps module settings with pagination and raw payloads", () => {
    const result = mapReqModuleSettingsV2(
      [
        {
          id: 885859,
          name: "Promotion",
          path_name: "Promotion",
          is_parent: false,
          owner: { nick_name: "owner" }
        }
      ],
      1,
      20,
      1
    );

    expect(result.items?.[0]).toMatchObject({
      id: "885859",
      name: "Promotion",
      pathName: "Promotion",
      isParent: false,
      ownerName: "owner"
    });
    expect(result.page_info).toEqual({ page: 1, pageSize: 20, total: 1 });
  });

  it("maps project domain settings", () => {
    const result = mapReqProjectDomainsV2(
      [
        {
          id: 14,
          name: "Performance",
          flag: 1,
          project_uuid: "project-1",
          domain_id: 14
        }
      ],
      1,
      10,
      1
    );

    expect(result.items?.[0]).toMatchObject({
      id: "14",
      name: "Performance",
      flag: 1,
      projectUuid: "project-1",
      domainId: 14
    });
  });

  it("maps comments and records with readable timestamps", () => {
    const comments = mapReqWorkItemCommentsV2(
      [{ id: 1, notes: "<p>ok</p>", created_on: "1779267066000", user: { nick_name: "szh" } }],
      1,
      10,
      1
    );
    const records = mapReqWorkItemRecordsV2(
      [{ id: 2, notes: "updated", created_on: "1779267066000", user: { name: "szh" } }],
      1,
      10,
      1
    );

    expect(comments.items?.[0]).toMatchObject({
      id: "1",
      notes: "<p>ok</p>",
      createdOnText: "2026-05-20 16:51:06 Asia/Shanghai",
      authorName: "szh"
    });
    expect(records.items?.[0]).toMatchObject({
      id: "2",
      notes: "updated",
      createdOnText: "2026-05-20 16:51:06 Asia/Shanghai",
      actorName: "szh"
    });
  });

  it("maps V4 issue custom fields", () => {
    const result = mapReqWorkItemCustomFieldsV4([
      {
        custom_field: "custom_field16",
        name: "Business line",
        type: "text",
        tracker_ids: [2, 7]
      }
    ]);

    expect(result.items?.[0]).toMatchObject({
      customField: "custom_field16",
      name: "Business line",
      type: "text",
      trackerIds: [2, 7]
    });
  });

  it("maps official V2 work item saved queries with source scopes", () => {
    const result = mapReqWorkItemQueries(
      [{ id: "q-1", name: "Shared query" }],
      [{ id: "q-2", name: "My query" }]
    );

    expect(result.items).toEqual([
      expect.objectContaining({
        scope: "shared",
        name: "Shared query",
        rawQuery: { id: "q-1", name: "Shared query" }
      }),
      expect.objectContaining({
        scope: "created",
        name: "My query",
        rawQuery: { id: "q-2", name: "My query" }
      })
    ]);
    expect(result).toMatchObject({
      summary: "2 work item queries found",
      raw: {
        shared: [{ id: "q-1", name: "Shared query" }],
        created: [{ id: "q-2", name: "My query" }]
      }
    });
  });

  it("maps official V4 child work item groups", () => {
    const result = mapReqChildWorkItemsV4({
      "70779173": [
        {
          id: 70779174,
          subject: "Child story",
          status: { name: "New" },
          tracker: { name: "Story" }
        }
      ]
    });

    expect(result.items?.[0]).toMatchObject({
      parentId: "70779173",
      id: "70779174",
      title: "Child story",
      status: "New",
      type: "Story"
    });
    expect(result.raw).toHaveProperty("result");
  });

  it("maps official V2 associated code records", () => {
    const result = mapReqAssociatedCodeV2(
      [
        {
          relatedId: 70779173,
          type: "commit",
          branchName: "main",
          commitMsg: "fix work item",
          userName: "szh"
        }
      ],
      2,
      10,
      1
    );

    expect(result.items?.[0]).toMatchObject({
      id: "70779173",
      type: "commit",
      branchName: "main",
      commitMessage: "fix work item",
      userName: "szh"
    });
    expect(result.page_info).toEqual({ page: 2, pageSize: 10, total: 1 });
  });

  it("maps official V5 associated wiki records", () => {
    const result = mapReqAssociatedWikisV5(
      [
        {
          issue_id: "9164403",
          title: "Wiki A",
          wiki_id: "wiki-1",
          type: "Wiki",
          project: { name: "mall4cloud" },
          author: { nick_name: "szh" },
          created_date: "2025-08-07 10:08:05"
        }
      ],
      1
    );

    expect(result.items?.[0]).toMatchObject({
      issueId: "9164403",
      title: "Wiki A",
      wikiId: "wiki-1",
      type: "Wiki",
      projectName: "mall4cloud",
      authorName: "szh"
    });
    expect(result.raw).toHaveProperty("data");
  });

  it("maps official assigned status configs with raw payloads", () => {
    const result = mapReqWorkItemAssignedStatusConfigs([
      {
        id: 11,
        name: "In Review",
        definedName: "In Review",
        status_id: 3,
        tracker_id: 7,
        is_default: false
      }
    ]);

    expect(result.items?.[0]).toMatchObject({
      id: "11",
      definedName: "In Review"
    });
    expect(result.items?.[0]).toHaveProperty("rawConfig");
  });

  it("maps direct official V4 child work items with parent context", () => {
    const result = mapReqChildWorkItemsDirectV4([
      {
        id: 70779174,
        subject: "Child story",
        status: { name: "New" },
        tracker: { name: "Story" }
      }
    ]);

    expect(result.items?.[0]).toMatchObject({
      id: "70779174",
      title: "Child story",
      status: "New",
      type: "Story"
    });
    expect(result.raw).toHaveProperty("issues");
  });

  it("maps official V5 work hour types", () => {
    const result = mapReqProjectWorkHourTypesV5([
      {
        id: 21,
        name: "Development",
        status: 1
      }
    ]);

    expect(result.items?.[0]).toMatchObject({
      id: 21,
      name: "Development",
      status: 1
    });
    expect(result.raw).toHaveProperty("list");
  });

  it("maps official V2 scrum version work items", () => {
    const result = mapReqScrumVersionWorkItemsV2([
      {
        id: 70779173,
        subject: "Version story",
        status: { name: "Doing" },
        tracker: { name: "Story" },
        fixed_version: { id: 301, name: "Sprint 1" }
      }
    ]);

    expect(result.items?.[0]).toMatchObject({
      id: "70779173",
      title: "Version story"
    });
    expect(result.raw).toHaveProperty("issues");
  });
});

describe("official V2/V4 Req read schemas", () => {
  it("keeps inputs parseable from the barrel export", () => {
    expect(reqListWorkSettingTemplatesV2Input.parse({ search: "Scrum" })).toEqual({
      search: "Scrum"
    });
    expect(reqListModuleSettingsV2Input.parse({ project_id: "p-1", page: 1 })).toMatchObject({
      project_id: "p-1",
      page: 1,
      page_size: 20
    });
    expect(reqListProjectDomainsV2Input.parse({ project_id: "p-1", flag: 1, page: 1 })).toMatchObject({
      project_id: "p-1",
      flag: 1,
      page_size: 20
    });
    expect(reqListWorkItemCommentsV2Input.parse({ project_id: "p-1", work_item_id: "1", page: 1 })).toMatchObject({
      type: "scrum",
      page_size: 10
    });
    expect(reqListWorkItemRecordsV2Input.parse({ project_id: "p-1", work_item_id: "1", page: 1 })).toMatchObject({
      type: "scrum",
      page_size: 10
    });
    expect(reqListWorkItemCustomFieldsV4Input.parse({ project_id: "p-1", included_not_in_use: true })).toEqual({
      project_id: "p-1",
      included_not_in_use: true
    });
    expect(reqListWorkItemQueriesInput.parse({ project_id: "p-1" })).toEqual({
      project_id: "p-1"
    });
    expect(reqListChildWorkItemsV4Input.parse({ project_id: "p-1", parent_id: "70779173" })).toMatchObject({
      project_id: "p-1",
      parent_id: "70779173",
      query_type: "basic"
    });
    expect(reqListAssociatedCodeV2Input.parse({ project_id: "p-1", work_item_id: "70779173", page: 1 })).toMatchObject({
      project_id: "p-1",
      work_item_id: "70779173",
      page: 1,
      page_size: 20,
      type: "commit"
    });
    expect(reqListAssociatedWikisV5Input.parse({ project_id: "p-1", work_item_id: "70779173" })).toEqual({
      project_id: "p-1",
      work_item_id: "70779173"
    });
    expect(reqListWorkItemAssignedStatusConfigsInput.parse({ project_id: "p-1", work_item_id: "70779173" })).toEqual({
      project_id: "p-1",
      work_item_id: "70779173"
    });
    expect(reqListChildWorkItemsDirectV4Input.parse({ project_id: "p-1", work_item_id: "70779173" })).toEqual({
      project_id: "p-1",
      work_item_id: "70779173"
    });
    expect(reqListProjectWorkHourTypesV5Input.parse({ project_id: "p-1", status: 1 })).toEqual({
      project_id: "p-1",
      status: 1
    });
    expect(
      reqQueryScrumVersionWorkItemsV2Input.parse({
        project_id: "p-1",
        fixed_version_id: "301",
        subject: "version",
        tracker_id: "7",
        display_mode: "tree",
        issue_query: "assigned_to_id=me"
      })
    ).toEqual({
      project_id: "p-1",
      fixed_version_id: "301",
      subject: "version",
      tracker_id: "7",
      display_mode: "tree",
      issue_query: "assigned_to_id=me"
    });
  });
});

describe("official V2/V4 Req read handlers", () => {
  it("calls the matching clients and returns text plus structured content", async () => {
    const templatesClient = {
      listWorkSettingTemplatesV2: vi.fn(async () => ({ templates: [{ name: "Scrum" }] }))
    };
    const modulesClient = {
      listModuleSettingsV2: vi.fn(async () => ({ modules: [{ id: 1, name: "Backend" }], total: 1 }))
    };
    const domainsClient = {
      listProjectDomainsV2: vi.fn(async () => ({ domains: [{ id: 2, name: "Performance", flag: 1 }], total: 1 }))
    };
    const commentsClient = {
      listWorkItemCommentsV2: vi.fn(async () => ({ comments: [{ id: 3, notes: "ok" }], total: 1 }))
    };
    const recordsClient = {
      listWorkItemRecordsV2: vi.fn(async () => ({ records: [{ id: 4, notes: "updated" }], total: 1 }))
    };
    const customFieldsClient = {
      listWorkItemCustomFieldsV4: vi.fn(async () => ({
        custom_fields: [{ custom_field: "custom_field16", name: "Business line" }]
      }))
    };
    const queriesClient = {
      listWorkItemQueries: vi.fn(async () => ({
        shared: [{ id: "q-1", name: "Shared query" }],
        created: []
      }))
    };
    const childWorkItemsClient = {
      listChildWorkItemsV4: vi.fn(async () => ({
        result: {
          "70779173": [{ id: 70779174, subject: "Child story" }]
        }
      }))
    };
    const associatedCodeClient = {
      listAssociatedCodeV2: vi.fn(async () => ({
        items: [{ relatedId: 70779173, type: "commit", branchName: "main" }],
        total: 1
      }))
    };
    const associatedWikisV5Client = {
      listAssociatedWikisV5: vi.fn(async () => ({
        wikis: [{ issue_id: "9164403", title: "Wiki A", wiki_id: "wiki-1" }],
        total: 1
      }))
    };
    const assignedStatusConfigsClient = {
      listWorkItemAssignedStatusConfigs: vi.fn(async () => ({
        configs: [{ id: 11, definedName: "In Review" }]
      }))
    };
    const childWorkItemsDirectClient = {
      listChildWorkItemsDirectV4: vi.fn(async () => ({
        work_items: [{ id: 70779174, subject: "Child story" }]
      }))
    };
    const workHourTypesV5Client = {
      listProjectWorkHourTypesV5: vi.fn(async () => ({
        work_hours_types: [{ id: 21, name: "Development", status: 1 }]
      }))
    };
    const scrumVersionWorkItemsClient = {
      queryScrumVersionWorkItemsV2: vi.fn(async () => ({
        issues: [{ id: 70779173, subject: "Version story" }]
      }))
    };

    await expect(createReqListWorkSettingTemplatesV2Handler(templatesClient)({ search: "Scrum" })).resolves.toMatchObject({
      structuredContent: { summary: "1 work setting templates found" }
    });
    await expect(
      createReqListModuleSettingsV2Handler(modulesClient)({ project_id: "p-1", page: 1, page_size: 20 })
    ).resolves.toMatchObject({
      structuredContent: { summary: "1 module settings found" }
    });
    await expect(
      createReqListProjectDomainsV2Handler(domainsClient)({ project_id: "p-1", flag: 1, page: 1, page_size: 20 })
    ).resolves.toMatchObject({
      structuredContent: { summary: "1 project domain settings found" }
    });
    await expect(
      createReqListWorkItemCommentsV2Handler(commentsClient)({ project_id: "p-1", work_item_id: "3", page: 1 })
    ).resolves.toMatchObject({
      structuredContent: { summary: "1 work item comments found from V2" }
    });
    await expect(
      createReqListWorkItemRecordsV2Handler(recordsClient)({ project_id: "p-1", work_item_id: "3", page: 1 })
    ).resolves.toMatchObject({
      structuredContent: { summary: "1 work item records found from V2" }
    });
    await expect(
      createReqListWorkItemCustomFieldsV4Handler(customFieldsClient)({ project_id: "p-1", included_not_in_use: true })
    ).resolves.toMatchObject({
      structuredContent: { summary: "1 work item custom fields found from V4" }
    });
    await expect(createReqListWorkItemQueriesHandler(queriesClient)({ project_id: "p-1" })).resolves.toMatchObject({
      structuredContent: { summary: "1 work item queries found" }
    });
    await expect(
      createReqListChildWorkItemsV4Handler(childWorkItemsClient)({ project_id: "p-1", parent_id: "70779173" })
    ).resolves.toMatchObject({
      structuredContent: { summary: "1 child work items found from V4" }
    });
    await expect(
      createReqListAssociatedCodeV2Handler(associatedCodeClient)({
        project_id: "p-1",
        work_item_id: "70779173",
        page: 2,
        page_size: 10
      })
    ).resolves.toMatchObject({
      structuredContent: { summary: "1 associated code records found from V2" }
    });
    await expect(
      createReqListAssociatedWikisV5Handler(associatedWikisV5Client)({
        project_id: "p-1",
        work_item_id: "9164403"
      })
    ).resolves.toMatchObject({
      structuredContent: { summary: "1 associated wikis found from V5" }
    });
    await expect(
      createReqListWorkItemAssignedStatusConfigsHandler(assignedStatusConfigsClient)({
        project_id: "p-1",
        work_item_id: "70779173"
      })
    ).resolves.toMatchObject({
      structuredContent: { summary: "1 work item assigned status configs found" }
    });
    await expect(
      createReqListChildWorkItemsDirectV4Handler(childWorkItemsDirectClient)({
        project_id: "p-1",
        work_item_id: "70779173"
      })
    ).resolves.toMatchObject({
      structuredContent: { summary: "1 direct child work items found from V4" }
    });
    await expect(
      createReqListProjectWorkHourTypesV5Handler(workHourTypesV5Client)({
        project_id: "p-1",
        status: 1
      })
    ).resolves.toMatchObject({
      structuredContent: { summary: "1 project work hour types found from V5" }
    });
    await expect(
      createReqQueryScrumVersionWorkItemsV2Handler(scrumVersionWorkItemsClient)({
        project_id: "p-1",
        fixed_version_id: "301",
        subject: "version",
        tracker_id: "7",
        display_mode: "tree",
        issue_query: "assigned_to_id=me"
      })
    ).resolves.toMatchObject({
      structuredContent: { summary: "1 scrum version work items found from V2" }
    });

    expect(templatesClient.listWorkSettingTemplatesV2).toHaveBeenCalledWith({ search: "Scrum" });
    expect(modulesClient.listModuleSettingsV2).toHaveBeenCalledWith({ project_id: "p-1", page: 1, page_size: 20 });
    expect(domainsClient.listProjectDomainsV2).toHaveBeenCalledWith({
      project_id: "p-1",
      flag: 1,
      page: 1,
      page_size: 20
    });
    expect(commentsClient.listWorkItemCommentsV2).toHaveBeenCalledWith({
      project_id: "p-1",
      work_item_id: "3",
      page: 1,
      page_size: 10,
      type: "scrum"
    });
    expect(recordsClient.listWorkItemRecordsV2).toHaveBeenCalledWith({
      project_id: "p-1",
      work_item_id: "3",
      page: 1,
      page_size: 10,
      type: "scrum"
    });
    expect(customFieldsClient.listWorkItemCustomFieldsV4).toHaveBeenCalledWith({
      project_id: "p-1",
      included_not_in_use: true
    });
    expect(queriesClient.listWorkItemQueries).toHaveBeenCalledWith({ project_id: "p-1" });
    expect(childWorkItemsClient.listChildWorkItemsV4).toHaveBeenCalledWith({
      project_id: "p-1",
      parent_id: "70779173",
      query_type: "basic"
    });
    expect(associatedCodeClient.listAssociatedCodeV2).toHaveBeenCalledWith({
      project_id: "p-1",
      work_item_id: "70779173",
      page: 2,
      page_size: 10,
      type: "commit"
    });
    expect(associatedWikisV5Client.listAssociatedWikisV5).toHaveBeenCalledWith({
      project_id: "p-1",
      work_item_id: "9164403"
    });
    expect(assignedStatusConfigsClient.listWorkItemAssignedStatusConfigs).toHaveBeenCalledWith({
      project_id: "p-1",
      work_item_id: "70779173"
    });
    expect(childWorkItemsDirectClient.listChildWorkItemsDirectV4).toHaveBeenCalledWith({
      project_id: "p-1",
      work_item_id: "70779173"
    });
    expect(workHourTypesV5Client.listProjectWorkHourTypesV5).toHaveBeenCalledWith({
      project_id: "p-1",
      status: 1
    });
    expect(scrumVersionWorkItemsClient.queryScrumVersionWorkItemsV2).toHaveBeenCalledWith({
      project_id: "p-1",
      fixed_version_id: "301",
      subject: "version",
      tracker_id: "7",
      display_mode: "tree",
      issue_query: "assigned_to_id=me"
    });
  });
});
