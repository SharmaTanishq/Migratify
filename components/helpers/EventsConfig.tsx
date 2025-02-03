import { Checkbox } from "@/components/ui/checkbox";
import { PlatformType } from '@/components/Types/Flows';
import { motion } from "framer-motion";
interface EventsConfigProps {
  platform: PlatformType;
  selectedEvents: string[];
  source?: string;
  onEventsChange: (events: string[]) => void;
}

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
      {events.map((category, categoryIndex) => (
        <div key={category.category} className="mb-6">         
          {category.events.map((event, eventIndex) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: eventIndex * 0.1 }}
              key={event.id}
              className="flex items-center justify-between space-x-2 space-y-2 w-full"
            >
              <label htmlFor={event.id} className="text-[10px] text-gray-600">
                {event.label}
              </label>
              <Checkbox
                id={event.id}
                checked={selectedEvents.includes(event.id)}
                className="w-3 h-3 data-[state=checked]:bg-green-500 data-[state=checked]:border-none"
                onCheckedChange={() => {
                  onEventsChange(
                    selectedEvents.includes(event.id)
                      ? selectedEvents.filter(e => e !== event.id)
                      : [...selectedEvents, event.id]
                  );
                }}
              />
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}