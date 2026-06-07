import { asItemResult } from "../../../contracts/tool-result.js";
import {
  pipelineCreateTemplateTaskV3Input,
  pipelineStartNewPipelineV3Input,
  pipelineStopPipelineV3Input
} from "../schemas.js";

type RawRecord = Record<string, unknown>;

type PipelineLegacyV3MutationClient = {
  createTemplateTaskV3: (input: {
    flow?: Record<string, Record<string, string>>;
    states?: Record<string, RawRecord>;
    workflow?: RawRecord;
    body?: RawRecord;
  }) => Promise<{
    item: RawRecord;
    raw: RawRecord;
  }>;
  startNewPipelineV3: (input: {
    pipeline_id: string;
    build_params?: Array<{
      name: string;
      value: string;
    }>;
    body?: RawRecord;
  }) => Promise<{
    item: RawRecord;
    raw: RawRecord;
  }>;
  stopPipelineV3: (input: {
    pipeline_id: string;
    build_id: string;
  }) => Promise<{
    item: RawRecord;
    raw: RawRecord;
  }>;
};

function mapLegacyV3Mutation(input: {
  summary: string;
  request: RawRecord;
  item?: RawRecord;
  raw?: RawRecord;
  executed: boolean;
}) {
  return asItemResult(input.summary, {
    request: input.request,
    item: input.item,
    raw: input.raw,
    executed: input.executed
  });
}

export function createPipelineCreateTemplateTaskV3Handler(client: PipelineLegacyV3MutationClient) {
  return async (input: unknown) => {
    const parsed = pipelineCreateTemplateTaskV3Input.parse(input);
    const request = {
      ...(parsed.body ?? {}),
      ...(parsed.flow !== undefined ? { flow: parsed.flow } : {}),
      ...(parsed.states !== undefined ? { states: parsed.states } : {}),
      ...(parsed.workflow !== undefined ? { workflow: parsed.workflow } : {})
    };

    if (parsed.dry_run) {
      const result = mapLegacyV3Mutation({
        summary: "Dry run: create Pipeline V3 template task",
        request,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createTemplateTaskV3(parsed);
    const result = mapLegacyV3Mutation({
      summary: "Created Pipeline V3 template task",
      request,
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

export function createPipelineStartNewPipelineV3Handler(client: PipelineLegacyV3MutationClient) {
  return async (input: unknown) => {
    const parsed = pipelineStartNewPipelineV3Input.parse(input);
    const request = {
      ...(parsed.body ?? {}),
      ...(parsed.build_params !== undefined ? { build_params: parsed.build_params } : {})
    };

    if (parsed.dry_run) {
      const result = mapLegacyV3Mutation({
        summary: `Dry run: start Pipeline V3 ${parsed.pipeline_id}`,
        request: {
          pipeline_id: parsed.pipeline_id,
          ...request
        },
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.startNewPipelineV3(parsed);
    const result = mapLegacyV3Mutation({
      summary: `Started Pipeline V3 ${parsed.pipeline_id}`,
      request: {
        pipeline_id: parsed.pipeline_id,
        ...request
      },
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

export function createPipelineStopPipelineV3Handler(client: PipelineLegacyV3MutationClient) {
  return async (input: unknown) => {
    const parsed = pipelineStopPipelineV3Input.parse(input);
    const request = {
      pipeline_id: parsed.pipeline_id,
      build_id: parsed.build_id
    };

    if (parsed.dry_run) {
      const result = mapLegacyV3Mutation({
        summary: `Dry run: stop Pipeline V3 ${parsed.pipeline_id} build ${parsed.build_id}`,
        request,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.stopPipelineV3(parsed);
    const result = mapLegacyV3Mutation({
      summary: `Stopped Pipeline V3 ${parsed.pipeline_id} build ${parsed.build_id}`,
      request,
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
