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
import { debounce } from "@mui/material";
import { FloatingBar } from "../Layouts/FloatingBar";
import { Separator } from "@/components/ui/separator";
import flowStore from "@/components/Store/store";
import { Spinner } from "@heroui/spinner";
import { toast } from "sonner";

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

    const [configurations, setConfigurations] = useState<NodeConfigurations>({
        authToken: "",
        sid:"",
        phoneNumber: "",
        outboundUrl: "",
        inboundUrl: "",
        testPhoneNumber: ""
      });
  
const connections = useNodeConnections({       
     handleType: "target",
      });

  console.log("connections", connections);
  
  const saveNodeConfigurations = useMutation(
    api.flows.node.data.saveNodeConfigurations
  );

  const getNodeConfigurations = useQuery(
    api.flows.node.data.getNodeConfigurations,
    id ? { nodeId: id as Id<"nodes"> } : "skip"
  );

  const {getSourceNode} = flowStore();
  
  
    useEffect(() => {
      if (getNodeConfigurations?.configurations) {
        setConfigurations(getNodeConfigurations?.configurations);
      }
      
    }, [getNodeConfigurations?.configurations,id]);
  

   
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!id) return;
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      saveNodeConfigurations({
        nodeId: id as Id<"nodes">,
        configurations,
      });
    }, 500); // 500ms after user stops typing
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [configurations, id]);

  const MemoizedFloatingBar = useMemo(() => {
    return <FloatingBar isOpen={selected} node={data} id={id} />;
  }, [selected, id]);

  const makeTestCall = useAction(api.Integrations.relay.index.InitiateCall);
  const [loading, setLoading] = useState(false);

  const handleTestCall = ()=>{
    setLoading(true);
    makeTestCall({
      sourceNodeId: getSourceNode(id),
      sourcePlatform: "elevenlabs",
      targetNodeId: id,
      targetPlatform: "twilio",
      phoneNumber: configurations.testPhoneNumber || ""
    }).then((res:any)=>{
        if(res.success){
          toast.success("Call initiated successfully");
          setLoading(false);
        }else{
          toast.error("Failed to initiate call",{
            description: res.error
          });
          setLoading(false);
        }
    }).catch((err:any)=>{
      toast.error("Failed to initiate call",{
        description: err.message
      });
      setLoading(false);
    });
  };

  return (
    <div className="relative">
        <div className="absolute -top-24 left-0  min-w-full ">
            {MemoizedFloatingBar}
        </div>
      <Handle
        type="target"
        position={Position.Left}
        id={"call-target"}
        style={{ ...DEFAULT_HANDLE_STYLE_TARGET, left: "1px" }}
        isConnectable={connections.length <= 1}
        
      />

    
      <GenericCardLayout id={id} selected={selected} node={data}>

        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Auth Token</Label>
              <Input type="password" placeholder="Enter Auth Token" value={configurations.authToken} onChange={(e) => setConfigurations({ ...configurations, authToken: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">SID</Label>
              <Input type="text" placeholder="Enter SID" value={configurations.sid} onChange={(e) => setConfigurations({ ...configurations, sid: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Phone Number</Label>
              <Input type="tel" placeholder="+1 (555) 555-5555" value={configurations.phoneNumber} onChange={(e) => setConfigurations({ ...configurations, phoneNumber: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Outbound URL</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  readOnly
                  value={configurations.outboundUrl}
                  className="bg-gray-50"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      configurations.outboundUrl
                    )
                  }
                >
                <CopyIcon className="w-4 h-4"/>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Inbound URL</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  readOnly
                  value="https://api.example.com/inbound"
                  className="bg-gray-50"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      "https://api.example.com/inbound"
                    )
                  }
                >
                  <CopyIcon className="w-4 h-4"/>
                </Button>
              </div>
            </div>

            <Separator/>

            <div className="flex flex-col gap-2 justify-end items-end w-full">
                <div className="flex flex-col items-start gap-2 w-full">
                    <Label className="text-sm text-gray-400 font-medium">Add Phone Number to Test</Label>
                    <Input type="text" placeholder="Test Phone Number" value={configurations.testPhoneNumber} onChange={(e) => setConfigurations({ ...configurations, testPhoneNumber: e.target.value })} />
                </div>
                <Button className="w-full" variant="primary" onClick={()=>handleTestCall()} disabled={!configurations.testPhoneNumber}>
                  {loading ? <Spinner size="sm" color="white" /> : <span>Test Call</span>}
                  </Button>                
            </div>
          </div>
        </CardContent>
      </GenericCardLayout>
    </div>
  );
}

export default memo(CallProviderNode);
