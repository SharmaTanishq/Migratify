"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import flowStore from "@/components/Store/store";
import { Suspense } from "react";
import { NodeDataType } from "@/components/Types/Flows";
import { CMSNode } from "@/components/CMS/types";

export default function Page() {
  const params = useParams();
  const projectId = params.projectId as string;
  if(!projectId) return <div>No project id</div>

  const nodes = flowStore().nodes

  

 
  
  return (
    
    <div className="flex w-full h-full items-center justify-center gap-4 ">
        <Card className="flex flex-col gap-4 w-full h-full p-5  ">
                <CardHeader>
                    <CardTitle>Schemas</CardTitle>
                    <CardDescription>Schemas are used to define the structure of the data that is available for the deployed nodes.</CardDescription>
                </CardHeader>
                <CardContent>

                    {nodes.map((node) => (
                        <div key={node.id}>
                            <h1>{node.data.ui.Name}</h1>
                        </div>
                    ))}

                    {/* AVAILABLE NODES */}

                </CardContent>
            </Card>
    </div>
    
  )
}