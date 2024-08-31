import { create } from "zustand";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MarkerType,
} from "@xyflow/react";
import { StoreType } from "../types/storeTypes";
import { CustomNodeTypes } from "../types/nodeTypes";
import { getParents, handleChildNodeData } from "../utils/Nodes";
import { randomId } from "../utils/objects";

const useGraphStore = create<StoreType>((set, get) => ({
  nodes: [],
  edges: [],
  maxZIndex: 0,
  minZIndex: 0,
  check: () => {
    console.log("nodes: ");
    console.log(get().nodes);
    console.log("edges: ");
    console.log(get().edges);
  },
  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },
  deleteNode: (id) => {
    set({ nodes: get().nodes.filter((nd) => nd.id !== id) });
  },
  deleteEdge: (id) => {
    set({ edges: get().edges.filter((ed) => ed.id !== id) });
  },
  getNodeById: (id) => {
    return get().nodes.find((nd) => nd.id === id);
  },
  setZIndexNode: (delta, id) => {
    set({
      nodes: get().nodes.map((prevNd) =>
        prevNd.id === id
          ? {
              ...prevNd,
              data: {
                ...prevNd.data,
                zIndex: prevNd?.zIndex ? prevNd.zIndex + delta : delta,
              },
            }
          : prevNd
      ),
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    console.log(connection);
    set({
      edges: addEdge(
        {
          ...connection,
          type: "simple-node",
          markerEnd: { type: MarkerType.Arrow },
        },
        get().edges
      ),
    });
  },
  onDragOver: (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  },
  onDrop: (event, position) => {
    event.preventDefault();
    const url: string = event.dataTransfer.getData("application/reactflow/url");
    const resourceCategory: CustomNodeTypes = event.dataTransfer.getData(
      "application/reactflow/resourceCategory"
    );
    const resourceName: string = event.dataTransfer.getData(
      "application/reactflow/resourceName"
    );
    const newNode = {
      id: randomId(),
      type: resourceCategory,
      position,
      data: { name: resourceName, zIndex: get().maxZIndex, url },
    };
    set({ nodes: [...get().nodes, newNode] });
  },
  onNodeDragStop: (_, node) => {
    const parents = getParents(get().nodes, node);
    if (parents) {
      set({
        nodes: get().nodes.map((prevNd) =>
          prevNd.id === node.id
            ? {
                ...prevNd,
                data: {
                  ...prevNd.data,
                  parents: handleChildNodeData(parents),
                },
              }
            : prevNd
        ),
      });
    }
  },
}));

export default useGraphStore;
