import { Buffer } from "node:buffer";
import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUploadIssuesImgInput } from "../schemas.js";

export function mapUploadedIssuesImage(input: {
  project_id: string;
  upload_ym: string;
  img_name: string;
  extention: string;
  body: Uint8Array;
  content_type?: string;
}) {
  return asItemResult(`Downloaded uploaded issue image ${input.img_name}.${input.extention}`, {
    projectId: input.project_id,
    uploadYm: input.upload_ym,
    imageName: input.img_name,
    extension: input.extention,
    contentType: input.content_type,
    sizeBytes: input.body.byteLength,
    contentBase64: Buffer.from(input.body).toString("base64")
  });
}

type ReqUploadIssuesImgClient = {
  uploadIssuesImg: (input: {
    project_id: string;
    upload_ym: string;
    img_name: string;
    extention: string;
    x_auth_token: string;
  }) => Promise<{
    project_id: string;
    upload_ym: string;
    img_name: string;
    extention: string;
    body: Uint8Array;
    content_type?: string;
  }>;
};

export function createReqUploadIssuesImgHandler(client: ReqUploadIssuesImgClient) {
  return async (input: unknown) => {
    const parsed = reqUploadIssuesImgInput.parse(input);
    const response = await client.uploadIssuesImg(parsed);
    const result = mapUploadedIssuesImage(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
