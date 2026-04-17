import { asItemResult } from "../../../contracts/tool-result.js";
import { artifactGetFileTreeInput } from "../schemas.js";

export function mapArtifactFileTree(
  repoName: string,
  rootPath: string,
  nodes: Array<{
    path?: string;
    name?: string;
    type?: string;
  }>
) {
  return asItemResult(`Loaded artifact file tree for ${repoName}`, {
    id: repoName,
    repoName,
    rootPath,
    nodeCount: nodes.length,
    nodes: nodes.map((node) => ({
      path: node.path,
      name: node.name,
      type: node.type
    }))
  });
}

type ArtifactGetFileTreeClient = {
  getFileTree: (input: {
    tenant_id: string;
    project_id: string;
    repo_name: string;
  }) => Promise<{
    root_path: string;
    nodes: Array<{
      path?: string;
      name?: string;
      type?: string;
    }>;
  }>;
};

export function createArtifactGetFileTreeHandler(client: ArtifactGetFileTreeClient) {
  return async (input: unknown) => {
    const parsed = artifactGetFileTreeInput.parse(input);
    const response = await client.getFileTree(parsed);
    const result = mapArtifactFileTree(parsed.repo_name, response.root_path, response.nodes);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
