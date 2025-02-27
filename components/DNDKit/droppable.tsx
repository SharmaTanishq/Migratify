import React, { useEffect, useState } from 'react';
import {useDroppable} from '@dnd-kit/core';
import { Input } from '../ui/input';

interface DroppableProps {
  children: React.ReactNode;
  value: string | undefined | null;
}

export function Droppable({ children, value }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });
  
  // Initialize with empty string to ensure it's always controlled
  const [droppableValue, setDroppableValue] = useState<string>('');

  useEffect(() => {
    // Convert undefined or null to empty string to maintain controlled state
    setDroppableValue(value ?? '');
  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDroppableValue(event.target.value);
  };

  const style = {
    color: isOver ? 'green' : 'red',
  };
  
  return (
    
      <Input 
        className="w-full h-full" 
        ref={setNodeRef}
        placeholder="Drop here" 
        value={droppableValue} 
        onChange={handleOnChange}
      />
    
  );
}