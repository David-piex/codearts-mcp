import { asItemResult } from "../../../contracts/tool-result.js";
import { buildGetDockerfileTemplateInput } from "../schemas.js";

type Client = {
  getDockerfileTemplate: (input: { image_id: string }) => Promise<{
    image_id: string;
    template: string;
  }>;
};

export function createBuildGetDockerfileTemplateHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetDockerfileTemplateInput.parse(input);
    const response = await client.getDockerfileTemplate(parsed);
    const result = asItemResult("Loaded Build Dockerfile template", {
      id: response.image_id,
      image_id: response.image_id,
      template: response.template
    });

    return {
      content: [{ type: "text" as const, text: response.template || result.summary }],
      structuredContent: result
    };
  };
}
