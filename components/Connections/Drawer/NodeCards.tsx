import { GripVertical, LockIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDnD } from "@/components/AddNodes/DnDContext"
import { useRef } from "react"
import { motion } from "framer-motion"
import { cva } from "class-variance-authority"
import Image from "next/image"

interface NodeCardProps {
  title: string
  description: string
  icon?: string
  variant?: "default" | "primary" | "disabled"
  className?: string
  nodeType?: string
  
}

const nodeCardVariants = cva(
  "flex items-center gap-4 justify-between p-2 rounded-lg border border-gray-200 bg-white/50 hover:bg-white/80 hover:border-gray-300 hover:shadow-sm transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-white/50 hover:bg-white/80 hover:border-gray-300 hover:shadow-sm transition-all duration-200",
        primary: "bg-gradient-to-r  rounded from-indigo-600 to-violet-600 text-white rounded-lg shadow-lg hover:from-indigo-700 hover:to-violet-700",
        disabled: "bg-gray-200 text-gray-500 cursor-not-allowed hover:bg-gray-200",
      },
    },
  }
)

export function NodeCard({ title, description, icon, className,variant, nodeType }: NodeCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [_, setType] = useDnD();   
 
    const onDragStart = (event:any, nodeType:any) => {
        event.stopPropagation();
        event.dataTransfer.setData('application/reactflow', nodeType);
        if (setType === null) return;
        
        setType(nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    
    
   
  return (
    <motion.div 
        onDragStart={(event) => onDragStart(event, nodeType)}
        ref={ref}
        className={cn(
            nodeCardVariants({variant}),
            className
        )}
        draggable = {variant !== "disabled" ? true : false}
    >
      <div className="flex items-center ">
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-50/50">
            <Image src={icon} alt={title} width={40} height={40} />
          </div>
        )}
        <div className="space-y-1">
          <h3 className="font-semibold text-gray-900">{title.length > 30 ? `${title.slice(0, 30)}...` : title}</h3>
          <p className="text-sm text-gray-500 ">{description.length > 30 ? `${description.slice(0, 30)}...` : description}</p>
        </div>
      </div>
      
      <div className="flex items-end  hover:text-gray-600 cursor-move" >
        {variant === "disabled" ? <LockIcon className="h-4 w-4 text-color-primary-black" /> : <GripVertical className="h-6 w-6 text-black" />}
      </div>
    </motion.div> 
  )
}
