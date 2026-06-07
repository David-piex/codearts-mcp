import { asItemResult } from "../../../contracts/tool-result.js";
import {
  pipelineDeletePluginDraftInput,
  pipelinePluginDraftInput,
  pipelinePublishPluginBindInput,
  pipelinePublishPluginDraftInput,
  pipelinePublishPluginInput,
  pipelineUpdatePluginBaseInfoInput
} from "../schemas.js";

type RawRecord = Record<string, unknown>;
type PipelinePluginInputSchema = {
  parse: (input: unknown) => RawRecord & {
    domain_id: string;
    dry_run: boolean;
  };
};
type PluginDraftAction =
  | "create"
  | "update"
  | "publish"
  | "delete"
  | "publish_plugin"
  | "publish_bind"
  | "update_info";

type PipelinePluginDraftClient = {
  createPluginDraft: (input: { domain_id: string; body: RawRecord }) => Promise<{
    item: RawRecord;
    raw: RawRecord;
  }>;
  updatePluginDraft: (input: { domain_id: string; body: RawRecord }) => Promise<{
    item: RawRecord;
    raw: RawRecord;
  }>;
  publishPluginDraft: (input: { domain_id: string; body: RawRecord }) => Promise<{
    item: RawRecord;
    raw: RawRecord;
  }>;
  deletePluginDraft: (input: { domain_id: string; plugin_name: string; version: string }) => Promise<{
    item: RawRecord;
    raw: RawRecord;
  }>;
  publishPlugin: (input: { domain_id: string; body: RawRecord }) => Promise<{
    item: RawRecord;
    raw: RawRecord;
  }>;
  publishPluginBind: (input: { domain_id: string; body: RawRecord }) => Promise<{
    item: RawRecord;
    raw: RawRecord;
  }>;
  updatePluginBaseInfo: (input: { domain_id: string; body: RawRecord }) => Promise<{
    item: RawRecord;
    raw: RawRecord;
  }>;
};

function omitControlFields(input: RawRecord) {
  const { domain_id: _domainId, dry_run: _dryRun, body: _body, ...rest } = input;
  return {
    ...(typeof _body === "object" && _body !== null && !Array.isArray(_body)
      ? (_body as RawRecord)
      : {}),
    ...rest
  };
}

function mapPluginDraftResult(input: {
  action: PluginDraftAction;
  domain_id: string;
  body: RawRecord;
  item?: RawRecord;
  raw?: RawRecord;
  executed: boolean;
}) {
  const verb = {
    create: input.executed ? "Created" : "Dry run: create",
    update: input.executed ? "Updated" : "Dry run: update",
    publish: input.executed ? "Published" : "Dry run: publish",
    delete: input.executed ? "Deleted" : "Dry run: delete",
    publish_plugin: input.executed ? "Published" : "Dry run: publish",
    publish_bind: input.executed ? "Bound publisher for" : "Dry run: bind publisher for",
    update_info: input.executed ? "Updated base info for" : "Dry run: update base info for"
  }[input.action];

  const target =
    input.action === "publish_plugin" || input.action === "publish_bind" || input.action === "update_info"
      ? "Pipeline plugin"
      : "Pipeline plugin draft";

  return asItemResult(`${verb} ${target} ${String(input.body.plugin_name ?? "")}`, {
    domainId: input.domain_id,
    pluginName: input.body.plugin_name,
    displayName: input.body.display_name,
    version: input.body.version,
    request: input.body,
    item: input.item,
    raw: input.raw,
    executed: input.executed
  });
}

function createPluginDraftHandler(options: {
  action: PluginDraftAction;
  schema?: PipelinePluginInputSchema;
  call: (
    client: PipelinePluginDraftClient,
    input: { domain_id: string; body: RawRecord }
  ) => Promise<{ item: RawRecord; raw: RawRecord }>;
}) {
  return (client: PipelinePluginDraftClient) => async (input: unknown) => {
    const schema =
      options.schema ??
      (options.action === "publish"
        ? pipelinePublishPluginDraftInput
        : pipelinePluginDraftInput);
    const parsed = schema.parse(input);
    const body = omitControlFields(parsed as RawRecord);

    if (parsed.dry_run) {
      const result = mapPluginDraftResult({
        action: options.action,
        domain_id: parsed.domain_id,
        body,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await options.call(client, {
      domain_id: parsed.domain_id,
      body
    });
    const result = mapPluginDraftResult({
      action: options.action,
      domain_id: parsed.domain_id,
      body,
      item: response.item,
      raw: response.raw,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

function createDeletePluginDraftHandler(client: PipelinePluginDraftClient) {
  return async (input: unknown) => {
    const parsed = pipelineDeletePluginDraftInput.parse(input);
    const body = omitControlFields(parsed as RawRecord);

    if (parsed.dry_run) {
      const result = mapPluginDraftResult({
        action: "delete",
        domain_id: parsed.domain_id,
        body,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deletePluginDraft({
      domain_id: parsed.domain_id,
      plugin_name: parsed.plugin_name,
      version: parsed.version
    });
    const result = mapPluginDraftResult({
      action: "delete",
      domain_id: parsed.domain_id,
      body,
      item: response.item,
      raw: response.raw,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export const createPipelineCreatePluginDraftHandler = createPluginDraftHandler({
  action: "create",
  call: (client, input) => client.createPluginDraft(input)
});

export const createPipelineUpdatePluginDraftHandler = createPluginDraftHandler({
  action: "update",
  call: (client, input) => client.updatePluginDraft(input)
});

export const createPipelinePublishPluginDraftHandler = createPluginDraftHandler({
  action: "publish",
  call: (client, input) => client.publishPluginDraft(input)
});

export const createPipelineDeletePluginDraftHandler = createDeletePluginDraftHandler;

export const createPipelinePublishPluginHandler = createPluginDraftHandler({
  action: "publish_plugin",
  schema: pipelinePublishPluginInput,
  call: (client, input) => client.publishPlugin(input)
});

export const createPipelinePublishPluginBindHandler = createPluginDraftHandler({
  action: "publish_bind",
  schema: pipelinePublishPluginBindInput,
  call: (client, input) => client.publishPluginBind(input)
});

export const createPipelineUpdatePluginBaseInfoHandler = createPluginDraftHandler({
  action: "update_info",
  schema: pipelineUpdatePluginBaseInfoInput,
  call: (client, input) => client.updatePluginBaseInfo(input)
});
