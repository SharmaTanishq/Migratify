import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import { Button } from '../ui/button';

interface DraggableProps {
  children: React.ReactNode;
  data: any;
  id: string;
  key: string;
}

export function Draggable(props: DraggableProps) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
    data: props.data,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}