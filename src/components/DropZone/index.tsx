// "use client";

import { FC, useCallback, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
  ConnectionMode,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { CustomNode, nodeTypes } from "../../common/types/nodeTypes";
import { edgeTypes } from "../../common/types/edgeTypes";

import useGraphStore from "../../common/store/reactFlowStore";
import { StoreType } from "../../common/types/storeTypes";
import { useShallow } from "zustand/react/shallow";
import ContextMenu from "../ContextMenu";

const selector = (state: StoreType) => ({
  nodes: state.nodes,
  edges: state.edges,
  check: state.check,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onDragOver: state.onDragOver,
  onDrop: state.onDrop,
  onNodeDragStop: state.onNodeDragStop,
});

export const DropZone: FC = () => {
  const reactFlowWrapper = useRef(null);
  const reactFlowRef = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState<any>(null);
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onDragOver,
    onConnect,
    onDrop,
    onNodeDragStop,
  } = useGraphStore(useShallow(selector));
  const { screenToFlowPosition } = useReactFlow();

  const wrappedOnDrop = useCallback(
    (event: any) => {
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      onDrop(event, position);
    },
    [onDrop, screenToFlowPosition]
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);
  const onNodeContextMenu = useCallback(
    (event: any, node: CustomNode) => {
      event.preventDefault();
      const pane = reactFlowRef.current?.getBoundingClientRect() as DOMRect;
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY - 50,
        left: event.clientX < pane.width - 200 && event.clientX - 100,
        right:
          event.clientX >= pane.width - 200 && pane.width - event.clientX + 100,
        bottom:
          event.clientY >= pane.height - 200 &&
          pane.height - event.clientY + 50,
      });
    },
    [setMenu]
  );

  return (
    <div
      ref={reactFlowWrapper}
      style={{
        flex: "1 1 0%",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <ReactFlow
        ref={reactFlowRef}
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={wrappedOnDrop}
        onDragOver={onDragOver}
        onNodeDragStop={onNodeDragStop}
        onPaneClick={onPaneClick}
        onNodeContextMenu={onNodeContextMenu}
        fitView
        connectionMode={ConnectionMode.Loose}
      >
        <Background />
        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

const DropZoneProvider = () => {
  return (
    <ReactFlowProvider>
      <DropZone />
    </ReactFlowProvider>
  );
};

export default DropZoneProvider;
