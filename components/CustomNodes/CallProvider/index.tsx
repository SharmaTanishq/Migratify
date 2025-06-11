import { NodeDataType } from "@/components/Types/Flows";
import { CardContent } from "@/components/ui/card";
import GenericCardLayout from "../Layouts/Card/CardHolder";
import { Position, Handle, useNodeConnections } from "@xyflow/react";
import { memo, useState, useCallback, useEffect, useRef, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DEFAULT_HANDLE_STYLE_SOURCE } from "@/components/Constants/HandleStyles";
import { DEFAULT_HANDLE_STYLE_TARGET } from "@/components/Constants/HandleStyles";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { CopyIcon } from "@radix-ui/react-icons";

import { FloatingBar } from "../Layouts/FloatingBar";
import { Separator } from "@/components/ui/separator";
import flowStore from "@/components/Store/store";
import { Spinner } from "@heroui/spinner";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Form, FormDescription, FormItem, FormField, FormControl, FormMessage } from "@/components/ui/form";
import { debounce } from "lodash";

interface NodeConfigurations {
  authToken: string;
  sid: string;
  phoneNumber: string;
  outboundUrl: string;
  inboundUrl: string;
  testPhoneNumber?: string;
}

function CallProviderNode({
  data,
  selected,
  id,
}: {
  data: NodeDataType;
  selected?: boolean;
  id: string;
}) {
  const saveNodeConfigurations = useMutation(
    api.flows.node.data.saveNodeConfigurations
  );

  const getNodeConfigurations = useQuery(
    api.flows.node.data.getNodeConfigurations,
    id ? { nodeId: id as Id<"nodes"> } : "skip"
  );

  const { getSourceNode } = flowStore();

  // Use react-hook-form for form state
  const form = useForm<NodeConfigurations>({
    defaultValues: {
      authToken: "",
      sid: "",
      phoneNumber: "",
      outboundUrl: "",
      inboundUrl: "",
      testPhoneNumber: "",
    },
    values: {
      authToken: getNodeConfigurations?.configurations?.authToken || "",
      sid: getNodeConfigurations?.configurations?.sid || "",
      phoneNumber: getNodeConfigurations?.configurations?.phoneNumber || "",
      outboundUrl: getNodeConfigurations?.configurations?.outboundUrl || "",
      inboundUrl: getNodeConfigurations?.configurations?.inboundUrl || "",
      testPhoneNumber: getNodeConfigurations?.configurations?.testPhoneNumber || "",
    },
  });

  // Debounced auto-save
  const debouncedSave = useMemo(
    () =>
      debounce(async (values: NodeConfigurations) => {
        await saveNodeConfigurations({
          nodeId: id as Id<"nodes">,
          configurations: values,
        });
      }, 600),
    [id, saveNodeConfigurations]
  );

  useEffect(() => {
    const subscription = form.watch((values) => {
      debouncedSave(values as NodeConfigurations);
    });
    return () => {
      (debouncedSave as any).cancel();
      subscription.unsubscribe();
    };
  }, [form, debouncedSave]);

  const connections = useNodeConnections({       
     handleType: "target",
      });

  const MemoizedFloatingBar = useMemo(() => {
    return <FloatingBar isOpen={selected} node={data} id={id} />;
  }, [selected, id]);

  const makeTestCall = useAction(api.Integrations.relay.index.InitiateCall);
  const [loading, setLoading] = useState(false);

  const handleTestCall = () => {
    setLoading(true);
    makeTestCall({
      sourceNodeId: getSourceNode(id),
      sourcePlatform: "elevenlabs",
      targetNodeId: id,
      targetPlatform: "twilio",
      phoneNumber: form.getValues("testPhoneNumber") || ""
    })
      .then((res: any) => {
        if (res.success) {
          toast.success("Call initiated successfully");
          setLoading(false);
        } else {
          toast.error("Failed to initiate call", {
            description: res.error,
          });
          setLoading(false);
        }
      })
      .catch((err: any) => {
        toast.error("Failed to initiate call", {
          description: err.message,
        });
        setLoading(false);
      });
  };

  return (
    <div className="relative">
      <div className="absolute -top-24 left-0  min-w-full ">{MemoizedFloatingBar}</div>
      <Handle
        type="target"
        position={Position.Left}
        id={"call-target"}
        style={{ ...DEFAULT_HANDLE_STYLE_TARGET, left: "1px" }}
        isConnectable={connections.length <= 1}
      />
      <GenericCardLayout id={id} selected={selected} node={data}>
        <CardContent className="flex flex-col gap-2">
          <Form {...form}>
            <FormField
              control={form.control}
              name="authToken"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Auth Token</FormDescription>
                  <FormControl>
                    <Input type="password" placeholder="Enter Auth Token" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sid"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>SID</FormDescription>
                  <FormControl>
                    <Input type="text" placeholder="Enter SID" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Phone Number</FormDescription>
                  <FormControl>
                    <Input type="tel" placeholder="+1 (555) 555-5555" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="outboundUrl"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Outbound URL</FormDescription>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input type="text" readOnly className="bg-gray-50" {...field} />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigator.clipboard.writeText(field.value)}
                      >
                        <CopyIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inboundUrl"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Inbound URL</FormDescription>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input type="text" readOnly className="bg-gray-50" {...field} />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigator.clipboard.writeText(field.value)}
                      >
                        <CopyIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator />
            <FormField
              control={form.control}
              name="testPhoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Add Phone Number to Test</FormDescription>
                  <FormControl>
                    <Input type="text" placeholder="Test Phone Number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="w-full mt-2"
              variant="primary"
              onClick={handleTestCall}
              disabled={!form.getValues("testPhoneNumber")}
            >
              {loading ? <Spinner size="sm" color="white" /> : <span>Test Call</span>}
            </Button>
          </Form>
        </CardContent>
      </GenericCardLayout>
    </div>
  );
}

export default memo(CallProviderNode);
