import { ResourceGroup } from "../../components/ResourceGroup";
import { ResourceIcon } from "../../components/ResourceIcon";
import { NodeTypes, type Node } from "@xyflow/react";

export type CustomNodeTypes = "resource-icon" | "resource-group";

export const nodeTypes = {
  "resource-icon": ResourceIcon,
  "resource-group": ResourceGroup,
  // Add any of your custom nodes here!
} satisfies NodeTypes;

export type CustomNodeData = {
  name: string;
  url: string;
  parents?: {
    vpc?: string;
    subnet?: string;
  };
};

export type CustomNode = Omit<Node, "data" | "type"> & {
  data: CustomNodeData;
  type: CustomNodeTypes;
};
