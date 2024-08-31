import { ResourceType } from "../../common/types/resourceTypes";
import awsIcons from "../../common/constants/draggableObjects";

const DraggableObject = ({ icon }: { icon: ResourceType }) => {
  const onDragStart = (
    event: {
      dataTransfer: {
        setData: (arg0: string, arg1: any) => void;
        effectAllowed: string;
      };
    },
    icon: ResourceType
  ) => {
    event.dataTransfer.setData("application/reactflow/url", icon.url);
    event.dataTransfer.setData(
      "application/reactflow/resourceCategory",
      icon.resourceCategory
    );
    event.dataTransfer.setData("application/reactflow/resourceName", icon.name);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="icon"
      onDragStart={(event) => onDragStart(event, icon)}
      draggable
    >
      <img src={icon.url} alt={icon.name} />
      <span>{icon.name}</span>
    </div>
  );
};

export const Sidebar = () => {
  return (
    <div className="sidebar">
      {awsIcons.map((icon) => (
        <DraggableObject key={icon.id} icon={icon} />
      ))}
    </div>
  );
};

export default Sidebar;
