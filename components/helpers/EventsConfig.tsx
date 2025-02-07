import { PlatformType } from "@/components/Types/Flows";

import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useForm, useWatch } from "react-hook-form";
import webhooksStore from "../Store/webhooks";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface EventsConfigProps {
  platform: PlatformType;
  selectedEvents: string[];
  source?: string;
  onEventsChange: (events: string[]) => void;
  webhookId?: string;
  webhook?: any;
  nodeId: string;
}

const PLATFORM_EVENTS = {
  vtex: [
    {
      category: "Product",
      events: [
        { id: "product.created", label: "Product Created" },
        { id: "product.updated", label: "Product Updated" },
      ],
    },
    {
      category: "Orders",
      events: [
        { id: "order.created", label: "Order Created" },
        { id: "order.updated", label: "Order Updated" },
        { id: "order.cancelled", label: "Order Cancelled" },
        { id: "order.shipped", label: "Order Shipped" },
        { id: "order.delivered", label: "Order Delivered" },
        { id: "order.payment_approved", label: "Payment Approved" },
        { id: "order.payment_denied", label: "Payment Denied" },
      ],
    },
    {
      category: "Inventory",
      events: [{ id: "inventory.updated", label: "Inventory Updated" }],
    },
  ],
  shopify: [
    // Shopify events
  ],
  woocommerce: [
    // WooCommerce events
  ],
};

export function EventsConfig({
  platform,
  selectedEvents,
  onEventsChange,
  source,
  webhook,
  webhookId,
  nodeId,
}: EventsConfigProps) {
  const form = useForm();
  const watch = useWatch({ control: form.control });

  const { setEvents } = webhooksStore();
  const getEvents = webhooksStore((state) => state.getEvents);

  const updateEvents = useMutation(api.webhooks.index.updateWebhookEvents);

  useEffect(() => {
    const defaultEvents = events.flatMap((category) =>
      category.events.map((event) => ({
        event: event.id,
        isActive: false,
      }))
    );

    setEvents(nodeId, defaultEvents);
  }, []);

  useEffect(() => {
    if (webhook?.events) {
      webhook.events.forEach((event: any) => {
        form.setValue(event.event, event.isActive);
      });
    }
  }, [webhook]);

  useEffect(() => {
    if (Object.keys(watch).length > 0 && webhookId) {
      const mappedEvents = Object.entries(watch).map(
        ([parentEvent, childEvent]) =>
          Object.entries(childEvent).map(([event, isActive]) => ({
            event: `${parentEvent}.${event}`,
            isActive: isActive ? true : false,
          }))
      );
      updateEvents({
        webhookId: webhookId as Id<"webhooks">,
        events: mappedEvents.flat(),
      });
    }
  }, [watch]);

  // Filter events based on platform and source
  const getFilteredEvents = () => {
    const platformEvents = PLATFORM_EVENTS[platform] || [];

    if (!source) return platformEvents;

    const normalizedSource = source?.toLowerCase().trim();

    return platformEvents.filter(
      (category) => category.category.toLowerCase() === normalizedSource
    );
  };

  const events = getFilteredEvents();

  return (
    <div className="space-y-2  w-full p-2">
      <Form {...form}>
        <FormDescription className="text-[12px] text-gray-600">
          Select the events you want to receive
        </FormDescription>
        <FormItem>
          {events.map((category) => (
            <div key={category.category}>
              {category.events.map((event) => (
                <FormControl key={event.id}>
                  <FormItem className="flex items-center justify-between p-1">
                    <FormLabel className="text-[10px] text-gray-500 font-normal">
                      {event.id}
                    </FormLabel>
                    <FormControl>
                      <Switch
                        className="data-[state=checked]:bg-green-600"
                        checked={form.getValues(event.id) || false}
                        onCheckedChange={(checked) =>
                          form.setValue(event.id, checked)
                        }
                      />
                    </FormControl>
                  </FormItem>
                </FormControl>
              ))}
            </div>
          ))}

          <FormDescription />
          <FormMessage />
        </FormItem>
      </Form>
    </div>
  );
}
