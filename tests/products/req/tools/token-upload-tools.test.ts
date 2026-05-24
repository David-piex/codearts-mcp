import { describe, expect, it, vi } from "vitest";
import {
  createReqCreateWorkItemWithAttachmentV3Handler,
  createReqUploadAttachmentV3Handler,
  createReqUploadWorkItemImageV2Handler,
  mapCreatedWorkItemWithAttachmentV3,
  mapUploadedAttachmentV3,
  mapUploadedWorkItemImageV2
} from "../../../../src/products/req/tools/token-upload-tools.js";

describe("token header Req upload tools", () => {
  it("maps V2 work item image uploads", () => {
    const result = mapUploadedWorkItemImageV2({
      project_id: "project-1",
      file_name: "demo.png",
      img_id: "img-1",
      img_url: "/v1/upload/demo.png"
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      fileName: "demo.png",
      imageId: "img-1",
      imageUrl: "/v1/upload/demo.png",
      executed: true
    });
  });

  it("short-circuits V2 image upload dry runs", async () => {
    const client = {
      uploadIssueImageV2: vi.fn()
    };
    const handler = createReqUploadWorkItemImageV2Handler(client);

    const result = await handler({
      project_id: "project-1",
      file_path: "demo.png",
      x_auth_token: "0123456789",
      dry_run: true
    });

    expect(client.uploadIssueImageV2).not.toHaveBeenCalled();
    expect(result.content[0]?.text).toBe("Dry run: upload V2 work item image demo.png");
    expect(result.structuredContent.item).toMatchObject({
      projectId: "project-1",
      fileName: "demo.png",
      executed: false
    });
  });

  it("maps V3 attachment uploads", () => {
    const response = { status: "success", result: { id: "file-1" } };
    const result = mapUploadedAttachmentV3({
      file_name: "demo.txt",
      response
    });

    expect(result.summary).toBe("Uploaded V3 work item attachment demo.txt");
    expect(result.item).toEqual({
      fileName: "demo.txt",
      executed: true
    });
    expect(result.raw).toEqual(response);
  });

  it("short-circuits V3 attachment upload dry runs", async () => {
    const client = {
      uploadAttachmentV3: vi.fn()
    };
    const handler = createReqUploadAttachmentV3Handler(client);

    const result = await handler({
      file_path: "demo.txt",
      tiny_form_datas: "{\"project_id\":\"project-1\"}",
      x_auth_token: "0123456789",
      dry_run: true
    });

    expect(client.uploadAttachmentV3).not.toHaveBeenCalled();
    expect(result.content[0]?.text).toBe("Dry run: upload V3 work item attachment demo.txt");
    expect(result.structuredContent.item).toMatchObject({
      fileName: "demo.txt",
      executed: false
    });
  });

  it("maps V3 work item creation with attachment payload", () => {
    const response = { status: "success", result: { id: 70779173 } };
    const result = mapCreatedWorkItemWithAttachmentV3({ response });

    expect(result.summary).toBe("Created V3 work item with attachment payload");
    expect(result.item).toEqual({ executed: true });
    expect(result.raw).toEqual(response);
  });

  it("short-circuits V3 work item creation dry runs", async () => {
    const client = {
      createWorkItemWithAttachmentV3: vi.fn()
    };
    const handler = createReqCreateWorkItemWithAttachmentV3Handler(client);

    const result = await handler({
      issue_call_back_param: { subject: "demo" },
      type: "scrum",
      x_auth_token: "0123456789",
      dry_run: true
    });

    expect(client.createWorkItemWithAttachmentV3).not.toHaveBeenCalled();
    expect(result.content[0]?.text).toBe("Dry run: create V3 work item with attachment payload");
    expect(result.structuredContent.item).toEqual({
      type: "scrum",
      issueCallBackParam: { subject: "demo" },
      executed: false
    });
  });
});
