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
import { memo, useEffect } from "react";

function OutputNode({
  data,
  id,
  selected,
}: {
  data: NodeDataType;
  id: string;
  selected?: boolean;
}) {
  const UIData = JSON.parse(data.UIData);
  const edges = useEdges();
  const nodes = useNodes();

  //Migrate this to useStore.
  const sourceNode = edges
  .filter((edge) => edge.target === id)
  .map((edge) => nodes.find((node) => node.id === edge.source))[0];

  const parentNode = useStore((state) => state.getNode(sourceNode?.id as string));

  
  const getWebhookEvents = useQuery(api.webhooks.events.getWebhookEvents,{
    nodeId:parentNode?._id as Id<"nodes">
  })
  
  const code = JSON.stringify(getWebhookEvents?.payload,null, 2);
  

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

          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  console.log("Run Component");
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
          {UIData.node_description}
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col  w-full justify-center items-center h-full p-2">
        {code ? (
          <CodeBlock
            language="json"
            filename=""
            highlightLines={[9, 13, 14, 18]}
            code={code}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4">
            <p className="text-gray-500 text-center max-w-[30ch]">Trigger an event to see data</p>
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
