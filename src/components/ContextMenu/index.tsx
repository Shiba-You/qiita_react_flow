import { FC, useCallback } from "react";
import { StoreType } from "../../common/types/storeTypes";
import useStore from "../../common/store/reactFlowStore";
import { useShallow } from "zustand/react/shallow";

const selector = (state: StoreType) => ({
  nodes: state.nodes,
  edges: state.edges,
  addNode: state.addNode,
  deleteNode: state.deleteNode,
  deleteEdge: state.deleteEdge,
  setZIndexNode: state.setZIndexNode,
  getNodeById: state.getNodeById,
});

type ContextMenuType = {
  id: string;
  top: string;
  left: string;
  right: string;
  bottom: string;
};

const ContextMenu: FC<ContextMenuType> = ({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}) => {
  const { deleteNode, deleteEdge, setZIndexNode } = useStore(
    useShallow(selector)
  );

  const deleteNd = useCallback(() => {
    deleteNode(id);
    deleteEdge(id);
  }, [deleteNode, id, deleteEdge]);

  const addZIndexNode = useCallback(() => {
    setZIndexNode(1, id);
  }, [id, setZIndexNode]);

  return (
    <div
      style={{ top, left, right, bottom, backgroundColor: "black" }}
      className="context-menu"
      {...props}
    >
      <p style={{ margin: "0.5em" }}>
        <small>node: {id}</small>
      </p>
      <button onClick={deleteNd}>削除</button>
      <button onClick={addZIndexNode}>一つ前</button>
    </div>
  );
};

export default ContextMenu;
