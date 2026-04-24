type ReqNamedValue = {
  id?: string | number;
  label?: string;
  name?: string;
  value?: unknown;
};

export type ReqProgramUser = {
  user_id?: string;
  user_name?: string;
  nick_name?: string;
  domain_id?: string;
  domain_name?: string;
};

export type ReqProgramInfo = {
  program_id?: string;
  name?: string;
  description?: string;
  created_time?: number;
  updated_time?: number;
  is_archived?: boolean;
  is_watched?: boolean;
  project_count?: number;
  owner?: ReqProgramUser;
  creator?: ReqProgramUser;
};

export type ReqRequirementPoolItem = {
  id?: string;
  ir_id?: string;
  rr_id?: string;
  status?: string | ReqNamedValue;
  accept_status?: string;
  created_time?: number;
  updated_time?: number;
  created_on?: string;
  updated_on?: string;
  subject?: string;
  custom_fields?: ReqNamedValue[];
  fields_map?: Record<string, ReqNamedValue>;
  src_program?: ReqProgramInfo;
  dst_program?: ReqProgramInfo;
  tags?: Array<{ tag_id?: string; name?: string }>;
  tag?: ReqNamedValue;
  tracker_id?: number;
};

export type ReqRequirementHistory = {
  id?: string | number;
  ir_id?: string;
  rr_id?: string;
  created_time?: number;
  field?: {
    field_id?: string;
    field_label?: string;
    old_value?: string;
    new_value?: string;
  };
  creator?: ReqProgramUser;
  operator?: ReqProgramUser;
};

function displayValue(value: unknown): string | undefined {
  if (value === null || typeof value === "undefined") {
    return undefined;
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    const rendered = value.map(displayValue).filter(Boolean);
    return rendered.length ? rendered.join(", ") : undefined;
  }

  if (typeof value === "object") {
    const candidate = value as { label?: unknown; name?: unknown; id?: unknown; value?: unknown };
    return (
      displayValue(candidate.label) ??
      displayValue(candidate.name) ??
      displayValue(candidate.value) ??
      displayValue(candidate.id)
    );
  }

  return undefined;
}

export function pickRequirementTitle(item: ReqRequirementPoolItem): string | undefined {
  if (item.subject) {
    return item.subject;
  }

  const fields = item.fields_map ?? {};
  const direct =
    fields.subject?.value ??
    fields.Subject?.value ??
    fields.title?.value ??
    fields.name?.value;

  if (direct) {
    return displayValue(direct);
  }

  return item.custom_fields
    ?.map((field) => {
      const key = `${field.name ?? ""} ${field.label ?? ""}`.toLowerCase();
      return key.includes("subject") || key.includes("title") || key.includes("名称") || key.includes("标题")
        ? displayValue(field.value)
        : undefined;
    })
    .find(Boolean);
}

export function mapRequirementPoolItem(item: ReqRequirementPoolItem) {
  const status =
    typeof item.status === "string"
      ? item.status
      : displayValue(item.status);

  return {
    id: item.id ?? item.ir_id ?? item.rr_id,
    title: pickRequirementTitle(item),
    status,
    acceptStatus: item.accept_status,
    sourceProgramId: item.src_program?.program_id,
    sourceProgramName: item.src_program?.name,
    destinationProgramId: item.dst_program?.program_id,
    destinationProgramName: item.dst_program?.name,
    trackerId: item.tracker_id,
    createdTime: item.created_time ?? item.created_on,
    updatedTime: item.updated_time ?? item.updated_on
  };
}

export function mapRequirementHistory(item: ReqRequirementHistory) {
  return {
    id: String(item.id ?? item.created_time ?? ""),
    irId: item.ir_id,
    rrId: item.rr_id,
    fieldId: item.field?.field_id,
    fieldLabel: item.field?.field_label,
    oldValue: item.field?.old_value,
    newValue: item.field?.new_value,
    createdTime: item.created_time,
    operatorId: item.operator?.user_id ?? item.creator?.user_id,
    operatorName: item.operator?.nick_name ?? item.operator?.user_name ?? item.creator?.nick_name ?? item.creator?.user_name
  };
}
