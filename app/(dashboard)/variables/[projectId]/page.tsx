"use client"

import { useParams } from "next/navigation";
import { GlobalVariablesTable } from "./table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page(){
    const { projectId } = useParams();
    
    return (
        <div className="flex flex-col gap-4 w-full h-full  items-start justify-start ">
            
            <Card className="flex flex-col gap-4 w-full h-full p-5  ">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Global Variables</CardTitle>
                    <CardDescription>Global variables are shared across all flows in the project.</CardDescription>
                </CardHeader>
                <CardContent>
                    <GlobalVariablesTable projectId={projectId as string} />
                </CardContent>
            </Card>
        </div>
    )
}