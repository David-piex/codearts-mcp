import { Buffer } from "node:buffer";
import { asItemResult } from "../../../contracts/tool-result.js";
import { reqDownloadImageFileInput } from "../schemas.js";

export function mapReqDownloadedImageFile(input: {
  image_uri: string;
  body: Uint8Array;
  content_type?: string;
  file_name?: string;
}) {
  return asItemResult(`Downloaded image file ${input.file_name ?? input.image_uri}`, {
    imageUri: input.image_uri,
    fileName: input.file_name,
    contentType: input.content_type,
    sizeBytes: input.body.byteLength,
    contentBase64: Buffer.from(input.body).toString("base64")
  });
}

type ReqDownloadImageFileClient = {
  downloadImageFile: (input: {
    project_id: string;
    image_uri: string;
  }) => Promise<{
    image_uri: string;
    body: Uint8Array;
    content_type?: string;
    file_name?: string;
  }>;
};

export function createReqDownloadImageFileHandler(client: ReqDownloadImageFileClient) {
  return async (input: unknown) => {
    const parsed = reqDownloadImageFileInput.parse(input);
    const response = await client.downloadImageFile(parsed);
    const result = mapReqDownloadedImageFile(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
