import { describe, expect, it } from "vitest";
import { createBuildGetJobHandler } from "../../../../src/products/build/tools/get-job.js";

describe("createBuildGetJobHandler", () => {
  it("maps build job detail into MCP output", async () => {
    const handler = createBuildGetJobHandler({
      getJob: async () => ({
        job_id: "job-1",
        name: "gateway-build",
        project_id: "project-1",
        description: "main build",
        primary_image: "nodejs20",
        step_count: 2,
        scm_repositories: [
          {
            repo_name: "codearts-mcp",
            branch: "master",
            scm_type: "codehub"
          }
        ],
        steps: [
          {
            name: "Npm build",
            module_id: "official.node.build",
            image: "nodejs20",
            command: "npm ci && npm run build",
            pre_condition: "SUCCESS"
          },
          {
            name: "Upload package to release repository",
            module_id: "official.release.upload",
            image: "linux",
            command: "upload.sh",
            pre_condition: "SUCCESS",
            properties: {
              file: "codearts-mcp.tgz",
              name: "codearts-mcp",
              buildVersion: "1.0.0",
              customUploadPath: "/codearts-mcp/1.0.0"
            }
          }
        ]
      })
    });

    const result = await handler({ job_id: "job-1" });

    expect(result.structuredContent.item).toMatchObject({
      id: "job-1",
      name: "gateway-build",
      projectId: "project-1",
      description: "main build",
      primaryImage: "nodejs20",
      stepCount: 2,
      repositories: [
        {
          repoName: "codearts-mcp",
          branch: "master",
          scmType: "codehub"
        }
      ],
      releasePublishingDetected: true,
      releasePublishingStepCount: 1,
      releasePublishingStepNames: ["Upload package to release repository"],
      deployReady: true,
      deployBlockers: [],
      deployWarnings: [],
      steps: [
        {
          name: "Npm build",
          moduleId: "official.node.build",
          image: "nodejs20",
          command: "npm ci && npm run build",
          preCondition: "SUCCESS"
        },
        {
          name: "Upload package to release repository",
          moduleId: "official.release.upload",
          image: "linux",
          command: "upload.sh",
          preCondition: "SUCCESS",
          artifactFile: "codearts-mcp.tgz",
          artifactPackageName: "codearts-mcp",
          artifactBuildVersion: "1.0.0",
          artifactCustomUploadPath: "/codearts-mcp/1.0.0"
        }
      ]
    });
  });

  it("flags deploy readiness blockers when no release publishing step exists", async () => {
    const handler = createBuildGetJobHandler({
      getJob: async () => ({
        job_id: "job-2",
        name: "build-only",
        project_id: "project-1",
        step_count: 1,
        scm_repositories: [],
        steps: [
          {
            name: "Npm build",
            module_id: "official.node.build",
            image: "nodejs20",
            command: "npm ci && npm run build",
            pre_condition: "SUCCESS"
          }
        ]
      })
    });

    const result = await handler({ job_id: "job-2" });
    const item = result.structuredContent.item;

    expect(item).toBeDefined();
    expect(item!.deployReady).toBe(false);
    expect(item!.deployBlockers).toEqual([
      "missing_release_publishing_step"
    ]);
    expect(item!.deployWarnings).toEqual([]);
  });

  it("flags suspicious javascript-to-jar packaging as a deploy blocker", async () => {
    const handler = createBuildGetJobHandler({
      getJob: async () => ({
        job_id: "job-3",
        name: "gateway-build",
        project_id: "project-1",
        step_count: 2,
        scm_repositories: [],
        steps: [
          {
            name: "Npm build",
            module_id: "official.node.build",
            image: "nodejs20",
            command: "npx esbuild .codex-deploy-entry.ts --outfile=app.js\ncp app.js codeartsmcpdemo.jar",
            pre_condition: "SUCCESS"
          },
          {
            name: "Upload package to release repository",
            module_id: "official.release.upload",
            image: "linux",
            command: "upload.sh",
            pre_condition: "SUCCESS",
            properties: {
              file: "codeartsmcpdemo.jar",
              name: "codeartsmcpdemo",
              buildVersion: "1.0.0",
              customUploadPath: "/codeartsmcpdemo/1.0.0"
            }
          }
        ]
      })
    });

    const result = await handler({ job_id: "job-3" });
    const item = result.structuredContent.item;

    expect(item).toBeDefined();
    expect(item!.deployReady).toBe(false);
    expect(item!.deployBlockers).toEqual([
      "suspicious_java_archive_packaging"
    ]);
    expect(item!.deployWarnings).toEqual([
      "javascript_bundle_renamed_as_java_archive"
    ]);
    expect(item!.steps[1]).toMatchObject({
      artifactFile: "codeartsmcpdemo.jar",
      artifactPackageName: "codeartsmcpdemo",
      artifactBuildVersion: "1.0.0",
      artifactCustomUploadPath: "/codeartsmcpdemo/1.0.0"
    });
  });
});
