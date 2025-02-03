import { Sheet, SheetContent, SheetHeader, SheetTitle,SheetDescription } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import { DrawerTabs } from "../NodeDrawer/Drawer/Tabs"

import { Icons } from "@/app/(dashboard)/dock"
import { NodeData } from "@/components/CMS/types"
import Image from "next/image"
import {  memo, useEffect,  useState } from "react"


interface NodeDrawerProps {
  isOpen: boolean | undefined
  onClose?: () => void
  nodeData?: NodeData // Type this according to your node structure
}

function NodeDrawer({ isOpen, onClose, nodeData }: NodeDrawerProps) {
  
  
  return (
    <Sheet  open={true} modal={false} >
        
      <SheetContent side="flow" className="w-[700px] mt-10 sm:w-[540px]  bg-white ">
          
        <SheetHeader className="flex justify-center items-start rounded-t-xl mb-5 p-4 pb-0">
          <SheetTitle >
            <div>
            <div className="flex flex-col items-start gap-2  ">
              <div className="flex h-9 w-9 items-center rounded gap-2 ">
                {/* Icon placeholder - you can replace this with actual icon */}
                
                  <Image src={nodeData?.node_logo.url!} alt={nodeData?.Name!} width={30} height={30} />
                
                <span className="text-xl font-medium">
                {nodeData?.Name}
                </span>
              </div>
              
              

            </div>
            </div>
          </SheetTitle>
          <SheetDescription>
            {nodeData?.node_description}
          </SheetDescription>
        </SheetHeader>
        <Separator orientation="horizontal" className="w-full bg-gray-300 " />
        
        
        
        
        <div className="w-full h-full p-2">
            <DrawerTabs             
             />
         
        </div>
       
      </SheetContent>
      
    </Sheet>
  )
}

export default NodeDrawer;