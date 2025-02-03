
import { Handle, Position,NodeProps, useReactFlow } from "@xyflow/react";
import { Card } from "../../ui/card";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

import { Button } from "../../ui/button";
import { useNodeDelete } from "../../hooks/useNodeDelete";
import useStore  from "../../Store/store";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import NodeIcon from "./Components/NodeIcon";

import { NodeData } from "@/components/CMS/types";
import { NodeDataType } from "@/components/Types/Flows";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { DEFAULT_HANDLE_STYLE_SOURCE } from "@/components/Constants/HandleStyles";
import NodeDrawer from "./Components/NodeDrawer";

const MemoizedNodeIcon = memo(NodeIcon)


const ECOMMERCE_HANDLE_STYLES={
  
    ...DEFAULT_HANDLE_STYLE_SOURCE,
    right:"0",
  
}



function ECommerceNode({data,selected,id}:{
      data:NodeDataType,
      selected?:boolean,
      id:string,
    }
  ):JSX.Element {
  const instance = useReactFlow();

  
  
  
  const UIData:NodeData = JSON.parse(data.UIData);
  
  //const [isDrawerOpen, setIsDrawerOpen] = useState(selected);

 const handleDelete = (event:React.MouseEvent)=>{
  //event.stopPropagation();
  instance.deleteElements({ nodes: [{id:id}] })
 }
 

 const renderNodeIcon = useCallback(() => {
  return (
    <MemoizedNodeIcon
      dataType={UIData.Name}
      showNode={true}
      icon={UIData.node_logo.url}
      isGroup={!!data.node?.flow}
      hasToolMode={false}
    />
  );
}, [data.type,  data.node?.icon, data.node?.flow]);

const MemoizedNodeDrawer = useMemo(() => {
   
  return selected && (
    <NodeDrawer
      isOpen={true}      
      nodeData={UIData}
      nodeId={id}
    />
  )
},[selected,id])

  const handleButtonClick = (event: React.MouseEvent) => {
    //event.stopPropagation();
    
    // Button logic
  };

return (
    <>
      <Card className={cn("w-[300px] space-y-4 bg-gray-50 dark:bg-gray-900  relative hover:shadow-xl transition-shadow duration-300", selected ? "border border-borderSelected" : "")} >
        {/* Header Section */}
        <div className="p-4 pb-0">
        <div className="flex items-center justify-between w-full ">
          <div className="flex items-center space-x-2">
            {renderNodeIcon()}
            <h3 className="font-medium">{UIData.Name}</h3>
          </div>
          <Popover>
            <PopoverTrigger onClick={handleButtonClick} asChild>
              <button className="text-gray-600 border-none  hover:bg-gray-200 p-1.5 transition-all duration-500 rounded-md group">
                <MoreVertical className="w-6 h-6 group-hover:text-black transition-all duration-300" />
              </button>
            </PopoverTrigger>

            <PopoverContent
              className="w-32 "
              align="start"
              side="right"
              sideOffset={17}
              alignOffset={-10}
            >
              <div className="flex flex-col gap-2 ">
                <button className="flex items-center gap-2 w-full px-1 py-1.5 text-sm hover:bg-gray-100 rounded-md">
                  <Pencil className="w-4 h-4" />
                  <span>Rename</span>
                </button>
                <button className="flex items-center gap-2 w-full px-1 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md" onClick={handleDelete}>
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-2">
              <p className=" flex w-full flex-col text-xs text-[#374151] leading-5 word-break-break-word">{UIData.node_description}</p>
        </div>
        </div>
          <Separator/>
        {/* Sections Container */}
        <div className="space-y-2 p-4 pt-2">
          {/* Products Section */}
          <div className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200 p-2 rounded-md border border-gray-200 cursor-pointer relative">
            <Handle
              
              type="source"
              style={{
                ...ECOMMERCE_HANDLE_STYLES,
                
              }}

              position={Position.Right}
              id="product"
              isConnectable={true}
            />
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm text-center text-gray-600">
                Products
              </span>
            </div>
          </div>

          {/* Category Section */}
          <div className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200 p-2 rounded-md border border-gray-200 cursor-pointer relative">
            <Handle
              type="source"
              style={{
                ...ECOMMERCE_HANDLE_STYLES,
                
                
                
              }}
              position={Position.Right}
              id="category"
              isConnectable={true}
            />
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm text-center text-gray-600">
                Category
              </span>
            </div>
          </div>

          {/* Inventory Section */}
          <div className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200 p-2 rounded-md border border-gray-200 cursor-pointer relative">
            <Handle
              type="source"
              style={{    
                ...ECOMMERCE_HANDLE_STYLES,
                
              }}
              position={Position.Right}
              id="inventory"
              isConnectable={true}
            />
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm text-center text-gray-600">
                Inventory
              </span>
            </div>
          </div>

          {/* Customers Section */}
          <div className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200 p-2 rounded-md border border-gray-200 cursor-pointer relative">
            <Handle
              type="source"
              style={{
                ...ECOMMERCE_HANDLE_STYLES,
                
              }}
              position={Position.Right}
              id="orders"
              isConnectable={true}
            />
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm text-center text-gray-600">
                Orders
              </span>
            </div>
          </div>
        </div>

        {/* Sync Button */}
        <div className="flex w-full space-x-2 p-4 pt-0">
          <Button
            className="flex-1"
            variant={"primary"}
            onClick={() => {}}
          >
            <span>Sync</span>
          </Button>
        </div>
      </Card>
      
        {MemoizedNodeDrawer}
      
    </>
  );
}

export default memo(ECommerceNode)