import { Checkbox } from "@/components/ui/checkbox";
import { PlatformType } from '@/components/Types/Flows';
import { motion } from "framer-motion";
interface EventsConfigProps {
  platform: PlatformType;
  selectedEvents: string[];
  source?: string;
  onEventsChange: (events: string[]) => void;
}

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { useForm } from "react-hook-form";

const PLATFORM_EVENTS = {
  vtex: [
    { category: 'Product', events: [
      { id: 'product.created', label: 'Product Created' },
      { id: 'product.updated', label: 'Product Updated' }
    ]},
    { category: 'Orders', events: [
      { id: 'order.created', label: 'Order Created' },
      { id: 'order.updated', label: 'Order Updated' },
      { id: 'order.cancelled', label: 'Order Cancelled' },
      { id: 'order.shipped', label: 'Order Shipped' },
      { id: 'order.delivered', label: 'Order Delivered' },
      { id: 'order.payment_approved', label: 'Payment Approved' },
      { id: 'order.payment_denied', label: 'Payment Denied' },
    ]},
    { category: 'Inventory', events: [
      { id: 'inventory.updated', label: 'Inventory Updated' }
    ]},
  ],
  shopify: [
    // Shopify events
  ],
  woocommerce: [
    // WooCommerce events
  ],
};

export function EventsConfig({ platform, selectedEvents, onEventsChange,source }: EventsConfigProps) {
  const form = useForm()

  
  // Filter events based on platform and source
  const getFilteredEvents = () => {
    const platformEvents = PLATFORM_EVENTS[platform] || [];
    
    if (!source) return platformEvents;

    // Convert source to lowercase and remove any trailing/leading spaces
    const normalizedSource = source?.toLowerCase().trim();
    
    return platformEvents.filter(category => 
      category.category.toLowerCase() === normalizedSource
    );
  }
  const events = getFilteredEvents()

  return (
    <div className="space-y-2  w-full p-2">
      <Form {...form}>
          <FormField
            control={form.control}
            name="events"
            render={() => (
              <FormItem>
                <FormLabel>Available Events</FormLabel>
                <FormDescription className="text-[12px] text-gray-600">Select the events you want to receive</FormDescription>
            {events.map((category,categoryIndex)=>(
              <div key={category.category}>
                {category.events.map((event,eventIndex)=>(
                  <FormControl>
                  <FormField
                  control={form.control}
                  name={event.label}
                  render={() => (
                    <FormItem className="flex items-center justify-between">
                      <FormLabel className="text-[10px] text-gray-600">{event.label}</FormLabel>
                      <FormControl>
                        <Switch className="data-[state=checked]:bg-green-600" checked={form.getValues(event.label)} onCheckedChange={()=>form.setValue(event.label, !form.getValues(event.label))} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </FormControl>
                ))}
                
                </div>
                  ))}
                  
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
      </Form>
     
    </div>
  );
}