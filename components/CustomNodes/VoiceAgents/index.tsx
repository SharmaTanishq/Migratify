import { memo, useCallback, useEffect, useMemo, useState } from "react";
import GenericCardLayout from "../Layouts/Card/CardHolder";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
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

const MemoizedNodeIcon = memo(NodeIcon);
const MemoizedNodeName = memo(NodeName);
const MemoizedNodeDescription = memo(NodeDescription);
const MemoizedFloatingBar = memo(FloatingBar);

function VoiceAgentNode({
    data,
  selected,
  id,
}: {
    data: NodeDataType;
    selected?: boolean;
    id: string;
}) {
    const {node} = data;
    const [componentData,setComponentData] = useState<NodeData>(data.ui || {});
    const [availableAgents, setAvailableAgents] = useState<any[]>([]);
    const {modalOpen, setModalOpen} = ModalStore();
    const getAgents = useAction(api.Integrations.Voice.elevenlabs.getAgents);
    const getNodeConfigurations = useQuery(api.flows.node.data.getNodeConfigurations,{
      nodeId: id as Id<"nodes">,
    })
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
      if(getNodeConfigurations?.configurations?.apiKey){
        getAgents({apiKey:getNodeConfigurations?.configurations?.apiKey as string}).then((res)=>{
          setAvailableAgents(res.agents);
        }).finally(()=>{
          setIsLoading(false);
        })
      }
    },[getNodeConfigurations])

    const renderNodeIcon = useCallback(() => {
        return (
          <MemoizedNodeIcon
            dataType={componentData?.Name}
            showNode={true}
            icon={componentData?.node_logo?.url || ""}
            isGroup={!!data?.node?.flow}
            hasToolMode={false}
          />
        );
      }, [data?.type, data?.node?.icon, data?.node?.flow]);
    
      const renderNodeName = useCallback(() => {
        return (
          <MemoizedNodeName
            display_name={componentData?.Name || ""}
            selected={selected}
            nodeId={id}
            showNode={true}
            isOutdated={false}
            beta={false}
            editNameDescription={false}
            toggleEditNameDescription={() => {}}
            setHasChangedNodeDescription={() => {}}
          />
        );
      }, [data?.type, data?.node?.icon, data?.node?.flow]);
    
      const renderNodeDescription = useCallback(() => {
        return (
          <MemoizedNodeDescription
            description={componentData?.node_description || ""}
            selected={selected}
            nodeId={id}
            emptyPlaceholder={""}
            placeholderClassName={""}
            charLimit={0}
            inputClassName={""}
            mdClassName={""}
            editNameDescription={false}
          />
        );
      }, [data?.type, data?.node?.icon, data?.node?.flow]);
    
      const MemoizedFloatingBar = useMemo(() => {
        return <FloatingBar isOpen={selected} node={data} id={id} />;
      }, [selected, id]);
    
      const MemoizedModal = useMemo(() => {
        return (
           selected && <Modal isOpen={true} nodeData={componentData} nodeId={id} size="default" availableAgents={availableAgents} />
        );
      }, [selected, id]);

      



    return (
        <div className="relative">
      
        <div className="absolute -top-24 left-0  min-w-full ">
            {MemoizedFloatingBar}
        </div>

        <GenericCardLayout id={id} selected={selected}>
            <CardHeader>
            <CardTitle className="flex items-center justify-between w-full ">
            <div className="flex items-center gap-2 ">
              {renderNodeIcon()}
              {renderNodeName()}
              {/* <h3 className="font-medium">{UIData.Name}</h3> */}
            </div>
            
          </CardTitle>
          <CardDescription>            
              {renderNodeDescription()}                          
          </CardDescription>
            </CardHeader>
            
           
            {/* <Separator /> */}
            <CardContent className="flex flex-col gap-2" >
              {isLoading ? (
                <div className="flex w-full items-center justify-center">
                  <Spinner size="sm" />
                </div>
              ) : availableAgents.length > 0 ? (
                availableAgents.map((agent,index)=>(
                  <div key={index} className="flex w-full justify-start items-center gap-10 p-1 bg-neutral-50 rounded-lg border border-gray-100 shadow-sm">
                    <Avatar>
                    
                    <AvatarFallback className="bg-white border border-black-100">
                      {agent.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-sm font-medium">{agent.name}</h3>
                    
                  </div>
                </div>
              ))
              ) : (
                <div className="flex w-full items-center justify-center">
                 <Button variant="primary" onClick={()=>{
                  setModalOpen(true);
                 }}>Create Agent</Button>
                </div>
              )}
              
            </CardContent>
        </GenericCardLayout>
        {MemoizedModal}
        </div>
    )
}

export default memo(VoiceAgentNode);