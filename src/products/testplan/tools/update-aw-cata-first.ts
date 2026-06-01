import { testPlanUpdateAwCataFirstInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type UpdateAwCataFirstInput = {
  project_id: string;
  cata_id: string;
  cata_name: string;
  parent_id?: string;
  source_type?: string | number;
  dry_run: boolean;
};

type Client = {
  updateAwCataFirst: (input: Omit<UpdateAwCataFirstInput, "dry_run">) => Promise<{
    cata_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function previewUpdateAwCataFirst(input: UpdateAwCataFirstInput) {
  return mapTestPlanRecordItem(
    `${input.dry_run ? "Dry run" : "Executed"}: update AW catalog ${input.cata_id}`,
    input.cata_id,
    "catalog",
    {
      cata_id: input.cata_id,
      cata_name: input.cata_name,
      parent_id: input.parent_id,
      source_type: input.source_type
    },
    {
      projectId: input.project_id,
      executed: !input.dry_run
    }
  );
}

export function createTestPlanUpdateAwCataFirstHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanUpdateAwCataFirstInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateAwCataFirst(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateAwCataFirst(parsed);
    const result = mapTestPlanRecordItem(
      `Updated AW catalog ${parsed.cata_id}`,
      parsed.cata_id,
      "catalog",
      response.raw,
      {
        projectId: parsed.project_id,
        value: response.value,
        executed: true
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
