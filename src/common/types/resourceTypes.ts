export type ResourceType = {
  id: string;
  name: string;
  url: string;
  parentId?: string;
  resourceCategory: ResourceCategory;
};

export type ResourceCategory =
  | "resource-icon"
  | "resource-group"
  | "resource-attachment";
