import { asItemResult } from "../../../contracts/tool-result.js";
import { reqExportWorkItemsNewV2Input } from "../schemas.js";

export function previewExportWorkItemsNewV2(input: {
  project_id: string;
  fields: string;
  export_child: boolean;
  type: "tree" | "list";
  time_zone: number;
  page: number;
  page_size: number;
  export_all: boolean;
  tracker_id?: string;
  dry_run: boolean;
}) {
  return asItemResult("Dry run: export CodeArts Req work items", {
    projectId: input.project_id,
    fields: input.fields,
    exportChild: input.export_child,
    type: input.type,
    timeZone: input.time_zone,
    page: input.page,
    pageSize: input.page_size,
    exportAll: input.export_all,
    trackerId: input.tracker_id,
    executed: false
  });
}

export function mapExportedWorkItemsNewV2(input: {
  project_id: string;
  file_name?: string;
  content_type?: string;
  size_bytes: number;
  content_base64: string;
}) {
  return asItemResult(`Exported CodeArts Req work items${input.file_name ? ` to ${input.file_name}` : ""}`, {
    projectId: input.project_id,
    fileName: input.file_name,
    contentType: input.content_type,
    sizeBytes: input.size_bytes,
    contentBase64: input.content_base64,
    executed: true
  });
}

type ReqExportWorkItemsNewV2Client = {
  exportWorkItemsNewV2: (input: {
    project_id: string;
    fields: string;
    export_child: boolean;
    type: "tree" | "list";
    time_zone: number;
    page: number;
    page_size: number;
    export_all: boolean;
    tracker_id?: string;
  }) => Promise<{
    project_id: string;
    file_name?: string;
    content_type?: string;
    size_bytes: number;
    content_base64: string;
  }>;
};

export function createReqExportWorkItemsNewV2Handler(client: ReqExportWorkItemsNewV2Client) {
  return async (input: unknown) => {
    const parsed = reqExportWorkItemsNewV2Input.parse(input);

    if (parsed.dry_run) {
      const result = previewExportWorkItemsNewV2(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.exportWorkItemsNewV2(parsed);
    const result = mapExportedWorkItemsNewV2(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
