import { getBridges } from "@/components/CMS/api";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CardStack } from "@/components/ui/card-stack";
import { CodeBlock } from "@/components/ui/code-block";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

interface CardData {
  id: string;
  name: string;
  designation: string;
  content: React.ReactNode;
}

export default function Bridges() {
  const [data, setData] = useState<Array<any>>([]);
  useEffect(() => {
    getBridges().then((res) => {
      setData(res.data[0].nodes);
    });
  }, []);

  const [cards, setCards] = useState<any>([]);

  useEffect(() => {
    if (data.length > 0) {
      setCards(
        data.map((item: any) => ({
          id: item.id,
          name: item.Name,
          logo: item.Node.node_logo.url,
          designation: item.Node.node_description,
          content: GET_CONTENT(item.Name.toLowerCase(), item),
        }))
      );
    }
  }, [data]);
  return (
    <>
      <div className="flex h-full items-start justify-center ">
        {cards.length > 0 && (
          <CardStack
            // @ts-ignore
            items={cards}
          />
        )}
      </div>
    </>
  );
}

const GET_CONTENT = (type: string, item: any) => {
    const code = 
    `{
"1.": "Send data to outputs",
"2.": "See data on outputs"
    }`
  switch (type) {
    case "webhook":
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <p>Order Created</p>
            <Switch
              className="data-[state=checked]:bg-green-500 "
              checked={true}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <p>Order Shipped</p>
            <Switch
              className="data-[state=checked]:bg-green-500 "
              checked={true}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <p>Order Cancelled</p>
            <Switch
              className="data-[state=checked]:bg-green-500 "
              checked={true}
            />
          </div>
        </div>
      );
    case "join":
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <p className="text-medium md:text-base text-primaryGray dark:text-neutral-200">Join two data sources and map the fields you want to join on, then expose a URL to consume, or use the Bridge to send data</p>
           
          </div>
          
        </div>
      );
    case "output":
      return(
      <div className="flex flex-col gap-2">
        <CodeBlock
            language="json"
            filename=""
            highlightLines={[2,3]}
            code={code}
          />
      </div>);
    case "cron":
      return (
        <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-medium  md:text-base text-primaryGray dark:text-neutral-200">Run a cron job on a schedule, fetch data at scheduled intervals and send it forward</p>
         
        </div>
        
      </div>
      );
  }
};
