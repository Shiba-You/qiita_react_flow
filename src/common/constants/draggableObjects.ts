import { ResourceType } from "../types/resourceTypes";

const awsIcons: ResourceType[] = [
  {
    id: "ec2",
    name: "EC2",
    url: "/icons/EC2.svg",
    resourceCategory: "resource-icon",
  },
  {
    id: "s3",
    name: "S3",
    url: "/icons/S3.svg",
    resourceCategory: "resource-icon",
  },
  {
    id: "vpc",
    name: "VPC",
    url: "/icons/VPC.svg",
    resourceCategory: "resource-group",
  },
  {
    id: "PriSubnet",
    name: "PriSubnet",
    url: "/icons/PriSubnet.svg",
    resourceCategory: "resource-group",
  },
  {
    id: "PubSubnet",
    name: "PubSubnet",
    url: "/icons/PubSubnet.svg",
    resourceCategory: "resource-group",
  },
];

export default awsIcons;
