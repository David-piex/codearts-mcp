export type ReqProjectModuleOwner = {
  user_id?: string;
  user_name?: string;
  nick_name?: string;
  user_num_id?: number;
};

export type ReqProjectModule = {
  module_id: number | string;
  module_name: string;
  description?: string;
  deepth?: number;
  is_parent?: boolean;
  parent_module_id?: number;
  owner?: ReqProjectModuleOwner;
  children?: ReqProjectModule[];
};

export function mapProjectModuleOwner(owner?: ReqProjectModuleOwner) {
  if (!owner) {
    return undefined;
  }

  return {
    userId: owner.user_id,
    userName: owner.user_name,
    nickName: owner.nick_name,
    userNumId: owner.user_num_id
  };
}

export function mapProjectModuleItem(module: ReqProjectModule) {
  const item: {
    id: string;
    name: string;
    depth?: number;
    isParent?: boolean;
    owner?: ReturnType<typeof mapProjectModuleOwner>;
    description?: string;
    parentModuleId?: number;
    children?: ReturnType<typeof mapProjectModuleItem>[];
  } = {
    id: String(module.module_id),
    name: module.module_name,
    depth: module.deepth,
    isParent: module.is_parent,
    owner: mapProjectModuleOwner(module.owner)
  };

  if (typeof module.description !== "undefined") {
    item.description = module.description;
  }

  if (typeof module.parent_module_id !== "undefined") {
    item.parentModuleId = module.parent_module_id;
  }

  if (module.children) {
    item.children = module.children.map(mapProjectModuleItem);
  }

  return item;
}
