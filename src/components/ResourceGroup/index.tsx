import { type NodeProps } from "@xyflow/react";

import type { Node } from "@xyflow/react";
import { ResourceEquipment } from "../ResourceEquipment";

const ResourceCategory = "resource-group";

type ResourceGroupNode = Node<
  { label: string; url: string; zIndex: number },
  typeof ResourceCategory
>;

export const ResourceGroup = ({ data }: NodeProps<ResourceGroupNode>) => {
  return (
    <ResourceEquipment
      keepAspectRatio={false}
      id={data.label}
      resourceCategory={ResourceCategory}
      zIndex={data.zIndex}
    >
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{ position: "relative", width: "20px", height: "20px" }}>
          <img
            src={data.url}
            alt={data.label}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </ResourceEquipment>
  );
};
