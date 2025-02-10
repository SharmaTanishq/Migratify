import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

function NodeName({
  display_name,
  selected,
  nodeId,
  showNode,
  isOutdated,
  beta,
  editNameDescription,
  toggleEditNameDescription,
  setHasChangedNodeDescription,
}: {
  display_name?: string;
  selected?: boolean;
  nodeId: string;
  showNode: boolean;
  isOutdated: boolean;
  beta: boolean;
  editNameDescription: boolean;
  toggleEditNameDescription: () => void;
  setHasChangedNodeDescription: (hasChanged: boolean) => void;
}) {
  const [nodeName, setNodeName] = useState<string>(display_name ?? "");

  useEffect(() => {}, [editNameDescription]);

  useEffect(() => {
    setNodeName(display_name ?? "");
  }, [display_name]);

  const handleBlur = () => {
    if (nodeName?.trim() !== "") {
      setNodeName(nodeName);
      //   setNode(nodeId, (old) => ({
      //     ...old,
      //     data: {
      //       ...old.data,
      //       node: {
      //         ...old.data.node,
      //         display_name: nodeName,
      //       },
      //     },
      //   }));
    } else {
      setNodeName(display_name ?? "");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
      toggleEditNameDescription();
    }
    if (e.key === "Escape") {
      setNodeName(display_name ?? "");
      toggleEditNameDescription();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNodeName(e.target.value);
    setHasChangedNodeDescription(true);
  };

  return editNameDescription ? (
    <div className="m-[1px] w-full">
      <Input
        onBlur={handleBlur}
        value={nodeName}
        autoFocus
        onChange={onChange}
        data-testid={`input-title-${display_name}`}
        onKeyDown={handleKeyDown}
        className="py-1"
      />
    </div>
  ) : (
    <div className="group flex w-full items-center gap-1">
      <div
        data-testid={"title-" + display_name}
        className={cn(
          "nodoubleclick w-full truncate font-medium text-primary",
          showNode ? "cursor-text" : "cursor-default"
        )}
      >
        <div className="flex cursor-grab items-center gap-2">
          <span
            className={cn(
              "max-w-44 cursor-grab truncate text-[14px font-medium",
              isOutdated && "max-w-40",
              !showNode && "max-w-28"
            )}
          >
            {display_name}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NodeName;
