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

const pipelineListPublishersInput =
  (pipelineSchemas as Record<string, z.ZodTypeAny | undefined>).pipelineListPublishersInput ??
  z.object({
    domain_id: z.string().min(1),
    offset: z.number().int().min(0).default(0),
    limit: z.number().int().min(1).default(20)
  });

export function mapPipelinePublishers(
  items: PipelinePluginPublisher[],
  offset: number,
  limit: number,
  total?: number
) {
  return asListResult(
    `Loaded ${items.length} pipeline publishers`,
    items.map((item) => normalizePipelinePluginPublisher(item)),
    {
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      total
    }
  );
}

type PipelineListPublishersClient = {
  listPublishers: (input: { domain_id: string; offset: number; limit: number }) => Promise<{
    items: PipelinePluginPublisher[];
    total?: number;
  }>;
};

export function createPipelineListPublishersHandler(client: PipelineListPublishersClient) {
  return async (input: unknown) => {
    const parsed = pipelineListPublishersInput.parse(input) as {
      domain_id: string;
      offset: number;
      limit: number;
    };
    const response = await client.listPublishers(parsed);
    const result = mapPipelinePublishers(response.items, parsed.offset, parsed.limit, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
