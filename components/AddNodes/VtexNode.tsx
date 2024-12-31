import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card } from '../ui/card';
import { Icons } from '../Icons';
import { Settings } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const DEFAULT_HANDLE_STYLE = {
  width: 8,
  height: 12,
  right: -8,
  borderRadius: "0px 5px 5px 0px",
  background: 'var(--handle-color)',
  
  
};
 
export function VtexCommerceNode({ data }:{data:any}) {
  
  return (
    <>
      
      
     
      <Card className="w-[300px] p-4 space-y-4 bg-gray-50/50 border border-gray-200 relative">
      
     
     
      
        {/* Header Section */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <Icons.VTEX className="w-8 h-8 text-coral-500" />
            <div>
              <h3 className="font-medium">Vtex</h3>
              <p className="text-lg font-semibold">Configure Vtex</p>
            </div>
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-gray-600 hover:text-gray-800 p-2 rounded-md">
                <Settings className="w-6 h-6" />
              </button>
            </PopoverTrigger>
            
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Connection Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    Configure your VTEX Ecommerce settings
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="apiKey">API Key</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="Enter API key"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="secretKey">Secret Key</Label>
                    <Input
                      id="secretKey"
                      type="password"
                      placeholder="Enter secret key"
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Sections Container */}
        <div className="space-y-2">
            {/* Products Section */}
            <div className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200 p-2 rounded-md border border-gray-200 cursor-pointer relative">
              <Handle 
                type="source" 
                style={{ 
                  ...DEFAULT_HANDLE_STYLE, 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  background: '#9ca3af' 
                }} 
                position={Position.Right} 
                id="product" 
                isConnectable={true}
              />
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm text-center text-gray-600">Products</span>
              </div>          
            </div>
            
            {/* Category Section */}
            <div className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200 p-2 rounded-md border border-gray-200 cursor-pointer relative">
              <Handle 
                type="source" 
                style={{ 
                  ...DEFAULT_HANDLE_STYLE, 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  background: '#9ca3af' 
                }}  
                position={Position.Right}  
                id="category"  
                isConnectable={true}  
              />
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm text-center text-gray-600">Category</span>
              </div>          
            </div>

            {/* Inventory Section */}
            <div className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200 p-2 rounded-md border border-gray-200 cursor-pointer relative">
              <Handle 
                type="source" 
                style={{ 
                  ...DEFAULT_HANDLE_STYLE, 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  background: '#9ca3af' 
                }} 
                position={Position.Right}  
                id="inventory"  
                isConnectable={true}
              />
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm text-center text-gray-600">Inventory</span>
              </div>          
            </div>

            {/* Customers Section */}
            <div className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200 p-2 rounded-md border border-gray-200 cursor-pointer relative">
              <Handle 
                type="source" 
                style={{ 
                  ...DEFAULT_HANDLE_STYLE, 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  background: '#9ca3af' 
                }} 
                position={Position.Right}  
                id="customers"  
                isConnectable={true}
              />
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm text-center text-gray-600">Customers</span>
              </div>          
            </div>
        </div>

        {/* Sync Button */}
        <div className="flex w-full space-x-2">
          <Button 
            className="flex-1 bg-[#FF3367] hover:bg-[#FF3367]/90 text-white"
            onClick={() => {}}
          >
            <span>Sync</span>
          </Button>
        </div>
      </Card>
    </>
  );
}