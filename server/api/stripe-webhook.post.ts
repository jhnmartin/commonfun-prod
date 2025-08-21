import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    
    if (!config.stripe.secretKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Stripe secret key not configured',
      });
    }

    const stripe = new Stripe(config.stripe.secretKey, {
      apiVersion: '2024-12-18.acacia',
    });

    // Get the raw body for signature verification
    const body = await readRawBody(event);
    const signature = getHeader(event, 'stripe-signature');

    if (!body || !signature) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing body or signature',
      });
    }

    let stripeEvent: Stripe.Event;

    try {
      // Verify the webhook signature
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
      if (!webhookSecret) {
        throw new Error('STRIPE_WEBHOOK_SECRET not configured');
      }
      
      stripeEvent = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid signature',
      });
    }

    // Handle the event
    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;
        console.log('Checkout completed:', session.id);
        
        // Here you would typically:
        // 1. Update user subscription status in your database
        // 2. Send confirmation email
        // 3. Update user permissions/features
        
        if (session.metadata?.userId && session.metadata?.planName) {
          console.log(`User ${session.metadata.userId} subscribed to ${session.metadata.planName}`);
          // TODO: Update user subscription in database
        }
        break;
      }
        
      case 'customer.subscription.created': {
        const subscription = stripeEvent.data.object as Stripe.Subscription;
        console.log('Subscription created:', subscription.id);
        break;
      }
        
      case 'customer.subscription.updated': {
        const updatedSubscription = stripeEvent.data.object as Stripe.Subscription;
        console.log('Subscription updated:', updatedSubscription.id);
        break;
      }
        
      case 'customer.subscription.deleted': {
        const deletedSubscription = stripeEvent.data.object as Stripe.Subscription;
        console.log('Subscription deleted:', deletedSubscription.id);
        break;
      }
        
      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return { received: true };
  } catch (error) {
    console.error('Webhook error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Webhook processing failed',
      data: error,
    });
  }
});
