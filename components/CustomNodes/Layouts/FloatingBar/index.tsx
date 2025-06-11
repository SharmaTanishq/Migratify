import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useNodeConnections, useOnSelectionChange, useReactFlow } from "@xyflow/react";

import { useCallback, useEffect, useState } from "react";
import ModalLayout from "../Modal";
import { Dock, DockIcon } from "@/components/ui/dock";
import {
  IconMaximize,
  IconTrash,
  IconHome,
  IconCode,
  IconEdit,
  IconSwitchHorizontal,
  IconKey,
  IconSettings,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useNodeDelete } from "@/components/hooks/useNodeDelete";
import { ModalStore } from "@/components/Store/modal";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";

const ICON = [
  {
    icon: (
      <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    label: "Switch Source & Target",
  },
  {
    icon: (
      <IconMaximize className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    label: "Maximize",
  },
  {
    icon: (
      <IconCode className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    label: "Code",
  },
  {
    icon: (
      <IconEdit className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    label: "Edit",
  },
  {
    icon: (
      <IconTrash className="h-full w-full text-red-500 dark:text-neutral-300" />
    ),
    label: "Trash",
  },
];

export type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {
  Switch: (props: IconProps) => <IconSwitchHorizontal {...props} />,
  Maximize: (props: IconProps) => <IconSettings {...props} />,
  Code: (props: IconProps) => <IconCode {...props} />,
  Edit: (props: IconProps) => <IconEdit {...props} />,
  Trash: (props: IconProps) => <IconTrash {...props} />,
};

export function FloatingBar({
  isOpen,
  node,
  id,
  
}: {
  isOpen: boolean | undefined;
  node: any;
  id: string;
 
}) {

  const instance = useReactFlow();
  const {setModalOpen} = ModalStore();
  const reverseHandle = useMutation(api.flows.nodes.handleSettings)
  const {deleteNode} = useNodeDelete(id);

  const handleNodeDelete = () => {
    instance.deleteElements({ nodes: [{ id: id }] });
    //deleteNode(id);   
  };

  const handleNodeEdit = () => {
    console.log("Node Edited");
  };

  const handleNodeCode = () => {
    console.log("Node Code");
  };

  const handleNodeConfigure = () => {
        setModalOpen(true);
  };



  const handleNodeSwitch = () => {
    
    reverseHandle({
      nodeId: id as Id<"nodes">,
      configurations: {
        isHandleReversed: !node.configurations.isHandleReversed,
      },
    });
    
    
  };

  const DATA = {
    navbar: [
      {
        href: "#",
        icon: Icons.Switch,
        label: "Switch Source & Target",
        className: "text-primary",
        disabled: false,
        onClick: () => {
          handleNodeSwitch();
        },
      },
      {
        href: "#",
        icon: Icons.Maximize,
        label: "Configure",
        className: "text-primary",
        disabled: false,
        onClick: () => {
          handleNodeConfigure();
        },
      },
      {
        href: "#",
        icon: Icons.Code,
        label: "Code",
        className: "text-primary",
        disabled: true,
        onClick: () => {
          handleNodeCode();
        },
      },
      {
        href: "#",
        icon: Icons.Edit,
        label: "Edit",
        className: "text-primary",
        disabled: true,
        onClick: () => {
          handleNodeEdit();
        },
      },
      {
        href: "#",
        icon: Icons.Trash,
        label: "Delete",
        className: "text-red-500",
        disabled: false,
        onClick: () => {
          handleNodeDelete();
        },
      },
    ],
  };

  return (
    <TooltipProvider>
      <Dock
        direction="middle"
        className={cn("bg-white h-12 w-full", isOpen ? " visible" : " hidden ")}
      >
        {DATA.navbar.map((item) => (
          <DockIcon key={item.label} onDragStart={() => {}}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  disabled={item.disabled}
                  className="p-0"
                  size="icon"
                  onClick={() => {
                    item.onClick();
                  }}
                >
                  <item.icon
                    className={cn("text-2xl", item.className)}
                  ></item.icon>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
      </Dock>
    </TooltipProvider>
  );
}
