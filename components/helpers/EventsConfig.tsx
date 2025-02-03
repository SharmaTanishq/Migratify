import { Checkbox } from "@/components/ui/checkbox";
import { PlatformType } from '@/components/Types/Flows';

interface EventsConfigProps {
  platform: PlatformType;
  selectedEvents: string[];
  onEventsChange: (events: string[]) => void;
}

const PLATFORM_EVENTS = {
  vtex: [
    { id: 'product.created', label: 'Product Created' },
    { id: 'product.updated', label: 'Product Updated' },
    { id: 'order.created', label: 'Order Created' },
    { id: 'order.updated', label: 'Order Updated' },
    { id: 'inventory.updated', label: 'Inventory Updated' },
  ],
  shopify: [
    // Shopify events
  ],
  woocommerce: [
    // WooCommerce events
  ],
};

export function EventsConfig({ platform, selectedEvents, onEventsChange }: EventsConfigProps) {
  const events = PLATFORM_EVENTS[platform] || [];

  return (
    <div className="space-y-2">
      {events.map(({ id, label }) => (
        <div key={id} className="flex items-center space-x-2">
          <Checkbox
            id={id}
            checked={selectedEvents.includes(id)}
            onCheckedChange={() => {
              onEventsChange(
                selectedEvents.includes(id)
                  ? selectedEvents.filter(e => e !== id)
                  : [...selectedEvents, id]
              );
            }}
          />
          <label htmlFor={id} className="text-sm">
            {label}
          </label>
        </div>
      ))}
    </div>
  );
}