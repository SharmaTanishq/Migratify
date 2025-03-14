import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ExtendedJSONSchema7, SchemaIcon, SchemaViewerProps } from "./types";
import { Separator } from "../ui/separator";
import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { DraggableField } from "./DraggableField";
import { JsonViewer,PathValueCustomGetter,JsonViewerKeyRenderer,defineDataType} from "@textea/json-viewer";

import { VTEX_ORDER_SCHEMA } from "../CustomNodes/Mail/Drawer";
import { Badge } from "../ui/badge";

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
  searchTerm = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [draggedItem, setDraggedItem] = useState<DraggableItemProps | null>(
    null
  );
  const [filteredSchema, setFilteredSchema] =
    useState<ExtendedJSONSchema7>(schema);

  // Update filtered schema when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredSchema(schema);
      return;
    }

    // Function to filter schema based on search term
    const filterSchema = (
      schemaObj: ExtendedJSONSchema7,
      currentPath = ""
    ): ExtendedJSONSchema7 | null => {
      // Create a new object to avoid mutating the original
      const result: ExtendedJSONSchema7 = { ...schemaObj };

      // For objects, filter properties
      if (schemaObj.type === "object" && schemaObj.properties) {
        // Initialize properties to ensure it's defined
        result.properties = {};
        let hasMatchingChild = false;

        Object.entries(schemaObj.properties).forEach(([key, value]) => {
          const fullPath = currentPath ? `${currentPath}.${key}` : key;

          // Check if key matches search term
          const keyMatches = key
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

          // Recursively filter child properties
          const filteredChild = filterSchema(
            value as ExtendedJSONSchema7,
            fullPath
          );

          if (keyMatches || filteredChild) {
            // We know result.properties is defined because we initialized it above
            result.properties![key] = filteredChild || value;
            hasMatchingChild = true;
          }
        });

        if (!hasMatchingChild) {
          return null;
        }
      }

      // For arrays, filter items
      else if (schemaObj.type === "array" && schemaObj.items) {
        const filteredItems = filterSchema(
          schemaObj.items as ExtendedJSONSchema7,
          currentPath ? `${currentPath}[0]` : "items[0]"
        );

        if (filteredItems) {
          result.items = filteredItems;
        } else {
          return null;
        }
      }

      // For primitive types, check if the key or example value matches
      else {
        const valueMatches = schemaObj.examples?.some((example) =>
          String(example).toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (!valueMatches) {
          return null;
        }
      }

      return result;
    };

    const filtered = filterSchema(schema);
    setFilteredSchema(filtered || { type: "object", properties: {} });
  }, [searchTerm, schema]);

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
      // Add dragging class to body to prevent horizontal scrolling
      document.body.classList.add("dragging");
    },
    onDragEnd: () => {
      setDraggedItem(null);
      // Remove dragging class from body
      document.body.classList.remove("dragging");
    },
    onDragCancel: () => {
      setDraggedItem(null);
      // Remove dragging class from body
      document.body.classList.remove("dragging");
    },
  });

  const urlType = defineDataType<any>({
    is: (value) => typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean',
    Component: (props) => {
      
      return (
        <div className="inline-block my-2">
          <p
            className="text-[11px] font-mono font-semibold text-gray-500"
            
        >
          {props.value}
        </p>
        </div>
      )
    }
  })

  const KeyRenderer: JsonViewerKeyRenderer = ({ path, value }) => {
    return (
      <div className="inline-block my-2">
        <DraggableField
          id={convertToJSONPath(path)}
          //SET ICON PATH.
          icon={"circle"}
          label={path.slice(-1)}
          value={path.slice(-1)}
          path={convertToJSONPath(path)}
          showValue={true}
        />
      </div>
    )
  }
  KeyRenderer.when = (props) => true
  

  const getIcon = (iconName: SchemaIcon) => {
    const iconKey = iconName
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join("");
    const Icon = (Icons as any)[iconKey] || Icons.HelpCircle;
    return <Icon className="w-4 h-4 text-gray-500" />;
  };

  const convertToJSONPath = (pathArray: Array<string | number>): string => {
    return (
      "$" +
      pathArray.reduce((path, segment) => {
        if (typeof segment === "number") {
          return `${path}[${segment}]`;
        }
        return `${path}.${segment}`;
      }, "")
    );
  };

  const renderValue = (
    value: ExtendedJSONSchema7,
    key: string,
    currentPath: string
  ) => {
    // Create the path based on the type of the parent and current key
    let fullPath;

    // Handle array items with proper indexing
    if (key === "items" && currentPath.endsWith("]")) {
      // If we're already in an array context, don't add another index
      fullPath = currentPath;
    } else if (key === "items") {
      // If this is an array items property, add [0] to indicate first item
      fullPath = `${currentPath}[0]`;
    } else if (currentPath) {
      // Normal property path
      fullPath = `${currentPath}.${key}`;
    } else {
      // Root level property
      fullPath = key;
    }

    if (value.type === "object" || value.type === "array") {
      // Always expand nodes when searching
      const shouldExpand = searchTerm ? true : level < 2;

      return (
        <Collapsible key={key} defaultOpen={shouldExpand} className="w-full">
          <CollapsibleTrigger
            className="flex items-center gap-4 w-full hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded"
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
              <div className="py-2">
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
      <div className="flex items-center gap-3 mb-1 p-1 group">
        <DraggableField
          id={fullPath}
          icon={value.icon || "circle"}
          label={key}
          value={value.examples?.[0]}
          path={fullPath}
          showValue={true}
        />

        <span className="text-[11px] text-gray-500 truncate">
          {value.examples?.[0]}
        </span>
      </div>
    );
  };

  return (
    <>
      <ScrollArea className={cn("border-none   bg-none h-[60vh]", className)}>
        <ScrollBar orientation="vertical" />
        <div className="p-1 pl-0 ">
          {/* <div className="flex items-center gap-2 mb-4">
            {getIcon(filteredSchema.icon || "file-json")}
            <h3 className="text-lg font-semibold truncate">
              {filteredSchema.title || "Schema Viewer"}
            </h3>
          </div>
          <div className="grid grid-cols-1 max-w-[500px]">
            {filteredSchema.properties &&
              Object.entries(filteredSchema.properties).map(([key, value]) =>
                renderValue(value as ExtendedJSONSchema7, key, path)
              )}
            {filteredSchema.properties &&
              Object.keys(filteredSchema.properties).length === 0 &&
              searchTerm && (
                <div className="text-gray-500 italic">
                    No matching fields found
                </div>
              )}
          </div> */}
          <JsonViewer
            value={VTEX_ORDER_SCHEMA}
            
            keyRenderer={KeyRenderer}
            displayDataTypes={false}
            enableClipboard={false}
            quotesOnKeys={false}
            indentWidth={5}
            rootName={false}
            valueTypes={[urlType]}
            onCopy={(path, value) => {
              console.log(convertToJSONPath(path), value);
            }}
          >
            
          </JsonViewer>
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
            showIcon={false}
            showValue={true}
            className="shadow-lg border border-dashed border-indigo-600 bg-none gap-0 cursor-grabbing overflow-visible"
          />
        )}
      </DragOverlay>
    </>
  );
};

export default SchemaViewer;
