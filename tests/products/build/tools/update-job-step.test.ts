import { describe, expect, it } from "vitest";
import {
  createBuildUpdateJobStepHandler,
  previewUpdateJobStep
} from "../../../../src/products/build/tools/update-job-step.js";

describe("createBuildUpdateJobStepHandler", () => {
  it("returns a real dry-run preview by default", async () => {
    const handler = createBuildUpdateJobStepHandler({
      getJob: async () => ({
        job_id: "job-1",
        name: "gateway-build",
        steps: [
          {
            name: "Npm构建",
            image: "nodejs18",
            command: "npm ci\nnpm run build",
            pre_condition: "SUCCESS"
          }
        ]
      }),
      updateJobStep: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      job_id: "job-1",
      step_name: "Npm构建",
      image: "nodejs20.18.0"
    });

    expect(result.structuredContent).toEqual(
      previewUpdateJobStep({
        job_id: "job-1",
        name: "gateway-build",
        step_name: "Npm构建",
        image: "nodejs20.18.0",
        command: "npm ci\nnpm run build",
        pre_condition: "SUCCESS",
        dry_run: true
      })
    );
  });

  it("fails in dry-run mode when the target step does not exist", async () => {
    const handler = createBuildUpdateJobStepHandler({
      getJob: async () => ({
        job_id: "job-1",
        name: "gateway-build",
        steps: [
          {
            name: "Npm构建",
            image: "nodejs18",
            command: "npm ci\nnpm run build",
            pre_condition: "SUCCESS"
          }
        ]
      }),
      updateJobStep: async () => {
        throw new Error("should not execute");
      }
    });

    await expect(
      handler({
        job_id: "job-1",
        step_name: "Missing step",
        image: "nodejs20.18.0"
      })
    ).rejects.toMatchObject({
      status: 404
    });
  });

  it("maps execution result into MCP output", async () => {
    const handler = createBuildUpdateJobStepHandler({
      getJob: async () => {
        throw new Error("should not preview");
      },
      updateJobStep: async () => ({
        job_id: "job-1",
        name: "gateway-build",
        updated_step_name: "Npm构建",
        image: "nodejs20.18.0",
        command: "npm ci && npm run build",
        pre_condition: "SUCCESS"
      })
    });

    const result = await handler({
      job_id: "job-1",
      step_name: "Npm构建",
      image: "nodejs20.18.0",
      command: "npm ci && npm run build",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "job-1",
      name: "gateway-build",
      stepName: "Npm构建",
      image: "nodejs20.18.0",
      command: "npm ci && npm run build",
      preCondition: "SUCCESS",
      executed: true
    });
  });
});
