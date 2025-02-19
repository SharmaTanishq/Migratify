import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";

function GenericDrawerLayout({
    children,
    isOpen,
    
}: {
    children: React.ReactNode;
    isOpen: boolean | undefined;
    
}) {
    const [isExpanded,setExpanded] = useState(false);
    const handleExpand = () => {
        setExpanded(!isExpanded);
    }
    return (
        <Sheet open={isOpen} modal={false} >
            <SheetContent handleExpand={handleExpand} side={isExpanded ? "modal" : "flow"} className=" mt-10   bg-white pointer-events-auto">
                {children}
            </SheetContent>
        </Sheet>
    );
}

export default GenericDrawerLayout;