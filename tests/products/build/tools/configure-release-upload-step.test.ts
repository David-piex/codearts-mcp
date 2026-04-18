import { describe, expect, it } from "vitest";
import {
  createBuildConfigureReleaseUploadStepHandler,
  previewConfigureReleaseUploadStep
} from "../../../../src/products/build/tools/configure-release-upload-step.js";

describe("createBuildConfigureReleaseUploadStepHandler", () => {
  it("returns a dry-run preview by default", async () => {
    const handler = createBuildConfigureReleaseUploadStepHandler({
      previewConfigureReleaseUploadStep: async () => ({
        job_id: "job-1",
        name: "gateway-build",
        configured_step_name: "Upload package to release repository",
        module_id: "devcloud2018.codeci_action_20018.action",
        file: "codearts-mcp.tgz",
        package_name: "codearts-mcp",
        build_version: "1.0.0",
        custom_upload_path: "",
        upload_tool: "curl",
        remain_origin_path: "FLAT",
        pre_condition: "SUCCESS"
      }),
      configureReleaseUploadStep: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      job_id: "job-1",
      file: "codearts-mcp.tgz",
      build_version: "1.0.0"
    });

    expect(result.structuredContent).toEqual(
      previewConfigureReleaseUploadStep({
        job_id: "job-1",
        name: "gateway-build",
        configured_step_name: "Upload package to release repository",
        module_id: "devcloud2018.codeci_action_20018.action",
        file: "codearts-mcp.tgz",
        package_name: "codearts-mcp",
        build_version: "1.0.0",
        custom_upload_path: "",
        upload_tool: "curl",
        remain_origin_path: "FLAT",
        pre_condition: "SUCCESS"
      })
    );
  });

  it("maps execution result into MCP output", async () => {
    const handler = createBuildConfigureReleaseUploadStepHandler({
      previewConfigureReleaseUploadStep: async () => {
        throw new Error("should not preview");
      },
      configureReleaseUploadStep: async () => ({
        job_id: "job-1",
        name: "gateway-build",
        configured_step_name: "Upload package to release repository",
        module_id: "devcloud2018.codeci_action_20018.action",
        file: "codearts-mcp.tgz",
        package_name: "codearts-mcp",
        build_version: "1.0.0",
        custom_upload_path: "",
        upload_tool: "curl",
        remain_origin_path: "FLAT",
        pre_condition: "SUCCESS"
      })
    });

    const result = await handler({
      job_id: "job-1",
      file: "codearts-mcp.tgz",
      build_version: "1.0.0",
      dry_run: false
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "job-1",
      stepName: "Upload package to release repository",
      moduleId: "devcloud2018.codeci_action_20018.action",
      file: "codearts-mcp.tgz",
      buildVersion: "1.0.0",
      executed: true
    });
  });
});
