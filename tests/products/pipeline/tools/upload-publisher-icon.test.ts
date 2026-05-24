import { describe, expect, it } from "vitest";
import { createPipelineUploadPublisherIconHandler } from "../../../../src/products/pipeline/tools/upload-publisher-icon.js";

describe("createPipelineUploadPublisherIconHandler", () => {
  it("previews publisher icon uploads by default without calling the client", async () => {
    const handler = createPipelineUploadPublisherIconHandler({
      uploadPublisherIcon: async () => {
        throw new Error("dry run should not upload publisher icon");
      }
    });

    const result = await handler({
      domain_id: "domain-1",
      publisher_en_name: "demoPublisher",
      file_name: "icon.png",
      file_content: "png-bytes",
      content_type: "image/png"
    });

    expect(result.content[0]?.text).toContain("Dry run: upload Pipeline publisher icon icon.png");
    expect(result.structuredContent.item).toEqual({
      domainId: "domain-1",
      publisherEnName: "demoPublisher",
      fileName: "icon.png",
      url: undefined,
      raw: undefined,
      executed: false
    });
  });

  it("uploads publisher icons only when dry_run is false", async () => {
    let uploadedInput: unknown;
    const handler = createPipelineUploadPublisherIconHandler({
      uploadPublisherIcon: async (input) => {
        uploadedInput = input;
        return {
          url: "https://devops.example/icon.png",
          raw: "https://devops.example/icon.png"
        };
      }
    });

    const result = await handler({
      domain_id: "domain-1",
      publisher_en_name: "demoPublisher",
      file_name: "icon.png",
      file_content: "png-bytes",
      content_type: "image/png",
      dry_run: false
    });

    expect(uploadedInput).toEqual({
      domain_id: "domain-1",
      publisher_en_name: "demoPublisher",
      file_name: "icon.png",
      file_content: "png-bytes",
      content_type: "image/png",
      dry_run: false
    });
    expect(result.content[0]?.text).toContain("Uploaded Pipeline publisher icon icon.png");
    expect(result.structuredContent.item).toEqual({
      domainId: "domain-1",
      publisherEnName: "demoPublisher",
      fileName: "icon.png",
      url: "https://devops.example/icon.png",
      raw: "https://devops.example/icon.png",
      executed: true
    });
  });
});
