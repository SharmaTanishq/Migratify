import { TooltipContent } from "../ui/tooltip";

import { Tooltip, TooltipTrigger } from "../ui/tooltip";

import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TooltipProvider } from "../ui/tooltip";
import { Checkbox } from "../ui/checkbox";
import { useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";
import {
  ExpressionRenderer,
  ExpressionRendererHandle,
} from "./ExpressionRenderer";
import { Code2 } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";

interface InputFieldProps {
  label: string;
  fieldId: string;
  isDragging: boolean;
  value: string;
  onChange: (value: string) => void;
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  indented?: boolean;
}

const DroppableInput = ({
  label,
  fieldId,
  isDragging,
  value,
  onChange,
  enabled,
  onEnabledChange,
  indented = false,
}: InputFieldProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: fieldId,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const expressionRendererRef = useRef<ExpressionRendererHandle>(null);

  const [isSelected, setIsSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);



  return (
    <div className={cn("flex flex-col", indented && "ml-6")}>
      <div className="flex items-center justify-between mb-2">
        <Label htmlFor={fieldId} className="text-sm font-normal text-black">
          {label}
        </Label>
      </div>

      <div ref={setNodeRef} className="flex items-center justify-between gap-6 w-full">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild className="w-full" >
            <div className="relative">
              <Input
                id={fieldId}
                ref={inputRef}
                autoComplete="off"
                value={value}
                onClick={() => setIsOpen(true)}
                onSelect={(e) => {
                  
                  setIsOpen(true);
                  
                }}

                onBlur={(e) => {
                 
                  // Your existing blur handler (hiding the card etc)
                  setIsSelected(false);
                  setIsOpen(false);
                }}
                onChange={(e) => onChange(e.target.value)}
                disabled={!enabled}
                className={cn(
                  "w-full transition-all duration-250 rounded-md border-gray-300 bg-white p-5 font-mono",
                  !enabled && "opacity-50 cursor-not-allowed",
                  isDragging &&
                    enabled &&
                    "border-2 border-dashed border-gray-400  ",
                  isOver &&
                    enabled &&
                    "border-2 border-dashed border-purple-500 bg-purple-50/50"
                )}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Code2 className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </PopoverTrigger>
          
            <PopoverContent className="w-full bg-white flex-1 border-none rounded-xl  p-0.5" align="start">
               
              <ExpressionRenderer
                ref={expressionRendererRef}
                value={value}
                inputRef={inputRef}
            />
           
          </PopoverContent>
          
        </Popover>
        

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Checkbox
                  id={`${fieldId}-enabled`}
                  checked={enabled}
                  onCheckedChange={onEnabledChange}
                  className="w-5 h-5 rounded-sm  data-[state=checked]:border-none data-[state=checked]:bg-green-600 "
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {enabled ? "Disable" : "Enable"} {label}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default DroppableInput;
