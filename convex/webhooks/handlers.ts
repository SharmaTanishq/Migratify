export interface WebhookConfig {
    platform: string;
    event: string;
    version?: string;
  }
  
  export interface ProcessedWebhookData {
    subject?: string;
    text?: string;
    html?: string;
    data: Record<string, any>;
  }

  export function processVtexWebhook(event: string, data: any): ProcessedWebhookData {
    switch (event) {
      case 'order.created':
        return {
          subject: 'New Order Received',
          text: `Order #${data.order_number} received for ${data.total_price}`,
          html: `<h1>New Order</h1><p>Order #${data.order_number}</p>`,
          data: data
        };
      // Add more event handlers
      default:
        throw new Error(`Unsupported Shopify event: ${event}`);
    }
  }