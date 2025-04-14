"use client"
import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Tooltip, TooltipTrigger, TooltipProvider, TooltipContent } from "@/components/ui/tooltip";

export default function Page(){
    const { node, nodeid } = useParams();
    const router = useRouter();
    return (
        <div className="flex flex-col gap-4 w-full h-full p-4">
            <div className="flex items-center gap-2">
                <TooltipProvider>
                        <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="primary" size={"icon"} onClick={() => router.back()} className="rounded-full">
                                <ArrowLeftIcon />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" align="start">
                            <p>Go Back</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                
            </div>
            <h1>{node} {nodeid}</h1>
            <Button>
                <PlusIcon />
                Add Field
            </Button>
        </div>
    )
}