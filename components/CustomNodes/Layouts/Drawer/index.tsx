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
      {/* <Sheet open={isExpanded?false:open} modal={false}>
        <SheetContent
          handleExpand={handleExpand}
          side={"flow"}
          className=" mt-10   bg-white pointer-events-auto"
        >
          <SheetHeader className="flex justify-center w-full items-start rounded-t-xl mb-5 p-4 pb-0">
            <div className="flex w-full h-full  justify-between items-center">
              <SheetTitle>
                <div className="flex flex-col items-start gap-2">
                  <div className="flex h-9 w-9 items-center rounded gap-2">
                    <Image
                      src={node?.data?.ui?.node_logo?.url}
                      alt={node?.data?.ui?.Name}
                      width={30}
                      height={30}
                    />
                    {node?.data?.ui?.Name}
                  </div>
                </div>
              </SheetTitle>
              <div className="flex justify-end items-end gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="absolute top-4 right-12"
                      onClick={handleExpand}
                    >
                      <Expand className="h-7 w-7 border border-gray-200 rounded-md mt-1 p-1 shadow-sm" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isExpanded ? "Collapse" : "Expand"}</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <X
                      className="w-7 h-7 cursor-pointer border border-gray-200 rounded-md  p-1 shadow-sm"
                      onClick={() => {
                        reactFlow.updateNode(id, { selected: false });
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Close</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <SheetDescription>
              {node?.data?.ui?.node_description}
            </SheetDescription>
          </SheetHeader>
          <Separator orientation="horizontal" className="w-full bg-gray-300 " />
          <div
            className={cn(
              "flex flex-col gap-4  rounded-xl overflow-hidden p-2"
            )}
          >
            {children}
          </div>
        </SheetContent>
      </Sheet> */}
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
