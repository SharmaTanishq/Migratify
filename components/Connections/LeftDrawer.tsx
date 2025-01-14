import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { ScrollArea } from "../ui/scroll-area";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { NodeCard } from "./Drawer/NodeCards";
import { Icons } from "../Icons";
import { useDnD } from "../AddNodes/DnDContext";

interface NodeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  nodeData?: any; // Type this according to your node structure
}

export function AddNodeDrawer({ isOpen, onClose, nodeData }: NodeDrawerProps) {
  
  return (
    <Sheet key={"left"} open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="flowLeft"
        className="w-[500px] sm:w-[540px] md:p-6 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100"
      >
        <SheetHeader>
          <SheetTitle>Add Node</SheetTitle>
          <SheetDescription>
            Select a node from the categories below to add to your workflow
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-3">
          <Input
            type="search"
            placeholder="Search nodes..."
            className="w-full"
          />
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              Sort A-Z
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Active Only
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-25rem)] mt-10">
          <div className="space-y-6 pr-4">
            <Collapsible className="w-[320px] space-y-2">
              <div className="flex items-center justify-between space-x-4 px-4">
                <h4 className="text-sm font-semibold">
                  E-Commerce
                </h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              
              <NodeCard  icon={<Icons.VTEX />} title="VTEX" description="Create integration with VTEX e-commerce " />
              <CollapsibleContent className="space-y-2">
                <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                  @radix-ui/colors
                </div>
                <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                  @stitches/react
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
