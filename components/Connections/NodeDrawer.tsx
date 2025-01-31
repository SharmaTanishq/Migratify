import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "../ui/separator"
import { cn } from "@/lib/utils"
import DotPattern from "../ui/dot-pattern"
import { DrawerTabs } from "./Components/Drawer/Tabs"

import { Icons } from "@/app/(dashboard)/dock"


interface NodeDrawerProps {
  isOpen: boolean
  onClose: () => void
  nodeData?: any // Type this according to your node structure
}

export function NodeDrawer({ isOpen, onClose, nodeData }: NodeDrawerProps) {
  return (
    <Sheet  open={isOpen} onOpenChange={onClose}>
        
      <SheetContent side="flow" className="w-[500px] mt-10 sm:w-[540px] md:p-6 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 ">
            
        <SheetHeader className="flex justify-center items-start rounded-t-xl mb-5">
          <SheetTitle >
            <div>
            <div className="flex items-center gap-6">
              <div className="flex h-9 w-9 items-center justify-center rounded  ">
                {/* Icon placeholder - you can replace this with actual icon */}
                <div className="h-8 w-8 ">
                  {nodeData?.icon || <Icons.whatsapp /> }
                </div>
              </div>
              <span className="text-xl font-semibold">
                Node Details
              </span>
            </div>
            </div>
          </SheetTitle>
        </SheetHeader>
        <Separator orientation="horizontal" className="w-full bg-gray-300 " />
        
        
        
        
        <div className="w-full h-full py-1">
            <DrawerTabs              
             />
         
        </div>
        <DotPattern
                width={30}
                height={30}
                x={-1}
                y={-1}
                strokeDasharray={"4 2"}
                className={cn(
                "[mask-image:radial-gradient(300px_circle_at_top,white,transparent)]",
                )}
            />
      </SheetContent>
      
    </Sheet>
  )
}