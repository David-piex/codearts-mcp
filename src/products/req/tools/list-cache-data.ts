import { asItemResult } from "../../../contracts/tool-result.js";
import { reqListCacheDataInput } from "../schemas.js";

type ReqCacheOption = {
  id?: string;
  name?: string;
};

type ReqCacheField = {
  trackerList?: number[];
  name?: string;
  field?: string;
  isCustom?: boolean;
  option?: ReqCacheOption[];
  option_source?: string;
  type?: string;
  required?: boolean | number;
  fieldGroup?: string;
  sortable?: boolean;
  priorityOption?: ReqCacheOption[];
  severityOption?: ReqCacheOption[];
  trackerOption?: ReqCacheOption[];
  doneRatioOption?: ReqCacheOption[];
};

type ReqCacheData = {
  project_id?: string;
  type?: string;
  fields: ReqCacheField[];
  visible_fields: ReqCacheField[];
};

function normalizeOptions(items?: ReqCacheOption[]) {
  return (items ?? []).map((item) => ({
    id: item.id,
    name: item.name
  }));
}

function normalizeField(field: ReqCacheField) {
  return {
    trackerList: field.trackerList,
    name: field.name,
    field: field.field,
    isCustom: field.isCustom,
    option: normalizeOptions(field.option),
    optionSource: field.option_source,
    type: field.type,
    required: field.required,
    fieldGroup: field.fieldGroup,
    sortable: field.sortable,
    priorityOption: normalizeOptions(field.priorityOption),
    severityOption: normalizeOptions(field.severityOption),
    trackerOption: normalizeOptions(field.trackerOption),
    doneRatioOption: normalizeOptions(field.doneRatioOption)
  };
}

export function mapReqCacheData(input: ReqCacheData) {
  return asItemResult(`Loaded cache data for type ${input.type ?? "backlog"}`, {
    projectId: input.project_id,
    type: input.type ?? "backlog",
    fieldCount: input.fields.length,
    visibleFieldCount: input.visible_fields.length,
    fields: input.fields.map(normalizeField),
    visibleFields: input.visible_fields.map(normalizeField)
  });
}

type ReqListCacheDataClient = {
  listCacheData: (input: {
    project_id?: string;
    type?: string;
  }) => Promise<ReqCacheData>;
};

export function createReqListCacheDataHandler(client: ReqListCacheDataClient) {
  return async (input: unknown) => {
    const parsed = reqListCacheDataInput.parse(input);
    const response = await client.listCacheData(parsed);
    const result = mapReqCacheData(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
