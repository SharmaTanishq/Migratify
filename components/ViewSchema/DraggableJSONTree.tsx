import { JSONTree } from 'react-json-tree';
import { DraggableField } from './DraggableField';
import { SchemaIcon } from './types';
import type { LabelRenderer, KeyPath } from 'react-json-tree';
import { DragOverlay, useDndMonitor, type Modifier } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { useState } from 'react';

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

  const renderLabel: LabelRenderer = (rawKeyPath: KeyPath, nodeType, expanded, expandable) => {
    // Convert readonly array to regular array and ensure all elements are strings
    const keyPath = [...rawKeyPath].map(k => String(k));
    
    // KeyPath in react-json-tree is in reverse order (leaf to root)
    // We need to reverse it to get the correct path order (root to leaf)
    const reversedPath = [...keyPath].reverse();
    
    // Filter out the "root" element which is added by react-json-tree
    const filteredPath = reversedPath.filter(segment => segment !== 'root');
    
    // Create a proper JSON path notation with square brackets for array indices
    const fullPath = filteredPath.reduce((path, segment, index) => {
      // If segment is a number, it's an array index - use bracket notation
      if (!isNaN(Number(segment))) {
        // Check if this is the last segment or if the next segment is also a number
        const isLastSegment = index === filteredPath.length - 1;
        const nextSegmentIsNumber = !isLastSegment && !isNaN(Number(filteredPath[index + 1]));
        
        // Add a dot after the bracket if there's a property name following the array index
        return isLastSegment || nextSegmentIsNumber 
          ? `${path}[${segment}]` 
          : `${path}[${segment}].`;
      }
      
      // For the first segment or after an array index with dot already added, don't add another dot
      if (index === 0 || (index > 0 && !isNaN(Number(filteredPath[index - 1])))) {
        return `${path}${segment}`;
      }
      
      // Otherwise use dot notation
      return `${path}.${segment}`;
    }, '');
    
    const key = keyPath[0]; // The current key is the first element in the original keyPath
    
    // Format the display label - if it's a number, show parent[index]
    let displayLabel = key;
    if (!isNaN(Number(key)) && keyPath.length > 1) {
      const parentKey = keyPath[1];
      displayLabel = `${parentKey}[${key}]`;
    }
    
    // For the value, we'll use a simpler approach that's less error-prone
    const type = nodeType.toLowerCase();
    const icon = getIconForType(type);
    
    return (
      <DraggableField
        id={fullPath}
        icon={icon}
        label={displayLabel}
        value={key}
        path={fullPath}
        className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
      />
    );
  };

  return (
    <>
      <div className={className}>
        <JSONTree
          data={data}
          theme={{
            base00: 'transparent',
            extend: {
              background: 'transparent',
            }
          }}
          labelRenderer={renderLabel}
          shouldExpandNodeInitially={() => true}
        />
      </div>
      <DragOverlay 
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
      </DragOverlay>
    </>
  );
}; 