import { NodeData } from "@/components/CMS/types";
import { NodeDataType, PlatformType } from "@/components/Types/Flows";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { ArrowLeftIcon, Play, ViewIcon } from "lucide-react";
import { Handle, Position, useConnection, useEdges, useNodes, useReactFlow } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import Image from "next/image";
import { memo, useCallback, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";

function toggleEvent(events: string[], event: string): string[] {
    return events.includes(event)
      ? events.filter(e => e !== event)
      : [...events, event];
  }

function BridgesNode({
  data,
  selected,
  id,
  //onConnect,
}: {
  data: NodeDataType;
  selected?: boolean;
  id:string;
  //onConnect?: (event: any) => void;
}): JSX.Element {
  const instance = useReactFlow();
  const UIData: NodeData = JSON.parse(data.UIData);
  
  const edges = useEdges();
  const nodes = useNodes();
  const [platform, setPlatform] = useState<PlatformType>('vtex');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  // Get the source node that's connected to this bridge
  const sourceNode = edges
    .filter(edge => edge.target === id)
    .map(edge => nodes.find(node => node.id === edge.source))[0];

  // Check if source node is an e-commerce node
  const isEcommerceSource = sourceNode?.type === 'ecommerceNode';   

  
  

  return (
    <Card
      className={cn(
        "w-[200px] h-full hover:shadow-xl transition-shadow duration-300",
        selected && "border border-borderSelected"
      )}
    >
      <CardHeader className="p-4 pt-2">
        <CardTitle className="flex items-center justify-between gap-2 font-medium text-gray-900">
          <div className="flex items-center justify-start gap-2">
            <Image
              src={UIData.node_logo.url}
              alt={UIData.Name}
              width={20}
              height={20}
              className="rounded-sm bg-gray-100 p-1"
            />
            <span className="text-sm font-regular text-gray-600">
              {UIData.Name}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="transition-colors duration-200 w-6 h-6"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Play className="w-4 h-4 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Run Component</p>
              </TooltipContent>
            </Tooltip>
          </Button>
        </CardTitle>

        <CardDescription className="text-xs text-gray-600 ">
          {UIData.node_description}
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
      {isEcommerceSource && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Platform</label>
            

            {/* Event Selection */}
            <div className="mt-4">
              <label className="text-sm font-medium">Events</label>
              <div className="mt-2 space-y-2">
                {platform === 'vtex' && (
                  <>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="products"
                        checked={selectedEvents.includes('product.created')}
                        onCheckedChange={() => toggleEvent(selectedEvents, 'product.created')}
                      />
                      <label htmlFor="products" className="text-sm">
                        Product Created
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="orders"
                        checked={selectedEvents.includes('order.created')}
                        onCheckedChange={() => toggleEvent(selectedEvents, 'order.created')}
                      />
                      <label htmlFor="orders" className="text-sm">
                        Order Created
                      </label>
                    </div>
                    {/* Add more events as needed */}
                  </>
                )}
                {/* Add conditions for other platforms */}
              </div>
            </div>
          </div>
        )}

        {/* Show different content if not connected to e-commerce node */}
        {!isEcommerceSource && (
          <div className="text-sm text-gray-500">
            Connect to an e-commerce node to configure platform and events
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 bg-gray-100 rounded-b-xl">
        <div className="w-full flex items-center justify-between">
          <span className="text-[8px] text-gray-500">Source</span>
          <div className="absolute left-0 ">
            <Tooltip>
              <TooltipTrigger asChild>
                <Handle
                  type="target"
                  position={Position.Left}
                  isConnectable={true}
                  id="source"
                  style={{
                    width: 10,
                    height: 10,
                    left: -4,
                    zIndex: 500,
                    borderRadius: "1000px",
                    backgroundColor: "#4F46E4",
                    top: "50%",
                    
                    transform: "translateY(-50%)",
                    border: "1px solid #B1B0EE",
                  }}
                />
              </TooltipTrigger>
              <TooltipContent className="mb-10" side="left">
                <div className="flex items-center justify-center gap-2">
                  <p className="text-[12px]"><strong>Drag</strong> to connect compatible outputs</p>

                  <ArrowLeftIcon className="w-3 h-3 text-gray-500" />
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className=" w-full flex items-center justify-end gap-1">
            <span className="text-[8px] text-gray-500 ">Data</span>
            <ViewIcon className="w-3 h-3 text-gray-500" />

            <div className="absolute">
              <Handle
                type="source"
                position={Position.Right}
                isConnectable={true}
                id="output"
                style={{
                  width: 10,
                  height: 10,
                  left: 11,
                  borderRadius: "1000px",
                  background: "#4F46E4",
                  top: "50%",
                  zIndex: 50,
                  transform: "translateY(-50%)",
                  border: "1px solid #B1B0EE",
                }}
              />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}



export default memo(BridgesNode);
