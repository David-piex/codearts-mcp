import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineUploadPublisherIconInput } from "../schemas.js";

type PipelineUploadPublisherIconClient = {
  uploadPublisherIcon: (input: {
    domain_id: string;
    publisher_en_name: string;
    file_name: string;
    file_content: string;
    content_type?: string;
  }) => Promise<{
    url?: string;
    raw: unknown;
  }>;
};

function mapUploadPublisherIcon(input: {
  domain_id: string;
  publisher_en_name: string;
  file_name: string;
  url?: string;
  raw?: unknown;
  executed: boolean;
}) {
  return asItemResult(
    `${input.executed ? "Uploaded" : "Dry run: upload"} Pipeline publisher icon ${input.file_name}`,
    {
      domainId: input.domain_id,
      publisherEnName: input.publisher_en_name,
      fileName: input.file_name,
      url: input.url,
      raw: input.raw,
      executed: input.executed
    }
  );
}

export function createPipelineUploadPublisherIconHandler(client: PipelineUploadPublisherIconClient) {
  return async (input: unknown) => {
    const parsed = pipelineUploadPublisherIconInput.parse(input);

    if (parsed.dry_run) {
      const result = mapUploadPublisherIcon({
        ...parsed,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.uploadPublisherIcon(parsed);
    const result = mapUploadPublisherIcon({
      ...parsed,
      url: response.url,
      raw: response.raw,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
