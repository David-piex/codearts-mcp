import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../src/core/config/env.js";
import { AppError } from "../../../src/core/errors/app-error.js";
import { createHttpClient } from "../../../src/core/http/client.js";
import {
  createReqClient,
  type ReqClient,
} from "../../../src/products/req/client.js";
import { findListedWorkItem } from "./live-smoke-helpers.js";

type WorkItemCommentSummary = Awaited<
  ReturnType<ReqClient["listWorkItemComments"]>
>["comments"][number];

function hasLiveEnv(source: NodeJS.ProcessEnv) {
  return Boolean(
    source.HUAWEICLOUD_BASE_URL &&
    source.HUAWEICLOUD_REGION &&
    source.HUAWEICLOUD_AK &&
    source.HUAWEICLOUD_SK &&
    source.HUAWEICLOUD_REQ_BASE_URL &&
    source.MCP_SERVER_NAME &&
    source.MCP_SERVER_VERSION,
  );
}

function readProjectIds(source: NodeJS.ProcessEnv) {
  const raw = source.HUAWEICLOUD_REQ_LIVE_PROJECT_IDS?.trim();

  if (!raw) {
    return [
      "7bd39587c14048aebdadd0f9c22b1402",
      "b60f3ec187f34c35ad3033d1d6d73876",
      "eed055d650fb49dd88e49e6bdf88d344",
      "eb80951449fa4af8bac57494f0f4defd",
    ];
  }

  const ids = raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return ids.length > 0 ? ids : [];
}

function readLiveWorkItem(source: NodeJS.ProcessEnv) {
  const projectId = source.HUAWEICLOUD_REQ_LIVE_WORK_ITEM_PROJECT_ID?.trim();
  const workItemId = source.HUAWEICLOUD_REQ_LIVE_WORK_ITEM_ID?.trim();

  if (!projectId || !workItemId) {
    return undefined;
  }

  return { projectId, workItemId };
}

function readExplicitWritableProjectId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_REQ_LIVE_WRITE_PROJECT_ID?.trim() || undefined;
}

function readRequirementPoolSample(source: NodeJS.ProcessEnv) {
  return {
    programId: source.HUAWEICLOUD_REQ_LIVE_PROGRAM_ID?.trim() || undefined,
    irId: source.HUAWEICLOUD_REQ_LIVE_IR_ID?.trim() || undefined,
    rrId: source.HUAWEICLOUD_REQ_LIVE_RR_ID?.trim() || undefined,
  };
}

function readIpdSample(source: NodeJS.ProcessEnv) {
  return {
    projectId: source.HUAWEICLOUD_REQ_LIVE_IPD_PROJECT_ID?.trim() || undefined,
    issueId: source.HUAWEICLOUD_REQ_LIVE_IPD_ISSUE_ID?.trim() || undefined,
    assignee: source.HUAWEICLOUD_REQ_LIVE_IPD_ASSIGNEE?.trim() || undefined,
    status: source.HUAWEICLOUD_REQ_LIVE_IPD_STATUS?.trim() || undefined,
    issueCategory:
      source.HUAWEICLOUD_REQ_LIVE_IPD_ISSUE_CATEGORY?.trim() || "Bug",
    groupFieldId:
      source.HUAWEICLOUD_REQ_LIVE_IPD_GROUP_FIELD_ID?.trim() || undefined,
    categoryId:
      source.HUAWEICLOUD_REQ_LIVE_IPD_CATEGORY_ID?.trim() || undefined,
    moduleParentId:
      source.HUAWEICLOUD_REQ_LIVE_IPD_MODULE_PARENT_ID?.trim() || undefined,
    featureSetParentId:
      source.HUAWEICLOUD_REQ_LIVE_IPD_FEATURE_SET_PARENT_ID?.trim() ||
      undefined,
    labelType:
      source.HUAWEICLOUD_REQ_LIVE_IPD_LABEL_TYPE?.trim() || "requirement",
    workHourCategory:
      source.HUAWEICLOUD_REQ_LIVE_IPD_WORK_HOUR_CATEGORY?.trim() || undefined,
    workHourType:
      source.HUAWEICLOUD_REQ_LIVE_IPD_WORK_HOUR_TYPE?.trim() || "1",
    flowCode: source.HUAWEICLOUD_REQ_LIVE_IPD_FLOW_CODE?.trim() || undefined,
    tenantFieldId:
      source.HUAWEICLOUD_REQ_LIVE_IPD_TENANT_FIELD_ID?.trim() || undefined,
    tenantFieldDisplayName:
      source.HUAWEICLOUD_REQ_LIVE_IPD_TENANT_FIELD_DISPLAY_NAME?.trim() ||
      undefined,
    projectFieldId:
      source.HUAWEICLOUD_REQ_LIVE_IPD_PROJECT_FIELD_ID?.trim() || undefined,
    projectFieldDisplayName:
      source.HUAWEICLOUD_REQ_LIVE_IPD_PROJECT_FIELD_DISPLAY_NAME?.trim() ||
      undefined,
  };
}

function readBooleanEnv(value?: string) {
  if (!value) {
    return false;
  }

  return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}

function readProjectMutationEnabled(source: NodeJS.ProcessEnv) {
  return readBooleanEnv(source.HUAWEICLOUD_REQ_LIVE_ENABLE_PROJECT_MUTATIONS);
}

function readIterationMutationEnabled(source: NodeJS.ProcessEnv) {
  return readBooleanEnv(source.HUAWEICLOUD_REQ_LIVE_ENABLE_ITERATION_MUTATIONS);
}

function readCommentMutationEnabled(source: NodeJS.ProcessEnv) {
  return readBooleanEnv(source.HUAWEICLOUD_REQ_LIVE_ENABLE_COMMENT_MUTATIONS);
}

function readIpdConfigMutationEnabled(source: NodeJS.ProcessEnv) {
  return readBooleanEnv(source.HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_CONFIG_MUTATIONS);
}

function readIpdIssueMutationEnabled(source: NodeJS.ProcessEnv) {
  return readBooleanEnv(source.HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_ISSUE_MUTATIONS);
}

function readIpdAttachmentMutationEnabled(source: NodeJS.ProcessEnv) {
  return readBooleanEnv(
    source.HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_ATTACHMENT_MUTATIONS,
  );
}

function readIpdWorkHourMutationEnabled(source: NodeJS.ProcessEnv) {
  return readBooleanEnv(
    source.HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_WORK_HOUR_MUTATIONS,
  );
}

function readIpdFlowMutationEnabled(source: NodeJS.ProcessEnv) {
  return readBooleanEnv(source.HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_FLOW_MUTATIONS);
}

function readIpdFieldConfigMutationEnabled(source: NodeJS.ProcessEnv) {
  return readBooleanEnv(
    source.HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_FIELD_CONFIG_MUTATIONS,
  );
}

function createPageInput<T extends Record<string, unknown>>(
  overrides?: T,
): {
  page: number;
  page_size: number;
} & T {
  return {
    page: 1,
    page_size: 20,
    ...(overrides ?? {}),
  } as {
    page: number;
    page_size: number;
  } & T;
}

function createProjectPageInput<T extends Record<string, unknown>>(
  projectId: string,
  overrides?: T,
): {
  project_id: string;
  page: number;
  page_size: number;
} & T {
  return {
    project_id: projectId,
    ...createPageInput(overrides),
  } as {
    project_id: string;
    page: number;
    page_size: number;
  } & T;
}

function createProjectWorkItemInput<T extends Record<string, unknown>>(
  projectId: string,
  workItemId: string,
  overrides?: T,
): {
  project_id: string;
  work_item_id: string;
} & T {
  return {
    project_id: projectId,
    work_item_id: workItemId,
    ...(overrides ?? {}),
  } as {
    project_id: string;
    work_item_id: string;
  } & T;
}

function createProjectWorkItemPageInput<T extends Record<string, unknown>>(
  projectId: string,
  workItemId: string,
  overrides?: T,
): {
  project_id: string;
  work_item_id: string;
  page: number;
  page_size: number;
} & T {
  return {
    ...createProjectWorkItemInput(projectId, workItemId),
    ...createPageInput(overrides),
  } as {
    project_id: string;
    work_item_id: string;
    page: number;
    page_size: number;
  } & T;
}

function createLiveName(prefix: string) {
  return `${prefix}-${Date.now()}`;
}

function isLiveBoundaryError(
  error: unknown,
  accepted: Array<{ code?: string; status?: number }>,
) {
  if (!(error instanceof AppError)) {
    return false;
  }

  return accepted.some(
    (entry) =>
      (typeof entry.code === "undefined" || entry.code === error.code) &&
      (typeof entry.status === "undefined" || entry.status === error.status),
  );
}

async function readOptionalLive<T>(
  load: () => Promise<T>,
  accepted: Array<{ code?: string; status?: number }>,
): Promise<{ ok: true; value: T } | { ok: false; error: AppError }> {
  try {
    return {
      ok: true,
      value: await load(),
    };
  } catch (error) {
    if (isLiveBoundaryError(error, accepted)) {
      return {
        ok: false,
        error: error as AppError,
      };
    }

    throw error;
  }
}

function createIsoDateOffset(daysFromNow: number) {
  const value = new Date();

  value.setUTCDate(value.getUTCDate() + daysFromNow);

  return value.toISOString().slice(0, 10);
}

function createUtcDateTimestamp(date: string) {
  return Date.parse(`${date}T00:00:00.000Z`);
}

function matchesLiveDateField(value: string | number | undefined, expectedDate: string) {
  if (typeof value === "undefined") {
    return false;
  }

  if (typeof value === "number") {
    return new Date(value).toISOString().startsWith(expectedDate);
  }

  if (/^\d+$/.test(value)) {
    return new Date(Number(value)).toISOString().startsWith(expectedDate);
  }

  return value.startsWith(expectedDate);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForValue<T>(
  load: () => Promise<T>,
  predicate: (value: T) => boolean,
  description: string,
  options?: {
    attempts?: number;
    delayMs?: number;
  },
): Promise<T> {
  const attempts = options?.attempts ?? 5;
  const delayMs = options?.delayMs ?? 1_000;
  let lastValue: T | undefined;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    lastValue = await load();

    if (predicate(lastValue)) {
      return lastValue;
    }

    if (attempt < attempts) {
      await delay(delayMs);
    }
  }

  throw new Error(`Timed out waiting for ${description}`);
}

async function findListedComment(
  client: Pick<ReqClient, "listWorkItemComments">,
  input: {
    projectId: string;
    workItemId: string;
    matcher: (comment: WorkItemCommentSummary) => boolean;
    pageSize?: number;
    maxPages?: number;
  },
): Promise<
  | {
      page: number;
      item: WorkItemCommentSummary;
    }
  | undefined
> {
  const pageSize = input.pageSize ?? 50;
  const maxPages = input.maxPages ?? 5;

  for (let page = 1; page <= maxPages; page += 1) {
    const listed = await client.listWorkItemComments(
      createProjectWorkItemPageInput(input.projectId, input.workItemId, {
        page,
        page_size: pageSize,
      }),
    );
    const found = listed.comments.find(input.matcher);

    if (found) {
      return {
        page,
        item: found,
      };
    }

    if (listed.comments.length < pageSize) {
      break;
    }
  }

  return undefined;
}

if (hasLiveEnv(process.env)) {
  describe("createReqClient live smoke", () => {
    const config = loadEnvConfig(process.env);
    const http = createHttpClient({
      baseUrl: config.reqBaseUrl,
      authHeaders: createHuaweiAuthHeaders(config.accessKey, config.secretKey),
    });
    const client = createReqClient(http);
    const configuredProjectIds = readProjectIds(process.env);
    const liveWorkItem = readLiveWorkItem(process.env);
    const explicitWritableProjectId = readExplicitWritableProjectId(
      process.env,
    );
    const requirementPoolSample = readRequirementPoolSample(process.env);
    const ipdSample = readIpdSample(process.env);
    const projectMutationsEnabled = readProjectMutationEnabled(process.env);
    const iterationMutationsEnabled = readIterationMutationEnabled(process.env);
    const commentMutationsEnabled = readCommentMutationEnabled(process.env);
    const ipdConfigMutationsEnabled =
      readIpdConfigMutationEnabled(process.env);
    const ipdIssueMutationsEnabled = readIpdIssueMutationEnabled(process.env);
    const ipdAttachmentMutationsEnabled =
      readIpdAttachmentMutationEnabled(process.env);
    const ipdWorkHourMutationsEnabled =
      readIpdWorkHourMutationEnabled(process.env);
    const ipdFlowMutationsEnabled = readIpdFlowMutationEnabled(process.env);
    const ipdFieldConfigMutationsEnabled =
      readIpdFieldConfigMutationEnabled(process.env);
    const readableProjectId = configuredProjectIds[0];

    it("lists projects and gets a real project", async () => {
      const result = await client.listProjects(createPageInput());

      expect(Array.isArray(result.projects)).toBe(true);
      expect(result.projects.length).toBeGreaterThan(0);

      const projectId = readableProjectId ?? result.projects[0]!.project_id;
      const project = await client.getProject({ project_id: projectId });

      expect(project.project_id).toBe(projectId);
      expect(typeof project.name).toBe("string");
    }, 30000);

    it("covers project management reads and optionally the create/update/delete loop", async () => {
      const probeName = createLiveName("mcp-live-project");
      const [nameCheck, notAdded] = await Promise.all([
        client.checkProjectName({
          name: probeName,
        }),
        client.listNotAddedProjects(createPageInput()),
      ]);

      expect(typeof nameCheck.exist).toBe("boolean");
      expect(Array.isArray(notAdded.projects)).toBe(true);

      if (!projectMutationsEnabled) {
        return;
      }

      const description = "Req live project";
      const updatedName = `${probeName}-updated`;
      const updatedDescription = "Req live project updated";
      let createdProjectId: string | undefined;

      try {
        const created = await client.createProject({
          name: probeName,
          description,
        });

        createdProjectId = created.project_id;

        expect(created.project_id).toBeTruthy();
        expect(created.project_name).toBe(probeName);

        const createdDetail = await waitForValue(
          () => client.getProject({ project_id: created.project_id }),
          (project) => project.name === probeName,
          "created project details",
        );

        if (createdDetail.description !== undefined) {
          expect(createdDetail.description).toBe(description);
        }

        const updated = await client.updateProject({
          project_id: created.project_id,
          name: updatedName,
          description: updatedDescription,
        });

        expect(updated.project_id).toBe(created.project_id);
        expect(updated.project_name).toBe(updatedName);

        const refreshed = await waitForValue(
          () => client.getProject({ project_id: created.project_id }),
          (project) => project.name === updatedName,
          "updated project details",
        );

        expect(refreshed.name).toBe(updatedName);
        if (refreshed.description !== undefined) {
          expect(refreshed.description).toBe(updatedDescription);
        }
      } finally {
        if (createdProjectId) {
          const deleted = await client.deleteProject({
            project_id: createdProjectId,
          });

          expect(deleted).toEqual({
            project_id: createdProjectId,
            deleted: true,
          });
        }
      }
    }, 60000);

    it("lists iterations, gets iteration detail, and lists members for a configured project", async () => {
      const projectId = readableProjectId ?? explicitWritableProjectId;

      if (!projectId) {
        return;
      }

      const [iterations, members] = await Promise.all([
        client.listIterations(createProjectPageInput(projectId)),
        client.listProjectMembers(createProjectPageInput(projectId)),
      ]);

      expect(Array.isArray(iterations.iterations)).toBe(true);
      expect(Array.isArray(members.members)).toBe(true);
      expect(members.members.length).toBeGreaterThan(0);

      if (iterations.iterations[0]) {
        const detail = await client.getIteration({
          iteration_id: String(iterations.iterations[0].id),
        });

        expect(String(detail.iteration_id)).toBe(
          String(iterations.iterations[0].id),
        );
        expect(typeof detail.name).toBe("string");
      }
    }, 30000);

    it("covers plan reads for a configured project when plan samples exist", async () => {
      const projectId = readableProjectId ?? explicitWritableProjectId;

      if (!projectId) {
        return;
      }

      const plans = await client.listPlans(
        createProjectPageInput(projectId, {
          page_size: 20,
        }),
      );

      expect(Array.isArray(plans.plans)).toBe(true);

      if (!plans.plans[0]) {
        return;
      }

      const planId = String(plans.plans[0].id);
      const [detail, addableWorkItems, planWorkItems] = await Promise.all([
        client.getPlan({
          project_id: projectId,
          plan_id: planId,
        }),
        client.listPlanAddableWorkItems({
          project_id: projectId,
          plan_id: planId,
          page: 1,
          page_size: 20,
        }),
        client.listPlanWorkItems({
          project_id: projectId,
          plan_id: planId,
          page: 1,
          page_size: 20,
          show_type: "list",
        }),
      ]);

      expect(String(detail.id)).toBe(planId);
      expect(typeof detail.name).toBe("string");
      expect(Array.isArray(addableWorkItems.work_items)).toBe(true);
      expect(Array.isArray(planWorkItems.work_items)).toBe(true);
    }, 30000);

    it("covers requirement pool reads when the tenant exposes program samples", async () => {
      const severities = await client.listIssueSeverities({});

      expect(Array.isArray(severities.severities)).toBe(true);

      const programs = await readOptionalLive(
        () => client.listPrograms(createPageInput()),
        [{ code: "PM.00000014", status: 403 }],
      );

      if (!programs.ok) {
        expect(programs.error.code).toBe("PM.00000014");
        return;
      }

      expect(Array.isArray(programs.value.programs)).toBe(true);

      const programId =
        requirementPoolSample.programId ??
        programs.value.programs[0]?.program_id;

      if (!programId) {
        return;
      }

      const [irFields, rrFields, rrs] = await Promise.all([
        client.listProgramFields({
          program_id: String(programId),
          field_type: "IR",
        }),
        client.listProgramFields({
          program_id: String(programId),
          field_type: "RR",
        }),
        client.listRrs({
          program_id: String(programId),
          query_type: "ALL",
          page: 1,
          page_size: 20,
        }),
      ]);

      expect(Array.isArray(irFields.fields)).toBe(true);
      expect(Array.isArray(rrFields.fields)).toBe(true);
      expect(Array.isArray(rrs.rrs)).toBe(true);

      const rrId = requirementPoolSample.rrId ?? rrs.rrs[0]?.id;

      if (rrId) {
        const [statuses, histories] = await Promise.all([
          client.listRrStatuses({
            program_id: String(programId),
            rr_ids: [String(rrId)],
          }),
          client.listRrHistories({
            rr_id: String(rrId),
            page: 1,
            page_size: 20,
          }),
        ]);

        expect(Array.isArray(statuses.rr_status_list)).toBe(true);
        expect(Array.isArray(histories.histories)).toBe(true);
      }

      if (!requirementPoolSample.irId) {
        return;
      }

      const [ir, children, histories] = await Promise.all([
        client.getIr({
          program_id: String(programId),
          ir_id: requirementPoolSample.irId,
        }),
        client.listIrChildren({
          program_id: String(programId),
          ir_id: requirementPoolSample.irId,
          query_type: "RR",
          page: 1,
          page_size: 20,
        }),
        client.listIrHistories({
          ir_id: requirementPoolSample.irId,
          page: 1,
          page_size: 20,
        }),
      ]);

      expect(String(ir.id)).toBe(requirementPoolSample.irId);
      expect(Array.isArray(children.items)).toBe(true);
      expect(Array.isArray(histories.histories)).toBe(true);
    }, 30000);

    it("covers IPD tenant reads and project reads when IPD samples exist", async () => {
      const [projects, tenantIssues, tenantFields] = await Promise.all([
        client.listIpdProjects({}),
        client.listIpdTenantIssues({
          issue_type: ipdSample.issueCategory,
          page: 1,
          page_size: 20,
          filter_mode: "AND_OR",
        }),
        client.listIpdTenantFields({
          page: 1,
          page_size: 20,
        }),
      ]);

      expect(Array.isArray(projects.projects)).toBe(true);
      expect(Array.isArray(tenantIssues.issues)).toBe(true);
      expect(Array.isArray(tenantFields.fields)).toBe(true);

      const tenantField = tenantFields.fields.find(
        (field) => (field.id ?? field.field_id) && field.code,
      );

      if (tenantField) {
        const tenantFieldUsed = await readOptionalLive(
          () =>
            client.getIpdTenantFieldUsed({
              field_id: String(tenantField.id ?? tenantField.field_id),
            }),
          [{ code: "PM.02175301", status: 400 }],
        );

        if (tenantFieldUsed.ok) {
          expect(Array.isArray(tenantFieldUsed.value.usage)).toBe(true);
        } else {
          expect(tenantFieldUsed.error.code).toBe("PM.02175301");
        }

        const tenantOptionUsed = await client.getIpdTenantFieldOptionUsed({
          code: tenantField.code!,
        });

        expect(typeof tenantOptionUsed).toBe("object");
      }

      const projectId = ipdSample.projectId ?? projects.projects[0]?.id;

      if (!projectId) {
        return;
      }

      const [
        users,
        issues,
        issueTree,
        modules,
        statuses,
        relations,
        labels,
        projectFields,
        issueFields,
        workflows,
        workflowFields,
        snapshots,
        featureSets,
        dashboard,
        workHourCategories,
      ] = await Promise.all([
        client.listIpdProjectUsers({ project_id: String(projectId) }),
        client.listIpdIssues({
          project_id: String(projectId),
          issue_type: ipdSample.issueCategory,
          page: 1,
          page_size: 20,
          filter_mode: "AND_OR",
        }),
        client.listIpdIssueTree({
          project_id: String(projectId),
          category: ipdSample.issueCategory,
          page: 1,
          page_size: 20,
        }),
        client.listIpdModules({
          project_id: String(projectId),
          page: 1,
          page_size: 20,
        }),
        client.listIpdStatuses({
          project_id: String(projectId),
        }),
        client.listIpdIssueRelationConfig({
          project_id: String(projectId),
        }),
        client.listIpdLabels({
          project_id: String(projectId),
          page: 1,
          page_size: 20,
        }),
        client.listIpdProjectFields({
          project_id: String(projectId),
          page: 1,
          page_size: 20,
        }),
        client.listIpdIssueFields({
          project_id: String(projectId),
          category_id: ipdSample.issueCategory,
        }),
        client.listIpdWorkflowTemplates({
          project_id: String(projectId),
        }),
        client.listIpdWorkflowFields({
          project_id: String(projectId),
          category_id: ipdSample.issueCategory,
        }),
        client.listIpdSnapshotVersions({
          project_id: String(projectId),
        }),
        client.listIpdFeatureSets({
          project_id: String(projectId),
        }),
        client.getIpdStatisticDashboard({
          project_id: String(projectId),
          classification:
            ipdSample.issueCategory.toLowerCase() === "bug"
              ? "bug"
              : "requirement",
        }),
        client.listIpdWorkHourCategories({
          project_id: String(projectId),
        }),
      ]);

      expect(Array.isArray(users.users)).toBe(true);
      expect(Array.isArray(issues.issues)).toBe(true);
      expect(Array.isArray(issueTree.issues)).toBe(true);
      expect(Array.isArray(modules.modules)).toBe(true);
      expect(Array.isArray(statuses.statuses)).toBe(true);
      expect(Array.isArray(relations.relations)).toBe(true);
      expect(Array.isArray(labels.labels)).toBe(true);
      expect(Array.isArray(projectFields.fields)).toBe(true);
      expect(Array.isArray(issueFields.fields)).toBe(true);
      expect(Array.isArray(workflows.workflows)).toBe(true);
      expect(Array.isArray(workflowFields.fields)).toBe(true);
      expect(Array.isArray(snapshots.snapshots)).toBe(true);
      expect(Array.isArray(featureSets.feature_sets)).toBe(true);
      expect(Array.isArray(dashboard.items)).toBe(true);
      expect(Array.isArray(workHourCategories.categories)).toBe(true);

      const projectField = projectFields.fields.find((field) => field.code);

      if (projectField?.code) {
        const projectOptionUsed = await client.getIpdProjectFieldOptionUsed({
          project_id: String(projectId),
          code: projectField.code,
        });

        expect(typeof projectOptionUsed).toBe("object");
      }

      const snapshotId = snapshots.snapshots[0]?.id;
      const featureSetId = featureSets.feature_sets[0]?.id;

      if (snapshotId && featureSetId) {
        const snapshotFeatures = await client.listIpdSnapshotFeatures({
          project_id: String(projectId),
          snapshot_version_id: String(snapshotId),
          feature_set_id: String(featureSetId),
          page: 1,
          page_size: 20,
        });

        expect(Array.isArray(snapshotFeatures.issues)).toBe(true);
      }

      const fieldId = ipdSample.groupFieldId ?? projectFields.fields[0]?.id;

      if (fieldId) {
        const grouped = await client.groupIpdIssues({
          project_id: String(projectId),
          issue_type: ipdSample.issueCategory,
          group_field_id: String(fieldId),
          page: 1,
          page_size: 20,
          filter_mode: "AND_OR",
        });

        expect(Array.isArray(grouped.data)).toBe(true);
      }

      const categoryId = ipdSample.categoryId ?? statuses.statuses[0]?.id;

      if (categoryId) {
        const categoryStatuses = await client.listIpdCategoryStatuses({
          project_id: String(projectId),
          category_id: String(categoryId),
        });

        expect(Array.isArray(categoryStatuses.statuses)).toBe(true);
      }

      const issueId = ipdSample.issueId ?? issues.issues[0]?.id;

      if (!issueId) {
        return;
      }

      const [issue, graph, wikis, flowDetail, attachments] = await Promise.all([
        client.getIpdIssue({
          project_id: String(projectId),
          issue_id: String(issueId),
          version: "v2",
        }),
        client.getIpdE2EGraph({
          project_id: String(projectId),
          issue_id: String(issueId),
          category: ipdSample.issueCategory,
        }),
        client.listIpdAttachedWikis({
          project_id: String(projectId),
          issue_id: String(issueId),
          category: ipdSample.issueCategory,
        }),
        client.getIpdWorkItemFlowDetail({
          project_id: String(projectId),
          issue_id: String(issueId),
          issue_category: ipdSample.issueCategory,
        }),
        client.listIpdIssueAttachments({
          project_id: String(projectId),
          issue_id: String(issueId),
        }),
      ]);

      expect(String(issue.id)).toBe(String(issueId));
      expect(graph).toBeTruthy();
      expect(Array.isArray(wikis.wikis)).toBe(true);
      expect(Array.isArray(flowDetail.next_flow ?? [])).toBe(true);
      expect(Array.isArray(attachments.attachments)).toBe(true);
    }, 60000);

    it("covers board and cache reads for a configured project", async () => {
      const projectId = readableProjectId ?? explicitWritableProjectId;

      if (!projectId) {
        return;
      }

      const [boardWorkItems, boardStatusRecords, jobCacheBoard, cacheData] =
        await Promise.all([
          readOptionalLive(
            () =>
              client.listBoardWorkItems(
                createProjectPageInput(projectId, {
                  page_size: 20,
                }),
              ),
            [{ code: "PM.02100002", status: 400 }],
          ),
          readOptionalLive(
            () =>
              client.listBoardWorkItemStatusRecords(
                createProjectPageInput(projectId, {
                  page_size: 20,
                }),
              ),
            [{ code: "PM.02100002", status: 400 }],
          ),
          client.listJobCacheBoards({
            project_id: projectId,
          }),
          client.listCacheData({
            project_id: projectId,
            type: "backlog",
          }),
        ]);

      if (boardWorkItems.ok) {
        expect(Array.isArray(boardWorkItems.value.work_items)).toBe(true);
      } else {
        expect(boardWorkItems.error.code).toBe("PM.02100002");
      }

      if (boardStatusRecords.ok) {
        expect(Array.isArray(boardStatusRecords.value.records)).toBe(true);
      } else {
        expect(boardStatusRecords.error.code).toBe("PM.02100002");
      }

      expect(Array.isArray(jobCacheBoard.fields)).toBe(true);
      expect(Array.isArray(cacheData.fields)).toBe(true);
    }, 30000);

    it("covers status, workflow, template, and public-config reads for a configured project", async () => {
      const projectId = readableProjectId ?? explicitWritableProjectId;

      if (!projectId) {
        return;
      }

      const statuses = await client.listWorkItemStatuses({
        project_id: projectId,
      });
      const supportedTrackerIds = new Set([2, 3, 5, 6, 7] as const);
      const trackerId =
        (statuses.issue_statuses
          .flatMap((item) => item.tracker_ids ?? [])
          .find((value): value is 2 | 3 | 5 | 6 | 7 =>
            supportedTrackerIds.has(value as 2 | 3 | 5 | 6 | 7),
          ) ??
          7) as 2 | 3 | 5 | 6 | 7;
      const [
        statusAttributes,
        statusDetails,
        statusConfigs,
        optionalStatusConfigs,
        publicConfig,
        workflowConfig,
        templates,
        templateConfig,
        customFields,
        statusRuleFlag,
        trackerHandlers,
      ] = await Promise.all([
        client.listWorkItemStatusAttributes({
          project_id: projectId,
        }),
        client.listWorkItemStatusDetails({
          project_id: projectId,
          tracker_id: trackerId,
        }),
        client.listWorkItemStatusConfigs({
          project_id: projectId,
          tracker_id: trackerId,
        }),
        client.listOptionalWorkItemStatusConfigs({
          project_id: projectId,
          tracker_id: trackerId,
        }),
        client.getProjectPublicConfig({
          project_id: projectId,
        }),
        client.listWorkItemWorkflowConfig({
          project_id: projectId,
          tracker_id: trackerId,
        }),
        client.listWorkItemTemplates({
          project_id: projectId,
          tracker_id: trackerId,
        }),
        client.getWorkItemTemplateConfig({
          project_id: projectId,
          tracker_id: trackerId,
        }),
        client.listWorkItemCustomFields({
          project_id: projectId,
          tracker_id: trackerId,
        }),
        client.getWorkItemStatusRuleFlag({
          project_id: projectId,
          tracker_id: trackerId,
        }),
        readOptionalLive(
          () =>
            client.listWorkItemTrackerHandlers({
              project_id: projectId,
              tracker_id: trackerId,
            }),
          [{ code: "DEV_21_61002", status: 400 }],
        ),
      ]);

      expect(Array.isArray(statuses.issue_statuses)).toBe(true);
      expect(Array.isArray(statusAttributes.issue_status_attributes)).toBe(true);
      expect(typeof statusDetails.grouped_statuses).toBe("object");
      expect(Array.isArray(statusConfigs.issue_statuses)).toBe(true);
      expect(Array.isArray(optionalStatusConfigs.issue_statuses)).toBe(true);
      expect(publicConfig.project_id).toBe(projectId);
      expect(Array.isArray(workflowConfig.workflows)).toBe(true);
      expect(Array.isArray(templates.templates)).toBe(true);
      expect(Array.isArray(templateConfig.templates)).toBe(true);
      expect(Array.isArray(customFields.custom_field)).toBe(true);
      expect(statusRuleFlag.project_id).toBe(projectId);
      if (trackerHandlers.ok) {
        expect(Array.isArray(trackerHandlers.value.tracker_handlers)).toBe(true);
      } else {
        expect(trackerHandlers.error.code).toBe("DEV_21_61002");
      }
    }, 60000);

    it("creates, updates, and deletes a live iteration when an explicit writable project is configured", async () => {
      if (!explicitWritableProjectId || !iterationMutationsEnabled) {
        return;
      }

      const iterationName = createLiveName("mcp-live-iteration");
      const beginTime = createIsoDateOffset(1);
      const endTime = createIsoDateOffset(8);
      const updatedEndTime = createIsoDateOffset(10);
      const description = "Req live iteration";
      const updatedDescription = "Req live iteration updated";
      const updatedName = `${iterationName}-updated`;
      let createdIterationId: string | undefined;

      try {
        const created = await client.createIteration({
          project_id: explicitWritableProjectId,
          name: iterationName,
          begin_time: beginTime,
          end_time: endTime,
          description,
        });

        createdIterationId = String(created.id);

        expect(created.project_id).toBe(explicitWritableProjectId);
        expect(created.name).toBe(iterationName);

        const createdDetail = await waitForValue(
          () =>
            client.getIteration({
              iteration_id: createdIterationId!,
            }),
          (iteration) =>
            String(iteration.iteration_id) === createdIterationId &&
            iteration.name === iterationName,
          "created iteration details",
        );

        expect(createdDetail.description).toBe(description);

        const updated = await client.updateIteration({
          project_id: explicitWritableProjectId,
          iteration_id: createdIterationId,
          name: updatedName,
          begin_time: beginTime,
          end_time: updatedEndTime,
          description: updatedDescription,
        });

        expect(updated.iteration_id).toBe(createdIterationId);
        expect(updated.name).toBe(updatedName);

        const refreshed = await waitForValue(
          () =>
            client.getIteration({
              iteration_id: createdIterationId!,
            }),
          (iteration) =>
            iteration.name === updatedName &&
            iteration.description === updatedDescription,
          "updated iteration details",
        );

        expect(refreshed.name).toBe(updatedName);
        expect(refreshed.description).toBe(updatedDescription);

        const listed = await waitForValue(
          () =>
            client.listIterations(
              createProjectPageInput(explicitWritableProjectId, {
                page_size: 50,
              }),
            ),
          (result) =>
            result.iterations.some(
              (iteration) =>
                String(iteration.id) === createdIterationId &&
                iteration.name === updatedName,
            ),
          "updated iteration to appear in the iteration list",
        );
        const listedIteration = listed.iterations.find(
          (iteration) => String(iteration.id) === createdIterationId,
        );

        expect(listedIteration?.name).toBe(updatedName);
      } finally {
        if (createdIterationId) {
          const deleted = await client.deleteIteration({
            project_id: explicitWritableProjectId,
            iteration_id: createdIterationId,
          });

          expect(deleted).toEqual({
            project_id: explicitWritableProjectId,
            iteration_id: createdIterationId,
            deleted: true,
          });
        }
      }
    }, 60000);

    it("creates, gets, updates, lists, and inspects a real work item on the writable project", async () => {
      if (liveWorkItem) {
        const [workItem, comments, records] = await Promise.all([
          client.getWorkItem(
            createProjectWorkItemInput(
              liveWorkItem.projectId,
              liveWorkItem.workItemId,
            ),
          ),
          client.listWorkItemComments(
            createProjectWorkItemPageInput(
              liveWorkItem.projectId,
              liveWorkItem.workItemId,
              {
                page_size: 50,
              },
            ),
          ),
          client.listWorkItemRecords(
            createProjectWorkItemPageInput(
              liveWorkItem.projectId,
              liveWorkItem.workItemId,
              {
                page_size: 50,
                journalized_type: "Issue",
              },
            ),
          ),
        ]);

        expect(String(workItem.id)).toBe(liveWorkItem.workItemId);
        expect(typeof workItem.subject).toBe("string");
        expect(Array.isArray(comments.comments)).toBe(true);
        expect(Array.isArray(records.records)).toBe(true);
        return;
      }

      if (!explicitWritableProjectId) {
        return;
      }

      const title = `mcp-live-story-date-${Date.now()}`;
      const startDate = createIsoDateOffset(14);
      const dueDate = createIsoDateOffset(21);
      const startDateTimestamp = createUtcDateTimestamp(startDate);
      const dueDateTimestamp = createUtcDateTimestamp(dueDate);
      let workItemId: string | undefined;

      try {
        const created = await client.createWorkItem({
          project_id: explicitWritableProjectId,
          title,
          work_item_type: "story",
          start_date: startDateTimestamp,
          due_date: dueDateTimestamp,
        });

        expect(typeof created.id).toMatch(/string|number/);
        expect(created.name).toBe(title);

        const createdWorkItemId = String(created.id);
        workItemId = createdWorkItemId;
        const got = await waitForValue(
          () =>
            client.getWorkItem(
              createProjectWorkItemInput(
                explicitWritableProjectId,
                createdWorkItemId,
              ),
            ),
          (workItem) =>
            String(workItem.id) === createdWorkItemId &&
            matchesLiveDateField(workItem.start_date, startDate) &&
            matchesLiveDateField(workItem.due_date, dueDate),
          "temporary live work item date fields to become readable",
        );

        expect(String(got.id)).toBe(createdWorkItemId);
        expect(got.subject).toBe(title);
        expect(got.tracker_name).toBe("Story");
        expect(matchesLiveDateField(got.start_date, startDate)).toBe(true);
        expect(matchesLiveDateField(got.due_date, dueDate)).toBe(true);

        const updatedTitle = `${title}-updated`;
        const updated = await client.updateWorkItem({
          ...createProjectWorkItemInput(
            explicitWritableProjectId,
            createdWorkItemId,
          ),
          title: updatedTitle,
        });

        expect(String(updated.id)).toBe(createdWorkItemId);
        expect(updated.name).toBe(updatedTitle);

        const found = await findListedWorkItem(client, {
          projectId: explicitWritableProjectId,
          workItemId: createdWorkItemId,
          pageSize: 20,
          maxPages: 5,
        });

        expect(found).toBeTruthy();
        expect(found?.item.subject).toBe(updatedTitle);

        const [comments, records] = await Promise.all([
          client.listWorkItemComments(
            createProjectWorkItemPageInput(
              explicitWritableProjectId,
              createdWorkItemId,
              {
                page_size: 50,
              },
            ),
          ),
          client.listWorkItemRecords(
            createProjectWorkItemPageInput(
              explicitWritableProjectId,
              createdWorkItemId,
              {
                page_size: 50,
                journalized_type: "Issue",
              },
            ),
          ),
        ]);

        expect(Array.isArray(comments.comments)).toBe(true);
        expect(Array.isArray(records.records)).toBe(true);
      } finally {
        if (workItemId) {
          const deleted = await client.deleteWorkItem({
            project_id: explicitWritableProjectId,
            work_item_id: workItemId,
          });

          expect(deleted).toEqual({
            project_id: explicitWritableProjectId,
            work_item_id: workItemId,
            deleted: true,
          });
        }
      }
    }, 30000);

    it("adds and updates a live comment on a temporary work item when an explicit writable project is configured", async () => {
      if (!explicitWritableProjectId || !commentMutationsEnabled) {
        return;
      }

      const title = createLiveName("mcp-live-comment-item");
      const created = await client.createWorkItem({
        project_id: explicitWritableProjectId,
        title,
        work_item_type: "task",
      });
      const workItemId = String(created.id);

      try {
        await waitForValue(
          () =>
            client.getWorkItem(
              createProjectWorkItemInput(explicitWritableProjectId, workItemId),
            ),
          (workItem) => String(workItem.id) === workItemId,
          "temporary live work item to become readable",
        );

        const commentContent = createLiveName("mcp-live-comment");

        await client.addWorkItemComment({
          project_id: explicitWritableProjectId,
          work_item_id: workItemId,
          content: commentContent,
        });

        const createdComment = await waitForValue(
          () =>
            findListedComment(client, {
              projectId: explicitWritableProjectId,
              workItemId,
              matcher: (comment) => comment.comment === commentContent,
            }),
          (entry) => Boolean(entry),
          "new work item comment to appear",
        );

        if (!createdComment) {
          throw new Error("Timed out waiting for the created comment entry");
        }

        expect(createdComment.item.comment).toBe(commentContent);

        const updatedCommentContent = `${commentContent}-updated`;
        const updated = await client.updateWorkItemComment({
          project_id: explicitWritableProjectId,
          work_item_id: workItemId,
          comment_id: String(createdComment.item.id),
          content: updatedCommentContent,
        });

        expect(updated.comment_id).toBe(String(createdComment.item.id));
        expect(updated.content).toBe(updatedCommentContent);

        const refreshedComment = await waitForValue(
          () =>
            findListedComment(client, {
              projectId: explicitWritableProjectId,
              workItemId,
              matcher: (comment) =>
                String(comment.id) === String(createdComment.item.id) &&
                comment.comment === updatedCommentContent,
            }),
          (entry) => Boolean(entry),
          "updated work item comment to appear",
        );

        if (!refreshedComment) {
          throw new Error("Timed out waiting for the updated comment entry");
        }

        expect(refreshedComment.item.comment).toBe(updatedCommentContent);

        const records = await client.listWorkItemRecords(
          createProjectWorkItemPageInput(
            explicitWritableProjectId,
            workItemId,
            {
              page_size: 50,
              journalized_type: "Issue",
            },
          ),
        );

        expect(Array.isArray(records.records)).toBe(true);
      } finally {
        const deleted = await client.deleteWorkItem({
          project_id: explicitWritableProjectId,
          work_item_id: workItemId,
        });

        expect(deleted).toEqual({
          project_id: explicitWritableProjectId,
          work_item_id: workItemId,
          deleted: true,
        });
      }
    }, 60000);

    it("creates, updates, and deletes IPD config resources when explicitly enabled", async () => {
      if (
        !ipdConfigMutationsEnabled ||
        !ipdSample.projectId ||
        !ipdSample.moduleParentId ||
        !ipdSample.featureSetParentId
      ) {
        return;
      }

      const suffix = Date.now();
      let moduleId: string | undefined;
      let labelId: string | undefined;
      let featureSetId: string | undefined;

      try {
        const createdModule = await client.createIpdModule({
          project_id: ipdSample.projectId,
          display_value: `mcp${String(suffix).slice(-8)}`,
          parent_id: ipdSample.moduleParentId,
          description: "codearts-mcp live smoke",
        });
        moduleId = String(createdModule.id);

        const updatedModule = await client.updateIpdModule({
          project_id: ipdSample.projectId,
          module_id: moduleId,
          display_value: `mcp${String(suffix).slice(-7)}u`,
          parent_id: ipdSample.moduleParentId,
        });

        expect(String(updatedModule.id ?? moduleId)).toBe(moduleId);

        const createdLabel = await client.createIpdLabel({
          project_id: ipdSample.projectId,
          label_type: ipdSample.labelType,
          color: "#86CAFF",
          title: `mcp${String(suffix).slice(-8)}`,
        });
        labelId = String(createdLabel.id);

        const updatedLabel = await client.updateIpdLabel({
          project_id: ipdSample.projectId,
          label_id: labelId,
          label_type: ipdSample.labelType,
          title: `mcp${String(suffix).slice(-7)}u`,
        });

        expect(String(updatedLabel.id ?? labelId)).toBe(labelId);

        const createdFeatureSet = await client.createIpdFeatureSet({
          project_id: ipdSample.projectId,
          title: `mcp-live-fs-${suffix}`,
          parent_id: ipdSample.featureSetParentId,
        });
        featureSetId = String(createdFeatureSet.id);

        const updatedFeatureSet = await client.updateIpdFeatureSet({
          project_id: ipdSample.projectId,
          feature_set_id: featureSetId,
          parent_id: ipdSample.featureSetParentId,
          title: `mcp-live-fs-${suffix}-updated`,
        });

        expect(String(updatedFeatureSet.id ?? featureSetId)).toBe(featureSetId);
      } finally {
        if (featureSetId) {
          await client.deleteIpdFeatureSet({
            project_id: ipdSample.projectId,
            feature_set_id: featureSetId,
          });
        }
        if (labelId) {
          await client.deleteIpdLabel({
            project_id: ipdSample.projectId,
            label_id: labelId,
          });
        }
        if (moduleId) {
          await client.deleteIpdModule({
            project_id: ipdSample.projectId,
            module_id: moduleId,
          });
        }
      }
    }, 60000);

    it("creates, updates, and deletes IPD issues when explicitly enabled", async () => {
      if (
        !ipdIssueMutationsEnabled ||
        !ipdSample.projectId ||
        !ipdSample.assignee ||
        !ipdSample.status
      ) {
        return;
      }

      const title = createLiveName("mcp-live-ipd-issue");
      let issueId: string | undefined;

      try {
        const created = await client.createIpdIssue({
          project_id: ipdSample.projectId,
          title,
          description: "codearts-mcp live smoke",
          category: ipdSample.issueCategory,
          assignee: ipdSample.assignee,
          status: ipdSample.status,
        });
        issueId = String(created[0]?.id);

        expect(issueId).toBeTruthy();

        await client.batchUpdateIpdIssues({
          project_id: ipdSample.projectId,
          issue_ids: [issueId],
          attribute: {
            category: ipdSample.issueCategory,
            title: `${title}-updated`,
          },
        });

        const refreshed = await client.getIpdIssue({
          project_id: ipdSample.projectId,
          issue_id: issueId,
          version: "v2",
        });

        expect(String(refreshed.id)).toBe(issueId);
      } finally {
        if (issueId) {
          await client.batchDeleteIpdIssues({
            project_id: ipdSample.projectId,
            issue_ids: [issueId],
            is_permanent_delete: false,
          });
        }
      }
    }, 60000);

    it("uploads IPD issue attachments and images when explicitly enabled", async () => {
      if (
        !ipdAttachmentMutationsEnabled ||
        !ipdSample.projectId ||
        !ipdSample.issueId
      ) {
        return;
      }

      const suffix = Date.now();
      const fileName = `mcp-live-${suffix}.txt`;
      const imageName = `mcp-live-${suffix}.png`;

      const attachments = await client.uploadIpdIssueAttachment({
        project_id: ipdSample.projectId,
        issue_id: ipdSample.issueId,
        file_name: fileName,
        file_content: new TextEncoder().encode("codearts-mcp live smoke"),
        content_type: "text/plain",
      });

      expect(Array.isArray(attachments)).toBe(true);

      const attachmentId = attachments[0]?.id;

      if (attachmentId) {
        const downloaded = await client.downloadIpdIssueAttachment({
          project_id: ipdSample.projectId,
          attachment_id: String(attachmentId),
        });

        expect(downloaded.body.byteLength).toBeGreaterThan(0);
      }

      await client.uploadIpdIssueImage({
        project_id: ipdSample.projectId,
        issue_id: ipdSample.issueId,
        file_name: imageName,
        file_content: new Uint8Array([
          137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0,
          0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137, 0, 0, 0, 13, 73,
          68, 65, 84, 120, 156, 99, 248, 15, 4, 0, 9, 251, 3, 253, 167, 146,
          118, 245, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130,
        ]),
        content_type: "image/png",
      });

      await client.deleteIpdIssueImage({
        project_id: ipdSample.projectId,
        issue_id: ipdSample.issueId,
        file_name: imageName,
      });
    }, 60000);

    it("creates, updates, and deletes IPD work hours when explicitly enabled", async () => {
      if (
        !ipdWorkHourMutationsEnabled ||
        !ipdSample.projectId ||
        !ipdSample.issueId
      ) {
        return;
      }

      const today = new Date().toISOString().slice(0, 10);
      const before = await client.listIpdWorkHours({
        project_id: ipdSample.projectId,
        workitem_id: [ipdSample.issueId],
        page: 1,
        page_size: 20,
      });

      await client.createIpdWorkHour({
        project_id: ipdSample.projectId,
        issue_id: ipdSample.issueId,
        work_date_begin: today,
        work_date_end: today,
        work_hours: 1,
        work_hour_type: ipdSample.workHourType,
        include_weekend: true,
        ...(ipdSample.workHourCategory
          ? { work_hour_category: ipdSample.workHourCategory }
          : {}),
        description: "codearts-mcp live smoke",
      });

      const afterCreate = await client.listIpdWorkHours({
        project_id: ipdSample.projectId,
        workitem_id: [ipdSample.issueId],
        page: 1,
        page_size: 20,
      });
      const created = afterCreate.work_hours.find(
        (item) =>
          !before.work_hours.some(
            (previous) => String(previous.id) === String(item.id),
          ),
      );

      if (!created?.id) {
        return;
      }

      await client.updateIpdWorkHour({
        project_id: ipdSample.projectId,
        issue_id: ipdSample.issueId,
        workhour_id: String(created.id),
        work_hours: 2,
        description: "codearts-mcp live smoke updated",
      });

      await client.deleteIpdWorkHour({
        project_id: ipdSample.projectId,
        issue_id: ipdSample.issueId,
        workhour_id: String(created.id),
      });
    }, 60000);

    it("transfers an IPD issue flow when explicitly enabled", async () => {
      if (
        !ipdFlowMutationsEnabled ||
        !ipdSample.projectId ||
        !ipdSample.issueId ||
        !ipdSample.flowCode
      ) {
        return;
      }

      await client.transferIpdWorkItemFlow({
        project_id: ipdSample.projectId,
        issue_id: ipdSample.issueId,
        issue_category: ipdSample.issueCategory,
        flow_code: ipdSample.flowCode,
      });
    }, 60000);

    it("updates IPD field config when explicitly enabled", async () => {
      if (!ipdFieldConfigMutationsEnabled) {
        return;
      }

      if (ipdSample.tenantFieldId && ipdSample.tenantFieldDisplayName) {
        const updatedTenantField = await client.updateIpdTenantField({
          field_id: ipdSample.tenantFieldId,
          display_name: ipdSample.tenantFieldDisplayName,
        });

        expect(
          String(updatedTenantField.id ?? updatedTenantField.field_id),
        ).toBe(ipdSample.tenantFieldId);
      }

      if (
        ipdSample.projectId &&
        ipdSample.projectFieldId &&
        ipdSample.projectFieldDisplayName
      ) {
        const updatedProjectField = await client.updateIpdProjectField({
          project_id: ipdSample.projectId,
          field_id: ipdSample.projectFieldId,
          display_name: ipdSample.projectFieldDisplayName,
        });

        expect(
          String(updatedProjectField.id ?? updatedProjectField.field_id),
        ).toBe(ipdSample.projectFieldId);
      }
    }, 60000);
  });
} else {
  describe.skip("createReqClient live smoke", () => {});
}
