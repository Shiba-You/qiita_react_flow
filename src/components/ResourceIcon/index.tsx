import { type NodeProps } from "@xyflow/react";

import type { Node } from "@xyflow/react";
import { ResourceEquipment } from "../ResourceEquipment";

const ResourceCategory = "resource-icon";

type ResourceIconNode = Node<
  { label: string; url: string; zIndex: number },
  typeof ResourceCategory
>;

export const ResourceIcon = ({ data }: NodeProps<ResourceIconNode>) => {
  return (
    <ResourceEquipment
      keepAspectRatio={true}
      id={data.label}
      resourceCategory={ResourceCategory}
      zIndex={data.zIndex}
    >
      <div style={{ position: "relative", width: "100%", paddingTop: "100%" }}>
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
    </ResourceEquipment>
  );
};
