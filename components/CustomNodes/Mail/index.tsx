import { DEFAULT_HANDLE_STYLE_SOURCE } from "@/components/Constants/HandleStyles";
import { NodeDataType } from "@/components/Types/Flows";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@/convex/_generated/api";

import { cn } from "@/lib/utils";
import { Handle, Position, useEdges, useNodes } from "@xyflow/react";
import useStore from "@/components/Store/store";
import { useQuery, useAction, useMutation } from "convex/react";
import Image from "next/image";
import { memo, useEffect, useMemo, useState } from "react";
import { NodeData } from "@/components/CMS/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import webhooksStore from "@/components/Store/webhooks";

import { Id } from "@/convex/_generated/dataModel";
import { Textarea } from "@/components/ui/textarea";
import { ChevronsUpDown } from "lucide-react";
import GenericCardLayout from "../Layouts/Card/CardHolder";
import MailDrawer from "./Drawer";





function mailNode({
  data,
  id,
  selected,
}: {
  data: NodeDataType;
  id: string;
  selected?: boolean;
}) {
  const [componentData, setComponentData] = useState<NodeData>(data.ui || {});

  const edges = useEdges();
  const nodes = useNodes();
  const [code, setCode] = useState(
    JSON.stringify({ getStartedTo: "See the response here" }, null, 2)
  );

  const setNodeConfigurations = useMutation(
    api.flows.node.data.saveNodeConfigurations
  );
  //Migrate this to useStore.
  const sourceNode = edges
    .filter((edge) => edge.target === id)
    .map((edge) => nodes.find((node) => node.id === edge.source))[0];

  const parentNode = useStore((state) =>
    state.getNode(sourceNode?.id as string)
  );

  const parentEvents = webhooksStore().getEvents(parentNode?._id as string);

  const webhookEvents = useQuery(
    api.webhooks.events.getWebhookEvents,
    parentNode?._id ? { nodeId: parentNode._id } : "skip"
  );

  const [secrets, setSecrets] = useState<{
    apiKey: string;
  }>({
    apiKey: "",
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecrets({
      apiKey: event.target.value,
    });
  };

  useEffect(() => {
    if (secrets.apiKey !== "") {
      const timeoutId = setTimeout(
        () =>
          setNodeConfigurations({
            nodeId: id as Id<"nodes">,
            configurations: {
              apiKey: secrets.apiKey,
            },
          }),
        1000
      );
      return () => clearTimeout(timeoutId);
    }
  }, [secrets]);

  //const sendMailQuery = useAction(api.mail.index.sendMailAction);

  useEffect(() => {
    if (webhookEvents !== null && webhookEvents !== undefined) {
      //ON EVENT RECIEVE DO SOMETHING.

      console.log(webhookEvents, "here is webhook events");

      // const response = sendMailQuery({
      //   //This to will come from order details..
      //   to: "k.rakshit2001@gmail.com",
      //   //This text should be customizable from the node UI.
      //   text: "Test Mail",
      // });
      // setCode(JSON.stringify(response, null, 2));
    }
  }, [webhookEvents]);

  // const sendMail = async () => {
  //   const response = await sendMailQuery({
  //     to: "k.rakshit2001@gmail.com",
  //     text: "Test Mail",
  //   });
  //   if (!response.success) {
  //     setCode(JSON.stringify({ Status: "Error" }, null, 2));
  //     return;
  //   } else {
  //     setCode(JSON.stringify({ Status: "Mail sent" }, null, 2));
  //     console.log(response, "here is response");
  //   }
  // };

  const MEMOIZED_MAIL_DRAWER = useMemo(() => {
    return (
      selected && <MailDrawer isOpen={true} id={id} />
    )
  }, [selected, id]);

  return (
    <>
    <GenericCardLayout
      id={id}
      selected={selected}
      
    >
      <CardHeader>
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
      <CardContent className="flex flex-col  w-full justify-center items-center h-full p-4">
        <div className="flex flex-col w-full p-2 gap-2">
          <Label>API Key</Label>
          <Input placeholder="API Key" onChange={handleOnChange} />
        </div>

        {parentEvents &&
          parentEvents.map((event) => {
            if (event.isActive) {
              return (
                <div
                  className="flex flex-col w-full  gap-2"
                  key={event.event}
                >
                  <Tooltip delayDuration={300}>
                    <Collapsible >
                      <CollapsibleTrigger asChild>
                        <TooltipTrigger asChild >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="justify-between w-full p-2"
                            
                          >
                            <span className="text-sm font-medium">
                              {event.event}
                            </span>
                            <ChevronsUpDown className="h-4 w-4" />
                            <TooltipContent side="right">
                              <p>Expand</p>
                            </TooltipContent>
                          </Button>
                        </TooltipTrigger>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="flex flex-col gap-2 p-2">
                        <Input placeholder="Template ID" />
                        {/* <Textarea placeholder="Subject" /> */}
                      </CollapsibleContent>
                    </Collapsible>
                  </Tooltip>
                </div>
              );
            }
          })}

        
      </CardContent>
      <CardFooter className="flex w-full space-x-2 p-4 pt-2">
      <div className="flex w-full space-x-2 p-4 pt-2">
          <Button
            className="flex-1"
            variant={"primary"}
            // onClick={() => {
            //   sendMail();
            // }}
          >
            <span>Send Mail</span>
          </Button>
        </div>
      </CardFooter>
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
      </GenericCardLayout>
      {MEMOIZED_MAIL_DRAWER}
      </>
  );
}

export default memo(mailNode);
