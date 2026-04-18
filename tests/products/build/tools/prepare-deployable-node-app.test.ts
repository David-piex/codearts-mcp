import { describe, expect, it } from "vitest";
import {
  DEPLOYABLE_APP_MARKER_START,
  buildDeployableNodeAppCommandBlock,
  createBuildPrepareDeployableNodeAppHandler,
  previewPrepareDeployableNodeApp
} from "../../../../src/products/build/tools/prepare-deployable-node-app.js";

describe("createBuildPrepareDeployableNodeAppHandler", () => {
  it("builds an inline bootstrap entry before bundling when requested", async () => {
    const result = buildDeployableNodeAppCommandBlock({
      entry_file: "src/server/deploy-entry.ts",
      output_file: "app.js",
      target_runtime: "node20",
      bootstrap_entry_file: ".codex-deploy-entry.ts",
      bootstrap_entry_source: 'import { main } from "./src/server/index.ts";\nvoid main();'
    });

    expect(result).toContain("cat > .codex-deploy-entry.ts <<'EOF'");
    expect(result).toContain('import { main } from "./src/server/index.ts";');
    expect(result).toContain("npx esbuild .codex-deploy-entry.ts --bundle");
  });

  it("returns a dry-run preview using the first build step by default", async () => {
    const handler = createBuildPrepareDeployableNodeAppHandler({
      getJob: async () => ({
        job_id: "job-1",
        name: "gateway-build",
        steps: [
          {
            name: "Npm build",
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
      previewPrepareDeployableNodeApp({
        job_id: "job-1",
        name: "gateway-build",
        target_step_name: "Npm build",
        entry_file: "src/server/deploy-entry.ts",
        bundle_entry_file: "src/server/deploy-entry.ts",
        output_file: "app.js",
        target_runtime: "node20",
        uses_bootstrap_entry: false,
        current_command: "npm ci\nnpm run build",
        updated_command: `npm ci\nnpm run build\n\n${buildDeployableNodeAppCommandBlock({
          entry_file: "src/server/deploy-entry.ts",
          output_file: "app.js",
          target_runtime: "node20"
        })}`,
        already_configured: false
      })
    );
  });

  it("appends the single-file bundle block to the selected step on execution", async () => {
    let updateInput: Record<string, unknown> | undefined;
    const handler = createBuildPrepareDeployableNodeAppHandler({
      getJob: async () => ({
        job_id: "job-1",
        name: "gateway-build",
        steps: [
          {
            name: "Npm build",
            command: "npm ci\nnpm run build",
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
      entry_file: "src/server/deploy-entry.ts",
      output_file: "deploy/app.js",
      target_runtime: "node20",
      dry_run: false
    });

    expect(updateInput).toEqual({
      job_id: "job-1",
      step_name: "Npm build",
      command: `npm ci\nnpm run build\n\n${buildDeployableNodeAppCommandBlock({
        entry_file: "src/server/deploy-entry.ts",
        output_file: "deploy/app.js",
        target_runtime: "node20"
      })}`,
      pre_condition: "SUCCESS"
    });
    expect(result.structuredContent.item).toMatchObject({
      id: "job-1",
      name: "gateway-build",
      targetStepName: "Npm build",
      entryFile: "src/server/deploy-entry.ts",
      outputFile: "deploy/app.js",
      targetRuntime: "node20",
      executed: true
    });
  });

  it("surfaces bootstrap entry metadata in preview mode", async () => {
    const handler = createBuildPrepareDeployableNodeAppHandler({
      getJob: async () => ({
        job_id: "job-1",
        name: "gateway-build",
        steps: [
          {
            name: "Npm build",
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
      bootstrap_entry_file: ".codex-deploy-entry.ts",
      bootstrap_entry_source: 'import { main } from "./src/server/index.ts";\nvoid main();'
    });

    expect(result.structuredContent.item).toMatchObject({
      entryFile: "src/server/deploy-entry.ts",
      bundleEntryFile: ".codex-deploy-entry.ts",
      bootstrapEntryFile: ".codex-deploy-entry.ts",
      usesBootstrapEntry: true
    });
  });

  it("fails when the target step already includes the deployable app marker", async () => {
    const handler = createBuildPrepareDeployableNodeAppHandler({
      getJob: async () => ({
        job_id: "job-1",
        name: "gateway-build",
        steps: [
          {
            name: "Npm build",
            command: `npm ci\nnpm run build\n\n${DEPLOYABLE_APP_MARKER_START}\necho already\n# codex-deployable-node-app:end`,
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

  it("replaces an existing deployable app block when replace_existing is enabled", async () => {
    let updateInput: Record<string, unknown> | undefined;
    const handler = createBuildPrepareDeployableNodeAppHandler({
      getJob: async () => ({
        job_id: "job-1",
        name: "gateway-build",
        steps: [
          {
            name: "Npm build",
            command:
              "npm ci\nnpm run build\n\n" +
              `${DEPLOYABLE_APP_MARKER_START}\n` +
              "echo old\n" +
              "# codex-deployable-node-app:end",
            pre_condition: "SUCCESS"
          }
        ]
      }),
      updateJobStep: async (input) => {
        updateInput = input as Record<string, unknown>;
        return {};
      }
    });

    await handler({
      job_id: "job-1",
      dry_run: false,
      replace_existing: true,
      bootstrap_entry_source:
        'import { startHttpServer } from "./src/server/http.ts";\n' +
        'import { startStdioServer } from "./src/server/stdio.ts";\n' +
        '\n' +
        '(async () => {\n' +
        '  if (process.env.MCP_TRANSPORT === "http") {\n' +
        "    await startHttpServer();\n" +
        "    return;\n" +
        "  }\n" +
        "  await startStdioServer();\n" +
        "})();"
    });

    expect(updateInput).toBeDefined();
    expect(String(updateInput!.command)).toContain("import { startHttpServer }");
    expect(String(updateInput!.command)).not.toContain("echo old");
  });
});
