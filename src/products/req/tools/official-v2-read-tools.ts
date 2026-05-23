import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import {
  reqListModuleSettingsV2Input,
  reqListProjectDomainsV2Input,
  reqListWorkItemCommentsV2Input,
  reqListWorkItemCustomFieldsV4Input,
  reqListWorkItemRecordsV2Input,
  reqListWorkSettingTemplatesV2Input
} from "../schemas.js";
import { formatReqTimestampText } from "./time-format.js";

type RawItem = Record<string, unknown>;

function stringValue(value: unknown) {
  if (typeof value === "undefined" || value === null) {
    return undefined;
  }

  return String(value);
}

function numberValue(value: unknown) {
  return typeof value === "number" ? value : undefined;
}

function userDisplayName(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  const user = value as Record<string, unknown>;
  return stringValue(user.nick_name) ?? stringValue(user.name) ?? stringValue(user.first_name) ?? stringValue(user.identifier);
}

export function mapReqWorkSettingTemplatesV2(items: RawItem[], total?: number) {
  return asListResult(
    `${items.length} work setting templates found`,
    items.map((item) => ({
      name: stringValue(item.name),
      description: stringValue(item.description),
      creatorName: userDisplayName(item.creator),
      sourceProjectName:
        item.source_project && typeof item.source_project === "object" && !Array.isArray(item.source_project)
          ? stringValue((item.source_project as Record<string, unknown>).project_name)
          : undefined,
      count: numberValue(item.count),
      rawTemplate: item
    })),
    typeof total === "undefined" ? undefined : toPageInfo(1, items.length, total),
    { templates: items }
  );
}

type ReqListWorkSettingTemplatesV2Client = {
  listWorkSettingTemplatesV2: (input: { search?: string }) => Promise<{
    templates: RawItem[];
    total?: number;
  }>;
};

export function createReqListWorkSettingTemplatesV2Handler(client: ReqListWorkSettingTemplatesV2Client) {
  return async (input: unknown) => {
    const parsed = reqListWorkSettingTemplatesV2Input.parse(input);
    const response = await client.listWorkSettingTemplatesV2(parsed);
    const result = mapReqWorkSettingTemplatesV2(response.templates, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "creator", get: (item) => (item as { creatorName?: string }).creatorName },
        { label: "sourceProject", get: (item) => (item as { sourceProjectName?: string }).sourceProjectName }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}

export function mapReqModuleSettingsV2(items: RawItem[], page: number, pageSize: number, total?: number) {
  return asListResult(
    `${items.length} module settings found`,
    items.map((item) => ({
      id: stringValue(item.id),
      name: stringValue(item.name),
      description: stringValue(item.description),
      depth: numberValue(item.deepth),
      path: stringValue(item.path),
      pathName: stringValue(item.path_name),
      isMatch: typeof item.is_match === "boolean" ? item.is_match : undefined,
      isParent: typeof item.is_parent === "boolean" ? item.is_parent : undefined,
      ownerName: userDisplayName(item.owner),
      rawModule: item
    })),
    toPageInfo(page, pageSize, total),
    { modules: items }
  );
}

type ReqListModuleSettingsV2Client = {
  listModuleSettingsV2: (input: {
    project_id: string;
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    modules: RawItem[];
    total?: number;
  }>;
};

export function createReqListModuleSettingsV2Handler(client: ReqListModuleSettingsV2Client) {
  return async (input: unknown) => {
    const parsed = reqListModuleSettingsV2Input.parse(input);
    const response = await client.listModuleSettingsV2(parsed);
    const result = mapReqModuleSettingsV2(response.modules, parsed.page, parsed.page_size, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "path", get: (item) => (item as { pathName?: string }).pathName }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}

export function mapReqProjectDomainsV2(items: RawItem[], page: number, pageSize: number, total?: number) {
  return asListResult(
    `${items.length} project domain settings found`,
    items.map((item) => ({
      id: stringValue(item.id),
      name: stringValue(item.name),
      flag: numberValue(item.flag),
      projectId: item.project_id,
      projectUuid: stringValue(item.project_uuid),
      domainId: item.domain_id,
      defaultDomain: numberValue(item.default_d),
      rawDomain: item
    })),
    toPageInfo(page, pageSize, total),
    { domains: items }
  );
}

type ReqListProjectDomainsV2Client = {
  listProjectDomainsV2: (input: {
    project_id: string;
    flag: number;
    page: number;
    page_size: number;
  }) => Promise<{
    domains: RawItem[];
    total?: number;
  }>;
};

export function createReqListProjectDomainsV2Handler(client: ReqListProjectDomainsV2Client) {
  return async (input: unknown) => {
    const parsed = reqListProjectDomainsV2Input.parse(input);
    const response = await client.listProjectDomainsV2(parsed);
    const result = mapReqProjectDomainsV2(response.domains, parsed.page, parsed.page_size, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "flag", get: (item) => (item as { flag?: number }).flag }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}

export function mapReqWorkItemCommentsV2(items: RawItem[], page: number, pageSize: number, total?: number) {
  return asListResult(
    `${items.length} work item comments found from V2`,
    items.map((item) => ({
      id: stringValue(item.id),
      notes: stringValue(item.notes),
      createdOn: item.created_on,
      createdOnText: formatReqTimestampText(stringValue(item.created_on)),
      authorName: userDisplayName(item.user),
      rawComment: item
    })),
    toPageInfo(page, pageSize, total),
    { comments: items }
  );
}

type ReqListWorkItemCommentsV2Client = {
  listWorkItemCommentsV2: (input: {
    project_id: string;
    work_item_id: string;
    page: number;
    page_size: number;
    type?: string;
  }) => Promise<{
    comments: RawItem[];
    total?: number;
  }>;
};

export function createReqListWorkItemCommentsV2Handler(client: ReqListWorkItemCommentsV2Client) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemCommentsV2Input.parse(input);
    const response = await client.listWorkItemCommentsV2(parsed);
    const result = mapReqWorkItemCommentsV2(response.comments, parsed.page, parsed.page_size, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "createdOn", get: (item) => (item as { createdOnText?: string }).createdOnText },
        { label: "author", get: (item) => (item as { authorName?: string }).authorName }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}

export function mapReqWorkItemRecordsV2(items: RawItem[], page: number, pageSize: number, total?: number) {
  return asListResult(
    `${items.length} work item records found from V2`,
    items.map((item) => ({
      id: stringValue(item.id),
      notes: stringValue(item.notes),
      createdOn: item.created_on,
      createdOnText: formatReqTimestampText(stringValue(item.created_on)),
      actorName: userDisplayName(item.user),
      details: Array.isArray(item.details) ? item.details : [],
      rawRecord: item
    })),
    toPageInfo(page, pageSize, total),
    { records: items }
  );
}

type ReqListWorkItemRecordsV2Client = {
  listWorkItemRecordsV2: (input: {
    project_id: string;
    work_item_id: string;
    page: number;
    page_size: number;
    type?: string;
  }) => Promise<{
    records: RawItem[];
    total?: number;
  }>;
};

export function createReqListWorkItemRecordsV2Handler(client: ReqListWorkItemRecordsV2Client) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemRecordsV2Input.parse(input);
    const response = await client.listWorkItemRecordsV2(parsed);
    const result = mapReqWorkItemRecordsV2(response.records, parsed.page, parsed.page_size, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "createdOn", get: (item) => (item as { createdOnText?: string }).createdOnText },
        { label: "actor", get: (item) => (item as { actorName?: string }).actorName }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}

export function mapReqWorkItemCustomFieldsV4(items: RawItem[]) {
  return asListResult(
    `${items.length} work item custom fields found from V4`,
    items.map((item) => ({
      customField: stringValue(item.custom_field),
      name: stringValue(item.name),
      type: stringValue(item.type),
      options: stringValue(item.options),
      trackerIds: Array.isArray(item.tracker_ids) ? item.tracker_ids : undefined,
      createdTime: stringValue(item.create_time),
      rawCustomField: item
    })),
    undefined,
    { customFields: items }
  );
}

type ReqListWorkItemCustomFieldsV4Client = {
  listWorkItemCustomFieldsV4: (input: {
    project_id: string;
    custom_fields?: string[];
    included_not_in_use?: boolean;
    names?: string[];
  }) => Promise<{
    custom_fields: RawItem[];
  }>;
};

export function createReqListWorkItemCustomFieldsV4Handler(client: ReqListWorkItemCustomFieldsV4Client) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemCustomFieldsV4Input.parse(input);
    const response = await client.listWorkItemCustomFieldsV4(parsed);
    const result = mapReqWorkItemCustomFieldsV4(response.custom_fields);
    const text = formatListToolText(result, {
      fields: [
        { label: "field", get: (item) => (item as { customField?: string }).customField },
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "type", get: (item) => (item as { type?: string }).type }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
