import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card } from '../ui/card';
import { Icons } from '../Icons';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const handleStyle = { left: 10 };
 
export function VtexCommerceNode({ data }:{data:any}) {

 
  return (
    <>
      <Handle type="target" position={Position.Top} />
     
      <Handle type="source" position={Position.Left} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        
      />
     
      <Card className=' flex flex-col justify-center items-center w-full h-full p-5'>
        <Icons.VTEX/>
        <Popover>
            <PopoverTrigger>Configure</PopoverTrigger>
            
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none">Secrets</h4>
                    <p className="text-sm text-muted-foreground">
                    Configure VTEX Secrets
                    </p>
                </div>
                <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Host</Label>
                    <Input
                        id="width"
                        defaultValue="100%"
                        className="col-span-2 h-8"
                    />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxWidth">API KEY</Label>
                    <Input
                        id="maxWidth"
                        defaultValue="300px"
                        className="col-span-2 h-8"
                    />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">APP TOKEN</Label>
                    <Input
                        id="height"
                        defaultValue="25px"
                        className="col-span-2 h-8"
                    />
                    </div>
                    
                </div>
                </div>
            </PopoverContent>
        </Popover>
      </Card>
    </>
  );
}