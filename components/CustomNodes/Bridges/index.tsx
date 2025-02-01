import { NodeDataType } from "@/components/Types/Flows";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { memo } from "react";

function BridgesNode({data,selected}:{
    data:NodeDataType,
    selected?:boolean,   
}):JSX.Element{
    const instance = useReactFlow();
    
  return (
    <div className="w-full h-full">
        <span className="text-black">This is Bridge Node</span>
        <Handle
        type="source"
        position={Position.Right}
        />
        <Handle
        type="target"
        position={Position.Left}
        />
    </div>
  )
}

export default memo(BridgesNode);
