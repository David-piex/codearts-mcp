import { z } from "zod";
import { asListResult } from "../../../contracts/tool-result.js";
import * as pipelineSchemas from "../schemas.js";

type PipelinePluginPublisher = {
  publisher_unique_id?: string;
  name?: string;
  en_name?: string;
  auth_status?: string;
  description?: string;
  logo_url?: string;
};

function normalizePipelinePluginPublisher(item: PipelinePluginPublisher) {
  return {
    id: item.publisher_unique_id ?? "",
    publisherUniqueId: item.publisher_unique_id ?? "",
    name: item.name,
    enName: item.en_name,
    authStatus: item.auth_status,
    description: item.description,
    logoUrl: item.logo_url
  };
}

const pipelineListAvailablePublishersInput =
  (pipelineSchemas as Record<string, z.ZodTypeAny | undefined>)
    .pipelineListAvailablePublishersInput ??
  z.object({
    domain_id: z.string().min(1)
  });

export function mapPipelineAvailablePublishers(items: PipelinePluginPublisher[]) {
  return asListResult(
    `Loaded ${items.length} available pipeline publishers`,
    items.map((item) => normalizePipelinePluginPublisher(item)),
    {
      page: 1,
      pageSize: items.length,
      total: items.length
    }
  );
}

type PipelineListAvailablePublishersClient = {
  listAvailablePublishers: (input: { domain_id: string }) => Promise<{
    items: PipelinePluginPublisher[];
  }>;
};

export function createPipelineListAvailablePublishersHandler(
  client: PipelineListAvailablePublishersClient
) {
  return async (input: unknown) => {
    const parsed = pipelineListAvailablePublishersInput.parse(input) as { domain_id: string };
    const response = await client.listAvailablePublishers(parsed);
    const result = mapPipelineAvailablePublishers(response.items);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
