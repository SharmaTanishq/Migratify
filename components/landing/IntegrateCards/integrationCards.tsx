
import {  getIntegrations } from "@/components/CMS/api";


import { useEffect, useState } from "react";
import { CardStackIntegrations } from "./cardStackIntegrations";

interface CardData {
    id: string;
    name: string;
    designation: string;
    content: React.ReactNode;
}

export default function IntegrationCards(){
    const [data,setData] = useState<Array<any>>([]);
    useEffect(()=>{
        getIntegrations().then((res)=>{
             setData(res.data);
            
        })
    },[])
    
    const [cards,setCards] = useState<any>([]);

    useEffect(()=>{
        if(data.length > 0){
            data.map((types:any) => {
                types.nodes.map((item:any) => {
                    setCards((prev:any) => [...prev,({
                        id: item.id,
                        name: item.Name,
                        logo: item.Node.node_logo.url,
                        designation: item.Node.node_description,
                        content: (

                           <p>{item.Node.description}</p>
                        )
                    })])
                })
            })
         
        }
    },[data])
    return (
        <>
        <div className="flex  items-end h-full pt-16 ">
            {cards.length > 0 && (
            <CardStackIntegrations
                
                // @ts-ignore
                items={cards}
            />
                
            
            )}
        </div>
        </>
    );
}
