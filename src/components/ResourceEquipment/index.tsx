import "./style.css";
import { ResourceCategory } from "../../common/types/resourceTypes";
import { Handle, NodeResizer, Position } from "@xyflow/react";
import { useState } from "react";
type ResourceEquipmentType = {
  children: React.ReactNode;
  keepAspectRatio: boolean;
  id: string;
  resourceCategory: ResourceCategory;
  zIndex: number;
};

export const ResourceEquipment = ({
  children,
  keepAspectRatio,
  id,
  resourceCategory,
  zIndex,
}: ResourceEquipmentType) => {
  const [isInit, setIsInit] = useState(true);

  const getStyle = (): React.CSSProperties | undefined => {
    const style = {
      padding: "0px !important",
      width: "100%",
      height: "100%",
      zIndex: `${zIndex} !important`,
    };
    if (resourceCategory === "resource-icon") {
      style.width = isInit ? "50px" : "100%";
    } else if (resourceCategory === "resource-group") {
      style.width = isInit ? "100px" : "100%";
      style.height = isInit ? "100px" : "100%";
    }
    return style;
  };
  return (
    <div style={getStyle()} className="react-flow__node-default">
      {children}
      <NodeResizer
        minWidth={10}
        minHeight={10}
        keepAspectRatio={keepAspectRatio}
        onResize={() => setIsInit(false)}
      />
      <Handle
        type="source"
        position={Position.Top}
        style={{
          height: "3px",
          width: "3px",
          borderWidth: "1px",
          padding: "1px",
        }}
        id={`${id}_top`}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          height: "3px",
          width: "3px",
          borderWidth: "1px",
          padding: "1px",
        }}
        id={`${id}_right`}
      />
      <Handle
        type="source"
        position={Position.Left}
        style={{
          height: "3px",
          width: "3px",
          borderWidth: "1px",
          padding: "1px",
        }}
        id={`${id}_left`}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          height: "3px",
          width: "3px",
          borderWidth: "1px",
          padding: "1px",
        }}
        id={`${id}_bottom`}
      />
    </div>
  );
};
