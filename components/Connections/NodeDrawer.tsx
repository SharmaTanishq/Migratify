import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "../ui/separator"
import { cn } from "@/lib/utils"

import { DrawerTabs } from "./Components/Drawer/Tabs"

import { Icons } from "@/app/(dashboard)/dock"
import { NodeData } from "../CMS/types"
import Image from "next/image"
import {  memo, useEffect,  useState } from "react"


interface NodeDrawerProps {
  isOpen: boolean
  onClose: () => void
  nodeData?: any // Type this according to your node structure
}

function NodeDrawer({ isOpen, onClose, nodeData }: NodeDrawerProps) {
  
  

  if(!nodeData) return null;
  const UIData:NodeData = JSON.parse(nodeData?.data?.UIData); 

  
  return (
    <Sheet  open={isOpen} onOpenChange={onClose}>
        
      <SheetContent side="flow" className="w-[700px] mt-10 sm:w-[540px]  bg-white ">
            
        <SheetHeader className="flex justify-center items-start rounded-t-xl mb-5 p-4 pb-0">
          <SheetTitle >
            <div>
            <div className="flex flex-col items-start gap-2  ">
              <div className="flex h-9 w-9 items-center rounded gap-2 ">
                {/* Icon placeholder - you can replace this with actual icon */}
                
                  <Image src={UIData?.node_logo.url!} alt={UIData?.Name!} width={30} height={30} />
                
                <span className="text-xl font-medium">
                {UIData?.Name}
                </span>
              </div>
              
              <span className="text-sm font-normal  pl-2">
                Configure your settings
              </span>

            </div>
            </div>
          </SheetTitle>
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

export default memo(NodeDrawer);