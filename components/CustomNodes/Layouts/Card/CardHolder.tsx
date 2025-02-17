import { Card, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { memo } from "react";
const GenericCardLayout = ({    
    id,
    selected,
    children,
    className,
}: {

    id: string;
    selected?: boolean;
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <Card className={cn(
            "w-[300px] h-full hover:shadow-xl transition-all duration-300",
            selected && "transition-all duration-200 border border-borderSelected",
            className
        )}>
            {children}
        </Card>
    )
}

export default memo(GenericCardLayout);