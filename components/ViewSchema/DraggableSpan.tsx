import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

interface DraggableSpanProps {
  id: string;
  label: string;
  value: any;
  path: string;
  className?: string;
}

export const DraggableSpan = ({
  id,
  label,
  value,
  path,
  className
}: DraggableSpanProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: {
      type: typeof value,
      value: value,
      path,
      label,
    },
  });

  return (
    <span
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "cursor-grab transition-all duration-200 hover:bg-gray-300 p-1 rounded-md",
        isDragging && "opacity-50",
        className
      )}
    >
      {label}
    </span>
  );
};
