import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ExtendedJSONSchema7, SchemaIcon, SchemaViewerProps } from "./types";
import { Separator } from "../ui/separator";
import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { DraggableField } from "./DraggableField";

interface DraggableItemProps {
  id: string;
  icon: SchemaIcon;
  label: string;
  value: ExtendedJSONSchema7;
  path: string;
}

const modalPositionModifier = (args: any) => {
  const modalElement = document.querySelector('[role="dialog"]');
  if (!modalElement) return args.transform;

  const modalRect = modalElement.getBoundingClientRect();
  const transform = restrictToWindowEdges(args);

  return {
    ...transform,
    x: transform.x - modalRect.left,
    y: transform.y - modalRect.top,
  };
};

const SchemaViewer: React.FC<SchemaViewerProps> = ({
  schema,
  initialExpanded = true,
  className = "",
  level = 0,
  path = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [draggedItem, setDraggedItem] = useState<DraggableItemProps | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      const data = event.active.data.current as any;
      setDraggedItem({
        id: event.active.id as string,
        icon: data.icon,
        label: data.label,
        value: data.value,
        path: data.path,
      });
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
  });

  const getIcon = (iconName: SchemaIcon) => {
    const iconKey = iconName
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join("");
    const Icon = (Icons as any)[iconKey] || Icons.HelpCircle;
    return <Icon className="w-4 h-4 text-gray-500" />;
  };

  const renderValue = (
    value: ExtendedJSONSchema7,
    key: string,
    currentPath: string
  ) => {
    const fullPath = currentPath ? `${currentPath}.${key}` : key;

    if (value.type === "object" || value.type === "array") {
      return (
        <Collapsible key={key} defaultOpen={level < 2} className="w-full">
          <CollapsibleTrigger
            className="flex items-center gap-2 w-full hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            {getIcon(value.icon || "folder")}
            <span className="font-medium text-sm">{key}</span>
            <span className="text-xs text-gray-500">{value.type}</span>
            {value.type === "array" && value.items && (
              <span className="text-xs text-gray-400">
                [{(value.items as ExtendedJSONSchema7).type}]
              </span>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-6 border-l border-gray-200 dark:border-gray-700">
            {value.type === "object" &&
              value.properties &&
              Object.entries(value.properties).map(([k, v]) =>
                renderValue(v as ExtendedJSONSchema7, k, fullPath)
              )}
            {value.type === "array" && value.items && (
              <div className="py-1">
                {renderValue(
                  value.items as ExtendedJSONSchema7,
                  "items",
                  fullPath
                )}
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <div className="flex items-center gap-2 p-1 group">
        <DraggableField
          id={fullPath}
          icon={value.icon || "circle"}
          label={key}
          value={value.examples?.[0]}
          path={fullPath}
          showValue={true}
        />

        <span className="text-[11px] text-gray-500">{value.examples?.[0]}</span>
      </div>
    );
  };

  return (
    <>
      <ScrollArea
        className={cn(
          "border-none flex-1 w-full bg-white/80",
          className
        )}
      >
        <div className="p-1 pl-0" style={{ scrollbarGutter: "stable" }}>
          <div className="flex items-center gap-2 mb-4">
            {getIcon(schema.icon || "file-json")}
            <h3 className="text-lg font-semibold">
              {schema.title || "Schema Viewer"}
            </h3>
          </div>
          <div className="grid grid-cols-1">
            {schema.properties &&
              Object.entries(schema.properties).map(([key, value]) =>
                renderValue(value as ExtendedJSONSchema7, key, path)
              )}
          </div>
        </div>
      </ScrollArea>
      <DragOverlay dropAnimation={null} modifiers={[modalPositionModifier]}>
        {draggedItem && (
          <DraggableField
            id={draggedItem.id}
            icon={draggedItem.icon}
            label={draggedItem.label}
            value={draggedItem.value}
            path={draggedItem.path}
            showValue={true}
            className="shadow-lg"
          />
        )}
      </DragOverlay>
    </>
  );
};

export default SchemaViewer;
