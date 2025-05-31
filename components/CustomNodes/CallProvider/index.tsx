import { NodeDataType } from "@/components/Types/Flows";
import { CardContent } from "@/components/ui/card";
import GenericCardLayout from "../Layouts/Card/CardHolder";
import { Position, Handle } from "@xyflow/react";
import { memo, useState, useCallback, useEffect, useRef, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DEFAULT_HANDLE_STYLE_SOURCE } from "@/components/Constants/HandleStyles";
import { DEFAULT_HANDLE_STYLE_TARGET } from "@/components/Constants/HandleStyles";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { CopyIcon } from "@radix-ui/react-icons";
import { debounce } from "@mui/material";
import { FloatingBar } from "../Layouts/FloatingBar";

interface NodeConfigurations {
  apiKey: string;
  phoneNumber: string;
  outboundUrl: string;
  inboundUrl: string;
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

  const [configurations, setConfigurations] = useState<NodeConfigurations>({
    apiKey: "",
    phoneNumber: "",
    outboundUrl: "",
    inboundUrl: ""
  });

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
      />

      {/* <Handle type="source" position={Position.Right} id={"call-source"} style={DEFAULT_HANDLE_STYLE_SOURCE} /> */}
      <GenericCardLayout id={id} selected={selected} node={data}>
        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">API Key</Label>
              <Input type="password" placeholder="Enter API key" value={configurations.apiKey} onChange={(e) => setConfigurations({ ...configurations, apiKey: e.target.value })} />
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
          </div>
        </CardContent>
      </GenericCardLayout>
    </div>
  );
}

export default memo(CallProviderNode);
