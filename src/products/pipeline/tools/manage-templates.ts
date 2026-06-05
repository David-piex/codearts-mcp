import { asItemResult } from "../../../contracts/tool-result.js";
import {
  pipelineCreateTemplateInput,
  pipelineDeleteTemplateInput,
  pipelineFavoriteTemplateInput,
  pipelineUpdateTemplateInput
} from "../schemas.js";

export function previewCreatePipelineTemplate(input: {
  tenant_id: string;
  name: string;
  language: string;
  is_system?: boolean;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create pipeline template ${input.name}`, {
    tenantId: input.tenant_id,
    name: input.name,
    language: input.language,
    isSystem: input.is_system,
    executed: !input.dry_run
  });
}

export function mapCreatedPipelineTemplate(input: {
  tenant_id: string;
  template_id?: string;
  name: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Created pipeline template ${input.name}`, {
    id: input.template_id,
    tenantId: input.tenant_id,
    templateId: input.template_id,
    name: input.name,
    executed: true
  }, input.raw);
}

export function previewUpdatePipelineTemplate(input: {
  tenant_id: string;
  template_id: string;
  name: string;
  language: string;
  is_system?: boolean;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update pipeline template ${input.template_id}`, {
    tenantId: input.tenant_id,
    templateId: input.template_id,
    name: input.name,
    language: input.language,
    isSystem: input.is_system,
    executed: !input.dry_run
  });
}

export function mapUpdatedPipelineTemplate(input: {
  tenant_id: string;
  template_id: string;
  name: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Updated pipeline template ${input.template_id}`, {
    id: input.template_id,
    tenantId: input.tenant_id,
    templateId: input.template_id,
    name: input.name,
    executed: true
  }, input.raw);
}

export function previewDeletePipelineTemplate(input: {
  tenant_id: string;
  template_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete pipeline template ${input.template_id}`, {
    tenantId: input.tenant_id,
    templateId: input.template_id,
    executed: !input.dry_run
  });
}

export function mapDeletedPipelineTemplate(input: {
  tenant_id: string;
  template_id: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Deleted pipeline template ${input.template_id}`, {
    id: input.template_id,
    tenantId: input.tenant_id,
    templateId: input.template_id,
    deleted: true,
    executed: true
  }, input.raw);
}

export function previewFavoritePipelineTemplate(input: {
  tenant_id: string;
  template_id: string;
  flag: boolean;
  dry_run: boolean;
}) {
  return asItemResult(
    `Dry run: ${input.flag ? "favorite" : "unfavorite"} pipeline template ${input.template_id}`,
    {
      tenantId: input.tenant_id,
      templateId: input.template_id,
      flag: input.flag,
      executed: !input.dry_run
    }
  );
}

export function mapFavoritedPipelineTemplate(input: {
  tenant_id: string;
  template_id: string;
  flag: boolean;
  raw: Record<string, unknown>;
}) {
  return asItemResult(
    `${input.flag ? "Favorited" : "Unfavorited"} pipeline template ${input.template_id}`,
    {
      id: input.template_id,
      tenantId: input.tenant_id,
      templateId: input.template_id,
      flag: input.flag,
      executed: true
    },
    input.raw
  );
}

type PipelineTemplateWriteClient = {
  createTemplate: (input: Omit<ReturnType<typeof pipelineCreateTemplateInput.parse>, "dry_run">) => Promise<{
    template_id?: string;
    raw: Record<string, unknown>;
  }>;
  updateTemplate: (input: Omit<ReturnType<typeof pipelineUpdateTemplateInput.parse>, "dry_run">) => Promise<{
    template_id?: string;
    raw: Record<string, unknown>;
  }>;
  deleteTemplate: (input: Omit<ReturnType<typeof pipelineDeleteTemplateInput.parse>, "dry_run">) => Promise<{
    template_id?: string;
    deleted: boolean;
    raw: Record<string, unknown>;
  }>;
  favoriteTemplate: (input: Omit<ReturnType<typeof pipelineFavoriteTemplateInput.parse>, "dry_run">) => Promise<{
    template_id?: string;
    favorited: boolean;
    raw: Record<string, unknown>;
  }>;
};

export function createPipelineCreateTemplateHandler(client: PipelineTemplateWriteClient) {
  return async (input: unknown) => {
    const parsed = pipelineCreateTemplateInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreatePipelineTemplate(parsed);
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.createTemplate(parsed);
    const result = mapCreatedPipelineTemplate({
      tenant_id: parsed.tenant_id,
      template_id: response.template_id,
      name: parsed.name,
      raw: response.raw
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createPipelineUpdateTemplateHandler(client: PipelineTemplateWriteClient) {
  return async (input: unknown) => {
    const parsed = pipelineUpdateTemplateInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdatePipelineTemplate(parsed);
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.updateTemplate(parsed);
    const result = mapUpdatedPipelineTemplate({
      tenant_id: parsed.tenant_id,
      template_id: response.template_id ?? parsed.template_id,
      name: parsed.name,
      raw: response.raw
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createPipelineDeleteTemplateHandler(client: PipelineTemplateWriteClient) {
  return async (input: unknown) => {
    const parsed = pipelineDeleteTemplateInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeletePipelineTemplate(parsed);
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.deleteTemplate(parsed);
    const result = mapDeletedPipelineTemplate({
      tenant_id: parsed.tenant_id,
      template_id: response.template_id ?? parsed.template_id,
      raw: response.raw
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createPipelineFavoriteTemplateHandler(client: PipelineTemplateWriteClient) {
  return async (input: unknown) => {
    const parsed = pipelineFavoriteTemplateInput.parse(input);

    if (parsed.dry_run) {
      const result = previewFavoritePipelineTemplate(parsed);
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.favoriteTemplate(parsed);
    const result = mapFavoritedPipelineTemplate({
      tenant_id: parsed.tenant_id,
      template_id: response.template_id ?? parsed.template_id,
      flag: parsed.flag,
      raw: response.raw
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}
