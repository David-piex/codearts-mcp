import { describe, expect, it, vi } from "vitest";
import {
  createTestPlanCreateTestStepByCollectionHandler,
  createTestPlanImportTasksHandler,
  createTestPlanUploadBackgroundHandler,
  createTestPlanUploadFileToGitHandler,
  createTestPlanUploadFileV3Handler
} from "../../../../src/products/testplan/tools/upload-import-tools.js";

describe("testplan upload/import handlers", () => {
  it("returns dry-run previews by default", async () => {
    const importHandler = createTestPlanImportTasksHandler({
      importTasks: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const uploadBackground = createTestPlanUploadBackgroundHandler({
      uploadBackground: vi.fn()
    });
    const byCollection = createTestPlanCreateTestStepByCollectionHandler({
      createTestStepByCollection: vi.fn()
    });
    const uploadGit = createTestPlanUploadFileToGitHandler({
      uploadFileToGit: vi.fn()
    });
    const uploadV3 = createTestPlanUploadFileV3Handler({
      uploadFileV3: vi.fn()
    });

    await expect(
      importHandler({
        source_version_uri: "v1",
        dest_version_uri: "v2",
        source_task_uris: ["task-1"],
        project_uuid: "project-1"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: import TestPlan tasks",
        item: { executed: false }
      }
    });
    await expect(
      uploadBackground({
        project_id: "project-1",
        file_path: "demo.png"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: upload TestPlan background image",
        item: { executed: false, fileName: "demo.png" }
      }
    });
    await expect(
      byCollection({
        project_id: "project-1",
        x_auth_token: "token",
        file_path: "demo.json"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: create TestPlan steps by Postman collection",
        item: { executed: false, fileName: "demo.json" }
      }
    });
    await expect(
      uploadGit({
        project_id: "project-1",
        x_auth_token: "token",
        file_path: "demo.txt"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: upload TestPlan file to git",
        item: { executed: false, fileName: "demo.txt" }
      }
    });
    await expect(
      uploadV3({
        project_id: "project-1",
        x_auth_token: "token",
        file_path: "demo.yaml"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: upload TestPlan v3 file",
        item: { executed: false, fileName: "demo.yaml" }
      }
    });
  });

  it("executes with real file input when dry_run is false", async () => {
    const fixture = "D:/Code/codearts-mcp/tests/fixtures/req-upload-image.png";
    const importHandler = createTestPlanImportTasksHandler({
      importTasks: async () => ({
        value: "import-1",
        raw: { status: "success", result: { value: "import-1" } }
      })
    });
    const uploadBackground = createTestPlanUploadBackgroundHandler({
      uploadBackground: vi.fn(async () => ({
        value: { background_file_name: "req-upload-image.png" },
        raw: { value: { background_file_name: "req-upload-image.png" } }
      }))
    });
    const byCollection = createTestPlanCreateTestStepByCollectionHandler({
      createTestStepByCollection: vi.fn(async () => ({
        value: [{ id: "aw-1" }],
        raw: { status: "success", result: [{ id: "aw-1" }] }
      }))
    });
    const uploadGit = createTestPlanUploadFileToGitHandler({
      uploadFileToGit: vi.fn(async () => ({
        value: { code: "ok" },
        raw: { status: "success", code: "ok" }
      }))
    });
    const uploadV3 = createTestPlanUploadFileV3Handler({
      uploadFileV3: vi.fn(async () => ({
        value: { id: "file-1" },
        raw: { status: "success", result: { id: "file-1" } }
      }))
    });

    await expect(
      importHandler({
        source_version_uri: "v1",
        dest_version_uri: "v2",
        source_task_uris: ["task-1"],
        project_uuid: "project-1",
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        item: { id: "import-1", executed: true, value: "import-1" }
      }
    });
    await expect(
      uploadBackground({
        project_id: "project-1",
        background_type: "background",
        file_path: fixture,
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        item: { id: "project-1", executed: true, fileName: "req-upload-image.png" }
      }
    });
    await expect(
      byCollection({
        project_id: "project-1",
        x_auth_token: "token",
        file_path: fixture,
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        item: { id: "project-1", executed: true, fileName: "req-upload-image.png" }
      }
    });
    await expect(
      uploadGit({
        project_id: "project-1",
        x_auth_token: "token",
        file_path: fixture,
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        item: { id: "project-1", executed: true, fileName: "req-upload-image.png" }
      }
    });
    await expect(
      uploadV3({
        project_id: "project-1",
        x_auth_token: "token",
        file_path: fixture,
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        item: { id: "project-1", executed: true, fileName: "req-upload-image.png" }
      }
    });
  });
});
