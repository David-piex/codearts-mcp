import { asItemResult } from "../../../contracts/tool-result.js";
import {
  artifactCreateAttentionInput,
  artifactDeleteCompletelyUpdateFileStateInput
} from "../schemas.js";

type MutationResponse = {
  status?: string;
  trace_id?: string;
  raw: unknown;
};

type CreateAttentionClient = {
  createAttention: (input: {
    format: string;
    attention: string;
    ids: string[];
  }) => Promise<MutationResponse>;
};

type DeleteCompletelyUpdateFileStateClient = {
  deleteCompletelyUpdateFileState: (input: { ids: string[] }) => Promise<
    MutationResponse & {
      success?: number;
      failed?: number;
      success_items?: string[];
      failed_items?: string[];
      reason?: unknown[];
    }
  >;
};

export function createArtifactCreateAttentionHandler(client: CreateAttentionClient) {
  return async (input: unknown) => {
    const parsed = artifactCreateAttentionInput.parse(input);
    const preview = asItemResult(
      `Dry run: ${parsed.attention === "0" ? "follow" : "unfollow"} ${parsed.ids.length} Artifact attention item(s)`,
      {
        format: parsed.format,
        attention: parsed.attention,
        ids: parsed.ids,
        executed: !parsed.dry_run
      }
    );

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.createAttention({
      format: parsed.format,
      attention: parsed.attention,
      ids: parsed.ids
    });
    const result = asItemResult(
      `${parsed.attention === "0" ? "Updated" : "Cleared"} Artifact attention for ${parsed.ids.length} item(s)`,
      {
        format: parsed.format,
        attention: parsed.attention,
        ids: parsed.ids,
        status: response.status,
        traceId: response.trace_id,
        raw: response.raw,
        executed: true
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createArtifactDeleteCompletelyUpdateFileStateHandler(
  client: DeleteCompletelyUpdateFileStateClient
) {
  return async (input: unknown) => {
    const parsed = artifactDeleteCompletelyUpdateFileStateInput.parse(input);
    const preview = asItemResult(`Dry run: permanently delete ${parsed.ids.length} Artifact file item(s)`, {
      ids: parsed.ids,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.deleteCompletelyUpdateFileState({ ids: parsed.ids });
    const result = asItemResult(`Permanently deleted Artifact file item(s)`, {
      ids: parsed.ids,
      status: response.status,
      traceId: response.trace_id,
      success: response.success,
      failed: response.failed,
      successItems: response.success_items,
      failedItems: response.failed_items,
      reason: response.reason,
      raw: response.raw,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
