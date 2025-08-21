# Stripe Integration Setup Guide

## Overview

This guide explains how to set up Stripe subscriptions for your Commonfun application.

## Prerequisites

- Stripe account (https://stripe.com)
- Supabase project with authentication enabled
- Environment variables configured

## Environment Variables

Add these to your `.env` file:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_... # Your Stripe secret key
STRIPE_PUBLIC_KEY=pk_test_... # Your Stripe publishable key
STRIPE_WEBHOOK_SECRET=whsec_... # Your Stripe webhook secret
```

## Stripe Dashboard Setup

### 1. Create Products and Prices

1. Go to your Stripe Dashboard → Products
2. Create a product for each subscription tier:

   - **Start** (Free tier - no price needed)
   - **Grow** ($10/month)
   - **Scale** ($20/month)

3. For each paid tier, create a recurring price:
   - Billing model: Standard pricing
   - Price: $10.00 or $20.00
   - Billing period: Monthly
   - Copy the Price ID (starts with `price_`)

### 2. Update Pricing Page

Replace the placeholder price IDs in `app/pages/pricing.vue`:

```typescript
{
  title: 'Grow',
  priceId: 'price_YOUR_ACTUAL_PRICE_ID_HERE', // Replace this
  // ... other properties
}
```

### 3. Configure Webhooks

#### For Production:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe-webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the webhook secret to your `.env` file

#### For Local Development:

**Option A: Stripe CLI (Recommended)**

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to your Stripe account
stripe login

# Forward webhooks to localhost
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

**Option B: ngrok**

```bash
# Install ngrok
brew install ngrok

# Expose localhost
ngrok http 3000

# Use the ngrok URL in Stripe dashboard:
# https://abc123.ngrok.io/api/stripe-webhook
```

**Note:** For local testing, use the webhook endpoint provided by Stripe CLI or ngrok in your Stripe dashboard. The webhook secret will be different for local vs production.

## User Flow

### 1. Authentication Required

- Users must be logged in to subscribe
- Unauthenticated users are redirected to login/signup
- After authentication, they're redirected back to pricing

### 2. Subscription Process

1. User clicks "Subscribe Now" on a paid plan
2. System checks authentication
3. Creates Stripe checkout session
4. Redirects to Stripe checkout
5. After payment, user is redirected to dashboard
6. Webhook processes the successful subscription

### 3. Subscription Management

- Users can view their subscription at `/dashboard/billing`
- Cancel/reactivate subscriptions (TODO: implement)
- View billing history (TODO: implement)

## Database Integration

### Current Implementation

The current setup includes:

- Stripe checkout session creation
- Webhook handling for subscription events
- Basic subscription status tracking

### Next Steps

To complete the integration, you'll need to:

1. **Create subscription table in Supabase:**

```sql
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  plan_name TEXT,
  status TEXT,
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

2. **Update webhook handler** to save subscription data to database
3. **Implement subscription status checks** in the composable
4. **Add subscription management** (cancel, reactivate, etc.)

## Testing

### Test Mode

- Use Stripe test keys for development
- Test with test card numbers (e.g., 4242 4242 4242 4242)
- Test webhook delivery using Stripe CLI

### Stripe CLI (Recommended)

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to your account
stripe login

# Forward webhooks to local development
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

## Security Considerations

1. **Never expose secret keys** in client-side code
2. **Verify webhook signatures** (implemented)
3. **Validate user authentication** before creating checkout sessions
4. **Use environment variables** for sensitive configuration
5. **Implement proper error handling** and logging

## Troubleshooting

### Common Issues

1. **Webhook not receiving events**: Check endpoint URL and webhook secret
2. **Checkout session creation fails**: Verify Stripe keys and price IDs
3. **Authentication errors**: Ensure Supabase is properly configured
4. **CORS issues**: Check if webhook endpoint is accessible

### Debug Steps

1. Check browser console for client-side errors
2. Check server logs for API errors
3. Verify Stripe dashboard for webhook delivery status
4. Test Stripe connection using `/api/test-stripe` endpoint

## Support

- Stripe Documentation: https://stripe.com/docs
- Supabase Documentation: https://supabase.com/docs
- Nuxt Documentation: https://nuxt.com/docs
