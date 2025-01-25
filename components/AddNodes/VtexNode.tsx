
import { Handle, Position,NodeProps, useReactFlow } from "@xyflow/react";
import { Card } from "../ui/card";
import { Icons } from "../Icons";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "../ui/button";
import { useNodeDelete } from "../hooks/useNodeDelete";
import useStore  from "../Store/store";
import { useEffect } from "react";


const DEFAULT_HANDLE_STYLE = {
  width: 8,
  height: 12,
  right: -8,
  borderRadius: "0px 5px 5px 0px",
  background: "var(--handle-color)",
};

export function VtexCommerceNode(props: NodeProps) {
  const instance = useReactFlow();
  
  

 // const { deleteNode } = useNodeDelete(data.projectId); 

 const handleDelete = (event:React.MouseEvent)=>{
  event.stopPropagation();
  instance.deleteElements({ nodes: [{id:props.id}] })
 }

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    
    // Button logic
  };

return (
    <>
      <Card className="w-[300px] p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 relative">
        {/* Header Section */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <Icons.VTEX className="w-8 h-8 text-coral-500" />
            <div>
              <h3 className="font-medium">Vtex</h3>
              <p className="text-lg font-semibold">Configure Vtex</p>
            </div>
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

        {/* Sections Container */}
        <div className="space-y-2">
          {/* Products Section */}
          <div className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200 p-2 rounded-md border border-gray-200 cursor-pointer relative">
            <Handle
              type="source"
              style={{
                ...DEFAULT_HANDLE_STYLE,
                top: "50%",
                transform: "translateY(-50%)",
                background: "#9ca3af",
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
                ...DEFAULT_HANDLE_STYLE,
                top: "50%",
                transform: "translateY(-50%)",
                background: "#9ca3af",
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
                ...DEFAULT_HANDLE_STYLE,
                top: "50%",
                transform: "translateY(-50%)",
                background: "#9ca3af",
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
                ...DEFAULT_HANDLE_STYLE,
                top: "50%",
                transform: "translateY(-50%)",
                background: "#9ca3af",
              }}
              position={Position.Right}
              id="customers"
              isConnectable={true}
            />
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm text-center text-gray-600">
                Customers
              </span>
            </div>
          </div>
        </div>

        {/* Sync Button */}
        <div className="flex w-full space-x-2">
          <Button
            className="flex-1 bg-[#FF3367] hover:bg-[#FF3367]/90 text-white"
            onClick={() => {}}
          >
            <span>Sync</span>
          </Button>
        </div>
      </Card>
    </>
  );
}
