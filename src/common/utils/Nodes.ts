import { CustomNode } from "../types/nodeTypes";

export const handleChildNodeData = (p: CustomNode[]) => {
  return p.reduce((acc: { [x: string]: string }, pa) => {
    acc[pa.data.name] = pa.id;
    return acc;
  }, {});
};

const checkIsHover = (p: CustomNode, c: CustomNode) => {
  const width = p.measured?.width ?? 0;
  const height = p.measured?.height ?? 0;
  return (
    p.position.x <= c.position.x &&
    c.position.x <= p.position.x + width &&
    p.position.y <= c.position.y &&
    c.position.y <= p.position.y + height
  );
};

export const getParents = (nodes: CustomNode[], child: CustomNode) => {
  const parents: CustomNode[] = nodes
    .filter(
      (nd: CustomNode) => nd.id !== child.id && nd.type === "resource-group"
    )
    .filter((nd: CustomNode) => nd.id !== child.id && checkIsHover(nd, child));
  return parents;
};
