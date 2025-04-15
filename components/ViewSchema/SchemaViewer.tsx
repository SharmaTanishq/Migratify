import React, { useState, useEffect, memo } from "react";
import { ExtendedJSONSchema7, SchemaIcon, SchemaViewerProps } from "./types";
import { DragOverlay, PointerSensor, useDndMonitor } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { DraggableField } from "./DraggableField";
import { JsonViewer,JsonViewerKeyRenderer,defineDataType} from "@textea/json-viewer";

import { VTEX_ORDER_SCHEMA } from "../CustomNodes/Mail/Drawer";
import { CSS } from '@dnd-kit/utilities';
import { DropAnimation } from '@dnd-kit/core';
import { nanoid } from "nanoid";
import getFieldIcon from "../Utils/getFieldIcon";


const dropAnimation: DropAnimation = {
  duration: 0,
  keyframes() {
    return [];
  },
  sideEffects: ({ active, dragOverlay }) => {
    dragOverlay.node.style.opacity = '0';
    
    return () => {
      active.node.style.opacity = '';
      dragOverlay.node.style.opacity = '';
    };
  }
};


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

   const id = nanoid() 

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
        id: id,
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
      //document.body.classList.remove("dragging");
    },
    onDragCancel: () => {
      setDraggedItem(null);
      // Remove dragging class from body
      //document.body.classList.remove("dragging");
    },
  });

  const genericType = defineDataType<any>({
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
    const label = typeof path.slice(-1)[0] === 'number' 
      ? `${path.slice(-2)[0]}[${path.slice(-1)}]`
      : path.slice(-1)[0];
    
    const icon = getFieldIcon(value);
    
    return (
      <div className="inline-block my-2 ">
        <DraggableField
          id={convertToJSONPath(path)}
          key={convertToJSONPath(path)}
          icon={icon}
          label={label}
          showSeparator={true}
          value={value}
          path={convertToJSONPath(path)}
          showValue={true}
        />
      </div>
    );
  };
  KeyRenderer.when = (props) => true 
  

  

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


  return (
    <>
      
        <div className="p-1 pl-0  h-[calc(70vh-10rem)] ">
         
          <JsonViewer
            value={VTEX_ORDER_SCHEMA as any}
            collapseStringsAfterLength={30}
            keyRenderer={KeyRenderer}
            displayDataTypes={false}
            enableClipboard={false}
            quotesOnKeys={false}
            indentWidth={5}
            rootName={false}
            valueTypes={[genericType]}
           
          />
            
          
        </div>
      

      <DragOverlay 
        transition={defaultTransition} 
        dropAnimation={dropAnimation} 
        modifiers={[modalPositionModifier, restrictToWindowEdges]}
      >
        {draggedItem && (
          <DraggableField
            id={draggedItem.id}
            key={draggedItem.id}
            icon={draggedItem.icon}
            label={draggedItem.label}
            value={draggedItem.value}
            path={draggedItem.path}
            showSeparator={false}
            showIcon={true}
            showValue={true}
            className="shadow-[0_15px_25px_-15px_rgba(0,0,0,0.8)] transition-all duration-250  ease-in-out border border-dashed border-indigo-600  cursor-grabbing overflow-visible scale-110"
          />
        )}
      </DragOverlay>
    </>
  );
};

export default memo(SchemaViewer);

function defaultTransition() {
  return 'all 100ms cubic-bezier(0.2, 0, 0, 1)';
}
