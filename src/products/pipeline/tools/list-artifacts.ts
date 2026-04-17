import { asListResult } from "../../../contracts/tool-result.js";
import { pipelineListArtifactsInput } from "../schemas.js";

export function mapPipelineArtifacts(
  items: Array<{
    name?: string;
    artifact_version?: string;
    upload_target?: string;
    artifact_package_type?: string;
    artifact_uri?: string;
    artifact_download_url_with_id?: string;
    artifact_type?: string;
    job_id?: string;
    build_no?: number;
  }>
) {
  return asListResult(
    `${items.length} pipeline artifacts found`,
    items.map((item) => ({
      id: item.artifact_uri ?? item.name ?? "",
      name: item.name ?? "",
      version: item.artifact_version,
      uploadTarget: item.upload_target,
      packageType: item.artifact_package_type,
      downloadUrl: item.artifact_download_url_with_id,
      artifactType: item.artifact_type,
      jobId: item.job_id,
      buildNo: item.build_no
    }))
  );
}

type PipelineListArtifactsClient = {
  listArtifacts: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
  }) => Promise<{
    artifacts: Array<{
      name?: string;
      artifact_version?: string;
      upload_target?: string;
      artifact_package_type?: string;
      artifact_uri?: string;
      artifact_download_url_with_id?: string;
      artifact_type?: string;
      job_id?: string;
      build_no?: number;
    }>;
  }>;
};

export function createPipelineListArtifactsHandler(client: PipelineListArtifactsClient) {
  return async (input: unknown) => {
    const parsed = pipelineListArtifactsInput.parse(input);
    const response = await client.listArtifacts(parsed);
    const result = mapPipelineArtifacts(response.artifacts);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
