"use client"
import { useGetNodes } from "@/components/hooks/getNodes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import flowStore from "@/components/Store/store";
import { Suspense } from "react";

export default function Page() {
  const params = useParams();
  const projectId = params.projectId as string;
  if(!projectId) return <div>No project id</div>

  // const store = flowStore().nodes;

  // console.log(store);

 
  
  return (
    
    <div className="flex w-full h-full items-center justify-center gap-4 ">
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle>Schemas</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <div className="flex flex-col gap-2">
                {nodes?.map((node) => (
                    <div key={node._id}><h1>{node.data.name}</h1></div>
                ))}
                </div>  */}
            </CardContent>
        </Card>
    </div>
    
  )
}