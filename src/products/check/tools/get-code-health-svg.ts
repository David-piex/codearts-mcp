import { checkGetCodeHealthSvgInput } from "../schemas.js";
import { asItemResult } from "../../../contracts/tool-result.js";

type Client = {
  getCodeHealthSvg: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown> | string;
  }>;
};

export function createCheckGetCodeHealthSvgHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetCodeHealthSvgInput.parse(input);
    const response = await client.getCodeHealthSvg(parsed);
    const result = asItemResult(`Loaded Check code health SVG ${response.task_id}`, {
      id: response.task_id,
      taskId: response.task_id,
      codeHealthSvg: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
