import { DEFAULT_HANDLE_STYLE_SOURCE } from "@/components/Constants/HandleStyles";
import { NodeDataType } from "@/components/Types/Flows";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Handle, Position, useEdges, useNodes } from "@xyflow/react";
import useStore from "@/components/Store/store";
import { useQuery } from "convex/react";
import Image from "next/image";
import { memo, useEffect, useState } from "react";
import { NodeData } from "@/components/CMS/types";

function OutputNode({
  data,
  id,
  selected,
}: {
  data: NodeDataType;
  id: string;
  selected?: boolean;
}) {
  const [componentData,setComponentData] = useState<NodeData>(data.ui || {});
  const edges = useEdges();
  const nodes = useNodes();
  const [code, setCode] = useState(
    JSON.stringify({ getStartedBy: "Connecting to a source" }, null, 2)
  );
  //Migrate this to useStore.
  const sourceNode = edges
    .filter((edge) => edge.target === id)
    .map((edge) => nodes.find((node) => node.id === edge.source))[0];

  
  const parentNode = useStore((state) =>
    state.getNode(sourceNode?.id as string)
  );


  const webhookEvents = useQuery(
    api.webhooks.events.getWebhookEvents,
    parentNode?._id ? { nodeId: parentNode._id } : "skip"
  );

  useEffect(()=>{
    if(parentNode && (webhookEvents === null || webhookEvents === undefined)){
      setCode(JSON.stringify({ event: "Waiting for an event" }, null, 2))
    }
  },[parentNode,webhookEvents])
  useEffect(() => {
    
    if (webhookEvents !== null && webhookEvents !== undefined) {
      setCode(JSON.stringify(webhookEvents?.payload, null, 2));
    }
  }, [webhookEvents]);



  return (
    <Card
      className={cn(
        "w-[350px] h-full hover:shadow-xl transition-shadow duration-300",
        selected && "border border-borderSelected"
      )}
    >
      <CardHeader className="p-4 pt-2">
        <CardTitle className="flex items-center justify-between gap-2 font-medium text-gray-900">
          <div className="flex items-center justify-start gap-2">
            <Image
              src={componentData.node_logo.url}
              alt={componentData.Name}
              width={20}
              height={20}
              className="rounded-sm bg-gray-100 p-1"
            />
            <span className="text-sm font-regular text-gray-600">
              {componentData.Name}
            </span>
          </div>

          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  console.log("Wil be adding notifications here");
                }}
                asChild
                className="transition-colors duration-200 w-6 h-6 "
              >
                <Image
                  src={
                    "https://res.cloudinary.com/dzi0wmfo3/image/upload/v1738867032/Notification_2_3918f34af3.svg"
                  }
                  alt="Notifications"
                  width={8}
                  height={8}
                  className="w-4 h-4 text-gray-500 scale-[0.8] "
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>See Notifications</p>
            </TooltipContent>
          </Tooltip>
        </CardTitle>
        <CardDescription className="text-xs text-gray-600 ">
          {componentData.node_description}
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col  w-full justify-center items-center h-full p-2">
        
          <CodeBlock
            language="json"
            filename=""
            highlightLines={[9, 13, 14, 18]}
            code={code}
          />
       
        {webhookEvents && (
          <div className="w-full h-full flex items-center justify-start p-1">
            <p className="text-gray-500 text-center  text-[10px]">
              Event received at:{" "}
              {new Date(webhookEvents.processedAt).toLocaleString()}
            </p>
          </div>
        )}
      </CardContent>
      <Tooltip>
        <TooltipTrigger asChild>
          <Handle
            type="target"
            id="input"
            position={Position.Left}
            style={DEFAULT_HANDLE_STYLE_SOURCE}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Trigger an event to see data</p>
        </TooltipContent>
      </Tooltip>
    </Card>
  );
}

export default memo(OutputNode);
