import { asItemResult } from "../../../contracts/tool-result.js";
import { checkModifyCriterionsetRelationsInput } from "../schemas.js";

type CheckModifyCriterionsetRelationsClient = {
  modifyCriterionsetRelations: (input: {
    set_id: string;
    operator?: string;
    show_tool_versions?: string[];
    criterion_ids_list: Array<Record<string, unknown> & { id: string; status: "enable" | "disable" }>;
  }) => Promise<{
    set_id: string;
    raw: Record<string, unknown>;
  }>;
};

function mapCriterionsetRelations(input: {
  set_id: string;
  operator?: string;
  show_tool_versions?: string[];
  criterion_ids_list: Array<{ id: string; status: "enable" | "disable" }>;
  raw?: Record<string, unknown>;
  executed: boolean;
}) {
  return asItemResult(
    `${input.executed ? "Modified" : "Dry run: modify"} Check criterionset ${input.set_id} relations`,
    {
      id: input.set_id,
      setId: input.set_id,
      operator: input.operator,
      showToolVersions: input.show_tool_versions,
      criterionCount: input.criterion_ids_list.length,
      criterionIds: input.criterion_ids_list.map((item) => item.id),
      raw: input.raw,
      executed: input.executed
    }
  );
}

export function createCheckModifyCriterionsetRelationsHandler(client: CheckModifyCriterionsetRelationsClient) {
  return async (input: unknown) => {
    const parsed = checkModifyCriterionsetRelationsInput.parse(input);

    if (parsed.dry_run) {
      const result = mapCriterionsetRelations({
        ...parsed,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.modifyCriterionsetRelations(parsed);
    const result = mapCriterionsetRelations({
      ...parsed,
      raw: response.raw,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
