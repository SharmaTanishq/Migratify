import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface DroppableInputProps {
  onPathDrop: (path: string) => void;
  className?: string;
  [key: string]: any;
}

export function DroppableInput({ 
  onPathDrop, 
  className, 
  ...props 
}: DroppableInputProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div
      className={cn(
        "relative",
        isDragOver && "ring-2 ring-primary rounded-md"
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        const path = e.dataTransfer.getData('text/plain');
        onPathDrop(path);
      }}
    >
      <Input
        {...props}
        className={cn(className)}
      />
    </div>
  );
}