import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import { Separator } from "../ui/separator";
import { SchemaIcon } from "./types";

interface DraggableFieldProps {
  id: string;
  icon: SchemaIcon;
  label: string;
  value: any;
  path: string;
  className?: string;
  showValue?: boolean;
  showIcon?: boolean;
}

export const DraggableField = ({ 
  id, 
  icon, 

  label, 
  value, 
  path,
  className,
  showValue = false,
  showIcon = true
}: DraggableFieldProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: {
      type: typeof value,
      value: value,
      path,
      icon,
      label,
    },
  });

  const getIcon = (iconName: SchemaIcon) => {
    const iconKey = iconName
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join("");
    const Icon = (Icons as any)[iconKey] || Icons.HelpCircle;
    return <Icon className="w-5 h-5  text-gray-600 " />;
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "cursor-grab font-bold text-black flex items-center justify-center bg-gray-200 dark:bg-gray-800 gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 px-2 py-2 rounded-md touch-none",
        isDragging && "opacity-50 ",
        className
      )}
    >
      {showIcon && getIcon(icon)}
      <Separator
        orientation="vertical"
        className="h-4 bg-gray-500 rounded-full opacity-0 transition-all duration-200 group-hover:opacity-100"
      />
      <span className="text-sm font-mono font-semibold  text-black">{label}</span>
      
    </div>
  );
}; 