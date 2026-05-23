import { describe, expect, it, vi } from "vitest";
import {
  reqListModuleSettingsV2Input,
  reqListProjectDomainsV2Input,
  reqListWorkItemCommentsV2Input,
  reqListWorkItemCustomFieldsV4Input,
  reqListWorkItemRecordsV2Input,
  reqListWorkSettingTemplatesV2Input
} from "../../../../src/products/req/schemas.js";
import {
  createReqListModuleSettingsV2Handler,
  createReqListProjectDomainsV2Handler,
  createReqListWorkItemCommentsV2Handler,
  createReqListWorkItemCustomFieldsV4Handler,
  createReqListWorkItemRecordsV2Handler,
  createReqListWorkSettingTemplatesV2Handler,
  mapReqModuleSettingsV2,
  mapReqProjectDomainsV2,
  mapReqWorkItemCommentsV2,
  mapReqWorkItemCustomFieldsV4,
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
  });
});
