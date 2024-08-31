import { InternalNode, Position } from "@xyflow/react";
import { CustomNode } from "../types/nodeTypes";

const getParams = (
  nodeA: InternalNode<CustomNode>,
  nodeB: InternalNode<CustomNode>
) => {
  const centerA = getNodeCenter(nodeA);
  const centerB = getNodeCenter(nodeB);

  const horizontalDiff = Math.abs(centerA.x - centerB.x);
  const verticalDiff = Math.abs(centerA.y - centerB.y);

  let position;
  if (horizontalDiff > verticalDiff) {
    position = centerA.x > centerB.x ? Position.Left : Position.Right;
  } else {
    position = centerA.y > centerB.y ? Position.Top : Position.Bottom;
  }

  const [x, y] = getHandleCoordsByPosition(nodeA, position);
  return { x, y, position };
};

const getHandleCoordsByPosition = (
  node: InternalNode<CustomNode>,
  handlePosition: Position
) => {
  let handleX = 0;
  let handleY = 0;
  let offsetX = 0;
  let offsetY = 0;
  if (node.internals.handleBounds?.source) {
    const handle = node.internals.handleBounds.source.find(
      (h) => h.position === handlePosition
    );

    handleX = handle ? handle.x : 0;
    handleY = handle ? handle.y : 0;

    offsetX = handle ? handle.width / 2 : 0;
    offsetY = handle ? handle.height / 2 : 0;

    switch (handlePosition) {
      case Position.Left:
        offsetX = 0;
        break;
      case Position.Right:
        offsetX = handle ? handle.width : 0;
        break;
      case Position.Top:
        offsetY = 0;
        break;
      case Position.Bottom:
        offsetY = handle ? handle.height : 0;
        break;
    }
  }

  const x = node.internals.positionAbsolute.x + handleX + offsetX;
  const y = node.internals.positionAbsolute.y + handleY + offsetY;

  return [x, y];
};

function getNodeCenter(node: InternalNode<CustomNode>) {
  const width = node.measured?.width ?? 0;
  const height = node.measured?.height ?? 0;

  return {
    x: node.internals.positionAbsolute.x + width / 2,
    y: node.internals.positionAbsolute.y + height / 2,
  };
}

export const getEdgeParams = (
  source: InternalNode<CustomNode>,
  target: InternalNode<CustomNode>
) => {
  const { x: sx, y: sy, position: sourcePos } = getParams(source, target);
  const { x: tx, y: ty, position: targetPos } = getParams(target, source);

  return {
    sx,
    sy,
    tx,
    ty,
    sourcePos,
    targetPos,
  };
};
