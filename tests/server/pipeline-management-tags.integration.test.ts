import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createSessionAwarePipelineCreateTagHandler,
  createSessionAwarePipelineDeleteTagHandler,
  createSessionAwarePipelineSetTagsForPipelinesHandler,
  createSessionAwarePipelineUpdateTagHandler
} from "../../src/server/create-server.js";
import { executeSessionAwareHandler } from "./http-test-helpers.js";

describe("pipeline management integration", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("executes pipeline_create_tag through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineCreateTagHandler,
      input: {
        project_id: "project-1",
        name: "release",
        color: "#0b81f6",
        dry_run: false
      },
      responsePayload: {
        success: true
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          projectId: "project-1",
          name: "release",
          color: "#0b81f6",
          success: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v5/project-1/api/pipeline-tag/create");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"name\":\"release\"");
    expect(String(request.init.body)).toContain("\"color\":\"#0b81f6\"");
  });

  it("executes pipeline_update_tag through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineUpdateTagHandler,
      input: {
        project_id: "project-1",
        tag_id: "tag-1",
        name: "release-v2",
        color: "#12a57a",
        dry_run: false
      },
      responsePayload: {
        success: true
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "tag-1",
          projectId: "project-1",
          tagId: "tag-1",
          name: "release-v2",
          color: "#12a57a",
          success: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v5/project-1/api/pipeline-tag/update");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"tagId\":\"tag-1\"");
    expect(String(request.init.body)).toContain("\"name\":\"release-v2\"");
    expect(String(request.init.body)).toContain("\"color\":\"#12a57a\"");
  });

  it("executes pipeline_delete_tag through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineDeleteTagHandler,
      input: {
        project_id: "project-1",
        tag_id: "tag-1",
        dry_run: false
      },
      responsePayload: {
        success: true
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "tag-1",
          projectId: "project-1",
          tagId: "tag-1",
          success: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v5/project-1/api/pipeline-tag/delete?");
    expect(String(request.url)).toContain("tagId=tag-1");
    expect(request.init.method).toBe("DELETE");
  });

  it("executes pipeline_set_tags_for_pipelines through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineSetTagsForPipelinesHandler,
      input: {
        project_id: "project-1",
        pipeline_ids: ["pipeline-1", "pipeline-2"],
        tag_ids: ["tag-1", "tag-2"],
        dry_run: false
      },
      responsePayload: {
        success: true
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          projectId: "project-1",
          pipelineIds: ["pipeline-1", "pipeline-2"],
          tagIds: ["tag-1", "tag-2"],
          success: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v5/project-1/api/pipeline-tag/set-tags");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"pipelineList\":[\"pipeline-1\",\"pipeline-2\"]");
    expect(String(request.init.body)).toContain("\"tagList\":[\"tag-1\",\"tag-2\"]");
  });
});
