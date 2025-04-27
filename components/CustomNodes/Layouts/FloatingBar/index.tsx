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
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useOnSelectionChange, useReactFlow } from "@xyflow/react";


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
} from "@tabler/icons-react";
import { motion } from "framer-motion";

function FloatingBar({
  isOpen,
  node,
  id,
}: {
  isOpen: boolean | undefined;
  node: any;
  id: string;
}) {
  const reactFlow = useReactFlow();
  const [isExpanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(isOpen); //Workaround but it works.

  return (
    <motion.div
      className={cn(
        "relative mb-5",
        isOpen ? "opacity-100" : "transition-all duration-1000 hidden"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >

      <Dock direction="middle" className=" justify-center w-full h-12 rounded-xl bg-white border border-gray-200 "  >
      <DockIcon onDragStart={() => {}}>
          <IconSwitchHorizontal
            className=" text-neutral-500 dark:text-neutral-300"
            size={20}
          />
        </DockIcon>
        <DockIcon onDragStart={() => {}}>
          <IconMaximize
            className=" text-neutral-500 dark:text-neutral-300"
            size={20}
          />
        </DockIcon>
        <DockIcon onDragStart={() => {}}>
          <IconCode
            className=" text-neutral-500 dark:text-neutral-300"
            size={20}
          />
        </DockIcon>
        
        <DockIcon onDragStart={() => {}}>
          <IconEdit
            className=" text-neutral-500 dark:text-neutral-300"
            size={20}
          />
        </DockIcon>
        <DockIcon onDragStart={() => {}}>
          <IconTrash
            className=" text-red-500 dark:text-neutral-300"
            size={20}
          />
        </DockIcon>
      </Dock>
    </motion.div>
  );
}

export default FloatingBar;
