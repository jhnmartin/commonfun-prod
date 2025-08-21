<script setup lang="ts">
// Stripe price IDs - you'll need to create these in your Stripe dashboard
const plans = ref([
  {
    title: "Start",
    description: "Get started",
    price: "Free",
    features: ["One Organization", "Unlimited Events"],
    button: {
      label: "Get Started",
    },
  },
  {
    title: "Grow",
    description: "Best suited for small teams.",
    badge: "Most popular",
    price: "$10",
    billingCycle: "/month",
    priceId: "price_1RydONGFjgjricVJRW6LDNYf", // Replace with your actual Stripe price ID
    features: [
      "Everything in Solo",
      "Up to 5 Organizations",
      "AI Event Summaries",
      "Automated Social Media Assets",
      "Email and SMS Campaigns",
      "Commonfun Local Marketing",
    ],
    button: {
      label: "Subscribe Now",
    },
  },
  {
    title: "Scale",
    description: "Ideal for larger teams and organizations.",
    price: "$20",
    billingCycle: "/month",
    priceId: "price_1RydP9GFjgjricVJfhxzydIc", // Replace with your actual Stripe price ID
    features: ["Up to 20 developers", "Everything in Startup"],
    button: {
      label: "Subscribe Now",
    },
  },
]);
</script>

<template>
  <UPageSection
    title="Join Commonfun for free today!"
    description="Flexible subscriptions for individuals and teams. Use Commonfun to start, grow and scale your brand."
  >
    <!-- Pricing Plans -->
    <UPricingPlans :plans="plans" @button-click="handleButtonClick" />
  </UPageSection>
</template>
