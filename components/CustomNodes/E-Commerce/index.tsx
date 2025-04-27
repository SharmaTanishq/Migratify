import { Handle, Position, NodeProps, useReactFlow } from "@xyflow/react";
import { Card, CardHeader, CardDescription, CardContent, CardFooter, CardTitle } from "../../ui/card";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

import { Button } from "../../ui/button";

import { memo, useCallback,  useMemo, useState } from "react";
import NodeIcon from "./Components/NodeIcon";
import NodeName from "./Components/GenericNodeUtils/NodeName";
import NodeDescription from "./Components/GenericNodeUtils/NodeDescription";
import { NodeData } from "@/components/CMS/types";
import { NodeDataType } from "@/components/Types/Flows";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { DEFAULT_HANDLE_STYLE_SOURCE } from "@/components/Constants/HandleStyles";
import NodeDrawer from "./Components/NodeDrawer";
import GenericCardLayout from "../Layouts/Card/CardHolder";
import FloatingBar from "../Layouts/FloatingBar";

const MemoizedNodeIcon = memo(NodeIcon);
const MemoizedNodeName = memo(NodeName);
const MemoizedNodeDescription = memo(NodeDescription);
const MemoizedFloatingBar = memo(FloatingBar);

const ECOMMERCE_HANDLE_STYLES = {
  ...DEFAULT_HANDLE_STYLE_SOURCE,
  right: "0",
};

function ECommerceNode({
  data,
  selected,
  id,
}: {
  data: NodeDataType;
  selected?: boolean;
  id: string;
}): JSX.Element {
  const instance = useReactFlow();

  const [componentData,setComponentData] = useState<NodeData>(data.ui || {});
  
  

  //const [isDrawerOpen, setIsDrawerOpen] = useState(selected);

  const handleDelete = (event: React.MouseEvent) => {
    //event.stopPropagation();
    instance.deleteElements({ nodes: [{ id: id }] });
  };

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




  const MemoizedNodeDrawer = useMemo(() => {
    return (
      selected && <NodeDrawer isOpen={true} nodeData={componentData} nodeId={id} />
    );
  }, [selected, id]);

  const handleButtonClick = (event: React.MouseEvent) => {
    //event.stopPropagation();
    // Button logic
  };

  return (
    <div className="relative">
      <div className="absolute -top-24 left-0 min-h-full min-w-full">
        <MemoizedFloatingBar isOpen={selected} node={data} id={id} />
      </div>

      <GenericCardLayout
        id={id}
        selected={selected}       
      >
        
        {/* Header Section */}
        <CardHeader className="">
          
        <CardTitle className="flex items-center justify-between w-full ">
            <div className="flex items-center gap-2 ">
              {renderNodeIcon()}
              {renderNodeName()}
              {/* <h3 className="font-medium">{UIData.Name}</h3> */}
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
                  <Image
                    src={
                      "https://res.cloudinary.com/dzi0wmfo3/image/upload/v1738843377/Trash_2_92934cce1a.svg"
                    }
                    alt="Delete"
                    width={16}
                    height={16}
                    className="w-4 h-4 "
                  />
                  <button
                    className="flex items-center gap-2 w-full px-1 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md"
                    onClick={handleDelete}
                  >
                    <span>Delete</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </CardTitle>
          <CardDescription>            
              {renderNodeDescription()}                          
          </CardDescription>
        </CardHeader>
        <Separator />
        {/* Sections Container */}
        <CardContent className="space-y-4 p-4 ">
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
              <span className="text-sm text-center text-gray-600">Orders</span>
            </div>
          </div>
        </CardContent>

        {/* Sync Button */}
        <CardFooter className="flex w-full space-x-2 p-4 pt-0">
          <Button className="flex-1" variant={"primary"} onClick={() => {}}>
            <span>Sync</span>
          </Button>
        </CardFooter>
      </GenericCardLayout>
      
      {MemoizedNodeDrawer}
    </div>
  );
}

export default memo(ECommerceNode);
