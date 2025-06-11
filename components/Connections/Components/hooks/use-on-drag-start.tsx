import { useDnD } from "@/components/AddNodes/DnDContext";
import { FlowType } from "@/components/Types/Flows";
import { useCallback } from "react";
import { createRoot } from "react-dom/client";


const useDragStart = (data: any) => {
    const [_, setType] = useDnD();   

  const onDragStart = useCallback(
    (event:React.DragEvent<HTMLDivElement>) => {
        if (setType === null) return;       
        
        setType(data.node_type)
   
    
    event.dataTransfer.setData("flow", JSON.stringify(data));
    event.dataTransfer.setData("flowConfigurations", JSON.stringify({isHandleReversed:false}));
    
    },
    [data],
  );

  return { onDragStart };
};

export default useDragStart;
