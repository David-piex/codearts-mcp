import { artifactListNetProxyInput } from "../schemas.js";
import { formatArtifactRecordListText, mapArtifactRecordList } from "./generic-record-tools.js";

type ArtifactListNetProxyClient = {
  listNetProxy: () => Promise<{
    proxies: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createArtifactListNetProxyHandler(client: ArtifactListNetProxyClient) {
  return async (input: unknown) => {
    artifactListNetProxyInput.parse(input);
    const response = await client.listNetProxy();
    const result = mapArtifactRecordList(response.proxies, response.total, "net proxies", "proxy");

    return {
      content: [{ type: "text" as const, text: formatArtifactRecordListText(result) }],
      structuredContent: result
    };
  };
}
