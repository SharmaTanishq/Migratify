import { useState } from 'react';
import { JsonTreeView } from './index';
import { DroppableInput } from './draggableInput';

export function DataMappingTable() {
  const [mappings, setMappings] = useState<Record<string, string>>({});
  
  const sampleData = {
    headers: {
      host: "bridgeflow.app.n8n.cloud",
      "user-agent": "PostmanRuntime/7.43.0",
      "content-length": "316",
      accept: "*/*",
      "accept-encoding": "gzip, br",
      // ... other headers
    },
    params: {},
    query: {},
    body: {
      title: "buy 1 get 1 Free",
      body: "any product"
    }
  };

  const handlePathDrop = (field: string, path: string) => {
    setMappings(prev => ({
      ...prev,
      [field]: path
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div>
        <h3 className="font-medium mb-2">Input Schema</h3>
        <JsonTreeView 
          data={sampleData}
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Mappings</h3>
        <div>
          <label className="text-sm text-muted-foreground">Target Field</label>
          <DroppableInput
            value={mappings.target || ''}
            onChange={(e:any) => handlePathDrop('target', e.target.value)}
            onPathDrop={(path) => handlePathDrop('target', path)}
            placeholder="Drag a field here..."
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Source Field</label>
          <DroppableInput
            value={mappings.source || ''}
            onChange={(e:any) => handlePathDrop('source', e.target.value)}
            onPathDrop={(path) => handlePathDrop('source', path)}
            placeholder="Drag a field here..."
          />
        </div>
      </div>
    </div>
  );
}