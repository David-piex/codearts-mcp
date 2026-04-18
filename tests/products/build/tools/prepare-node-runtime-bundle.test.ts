import { describe, expect, it } from "vitest";
import {
  BUNDLE_MARKER_END,
  BUNDLE_MARKER_START,
  buildNodeRuntimeBundleCommandBlock,
  createBuildPrepareNodeRuntimeBundleHandler,
  previewPrepareNodeRuntimeBundle
} from "../../../../src/products/build/tools/prepare-node-runtime-bundle.js";

describe("createBuildPrepareNodeRuntimeBundleHandler", () => {
  it("returns a dry-run preview using the first build step by default", async () => {
    const handler = createBuildPrepareNodeRuntimeBundleHandler({
      getJob: async () => ({
        job_id: "job-1",
        name: "gateway-build",
        step_count: 1,
        scm_repositories: [],
        steps: [
          {
            name: "Npm build",
            module_id: "devcloud2018.codeci_action_20014.action",
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
      job_id: "job-1"
    });

    expect(result.structuredContent).toEqual(
      previewPrepareNodeRuntimeBundle({
        job_id: "job-1",
        name: "gateway-build",
        target_step_name: "Npm build",
        output_file: "codearts-mcp.tgz",
        staging_dir: ".release-bundle",
        current_command: "npm ci\nnpm run build",
        updated_command: `npm ci\nnpm run build\n\n${buildNodeRuntimeBundleCommandBlock({
          output_file: "codearts-mcp.tgz",
          staging_dir: ".release-bundle"
        })}`,
        already_configured: false
      })
    );
  });

  it("appends the packaging block to the selected step command on execution", async () => {
    let updateInput: Record<string, unknown> | undefined;
    const handler = createBuildPrepareNodeRuntimeBundleHandler({
      getJob: async () => ({
        job_id: "job-1",
        name: "gateway-build",
        step_count: 2,
        scm_repositories: [],
        steps: [
          {
            name: "Npm build",
            module_id: "devcloud2018.codeci_action_20014.action",
            image: "nodejs18",
            command: "npm ci\nnpm run build",
            pre_condition: "SUCCESS"
          },
          {
            name: "Other",
            module_id: "x",
            command: "echo done",
            pre_condition: "SUCCESS"
          }
        ]
      }),
      updateJobStep: async (input) => {
        updateInput = input as Record<string, unknown>;

        return {
          job_id: "job-1",
          name: "gateway-build",
          updated_step_name: "Npm build",
          image: "nodejs18",
          command: String(input.command),
          pre_condition: "SUCCESS"
        };
      }
    });

    const result = await handler({
      job_id: "job-1",
      output_file: "release.tgz",
      staging_dir: ".bundle",
      dry_run: false
    });

    expect(updateInput).toEqual({
      job_id: "job-1",
      step_name: "Npm build",
      command: `npm ci\nnpm run build\n\n${buildNodeRuntimeBundleCommandBlock({
        output_file: "release.tgz",
        staging_dir: ".bundle"
      })}`,
      pre_condition: "SUCCESS"
    });
    expect(result.structuredContent.item).toMatchObject({
      id: "job-1",
      name: "gateway-build",
      targetStepName: "Npm build",
      outputFile: "release.tgz",
      stagingDir: ".bundle",
      executed: true
    });
  });

  it("fails when the target step is already configured with the bundle marker", async () => {
    const handler = createBuildPrepareNodeRuntimeBundleHandler({
      getJob: async () => ({
        job_id: "job-1",
        name: "gateway-build",
        step_count: 1,
        scm_repositories: [],
        steps: [
          {
            name: "Npm build",
            command: `npm ci\nnpm run build\n\n${BUNDLE_MARKER_START}\necho already\n# codex-node-runtime-bundle:end`,
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
        dry_run: false
      })
    ).rejects.toMatchObject({
      status: 409
    });
  });

  it("replaces an existing bundle block when replace_existing is enabled", async () => {
    let updateInput: Record<string, unknown> | undefined;
    const handler = createBuildPrepareNodeRuntimeBundleHandler({
      getJob: async () => ({
        job_id: "job-1",
        name: "gateway-build",
        step_count: 1,
        scm_repositories: [],
        steps: [
          {
            name: "Npm build",
            command:
              "npm ci\nnpm run build\n\n" +
              `${BUNDLE_MARKER_START}\n` +
              "echo old bundle\n" +
              `${BUNDLE_MARKER_END}`,
            pre_condition: "SUCCESS"
          }
        ]
      }),
      updateJobStep: async (input) => {
        updateInput = input as Record<string, unknown>;
        return {};
      }
    });

    const result = await handler({
      job_id: "job-1",
      output_file: "release.tgz",
      staging_dir: ".bundle",
      replace_existing: true,
      dry_run: false
    });

    expect(updateInput).toBeDefined();
    expect(String(updateInput!.command)).toContain("tar -czf release.tgz -C .bundle .");
    expect(String(updateInput!.command)).not.toContain("echo old bundle");
    expect(result.structuredContent.item).toMatchObject({
      id: "job-1",
      targetStepName: "Npm build",
      outputFile: "release.tgz",
      stagingDir: ".bundle",
      executed: true
    });
  });
});
