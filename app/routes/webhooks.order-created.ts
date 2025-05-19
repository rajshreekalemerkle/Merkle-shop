import {json} from '@shopify/remix-oxygen';
import type {ActionFunction} from '@shopify/remix-oxygen';

export const action: ActionFunction = async ({request}) => {
    const order:any = await request.json();
    const brazePayload = {
      events: [
        {
          external_id: order.email || order.customer?.id?.toString(),
          name: 'ecommerce.order_placed',
          time: new Date().toISOString(),
          properties: {
            order_id: order.id,
            total_price: order.total_price,
            currency: order.currency,
            line_items: order.line_items.map((item: any) => ({
              product_id: item.product_id,
              product_title: item.title,
              variant_title: item.variant_title,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      ],
    };
    // ✅ Log to console for local dev (or Vercel logs)
    console.log('Braze Payload:', JSON.stringify(brazePayload, null, 2));
    // 📨 Send to Braze
    const response = await fetch('https://rest.iad-06.braze.com', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Braze-Api-Key': '2b9f57dc-1053-4931-a0b0-2d2893d806be'
      },
      
      body: JSON.stringify(brazePayload),
    });
  
    // ✅ Log response for verification
    const brazeResponse = await response.json();
    console.log('Braze Response:', brazeResponse);
  
    return json({success: true});
  };
  
