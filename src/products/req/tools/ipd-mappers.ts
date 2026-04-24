export type ReqIpdProject = {
  id?: string;
  name?: string;
  project_type?: string;
  domain_id?: string;
  model_id?: string;
};

export type ReqIpdUser = {
  user_id?: string;
  id?: string | number;
  user_name?: string;
  name?: string;
  nick_name?: string;
  domain_id?: string;
  domain_name?: string;
};

export type ReqIpdIssue = {
  id?: string | number;
  number?: string;
  subject?: string;
  name?: string;
  title?: string;
  status?: string | { id?: string | number; name?: string; label?: string };
  category?: string | { id?: string | number; name?: string; label?: string };
  owner?: ReqIpdUser;
  assigned_to?: ReqIpdUser;
  assignee?: ReqIpdUser;
  created_time?: number | string;
  created_date?: number | string;
  updated_time?: number | string;
  modified_time?: number | string;
  modified_date?: number | string;
  children?: ReqIpdIssue[];
};

export type ReqIpdNamedItem = {
  id?: string | number;
  field_id?: string | number;
  code?: string;
  name?: string;
  number?: string;
  label?: string;
  icon?: string;
  title?: string;
  description?: string;
  display_name?: string;
  display_value?: string;
  value?: string;
  default_value?: string;
  field_type?: string;
  field_type_id?: string;
  field_type_name?: string;
  definition_type?: string;
  show?: boolean;
  show_on_card?: boolean;
  optional?: boolean;
  user_visibility?: boolean;
  has_update_privilege?: boolean;
  has_same_display_name?: boolean;
  color?: string;
  label_type?: string;
  parent_id?: string | number;
  position_float?: number;
  belonging?: string;
  created_date?: string;
  modified_date?: string;
  option?: ReqIpdNamedItem[];
  all_options?: ReqIpdNamedItem[];
  child_fs?: ReqIpdNamedItem[];
  children?: ReqIpdNamedItem[];
};

export type ReqIpdFieldUsage = {
  domain_id?: string;
  project_name?: string;
  project_id?: string;
  model_id?: string;
  create_by?: string;
  category_codes?: string;
  categories?: ReqIpdNamedItem[];
};

export type ReqIpdWiki = {
  wiki_id?: string;
  title?: string;
  issue_id?: string;
  type?: string;
  created_date?: string;
  region?: string;
  reigon?: string;
  identifier?: string;
  code?: string;
  sm_level_sequence?: string;
  project?: {
    project_id?: string;
    name?: string;
    project_type?: string;
  };
  author?: {
    id?: string;
    name?: string;
  };
};

export type ReqIpdDashboardItem = {
  category?: string;
  category_name?: string;
  total?: number;
  processing?: number;
  completed?: number;
  expired?: number;
  remain_di?: number;
};

export type ReqIpdAttachment = {
  id?: string | number;
  issue_id?: string | number;
  workitem_id?: string | number;
  file_name?: string;
  title?: string;
  store_filename?: string;
  file_size?: number | string;
  filesize?: number | string;
  attachment_type?: string;
  created_date?: string;
  status?: string;
};

export type ReqIpdWorkHour = {
  id?: string | number;
  title?: string;
  operation_id?: string | number;
  description?: string | null;
  workitem_id?: string | number;
  workitem?: {
    id?: string | number;
    plan_pi?: string | null;
    plan_iteration?: string | null;
    sum_workload_man_day?: string | number | null;
    workload_man_day?: string | number | null;
    convolution_plan_hours?: string | number | null;
    convolution_actual_hours?: string | number | null;
  };
  work_date?: string | number;
  created_by?: ReqIpdUser | string;
  modified_by?: ReqIpdUser | string;
  work_hour_category?: string | ReqIpdNamedItem;
  work_hours?: string | number;
};

export function mapIpdProject(item: ReqIpdProject) {
  return {
    id: item.id,
    name: item.name,
    projectType: item.project_type,
    domainId: item.domain_id,
    modelId: item.model_id
  };
}

export function mapIpdUser(item: ReqIpdUser) {
  return {
    id: item.user_id ?? item.id,
    name: item.nick_name ?? item.user_name ?? item.name,
    userName: item.user_name ?? item.name,
    domainId: item.domain_id,
    domainName: item.domain_name
  };
}

function mapStatus(status: ReqIpdIssue["status"]) {
  if (typeof status === "string") {
    return status;
  }

  return status?.label ?? status?.name ?? (typeof status?.id === "undefined" ? undefined : String(status.id));
}

export function mapIpdIssue(item: ReqIpdIssue) {
  return {
    id: item.id,
    number: item.number,
    title: item.subject ?? item.title ?? item.name,
    status: mapStatus(item.status),
    category: mapStatus(item.category),
    assigneeName: item.assigned_to?.nick_name ?? item.assigned_to?.user_name ?? item.assignee?.nick_name ?? item.assignee?.name,
    ownerName: item.owner?.nick_name ?? item.owner?.user_name,
    createdTime: item.created_time ?? item.created_date,
    updatedTime: item.updated_time ?? item.modified_time ?? item.modified_date,
    childrenCount: item.children?.length ?? 0
  };
}

export function mapIpdNamedItem(item: ReqIpdNamedItem) {
  return {
    id: item.id ?? item.field_id,
    fieldId: item.field_id,
    code: item.code,
    name: item.name ?? item.display_name ?? item.display_value ?? item.title ?? item.label,
    number: item.number,
    label: item.label,
    icon: item.icon,
    title: item.title,
    description: item.description,
    displayName: item.display_name,
    value: item.value,
    defaultValue: item.default_value,
    displayValue: item.display_value,
    fieldType: item.field_type,
    fieldTypeId: item.field_type_id,
    fieldTypeName: item.field_type_name,
    definitionType: item.definition_type,
    show: item.show,
    showOnCard: item.show_on_card,
    optional: item.optional,
    userVisibility: item.user_visibility,
    hasUpdatePrivilege: item.has_update_privilege,
    hasSameDisplayName: item.has_same_display_name,
    color: item.color,
    labelType: item.label_type,
    parentId: item.parent_id,
    positionFloat: item.position_float,
    belonging: item.belonging,
    createdDate: item.created_date,
    modifiedDate: item.modified_date,
    optionsCount: item.option?.length ?? item.all_options?.length ?? 0,
    childrenCount: item.children?.length ?? item.child_fs?.length ?? 0
  };
}

export function mapIpdFieldUsage(item: ReqIpdFieldUsage) {
  return {
    domainId: item.domain_id,
    projectName: item.project_name,
    projectId: item.project_id,
    modelId: item.model_id,
    createBy: item.create_by,
    categoryCodes: item.category_codes,
    categories: item.categories?.map(mapIpdNamedItem) ?? []
  };
}

export function mapIpdWiki(item: ReqIpdWiki) {
  return {
    id: item.wiki_id,
    title: item.title,
    issueId: item.issue_id,
    type: item.type,
    createdDate: item.created_date,
    region: item.region ?? item.reigon,
    identifier: item.identifier,
    code: item.code,
    smLevelSequence: item.sm_level_sequence,
    projectId: item.project?.project_id,
    projectName: item.project?.name,
    projectType: item.project?.project_type,
    authorId: item.author?.id,
    authorName: item.author?.name
  };
}

export function mapIpdDashboardItem(item: ReqIpdDashboardItem) {
  return {
    category: item.category,
    categoryName: item.category_name,
    total: item.total,
    processing: item.processing,
    completed: item.completed,
    expired: item.expired,
    remainDi: item.remain_di
  };
}

export function mapIpdAttachment(item: ReqIpdAttachment) {
  return {
    id: item.id,
    issueId: item.issue_id ?? item.workitem_id,
    fileName: item.file_name ?? item.title,
    storeFileName: item.store_filename,
    fileSize: item.file_size ?? item.filesize,
    attachmentType: item.attachment_type,
    status: item.status,
    createdDate: item.created_date
  };
}

function mapIpdUserLike(user: ReqIpdUser | string | undefined) {
  if (typeof user === "string") {
    return { id: user, name: user };
  }

  return user ? mapIpdUser(user) : undefined;
}

function mapWorkHourCategory(category: ReqIpdWorkHour["work_hour_category"]) {
  if (typeof category === "string") {
    return category;
  }

  return category?.display_value ?? category?.value ?? category?.name ?? category?.title;
}

export function mapIpdWorkHour(item: ReqIpdWorkHour) {
  return {
    id: item.id,
    title: item.title,
    operationId: item.operation_id,
    description: item.description,
    issueId: item.workitem_id ?? item.workitem?.id,
    planPi: item.workitem?.plan_pi,
    planIteration: item.workitem?.plan_iteration,
    plannedHours: item.workitem?.workload_man_day,
    actualHours: item.workitem?.sum_workload_man_day,
    convolutionPlanHours: item.workitem?.convolution_plan_hours,
    convolutionActualHours: item.workitem?.convolution_actual_hours,
    workDate: item.work_date,
    workHourCategory: mapWorkHourCategory(item.work_hour_category),
    workHours: item.work_hours,
    createdBy: mapIpdUserLike(item.created_by),
    modifiedBy: mapIpdUserLike(item.modified_by)
  };
}
