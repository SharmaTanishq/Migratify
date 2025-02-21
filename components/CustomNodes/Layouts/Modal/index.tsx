import { ModalStore } from "@/components/Store/modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import { useEffect } from "react";

const sizeClasses = {
  sm: "max-w-md",
  default: "max-w-2xl",
  lg: "max-w-4xl",
  content: "w-fit max-w-[90vw]", // Adapts to content
  full: "w-[90vw]",
};

function ModalLayout({
  children,
  isOpen,
  onClose,
  data,
  size = "default",
}: {
  children: React.ReactNode;
  isOpen: boolean;
  data: any;
  onClose: () => void;
  size?: "sm" | "default" | "lg" | "content" | "full";
}) {
    const {setModalOpen} = ModalStore();
    useEffect(()=>{
        setModalOpen(isOpen);
    },[isOpen])
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "flex flex-col overflow-hidden transition-all duration-200",
        sizeClasses[size],
        "min-h-[200px] max-h-[90vh]",
        // Center content when smaller than max width
        "mx-auto"
      )}>
        <DialogHeader>
          <DialogTitle>{data?.data?.ui?.Name}</DialogTitle>
          <DialogDescription>
            {data?.data?.ui?.node_description}
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-full ">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
export default ModalLayout;
