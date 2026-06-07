import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineUploadPluginIconInput } from "../schemas.js";

type PipelineUploadPluginIconClient = {
  uploadPluginIcon: (input: {
    domain_id: string;
    plugin_name: string;
    file_name: string;
    file_content: string;
    content_type?: string;
  }) => Promise<{
    url?: string;
    raw: unknown;
  }>;
};

function mapUploadPluginIcon(input: {
  domain_id: string;
  plugin_name: string;
  file_name: string;
  url?: string;
  raw?: unknown;
  executed: boolean;
}) {
  return asItemResult(
    `${input.executed ? "Uploaded" : "Dry run: upload"} Pipeline plugin icon ${input.file_name}`,
    {
      domainId: input.domain_id,
      pluginName: input.plugin_name,
      fileName: input.file_name,
      url: input.url,
      raw: input.raw,
      executed: input.executed
    }
  );
}

export function createPipelineUploadPluginIconHandler(client: PipelineUploadPluginIconClient) {
  return async (input: unknown) => {
    const parsed = pipelineUploadPluginIconInput.parse(input);

    if (parsed.dry_run) {
      const result = mapUploadPluginIcon({
        ...parsed,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.uploadPluginIcon(parsed);
    const result = mapUploadPluginIcon({
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
