import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "../ui/separator"
import { cn } from "@/lib/utils"
import DotPattern from "../ui/dot-pattern"

interface NodeDrawerProps {
  isOpen: boolean
  onClose: () => void
  nodeData?: any // Type this according to your node structure
}

export function NodeDrawer({ isOpen, onClose, nodeData }: NodeDrawerProps) {
  return (
    <Sheet  open={isOpen} onOpenChange={onClose}>
        
      <SheetContent side="flow" className="w-[400px] mt-10 sm:w-[540px] bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 p-0">
            <DotPattern
                width={30}
                height={30}
                x={-1}
                y={-1}
                strokeDasharray={"4 2"}
                className={cn(
                "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
                )}
            />
        <SheetHeader className="flex justify-center items-start bg-blue-50 rounded-t-xl p-2">
          <SheetTitle>
            <div>
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-blue-100 to-blue-50 shadow-sm ring-1 ring-gray-200/50">
                {/* Icon placeholder - you can replace this with actual icon */}
                <div className="h-6 w-6 text-blue-600">
                  {nodeData?.icon || "🔌"}
                </div>
              </div>
              <span className="text-xl font-semibold">
                {nodeData?.data?.label || "Node Details"}
              </span>
            </div>
            </div>
          </SheetTitle>
        </SheetHeader>
        
        
        <div className="mt-6 p-2 h-full">
          <div className="space-y-4">
            {/* Setup Section */}
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Setup</h3>
              {/* Add your configuration options here */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">App</label>
                  <div className="mt-1 flex items-center space-x-2">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                      {nodeData?.type || "Node Type"}
                    </div>
                    <button className="text-blue-500 text-sm">Change</button>
                  </div>
                </div>
                
                {/* Add more configuration fields */}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}