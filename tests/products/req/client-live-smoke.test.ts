import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../src/core/config/env.js";
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

function createIsoDateOffset(daysFromNow: number) {
  const value = new Date();

  value.setUTCDate(value.getUTCDate() + daysFromNow);

  return value.toISOString().slice(0, 10);
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
    const projectMutationsEnabled = readProjectMutationEnabled(process.env);
    const iterationMutationsEnabled = readIterationMutationEnabled(process.env);
    const commentMutationsEnabled = readCommentMutationEnabled(process.env);
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

        expect(createdDetail.description).toBe(description);

        const updated = await client.updateProject({
          project_id: created.project_id,
          name: updatedName,
          description: updatedDescription,
        });

        expect(updated.project_id).toBe(created.project_id);
        expect(updated.project_name).toBe(updatedName);

        const refreshed = await waitForValue(
          () => client.getProject({ project_id: created.project_id }),
          (project) =>
            project.name === updatedName &&
            project.description === updatedDescription,
          "updated project details",
        );

        expect(refreshed.name).toBe(updatedName);
        expect(refreshed.description).toBe(updatedDescription);
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

      const title = `mcp-live-smoke-${Date.now()}`;
      let workItemId: string | undefined;

      try {
        const created = await client.createWorkItem({
          project_id: explicitWritableProjectId,
          title,
          work_item_type: "task",
        });

        expect(typeof created.id).toMatch(/string|number/);
        expect(created.name).toBe(title);

        workItemId = String(created.id);
        const got = await client.getWorkItem(
          createProjectWorkItemInput(explicitWritableProjectId, workItemId),
        );

        expect(String(got.id)).toBe(workItemId);
        expect(got.subject).toBe(title);

        const updatedTitle = `${title}-updated`;
        const updated = await client.updateWorkItem({
          ...createProjectWorkItemInput(explicitWritableProjectId, workItemId),
          title: updatedTitle,
        });

        expect(String(updated.id)).toBe(workItemId);
        expect(updated.name).toBe(updatedTitle);

        const found = await findListedWorkItem(client, {
          projectId: explicitWritableProjectId,
          workItemId,
          pageSize: 20,
          maxPages: 5,
        });

        expect(found).toBeTruthy();
        expect(found?.item.subject).toBe(updatedTitle);

        const [comments, records] = await Promise.all([
          client.listWorkItemComments(
            createProjectWorkItemPageInput(
              explicitWritableProjectId,
              workItemId,
              {
                page_size: 50,
              },
            ),
          ),
          client.listWorkItemRecords(
            createProjectWorkItemPageInput(
              explicitWritableProjectId,
              workItemId,
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
  });
} else {
  describe.skip("createReqClient live smoke", () => {});
}
