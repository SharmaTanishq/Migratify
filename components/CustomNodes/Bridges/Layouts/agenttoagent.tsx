import { CardContent, CardFooter } from "@/components/ui/card";
import { ViewIcon } from "lucide-react";

import { Handle, Position } from "@xyflow/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AgentToAgentLayout() {
  const handleConnect = (event: any) => {
    console.log("event", event);
  };
  return (
    <>
      <CardContent className="p-4">
        <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
        <Label>Name</Label>
        <Input placeholder="Name" className="w-full mt-2" />
        </div>

        <div className="flex flex-col gap-1">
        <Label>Description (Optional)</Label>
        <Input placeholder="Description (Optional)" className="w-full mt-2" />
        </div>

        {/* //Connected to which Agent will show here. */}
        {/* <Label>{Agent ID}</Label> */}
        <div className="flex flex-col gap-1">

        <Label>Rule</Label>
        <Input placeholder="Rule" className="w-full mt-2" />
        </div>
        </div>

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
            <span className="text-[8px] text-gray-500 ">To</span>
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
      </CardFooter>
    </>
  );
}
