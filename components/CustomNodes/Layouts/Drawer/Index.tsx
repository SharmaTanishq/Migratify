import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useOnSelectionChange } from "@xyflow/react";
import { X } from "lucide-react";
import { Expand } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

function GenericDrawerLayout({
  children,
  isOpen,
  node,
}: {
  children: React.ReactNode;
  isOpen: boolean | undefined;
  node: any;
}) {

  const [isExpanded, setExpanded] = useState(false);
  
  
  

  const handleExpand = () => {
    setExpanded(!isExpanded);
  };
  return (
    <Sheet open={isOpen} modal={isExpanded ? true : false}>
      <SheetContent
        handleExpand={handleExpand}
        side={isExpanded ? "modal" : "flow"}
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
              <Expand className="w-5 h-5 cursor-pointer" onClick={handleExpand} />
              {/* <X className="w-5 h-5 cursor-pointer" onClick={} /> */}
            </div>
          </div>

          <SheetDescription>
            {node?.data?.ui?.node_description}
          </SheetDescription>
        </SheetHeader>
        <Separator orientation="horizontal" className="w-full bg-gray-300 " />
        <div className={cn(isExpanded ? "grid grid-cols-2 gap-4 w-full rounded-xl overflow-hidden p-2" : "grid grid-cols-1 gap-4  rounded-xl overflow-hidden p-2")}>
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default GenericDrawerLayout;
