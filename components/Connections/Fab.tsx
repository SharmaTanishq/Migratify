import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { Button } from "../ui/button"
import { PlusIcon } from "lucide-react"

  
const AddNodeFAB = ({ onClick }: { onClick: () => void }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                                
                    <Button  className="flex rounded-full h-12  p-4 shadow-2xl bg-gradient-to-r from-[#232526] to-[#414345] hover:-translate-y-1 transition duration-400" onClick={onClick}>
                        <PlusIcon className="w-6 h-6" style={{ transform: 'scale(1.6)' }} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Add Node</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default AddNodeFAB;