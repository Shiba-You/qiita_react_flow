import { FC, useCallback, useEffect, useState } from "react";
import { StoreType } from "../../common/types/storeTypes";
import useStore from "../../common/store/reactFlowStore";
import { useShallow } from "zustand/react/shallow";

const selector = (state: StoreType) => ({
  check: state.check,
  getNodeById: state.getNodeById,
  deleteNode: state.deleteNode,
  deleteEdge: state.deleteEdge,
  setZIndexNode: state.setZIndexNode,
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
  const { check, getNodeById, deleteNode, deleteEdge, setZIndexNode } =
    useStore(useShallow(selector));

  const [parents, setParents] = useState<{ [x: string]: string }>({});

  const deleteNd = useCallback(() => {
    deleteNode(id);
    deleteEdge(id);
  }, [deleteNode, id, deleteEdge]);

  const addZIndexNode = useCallback(() => {
    setZIndexNode(1, id);
  }, [id, setZIndexNode]);

  useEffect(() => {
    console.log(getNodeById(id));
    setParents(getNodeById(id)?.data?.parents || {});
  }, [getNodeById, id]);

  return (
    <div
      style={{ top, left, right, bottom, backgroundColor: "white" }}
      className="context-menu"
      {...props}
    >
      <p style={{ margin: "0.5em" }}>
        <small>node: {id}</small>
      </p>
      {Object.keys(parents).map((key) => (
        <p style={{ margin: "0.5em" }} key={key}>
          <small>
            {key} : {parents[key] as string}
          </small>
        </p>
      ))}
      <button onClick={check}>確認</button>
      <button onClick={deleteNd}>削除</button>
      <button onClick={addZIndexNode}>一つ前</button>
    </div>
  );
};

export default ContextMenu;
