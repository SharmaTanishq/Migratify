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
import { X } from "lucide-react";
import { Expand } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import ModalLayout from "../Modal";
import { ModalStore } from "@/components/Store/modal";
import { ModalSize } from "@/components/Types/ui/Modal";

function GenericDrawerLayout({
  children,
  isOpen,
  node,
  id,
  size,
}: {
  children: React.ReactNode;
  isOpen: boolean | undefined;
  node: any;
  id: string;
  size: ModalSize;
}) {
  const reactFlow = useReactFlow();
  const [isExpanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(isOpen); //Workaround but it works.
  const {modalOpen, setModalOpen} = ModalStore();
  const handleExpand = () => {
    setExpanded(!isExpanded);
  };
  return (
    <>
      
      <ModalLayout
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          reactFlow.updateNode(id, { selected: false });
        }}
        data={node}
        size={size}
      >
        <div className="w-full overflow-hidden">
          {children}
        </div>
      </ModalLayout>
    </>
  );
}

export default GenericDrawerLayout;
