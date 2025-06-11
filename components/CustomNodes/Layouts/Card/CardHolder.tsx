import { NodeDataType } from "@/components/Types/Flows";
import { Card, CardDescription, CardTitle, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { memo, useCallback, useState } from "react";
import NodeIcon from "../NodeIcon";
import NodeName from "../GenericNodeUtils/NodeName";
import NodeDescription from "../GenericNodeUtils/NodeDescription";
import { NodeData } from "@/components/CMS/types";

const MemoizedNodeIcon = memo(NodeIcon);
const MemoizedNodeName = memo(NodeName);
const MemoizedNodeDescription = memo(NodeDescription);


const GenericCardLayout = ({    
    id,
    selected,
    children,
    className,
    node,
    defaultHeader = true,
    
}: {

    id: string;
    selected?: boolean;
    children: React.ReactNode;
    node?: NodeDataType;
    className?: string;
    defaultHeader?: boolean;
    
}) => {

    if(!node) {
        return null;
    }
    
    const [componentData,setComponentData] = useState<NodeData>(node.ui || {});

    const renderNodeIcon = useCallback(() => {
        return (
          <MemoizedNodeIcon
            dataType={componentData?.Name}
            showNode={true}
            icon={componentData?.node_logo?.url || ""}
            isGroup={!!node?.node?.flow}
            hasToolMode={false}
          />
        );
      }, [node?.type, node?.node?.icon, node?.node?.flow]);

      const renderNodeName = useCallback(() => {
        return (
          <MemoizedNodeName
            display_name={componentData?.Name || ""}
            selected={selected}
            nodeId={id}
            showNode={true}
            isOutdated={false}
            beta={false}
            editNameDescription={false}
            toggleEditNameDescription={() => {}}
            setHasChangedNodeDescription={() => {}}
          />
        );
      }, [node?.type, node?.node?.icon, node?.node?.flow]);

      const renderNodeDescription = useCallback(() => {
        return (
          <MemoizedNodeDescription
            description={componentData?.node_description || ""}
            selected={selected}
            nodeId={id}
            emptyPlaceholder={""}
            placeholderClassName={""}
            charLimit={0}
            inputClassName={""}
            mdClassName={""}
            editNameDescription={false}
          />
        );
      }, [node?.type, node?.node?.icon, node?.node?.flow]);

    return (
        <Card className={cn(
            "w-[300px] h-full hover:shadow-xl transition-all duration-300",
            selected && "transition-all duration-200 border border-borderSelected",
            className
        )}>
          {defaultHeader && (
            <CardHeader>
            <CardTitle className="flex items-center justify-between w-full ">
            <div className="flex w-full  justify-between items-center gap-2 ">
              <div className="flex items-center gap-2">
              {renderNodeIcon()}
              {renderNodeName()}
              </div>
             
              
            </div>
            
          </CardTitle>
          <CardDescription>            
              {renderNodeDescription()}                          
          </CardDescription>
            
            </CardHeader>   
            )}
            {children}
        </Card>
    )
}

export default memo(GenericCardLayout);