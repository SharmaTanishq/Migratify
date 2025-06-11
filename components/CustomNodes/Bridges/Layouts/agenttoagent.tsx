import { CardContent, CardFooter } from "@/components/ui/card";
import { ViewIcon } from "lucide-react";

import { Handle, Position, useNodeConnections } from "@xyflow/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCallback, useEffect, useState, useMemo } from "react";

import {
  Form,
  FormDescription,
  FormItem,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { debounce } from "lodash";
import { toast } from "sonner";

// Define a type for the form values
interface AgentToAgentFormValues {
  name: string;
  description: string;
  rule: string;
}

export default function AgentToAgentLayout({
  id,
  data,
}: {
  id: Id<"nodes">;
  data: any;
}) {
  const saveNodeConfigurations = useMutation(
    api.flows.node.data.saveNodeConfigurations
  );
  const getNodeConfigurations = useQuery(
    api.flows.node.data.getNodeConfigurations,
    id ? { nodeId: id as Id<"nodes"> } : "skip"
  );

  const connections = useNodeConnections({
    id: id,
    handleType: "target",
  });

  useEffect(() => {
    console.log("connections", connections);
  }, [connections]);

  const form = useForm({
    defaultValues: {
      name: getNodeConfigurations?.configurations?.name || "",
      description: getNodeConfigurations?.configurations?.description || "",
      rule: getNodeConfigurations?.configurations?.rule || "",
    },
    values: {
      name: getNodeConfigurations?.configurations?.name || "",
      description: getNodeConfigurations?.configurations?.description || "",
      rule: getNodeConfigurations?.configurations?.rule || "",
    },
  });

  // Debounced save function
  const debouncedSave = useMemo(
    () =>
      debounce(async (values: AgentToAgentFormValues) => {
        await saveNodeConfigurations({
          nodeId: id,
          configurations: values,
        });
      }, 600),
    [id, saveNodeConfigurations]
  );

  // Watch form values and auto-save
  useEffect(() => {
    const subscription = form.watch((values) => {
      debouncedSave(values as AgentToAgentFormValues);
    });
    return () => {
      debouncedSave.cancel();
      subscription.unsubscribe();
    };
  }, [form, debouncedSave]);

  const isValidConnection = (event: any) => {
    if (
      connections.length > 0 &&
      connections[0].sourceHandle === event.targetHandle
    ) {
      return false;
    }
    return true;
  };

  const handleConnectTo = (event: any) => {
    console.log("event", event);
    //Now save the connection as transfer-to-agent to the source agent
  };

  return (
    <>
      <CardContent className="p-4 flex flex-col gap-2">
        <Form {...form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormDescription>Tool Name</FormDescription>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormDescription>Description for the tool</FormDescription>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rule"
            render={({ field }) => (
              <FormItem>
                <FormDescription>Rule for the tool</FormDescription>
                <FormControl>
                  <Input placeholder="Rule" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </CardContent>
      <CardFooter className="p-4 bg-gray-100 rounded-b-xl">
        <div className="w-full flex items-center justify-between">
          <span className="text-[8px] text-gray-500">From</span>
          <div className="absolute left-0 ">
            <Tooltip>
              <TooltipTrigger asChild>
                <Handle
                  type="target"
                  position={Position.Left}
                  isValidConnection={isValidConnection}
                  isConnectable={true}
                  isConnectableStart={false}
                  id="from-agent"
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
            <span className="text-[8px] text-gray-500 ">To</span>
            <ViewIcon className="w-3 h-3 text-gray-500" />

            <div className="absolute">
              <Handle
                type="source"
                position={Position.Right}
                isValidConnection={isValidConnection}
                isConnectableStart={true}
                isConnectableEnd={false}
                onConnect={handleConnectTo}
                id="to-agent"
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
    </>
  );
}
