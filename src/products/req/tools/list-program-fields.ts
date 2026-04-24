import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqListProgramFieldsInput } from "../schemas.js";

type ReqProgramField = {
  id?: string;
  name?: string;
  label?: string;
  field_type?: string;
  option_source?: string;
  default_value_can_update?: boolean;
  options?: Array<{ id?: string; name?: string; label?: string }>;
  config?: {
    default_value?: unknown[];
    field_id?: string;
  };
};

type ReqListProgramFieldsClient = {
  listProgramFields: (input: { program_id: string; field_type: "IR" | "RR" }) => Promise<{
    fields: ReqProgramField[];
  }>;
};

export function createReqListProgramFieldsHandler(client: ReqListProgramFieldsClient) {
  return async (input: unknown) => {
    const parsed = reqListProgramFieldsInput.parse(input);
    const response = await client.listProgramFields(parsed);
    const result = asListResult(
      `${response.fields.length} Req program fields found`,
      response.fields.map((item) => ({
        id: item.id,
        name: item.name,
        label: item.label,
        fieldType: item.field_type,
        optionSource: item.option_source,
        defaultValueCanUpdate: item.default_value_can_update,
        optionsCount: item.options?.length ?? 0,
        configFieldId: item.config?.field_id
      }))
    );

    return {
      content: [
        {
          type: "text" as const,
          text: formatListToolText(result, {
            fields: [
              { label: "id", get: (item) => (item as { id?: string }).id },
              { label: "name", get: (item) => (item as { name?: string }).name },
              { label: "label", get: (item) => (item as { label?: string }).label }
            ]
          })
        }
      ],
      structuredContent: result
    };
  };
}
