
import { getBridges } from "@/components/CMS/api";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CardStack } from "@/components/ui/card-stack";
import { useEffect, useState } from "react";

interface CardData {
    id: string;
    name: string;
    designation: string;
    content: React.ReactNode;
}

export default function Bridges(){
    const [data,setData] = useState<Array<any>>([]);
    useEffect(()=>{
        getBridges().then((res)=>{
            setData(res.data[0].nodes);
        })
    },[])
    
    const [cards,setCards] = useState<any>([]);

    useEffect(()=>{
        if(data.length > 0){
            setCards(data.map((item:any) => ({
                id: item.id,
                name: item.Name,
                logo: item.Node.node_logo.url,
                designation: item.Node.node_description,
                content: (
                   <p></p>
                )
            })))
        }
    },[data])
    return (
        <>
        <div className="flex  items-end h-[200px]">
            {cards.length > 0 && (
            <CardStack
                
                items={cards}
            >
                
            </CardStack>
            )}
        </div>
        </>
    );
}