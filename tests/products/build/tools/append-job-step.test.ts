import { describe, expect, it } from "vitest";
import {
  createBuildAppendJobStepHandler,
  mapAppendedJobStep,
  previewAppendJobStep
} from "../../../../src/products/build/tools/append-job-step.js";

describe("createBuildAppendJobStepHandler", () => {
  it("returns a dry-run preview by default", async () => {
    const handler = createBuildAppendJobStepHandler({
      previewAppendJobStep: async () => ({
        job_id: "job-1",
        name: "gateway-build",
        appended_step_name: "Upload package to release repository",
        inserted_after_step_name: "Npm build",
        module_id: "official.release.upload",
        step_count: 2,
        image: undefined,
        command: undefined,
        pre_condition: "SUCCESS",
        properties: {
          path: "dist/demo.zip",
          name: "demo"
        }
      }),
      appendJobStep: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      job_id: "job-1",
      step_name: "Upload package to release repository",
      module_id: "official.release.upload",
      insert_after_step_name: "Npm build",
      properties: {
        path: "dist/demo.zip",
        name: "demo"
      }
    });

    expect(result.structuredContent).toEqual(
      previewAppendJobStep({
        job_id: "job-1",
        name: "gateway-build",
        appended_step_name: "Upload package to release repository",
        inserted_after_step_name: "Npm build",
        module_id: "official.release.upload",
        step_count: 2,
        image: undefined,
        command: undefined,
        pre_condition: "SUCCESS",
        properties: {
          path: "dist/demo.zip",
          name: "demo"
        }
      })
    );
  });

  it("maps execution result into MCP output", async () => {
    const handler = createBuildAppendJobStepHandler({
      previewAppendJobStep: async () => {
        throw new Error("should not preview");
      },
      appendJobStep: async () => ({
        job_id: "job-1",
        name: "gateway-build",
        appended_step_name: "Upload package to release repository",
        inserted_after_step_name: "Npm build",
        module_id: "official.release.upload",
        step_count: 2,
        image: undefined,
        command: undefined,
        pre_condition: "SUCCESS",
        properties: {
          path: "dist/demo.zip",
          name: "demo"
        }
      })
    });

    const result = await handler({
      job_id: "job-1",
      step_name: "Upload package to release repository",
      module_id: "official.release.upload",
      insert_after_step_name: "Npm build",
      properties: {
        path: "dist/demo.zip",
        name: "demo"
      },
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual(
      mapAppendedJobStep({
        job_id: "job-1",
        name: "gateway-build",
        appended_step_name: "Upload package to release repository",
        inserted_after_step_name: "Npm build",
        module_id: "official.release.upload",
        step_count: 2,
        image: undefined,
        command: undefined,
        pre_condition: "SUCCESS",
        properties: {
          path: "dist/demo.zip",
          name: "demo"
        }
      }).item
    );
  });
});
