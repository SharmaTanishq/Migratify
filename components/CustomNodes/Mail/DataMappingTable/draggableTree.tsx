import { DragEvent, useState } from 'react';
import { ChevronRight, ChevronDown, Hash, Type } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FieldData {
  type: 'string' | 'number' | 'object' | 'array';
  value: any;
}

interface FieldExplorerProps {
  data: Record<string, FieldData>;
  onFieldDrop?: (path: string) => void;
}

export function FieldExplorer({ data }: FieldExplorerProps) {
  return (
    <div className="rounded-lg border bg-card p-2">
      <TreeNode path="" data={data} level={0} />
    </div>
  );
}

interface TreeNodeProps {
  path: string;
  data: Record<string, FieldData> | FieldData;
  level: number;
}

function TreeNode({ path, data, level }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!data || typeof data !== 'object') return null;

  const isLeaf = 'type' in data;
  const displayPath = path.split('.').pop() || 'root';

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', path);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="ml-4">
      <div 
        className={cn(
          "flex items-center gap-2 py-1 px-2 rounded-md",
          "hover:bg-accent/50 cursor-pointer select-none",
          isLeaf && "draggable-field"
        )}
        onClick={() => !isLeaf && setIsExpanded(!isExpanded)}
        draggable={isLeaf}
        onDragStart={handleDragStart}
      >
        {!isLeaf && (
          <button className="w-4 h-4 flex items-center justify-center">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
        
        {/* Field Type Icon */}
        {isLeaf ? (
          data.type === 'number' ? (
            <Hash className="w-4 h-4 text-blue-500" />
          ) : (
            <Type className="w-4 h-4 text-green-500" />
          )
        ) : (
          <div className="w-4 h-4" />
        )}

        {/* Field Name */}
        <span className="text-sm">
          {displayPath}
          {isLeaf && (
            <span className="ml-2 text-xs text-muted-foreground">
              {data.type as string}
            </span>
          )}
        </span>
      </div>

      {/* Render Children */}
      {!isLeaf && isExpanded && (
        <div className="ml-4">
          {Object.entries(data).map(([key, value]) => (
            <TreeNode
              key={key}
              path={path ? `${path}.${key}` : key}
              data={value}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}