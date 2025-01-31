import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { BellIcon, ChevronsUpDown, GitFork, UploadIcon, X } from "lucide-react";
import { NodeCard } from "./Components/Drawer/NodeCards";
import { Icons } from "../Icons";


import { getNodes } from "../CMS/api";
import { useEffect, useState } from "react";


interface NodeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  nodeData?: any;
}

import { NodesTypeCMS } from "../CMS/types";
import { FadeInDiv, Tabs } from "../ui/tabs";

export function AddNodeDrawer({ isOpen, onClose, nodeData }: NodeDrawerProps) {

  const [availableNodes, setAvailableNodes] = useState<NodesTypeCMS[]>([]);

  

  useEffect(()=>{
    getNodes().then((data)=>setAvailableNodes(data.data));    
  },[])



  
  if (!isOpen) return null;

  return (
    
    <div className="fixed left-[80px] overflow-hidden top-4 h-[calc(100vh-2rem)] w-[400px] rounded-xl border bg-gray-100 p-2 shadow-2xl transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between p-4">
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
      <div className="flex flex-col gap-2">
          <Tabs 
            tabs={
              availableNodes.map((node) => ({
                title: node.Name,
                value: node.Name,
                content: (
                  <div className="w-full overflow-hidden h-[calc(60vh-2rem)] relative rounded-2xl p-2 text-black bg-gradient-to-b from-gray-100 via-gray-50 to-white/20 ">
                    
                      <div className="flex flex-col gap-2">
                        {node.nodes.length > 0 ? node.nodes.map((node,index)=>{
                          return(
                            <NodeCard
                              key={index}
                              icon={node.Node.node_logo.url}
                              title={node.Name}
                              description={node.Node.node_description}
                              nodeType={node.Node.node_type}
                              variant={node.Node.active ? "default" : "disabled"}
                              data={node.Node}
                            />
                          )
                        }) : <div className="flex items-center justify-center h-full">
                          <p className="text-sm text-gray-500">No nodes found</p>
                        </div>
                    } 
                    </div>
                  </div>
                ),
              }))
            } 
            activeTabClassName="bg-purple-100 text-purple-200 shadow-sm  rounded-md"
            tabClassName="inline-flex items-center justify-center whitespace-nowrap rounded-md  py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 data-[state=active]:shadow-sm hover:bg-purple-50" 
            containerClassName="inline-flex h-full items-center justify-center rounded-lg bg-gray-100 p-1 text-slate-500 w-full overflow-x-auto" 
            contentClassName="mt-4  ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
          />
          {/* <FadeInDiv tabs={tabs} active={tabs[0]}></FadeInDiv> */}
      {/* <ScrollArea className="w-96 h-[calc(100vh-15rem)] whitespace-nowrap rounded-md p-2">
          <ScrollBar orientation="horizontal" />
      </ScrollArea> */}

      {/* <ScrollArea className="h-[calc(100vh-15rem)] mt-6 pr-4">
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
                    icon={node.Node.node_logo.url}
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
       */}
      </div>
    </div>
  );
}


