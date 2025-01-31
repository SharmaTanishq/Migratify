import { useDnD } from "@/components/AddNodes/DnDContext";
import { FlowType } from "@/components/Types/Flows";
import { useCallback } from "react";
import { createRoot } from "react-dom/client";


const useDragStart = (data: FlowType) => {
    const [_, setType] = useDnD();   

  const onDragStart = useCallback(
    (event:React.DragEvent<HTMLDivElement>) => {
        // if (setType === null) return;       
        // setType("ecommerceNode")

    //   let image = <DragCardComponent data={data} />; // Replace with whatever you want here

    //   const ghost = document.createElement("div");
    //   ghost.style.transform = "translate(-10000px, -10000px)";
    //   ghost.style.position = "absolute";
    //   document.body.appendChild(ghost);
    //   event.dataTransfer.setDragImage(ghost, 0, 0);

    //   const root = createRoot(ghost);
    //   root.render(image);

    //   const flow = getFlowById(data.id);
    
    event.dataTransfer.setData("flow", JSON.stringify(data));
    
    },
    [data],
  );

  return { onDragStart };
};

export default useDragStart;
