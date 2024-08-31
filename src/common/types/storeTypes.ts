import {
  Edge,
  Node,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  XYPosition,
} from "@xyflow/react";
import { CustomNode } from "./nodeTypes";

export type StoreType = {
  nodes: CustomNode[];
  edges: Edge[];
  maxZIndex: number;
  minZIndex: number;
  check: () => void;
  addNode: (node: CustomNode) => void;
  deleteNode: (id: string) => void;
  deleteEdge: (id: string) => void;
  getNodeById: (id: string) => CustomNode | undefined;
  setZIndexNode: (delta: number, id: string) => void;
  onNodesChange: OnNodesChange<CustomNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onDragOver: (event: {
    preventDefault: () => void;
    dataTransfer: { dropEffect: string };
  }) => void;
  onDrop: (
    event: {
      preventDefault: () => void;
      dataTransfer: { getData: (arg0: string) => any };
      clientX: number;
      clientY: number;
    },
    position: XYPosition
  ) => void;
  onNodeDragStop: (_: any, node: CustomNode) => void;
};
