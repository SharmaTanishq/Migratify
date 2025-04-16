"use client";


import { DrawerTabs } from "../NodeDrawer/Drawer/Tabs";

import { NodeData } from "@/components/CMS/types";
import Image from "next/image";
import { memo, useEffect, useState } from "react";
import useStore from "@/components/Store/store";
import { Id } from "@/convex/_generated/dataModel";
import GenericDrawerLayout from "../../../Layouts/Drawer/demo";

interface NodeDrawerProps {
  isOpen: boolean | undefined;
  nodeId: string;
  onClose?: () => void;
  nodeData?: NodeData; // Type this according to your node structure
}

function NodeDrawer({ isOpen, onClose, nodeData, nodeId }: NodeDrawerProps) {
  const node = useStore((state) => state.getNode(nodeId));
  const [id, setId] = useState("");
  useEffect(() => {
    setId(node?._id);
  }, [node]);

  return (
    <GenericDrawerLayout isOpen={isOpen} node={node} id={id}>
      <div
        className="w-full h-full p-2"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DrawerTabs nodeId={id as Id<"nodes">} />
      </div>
    </GenericDrawerLayout>
  );
}

export default NodeDrawer;
