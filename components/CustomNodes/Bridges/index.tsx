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

import { ArrowLeftIcon, ViewIcon } from "lucide-react";
import {
  Handle,
  Position,
  useEdges,
  useNodes,
  useReactFlow,
} from "@xyflow/react";
import { motion } from "framer-motion";

import Image from "next/image";
import { memo, useCallback, useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useStore from "@/components/Store/store";

import { toast } from "sonner";

import { EventsConfig } from "@/components/helpers/EventsConfig";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ScriptCopyBtn } from "@/components/ui/script-copy-btn";
import { Spinner } from "@heroui/spinner";
import { Id } from "@/convex/_generated/dataModel";
import GenericCardLayout from "../Layouts/Card/CardHolder";
import { WeatherLayout } from "./Layouts/weather";
import { WebhookLayout } from "./Layouts/webhook";
import { GenericToolLayout } from "./Layouts/genericTool";
import flowStore from "@/components/Store/store";
import AgentToAgentLayout from "./Layouts/agenttoagent";
import { TOOLS } from "@/components/Types/constants";

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
  const [componentData,setComponentData] = useState<NodeData>(data.ui || {});
  

  const edges = useEdges();
  const nodes = useNodes();
  const [platform, setPlatform] = useState<PlatformType>("vtex");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const node = useStore((state) => state.getNode(id));

  
  const addTool = useAction(api.Integrations.Voice.elevenlabs.addTool);
  

  
  
  
  const sourceNode = edges
  .filter((edge) => edge.target === id)
  .map((edge) => nodes.find((node) => node.id === edge.source))[0];
  
  const sourceNodeData: NodeData = sourceNode?.data?.ui as NodeData;

  const {getNode} = flowStore()


  //   if (getWebhookUrl === null && sourceNode !== undefined) {
  //     createWebhook({
  //       nodeId: node._id,
  //       connectedSource:{
  //         nodeId:sourceNode?.id as Id<"nodes">,
  //         platform:sourceNodeData.Name.toLowerCase() as PlatformType,
  //       },
  //       events: selectedEvents.map((event) => ({
  //         event: event,
  //         isActive: true,
  //       })),
  //       projectId: node.projectId,
  //     });
  //   }
  // }, [getWebhookUrl, sourceNode]);

  // Get the source node that's connected to this bridge
  

  useEffect(() => {
    if (sourceNode !== undefined) {     
      setPlatform(sourceNodeData.Name.toLowerCase() as PlatformType);
    }
  }, [sourceNode]);

  // Check if source node is an e-commerce node
  // Get the edge that connects to this bridge
  



  const handleConnect = useCallback((event:any)=>{
    
    if(event.targetHandle === "tool"){
      const sourceNode = getNode(event.source);
      if(sourceNode?.type === "voiceAgentNode"){
        console.log("node",sourceNode);
        addTool({
          sourceId:event.source as Id<"nodes">,
          agentId:event.sourceHandle,
          toolId:node.data.ui.node_data.type,
        })
      }
    }
  },[])
  

  const getCardContent = () =>{
    switch(node?.data?.ui?.node_data?.type){
      case TOOLS.WEATHER:
        return <WeatherLayout id={id} data={data} />;
      case TOOLS.WEBHOOK:
        return <WebhookLayout id={id} data={data} />;
      case TOOLS.AGENT_TO_AGENT:
        return <AgentToAgentLayout id={id as Id<"nodes">} data={data} />;
      default:
        return <GenericToolLayout />;
    }
  }

  return (
    <GenericCardLayout
      id={id}
      selected={selected}
      node={data}
      
    >
    
      <Separator />
      
        {getCardContent()}        
      

      {/* <CardFooter className="p-4 bg-gray-100 rounded-b-xl">
        <div className="w-full flex items-center justify-between">
          <span className="text-[8px] text-gray-500">Source</span>
          <div className="absolute left-0 ">
            <Tooltip>
              <TooltipTrigger asChild>
                <Handle
                  type="target"
                  position={Position.Left}
                 
                  onConnect={handleConnect}
                  
                  isConnectableEnd={true}
                  id="tool"
                  
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
      </CardFooter> */}
    </GenericCardLayout>
  );
}

export default memo(BridgesNode);
