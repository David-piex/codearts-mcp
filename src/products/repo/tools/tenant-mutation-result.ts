export function previewTenantRepositoryExport(input: {
  repository_ids?: Array<string | number>;
  dry_run: boolean;
}) {
  return {
    repositoryIds: input.repository_ids?.map(String) ?? [],
    executed: !input.dry_run
  };
}

export function previewTenantRepoEncryptionSettingMutation(input: {
  tenant_id: string;
  encryption_type?: string;
  default_encryption_enabled?: boolean;
  cmk_key_name?: string;
  cmk_key_id?: string;
  dry_run: boolean;
}) {
  return {
    tenantId: input.tenant_id,
    encryptionType: input.encryption_type,
    defaultEncryptionEnabled: input.default_encryption_enabled,
    cmkKeyName: input.cmk_key_name,
    cmkKeyId: input.cmk_key_id,
    executed: !input.dry_run
  };
}

export function previewTenantKmsGrantMutation(input: {
  tenant_id: string;
  key?: string | null;
  title?: string | number;
  dry_run: boolean;
}) {
  return {
    tenantId: input.tenant_id,
    key: input.key,
    title: input.title,
    executed: !input.dry_run
  };
}

export function previewTenantTrustedIpAddressMutation(input: {
  ip_id?: string;
  ip_type?: 0 | 1 | 2;
  ip_start?: string;
  ip_end?: string;
  view_flag?: 0 | 1;
  download_flag?: 0 | 1;
  upload_flag?: 0 | 1;
  remark?: string;
  dry_run: boolean;
}) {
  return {
    ipId: input.ip_id,
    ipType: input.ip_type,
    ipStart: input.ip_start,
    ipEnd: input.ip_end,
    viewFlag: input.view_flag,
    downloadFlag: input.download_flag,
    uploadFlag: input.upload_flag,
    remark: input.remark,
    executed: !input.dry_run
  };
}
