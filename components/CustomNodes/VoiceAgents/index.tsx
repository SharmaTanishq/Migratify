import { memo, useCallback, useEffect, useMemo, useState } from "react";
import GenericCardLayout from "../Layouts/Card/CardHolder";
import { CardContent } from "@/components/ui/card";

import { NodeDataType } from "@/components/Types/Flows";
import NodeDescription from "../Layouts/GenericNodeUtils/NodeDescription";
import NodeIcon from "../Layouts/NodeIcon";
import NodeName from "../Layouts/GenericNodeUtils/NodeName";
import { FloatingBar } from "../Layouts/FloatingBar";
import { NodeData } from "@/components/CMS/types";
import { Separator } from "@/components/ui/separator";
import Modal from "./Modal";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ModalStore } from "@/components/Store/modal";
import { Spinner } from "@heroui/spinner";
import {
  Position,
  useUpdateNodeInternals,
  useConnection,
  useNodeConnections,
  useStore,
} from "@xyflow/react";
import { Handle } from "@xyflow/react";
import { DEFAULT_HANDLE_STYLE_SOURCE } from "@/components/Constants/HandleStyles";
import { DEFAULT_HANDLE_STYLE_TARGET } from "@/components/Constants/HandleStyles";
import flowStore from "@/components/Store/store";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function VoiceAgentNode({
  data,
  selected,
  id,
}: {
  data: NodeDataType;
  selected?: boolean;
  id: string;
  configurations?: Record<string, any>;
}) {
  const updateNodeInternals = useUpdateNodeInternals();

  const [componentData, setComponentData] = useState<NodeData>(data.ui || {});
  const [availableAgents, setAvailableAgents] = useState<any[]>([]);
  const { modalOpen, setModalOpen } = ModalStore();
  const { getNode } = flowStore();
  const getAgents = useAction(api.Integrations.Voice.elevenlabs.getAgents);
  const getNodeConfigurations = useQuery(
    api.flows.node.data.getNodeConfigurations,
    {
      nodeId: id as Id<"nodes">,
    }
  );

  const [isLoading, setIsLoading] = useState(true);

  const connections = useNodeConnections({ handleType: "source" });

  useEffect(() => {
    if (getNodeConfigurations?.configurations?.apiKey) {
      getAgents({
        apiKey: getNodeConfigurations?.configurations?.apiKey as string,
      })
        .then((res) => {
          setAvailableAgents(res.agents);
        })
        .finally(() => {
          updateNodeInternals(id);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [getNodeConfigurations]);

  const MemoizedFloatingBar = useMemo(() => {
    return <FloatingBar isOpen={selected} node={data} id={id} />;
  }, [selected, id]);

  const MemoizedModal = useMemo(() => {
    return (
      selected && (
        <Modal
          isOpen={true}
          nodeData={componentData}
          nodeId={id}
          size="default"
          availableAgents={availableAgents}
        />
      )
    );
  }, [selected, id]);

  const handleConnect = useCallback((event: any) => {
    console.log("event", event.targetHandle);
    if (event.targetHandle === "tool") {
      console.log("event", event.sourceHandle);
    }
  }, []);

  const handleConnectTarget = useCallback((event: any) => {
    console.log("event", event.targetHandle);
    if (event.targetHandle === "tool") {
      console.log("event", event.sourceHandle);
    }
  }, []);

  const isValidConnection = useCallback((connection: any) => {
    if (connection.targetHandle === connection.sourceHandle) {
      return false;
    }
    // if (
    //   connection.targetHandle === "tool" ||
    //   connection.targetHandle === "call-target" ||
    //   connection.targetHandle === "voice-target"
    // ) {
    //   return true;
    // }
    return true;
  }, []);

  return (
    <div className="relative">
      <div className="absolute -top-24 left-0  min-w-full ">
        {MemoizedFloatingBar}
      </div>

      <GenericCardLayout id={id} selected={selected} node={data}>
        {/* <Separator /> */}
        <CardContent className="flex flex-col gap-2">
          {isLoading ? (
            <div className="flex w-full items-center justify-center">
              <Spinner size="sm" />
            </div>
          ) : availableAgents.length > 0 ? (
            availableAgents.map((agent, index) => (
              <div
                key={index}
                className="relative w-full  p-1 bg-neutral-50 rounded-lg border border-gray-100 shadow-sm"
              >
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Handle
                        type={"target"}
                        position={Position.Left}
                        id={`${agent.agentId}` }
                        style={{
                          ...DEFAULT_HANDLE_STYLE_TARGET,
                          left: "-25px",
                        }}
                        isConnectableStart={
                          data.configurations.isHandleReversed !== true
                        }
                        onConnect={handleConnectTarget}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Connect {agent.name} with batch of calls <br/> or use as a handoff from other agents</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip >
                    <TooltipTrigger asChild>
                      {data.configurations.isHandleReversed !== true && (
                        <Handle
                          type="source"
                          position={Position.Right}
                          id={`${agent.agentId}`}
                          style={{
                            ...DEFAULT_HANDLE_STYLE_SOURCE,
                            right: "-25px",
                          }}
                          onConnect={handleConnect}
                          isConnectableStart={true}
                          isValidConnection={isValidConnection}
                        />
                      )}
                    </TooltipTrigger>
                    <TooltipContent side="right" className="right-10">
                      <p>Connect {agent.name} with Integrations <br/> or for handoff to other agents</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                

                <div className="flex justify-start items-center gap-10">
                  <Avatar>
                    <AvatarFallback className="bg-white border border-black-100">
                      {agent.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="text-sm font-medium">{agent.name}</h3>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex w-full items-center justify-center">
              {getNodeConfigurations?.configurations?.apiKey ? (
                <Button
                  variant="primary"
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  Create Agent
                </Button>
              ) : (
                <Label>Add API Key</Label>
              )}
            </div>
          )}
        </CardContent>
      </GenericCardLayout>
      {MemoizedModal}
    </div>
  );
}

export default memo(VoiceAgentNode);
