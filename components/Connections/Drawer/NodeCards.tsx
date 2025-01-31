import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDnD } from "@/components/AddNodes/DnDContext";
import { useRef } from "react";
import { motion } from "framer-motion";

interface NodeCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  type: string;
}

export function NodeCard({
  title,
  description,
  icon,
  className,
  type,
}: NodeCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [_, setType] = useDnD();

  const onDragStart = (event: any, nodeType: any) => {
    event.stopPropagation();
    event.dataTransfer.setData("application/reactflow", nodeType);
    if (setType === null) return;

    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <motion.div
      onDragStart={(event) => onDragStart(event, type)}
      ref={ref}
      className={cn(
        "flex cursor-grab active:cursor-grabbing items-center justify-evenly p-2 rounded-lg border border-gray-200 bg-white/50 hover:bg-white/80 hover:border-gray-300 hover:shadow-sm transition-all duration-200",
        className
      )}
      draggable
    >
      <div className="flex items-center ">
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-50/50">
            {icon}
          </div>
        )}
        <div className="space-y-1">
          <h3 className="font-semibold text-gray-900">
            {title.length > 30 ? `${title.slice(0, 30)}...` : title}
          </h3>
          <p className="text-sm text-gray-500 ">
            {description.length > 30
              ? `${description.slice(0, 30)}...`
              : description}
          </p>
        </div>
      </div>

      <div className="flex items-center  hover:text-gray-600 cursor-move">
        <GripVertical className="h-6 w-6 text-black" />
      </div>
    </motion.div>
  );
}
