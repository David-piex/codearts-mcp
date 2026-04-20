export function isReleasePublishingStep(step: {
  name?: string;
  module_id?: string;
  command?: string;
}) {
  const haystacks = [step.name, step.module_id, step.command]
    .filter((value): value is string => typeof value === "string" && value.length > 0)
    .map((value) => value.toLowerCase());

  return haystacks.some(
    (value) =>
      value.includes("codeci_action_20018") ||
      value.includes("upload_artifact") ||
      value.includes("release") ||
      value.includes("releaseman") ||
      value.includes("upload package")
  );
}

export function hasSuspiciousJavaArchivePackaging(step: {
  command?: string;
}) {
  if (typeof step.command !== "string" || step.command.length === 0) {
    return false;
  }

  return /\b(?:cp|mv)\s+\S+\.js\s+\S+\.(?:jar|war|ear)\b/i.test(step.command);
}

export function collectReleaseUploadWarnings(file?: string) {
  if (typeof file === "string" && /\.(jar|war|ear)$/i.test(file)) {
    return ["java_archive_upload_requires_real_archive"];
  }

  return [];
}

export function getReleaseUploadFile(properties?: Record<string, unknown>) {
  if (typeof properties?.file === "string") {
    return properties.file;
  }

  if (typeof properties?.path === "string") {
    return properties.path;
  }

  return undefined;
}

export function getArtifactMetadata(properties?: Record<string, unknown>) {
  return {
    artifactFile: getReleaseUploadFile(properties),
    artifactPackageName:
      typeof properties?.name === "string" ? properties.name : undefined,
    artifactBuildVersion:
      typeof properties?.buildVersion === "string" ? properties.buildVersion : undefined,
    artifactCustomUploadPath:
      typeof properties?.customUploadPath === "string"
        ? properties.customUploadPath
        : undefined
  };
}

export function withReleaseUploadWarningSummary(summary: string, warnings: string[]) {
  if (!warnings.includes("java_archive_upload_requires_real_archive")) {
    return summary;
  }

  return `${summary} Warning: .jar/.war/.ear uploads should be real Java archive artifacts.`;
}
