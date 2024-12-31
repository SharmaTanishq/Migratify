"use client";

import { useState } from "react";
import DialogComponent from "./dialog";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";


export default function Page() {
    const [dialog,setDialog] = useState(false);
    const data = useQuery(api.projects.listProjects,{})
    const router = useRouter();
    
    
    return(
        <div className='w-full h-full p-8 '>
            <div className='w-full h-full flex flex-col justify-start '>
                <h1 className="text-4xl font-semibold">Projects</h1>
                <p className='text-primary'>Connections between your product and your users’ accounts on third-party software.</p>
                
                <div className="flex flex-col w-full h-full justify-start items-start border px-4 py-4 mt-10 rounded-xl ">
                    <div className="flex align-start w-full  justify-end items-start">

                        <DialogComponent>

                        </DialogComponent>
                        
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
                        {data?.map((project) => (
                            <Card 
                                onClick={() => router.push(`/connections/${project._id}`)}
                                key={project._id} 
                                className="max-w-xl w-96 h-72 max-h-[500px] p-4 mb-4 transition-shadow duration-300 ease-in-out hover:shadow-lg"
                            >
                                <h2 className="text-xl font-bold mb-2">{project.projectName}</h2>
                                <p className="text-sm text-gray-600 mb-2">{project.projectDescription}</p>
                                <p className="text-sm text-gray-600 mb-2">E-commerce Platform {project.ecommercePlatform}</p>
                                
                                <div className="flex flex-row flex-wrap">
                                    {project.integration.map((integrationName, index) => (
                                        <div key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2 mb-2">
                                            {integrationName.label}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

            </div>
            </div>
    )
  }