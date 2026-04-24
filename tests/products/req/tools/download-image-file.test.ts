import { describe, expect, it, vi } from "vitest";
import { reqDownloadImageFileInput as reqDownloadImageFileInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqDownloadImageFileInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqDownloadImageFileHandler,
  mapReqDownloadedImageFile
} from "../../../../src/products/req/tools/download-image-file.js";

describe("mapReqDownloadedImageFile", () => {
  it("returns normalized downloaded image data", () => {
    const result = mapReqDownloadedImageFile({
      image_uri: "/v1/upload/demo/202604/demo.png",
      body: new Uint8Array([1, 2, 3]),
      content_type: "image/png",
      file_name: "demo.png"
    });

    expect(result.item).toEqual({
      imageUri: "/v1/upload/demo/202604/demo.png",
      fileName: "demo.png",
      contentType: "image/png",
      sizeBytes: 3,
      contentBase64: "AQID"
    });
  });
});

describe("reqDownloadImageFileInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      image_uri: "/v1/upload/demo/202604/demo.png"
    };

    expect(reqDownloadImageFileInput.parse(input)).toEqual(input);
    expect(reqDownloadImageFileInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqDownloadImageFileHandler", () => {
  it("returns normalized download output", async () => {
    const client = {
      downloadImageFile: vi.fn(async () => ({
        image_uri: "/v1/upload/demo/202604/demo.png",
        body: new Uint8Array([1, 2, 3]),
        content_type: "image/png",
        file_name: "demo.png"
      }))
    };
    const handler = createReqDownloadImageFileHandler(client);

    const result = await handler({
      project_id: "project-1",
      image_uri: "/v1/upload/demo/202604/demo.png"
    });

    expect(client.downloadImageFile).toHaveBeenCalledWith({
      project_id: "project-1",
      image_uri: "/v1/upload/demo/202604/demo.png"
    });
    expect(result.content[0]?.text).toContain("Downloaded image file demo.png");
    expect(result.structuredContent.item).toEqual({
      imageUri: "/v1/upload/demo/202604/demo.png",
      fileName: "demo.png",
      contentType: "image/png",
      sizeBytes: 3,
      contentBase64: "AQID"
    });
  });
});
