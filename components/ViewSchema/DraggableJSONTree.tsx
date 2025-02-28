import { DraggableField } from './DraggableField';
import { SchemaIcon } from './types';
import { DragOverlay, useDndMonitor, type Modifier } from '@dnd-kit/core';
import { useState } from 'react';
import JsonView from '@uiw/react-json-view';

interface DraggableJSONTreeProps {
  data: any;
  className?: string;
}

interface DraggedItem {
  id: string;
  icon: SchemaIcon;
  label: string;
  value: any;
  path: string;
}

const getIconForType = (type: string): SchemaIcon => {
  switch (type) {
    case 'object':
      return 'box';
    case 'array':
      return 'list';
    case 'string':
      return 'font';
    case 'number':
      return 'hashtag';
    case 'boolean':
      return 'check-square';
    default:
      return 'circle';
  }
};

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

export const DraggableJSONTree: React.FC<DraggableJSONTreeProps> = ({ data, className }) => {
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);

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

  return (
    <>
      <div className={className}>
        <JsonView 
          value={data} 
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
          <JsonView.KeyName
            
            render={(props, context) => {
              // Get the key name
                const keyName = String(context.keyName);
                
                // Get the path from JsonView's context
                const rawPath = (context as any).path || [];
                
                // Build the full path
                const fullPath = buildPath(rawPath, keyName);
                
                // Determine the type of the value for icon selection
                let valueType = typeof context.value;
                if (Array.isArray(context.value)) {
                    valueType = 'object'; // Treat arrays as objects for icon purposes
                } else if (context.value === null) {
                    valueType = 'string'; // Treat null as string for icon purposes
                }
                
                const icon = getIconForType(valueType);
                
                // Format display label
                let displayLabel = keyName;
                if (!isNaN(Number(keyName)) && rawPath.length > 0) {
                    const parentKey = String(rawPath[rawPath.length - 1]);
                    displayLabel = `${parentKey}[${keyName}]`;
                }
                return (
                    <span className="cursor-grab transition-all duration-200 hover:bg-gray-300 p-1 rounded-md" draggable>
                        {displayLabel}
                    </span>)
            }}
          />
        </JsonView>
      </div>
      {/* <style jsx global>{`
        .custom-json-view {
          display: flex;
          flex-direction: column;
        }
        .custom-json-view > div {
          display: flex;
          flex-direction: row-reverse;
          justify-content: flex-start;
          align-items: center;
          padding: 2px 0;
        }
        .custom-json-view > div > div {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .custom-json-view .w-json-view-value {
          color: #a6e22e;
          padding-left: 8px;
        }
        .custom-json-view .w-json-view-value-number {
          color: #fd971f;
        }
        .custom-json-view .w-json-view-value-boolean {
          color: #ae81ff;
        }
        .custom-json-view .w-json-view-value-null {
          color: #f8f8f2;
        }
      `}</style> */}
      {/* <DragOverlay 
        dropAnimation={null} 
        modifiers={[adjustForModalPosition]}
        className="drag-overlay"
      >
        {draggedItem && (
          <DraggableField
            id={draggedItem.id}
            icon={draggedItem.icon}
            label={draggedItem.label}
            value={draggedItem.value}
            path={draggedItem.path}
            showValue={true}
            className="shadow-lg bg-white"
          />
        )}
      </DragOverlay> */}
    </>
  );
}; 