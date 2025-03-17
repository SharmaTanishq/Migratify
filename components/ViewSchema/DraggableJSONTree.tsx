import { DraggableField } from './DraggableField';
import { SchemaIcon } from './types';
import { DragOverlay, useDndMonitor, type Modifier } from '@dnd-kit/core';
import { useState, useRef, useEffect } from 'react';
import JsonView from '@uiw/react-json-view';
import { DraggableSpan } from './DraggableSpan';

interface DraggableJSONTreeProps {
  data: any;
  className?: string;
  searchTerm?: string;
}

interface DraggedItem {
  id: string;
  icon: SchemaIcon;
  label: string;
  value: any;
  path: string;
}


const adjustForModalPosition: Modifier = ({transform}) => {
  const modalElement = document.querySelector('[role="dialog"]');
  if (!modalElement) return transform;

  const modalRect = modalElement.getBoundingClientRect();
  
  return {
    ...transform,
    x: transform.x - modalRect.left,
    y: transform.y - modalRect.top,
    scaleX: 1,
    scaleY: 1
  };
};

export const DraggableJSONTree: React.FC<DraggableJSONTreeProps> = ({ 
  data, 
  className,
  searchTerm = "" 
}) => {
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
  // Use a ref to maintain a counter for generating unique IDs
  const idCounterRef = useRef(0);
  const [filteredData, setFilteredData] = useState(data);

  // Filter data based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
      return;
    }

    // Function to filter JSON data based on search term
    const filterData = (obj: any, path: string[] = []): any => {
      // For primitive values, check if they match the search term
      if (typeof obj !== 'object' || obj === null) {
        return String(obj).toLowerCase().includes(searchTerm.toLowerCase()) ? obj : undefined;
      }

      // For arrays, filter each item
      if (Array.isArray(obj)) {
        const filtered = obj
          .map((item, index) => filterData(item, [...path, index.toString()]))
          .filter(item => item !== undefined);
        
        return filtered.length > 0 ? filtered : undefined;
      }

      // For objects, filter each property
      const result: Record<string, any> = {};
      let hasMatch = false;

      for (const key in obj) {
        // Check if key matches search term
        const keyMatches = key.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Recursively filter value
        const filteredValue = filterData(obj[key], [...path, key]);
        
        if (keyMatches || filteredValue !== undefined) {
          result[key] = keyMatches ? obj[key] : filteredValue;
          hasMatch = true;
        }
      }

      return hasMatch ? result : undefined;
    };

    const filtered = filterData(data);
    setFilteredData(filtered !== undefined ? filtered : {});
  }, [searchTerm, data]);

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
      document.body.classList.add('dragging');
    },
    onDragEnd: () => {
      setDraggedItem(null);
      // Remove dragging class from body
      document.body.classList.remove('dragging');
    },
    onDragCancel: () => {
      setDraggedItem(null);
      // Remove dragging class from body
      document.body.classList.remove('dragging');
    },
  });

  // Function to build a proper path from JsonView's context
  const buildPath = (path: any[], keyName: string): string => {
    if (!path || path.length === 0) return keyName;
    
    // Create a full path array including the current key
    const fullPathArray = [...path, keyName];
    
    // Build the path string with proper notation
    return fullPathArray.reduce((result, segment, index) => {
      const segmentStr = String(segment);
      
      if (typeof segment === 'number' || !isNaN(Number(segmentStr))) {
        // Array index - use bracket notation
        return `${result}[${segmentStr}]`;
      } else if (index === 0) {
        // First segment - no dot
        return segmentStr;
      } else {
        // Property - use dot notation
        return `${result}.${segmentStr}`;
      }
    }, '');
  };

  // Reset the counter when the component renders
  // This ensures we start fresh with each render
  idCounterRef.current = 0;

  return (
    <>
      <div className={`${className} overflow-x-hidden`}>
        <JsonView 
          value={filteredData} 
          displayDataTypes={false}
          displayObjectSize={false}
          enableClipboard={false}
          style={{
            backgroundColor: 'transparent',
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: '2',
          }}
        >
         
        </JsonView>
      </div>
     
      <DragOverlay 
        dropAnimation={null} 
        modifiers={[adjustForModalPosition]}
        className="drag-overlay overflow-x-hidden"
      >
        {draggedItem && (
          <DraggableSpan
            id={draggedItem.id}
            label={draggedItem.label}
            value={draggedItem.value}
            path={draggedItem.path}
            className="shadow-lg bg-white"
          />
        )}
      </DragOverlay>
    </>
  );
}; 