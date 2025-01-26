import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "../ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { BellIcon, ChevronsUpDown, GitFork, UploadIcon, X } from "lucide-react";
import { NodeCard } from "./Drawer/NodeCards";
import { Icons } from "../Icons";

import { GearIcon } from "@radix-ui/react-icons";
import { getNodes } from "../CMS/api";
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/spinner";

interface NodeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  nodeData?: any;
}

import { NodesTypeCMS } from "../CMS/types";

export function AddNodeDrawer({ isOpen, onClose, nodeData }: NodeDrawerProps) {

  const [availableNodes, setAvailableNodes] = useState<NodesTypeCMS[]>([]);

  useEffect(()=>{
    getNodes().then((data)=>setAvailableNodes(data.data));
    
  },[])

  
  if (!isOpen) return null;

  return (
    
    <div className="fixed left-[80px] top-4 h-[calc(100vh-2rem)] w-[400px] rounded-xl border bg-white/50 backdrop-blur-xl p-6 shadow-2xl transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Add Node</h2>
          <p className="text-sm text-gray-500">
            Select a node from the categories below to add to your workflow
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-gray-100 rounded-full"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        <Input
          type="search"
          placeholder="Search nodes..."
          className="w-full bg-white/50 backdrop-blur-sm focus:bg-white"
        />
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs hover:bg-white"
          >
            Sort A-Z
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs hover:bg-white"
          >
            Active Only
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
      <ScrollArea className="h-[calc(100vh-15rem)] mt-6 pr-4">
        {availableNodes.map((node)=>{
          return(
            <div className="space-y-6">
          <Collapsible className="w-full space-y-2">
            <div className="flex items-center justify-between space-x-4 px-4">
              <h4 className="text-sm font-semibold">{node.Name}</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:bg-white/50">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>

            <div className="space-y-2 mt-2">
              {node.nodes.map((node)=>{
                return(
                  <CollapsibleContent className="space-y-2 ">
                  <NodeCard
                    icon={<Icons.VTEX />}
                    title={node.Name}
                    description={node.Node.node_description}
                    nodeType={node.Node.node_type}
                    variant={node.Node.active ? "default" : "disabled"}
                  />
                </CollapsibleContent>
                )
              })}
             
             
             
            </div>
          </Collapsible>
        </div>
          )
        })}
      
      </ScrollArea>
      
      </div>
    </div>
  );
}
