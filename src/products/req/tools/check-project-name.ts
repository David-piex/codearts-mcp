import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCheckProjectNameInput } from "../schemas.js";

export function mapCheckedProjectName(input: {
  name: string;
  exist: boolean;
}) {
  return asItemResult(
    input.exist ? `Project name ${input.name} already exists` : `Project name ${input.name} is available`,
    {
      name: input.name,
      exists: input.exist,
      available: !input.exist
    }
  );
}

type ReqCheckProjectNameClient = {
  checkProjectName: (input: { name: string }) => Promise<{
    exist: boolean;
  }>;
};

export function createReqCheckProjectNameHandler(client: ReqCheckProjectNameClient) {
  return async (input: unknown) => {
    const parsed = reqCheckProjectNameInput.parse(input);
    const response = await client.checkProjectName(parsed);
    const result = mapCheckedProjectName({
      name: parsed.name,
      exist: response.exist
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
