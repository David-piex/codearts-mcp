import { describe, expect, it } from "vitest";
import {
  createBuildAppendReleaseUploadStepHandler,
  previewAppendReleaseUploadStep,
  toBuildAppendReleaseUploadStepInput
} from "../../../../src/products/build/tools/append-release-upload-step.js";

describe("createBuildAppendReleaseUploadStepHandler", () => {
  it("maps dry-run input to the official release upload step with defaults", async () => {
    let captured: Record<string, unknown> | undefined;
    const handler = createBuildAppendReleaseUploadStepHandler({
      previewAppendJobStep: async (input) => {
        captured = input as Record<string, unknown>;

        return {
          job_id: "job-1",
          name: "gateway-build",
          appended_step_name: "Upload package to release repository",
          inserted_after_step_name: "Npm build",
          module_id: "devcloud2018.codeci_action_20018.action",
          step_count: 2,
          pre_condition: "SUCCESS",
          properties: {
            path: "demo.zip",
            name: "codearts-mcp",
            version: "1.0.0",
            upload_tool: "curl"
          }
        };
      },
      appendJobStep: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      job_id: "job-1",
      path: "demo.zip",
      package_name: "codearts-mcp",
      package_version: "1.0.0",
      insert_after_step_name: "Npm build"
    });

    expect(captured).toEqual(
      toBuildAppendReleaseUploadStepInput({
        job_id: "job-1",
        path: "demo.zip",
        package_name: "codearts-mcp",
        package_version: "1.0.0",
        insert_after_step_name: "Npm build",
        upload_tool: "curl",
        continue_on_failure: false,
        step_name: "Upload package to release repository",
        pre_condition: "SUCCESS",
        dry_run: true
      })
    );
    expect(result.structuredContent).toEqual(
      previewAppendReleaseUploadStep({
        job_id: "job-1",
        name: "gateway-build",
        appended_step_name: "Upload package to release repository",
        inserted_after_step_name: "Npm build",
        module_id: "devcloud2018.codeci_action_20018.action",
        step_count: 2,
        pre_condition: "SUCCESS",
        properties: {
          path: "demo.zip",
          name: "codearts-mcp",
          version: "1.0.0",
          upload_tool: "curl"
        }
      })
    );
  });

  it("executes appendJobStep with custom release-upload options", async () => {
    let captured: Record<string, unknown> | undefined;
    const handler = createBuildAppendReleaseUploadStepHandler({
      previewAppendJobStep: async () => {
        throw new Error("should not preview");
      },
      appendJobStep: async (input) => {
        captured = input as Record<string, unknown>;

        return {
          job_id: "job-1",
          name: "gateway-build",
          appended_step_name: "Publish release bundle",
          inserted_after_step_name: undefined,
          module_id: "devcloud2018.codeci_action_20018.action",
          step_count: 3,
          pre_condition: "ALWAYS",
          properties: {
            path: "dist/release.tgz",
            name: "webapp",
            version: "2.0.0",
            custom_upload_path: "/prod/webapp",
            upload_tool: "curl",
            ignore_fail: "true",
            preCondition: "ALWAYS"
          }
        };
      }
    });

    const result = await handler({
      job_id: "job-1",
      step_name: "Publish release bundle",
      path: "dist/release.tgz",
      package_name: "webapp",
      package_version: "2.0.0",
      custom_upload_path: "/prod/webapp",
      continue_on_failure: true,
      pre_condition: "ALWAYS",
      dry_run: false
    });

    expect(captured).toEqual(
      toBuildAppendReleaseUploadStepInput({
        job_id: "job-1",
        step_name: "Publish release bundle",
        path: "dist/release.tgz",
        package_name: "webapp",
        package_version: "2.0.0",
        custom_upload_path: "/prod/webapp",
        upload_tool: "curl",
        continue_on_failure: true,
        pre_condition: "ALWAYS",
        dry_run: false
      })
    );
    expect(result.structuredContent.item).toMatchObject({
      id: "job-1",
      stepName: "Publish release bundle",
      moduleId: "devcloud2018.codeci_action_20018.action",
      stepCount: 3,
      executed: true
    });
  });
});
