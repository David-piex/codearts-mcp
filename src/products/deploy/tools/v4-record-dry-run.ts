export type V4RecordDryRunPreviewMeta = {
  previewSource: "record_detail" | "local_fallback";
  recordDetailAvailable: boolean;
  warning?: string;
};

const V4_RECORD_LOCAL_PREVIEW_WARNING =
  "Deploy v4 record detail is not available on the current tenant/gateway; returning a local dry-run preview only.";

export function isV4RecordDryRunPreviewUnavailable(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  const code = "code" in error && typeof error.code === "string" ? error.code : undefined;
  const message = error.message;

  return (
    code === "APIGW.0101" ||
    code === "Deploy.00021534" ||
    /not been published in the environment/i.test(message) ||
    /部署记录不存在/.test(message)
  );
}

export async function resolveV4RecordDryRunPreview(
  loadRecordDetail: () => Promise<unknown>
): Promise<V4RecordDryRunPreviewMeta> {
  try {
    await loadRecordDetail();
    return {
      previewSource: "record_detail",
      recordDetailAvailable: true
    };
  } catch (error) {
    if (!isV4RecordDryRunPreviewUnavailable(error)) {
      throw error;
    }

    return {
      previewSource: "local_fallback",
      recordDetailAvailable: false,
      warning: V4_RECORD_LOCAL_PREVIEW_WARNING
    };
  }
}
