import { InternalNode, getBezierPath, useInternalNode } from "@xyflow/react";

import { getEdgeParams } from "../../common/utils/Edges";
import { CustomNode } from "../../common/types/nodeTypes";

const SimpleNode = ({ id, source, target, markerEnd, style }: any) => {
  const sourceNode: InternalNode<CustomNode> | undefined =
    useInternalNode(source);
  const targetNode: InternalNode<CustomNode> | undefined =
    useInternalNode(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );

  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });

  return (
    <path
      id={id}
      className="react-flow__edge-path"
      d={edgePath}
      strokeWidth={5}
      markerEnd={markerEnd}
      style={style}
    />
  );
};

export default SimpleNode;
