import { asItemResult } from "../../../contracts/tool-result.js";
import { reqValidateProjectTemplateNameInput } from "../schemas.js";

export function mapValidatedProjectTemplateName(input: {
  name: string;
  exist: boolean;
}) {
  return asItemResult(
    input.exist
      ? `Project template name ${input.name} already exists`
      : `Project template name ${input.name} is available`,
    {
      name: input.name,
      exists: input.exist,
      available: !input.exist
    }
  );
}

type ReqValidateProjectTemplateNameClient = {
  validateProjectTemplateName: (input: { name: string; x_auth_token?: string }) => Promise<{
    exist: boolean;
  }>;
};

export function createReqValidateProjectTemplateNameHandler(client: ReqValidateProjectTemplateNameClient) {
  return async (input: unknown) => {
    const parsed = reqValidateProjectTemplateNameInput.parse(input);
    const response = await client.validateProjectTemplateName(parsed);
    const result = mapValidatedProjectTemplateName({
      name: parsed.name,
      exist: response.exist
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
