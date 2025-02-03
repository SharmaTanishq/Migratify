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
import {
  Handle,
  Position,
  useConnection,
  useEdges,
  useNodes,
  useReactFlow,
} from "@xyflow/react";
import { motion } from "framer-motion";
import { PlayIcon } from "lucide-react";
import Image from "next/image";
import { memo, useCallback, useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { EventsConfig } from "@/components/helpers/EventsConfig";

function BridgesNode({
  data,
  selected,
  id,
  //onConnect,
}: {
  data: NodeDataType;
  selected?: boolean;
  id: string;
  //onConnect?: (event: any) => void;
}): JSX.Element {
  const instance = useReactFlow();
  const UIData: NodeData = JSON.parse(data.UIData);

  const edges = useEdges();
  const nodes = useNodes();
  const [platform, setPlatform] = useState<PlatformType>("vtex");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  


  // Get the source node that's connected to this bridge
  const sourceNode = edges
    .filter((edge) => edge.target === id)
    .map((edge) => nodes.find((node) => node.id === edge.source))[0];

  useEffect(()=>{
    if(sourceNode !== undefined){
      const sourceNodeData:NodeData = JSON.parse(sourceNode?.data?.UIData as string);
      setPlatform(sourceNodeData.Name.toLowerCase() as PlatformType);
    }
  },[sourceNode])

  // Check if source node is an e-commerce node
  // Get the edge that connects to this bridge
  const edgeSource = edges.find((edge) => edge.target === id);

  

  
  const isEcommerceSource = sourceNode?.type === "ecommerceNode";

  return (
    <Card
      className={cn(
        "w-[250px] h-full hover:shadow-xl transition-shadow duration-300",
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
      <CardContent className="flex p-0 w-full justify-center items-center h-full">
        {isEcommerceSource && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full h-full p-4 pt-2 transition-all duration-300"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.2 }}
              className="text-[12px] text-text-primary font-medium"
            >
              Available Events :
            </motion.span>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.2 }}
            >
              <EventsConfig
                platform={platform as PlatformType}
                selectedEvents={selectedEvents}
                onEventsChange={setSelectedEvents}
                source={edgeSource?.sourceHandle!}
              />
            </motion.div>
          </motion.div>
        )}
        {!isEcommerceSource && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="p-6 flex w-full h-full items-center justify-center "
          >
            <p className="text-[11px] text-gray-500 text-center">
              Connect to an e-commerce node to configure platform and events
            </p>
          </motion.div>
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
                  <p className="text-[12px]">
                    <strong>Drag</strong> to connect compatible outputs
                  </p>

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
