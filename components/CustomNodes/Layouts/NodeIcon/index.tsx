import Image from "next/image";

function NodeIcon({
  icon,
  dataType,
  showNode,
  isGroup,
  hasToolMode,
}: {
  icon: string;
  dataType: string;
  showNode: boolean;
  isGroup: boolean;
  hasToolMode: boolean;
}) {
  return (
    <div>
      <Image src={icon} alt={dataType} width={30} height={30} />
    </div>
  );
}

export default NodeIcon;
