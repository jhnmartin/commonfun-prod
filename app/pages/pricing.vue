<script setup lang="ts">
const user = useSupabaseUser();
const { createCheckoutSession } = useStripe();
const toast = useToast();

// Stripe price IDs - you'll need to create these in your Stripe dashboard
const plans = ref([
  {
    title: "Start",
    description: "Get started",
    price: "Free",
    features: ["One Organization", "Unlimited Events"],
    button: {
      label: "Get Started",
      action: "signup",
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
      action: "subscribe",
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
      action: "subscribe",
    },
  },
]);

const handleButtonClick = async (plan: {
  button: { action: string };
  priceId?: string;
  title: string;
}) => {
  if (plan.button.action === "subscribe") {
    if (!user.value) {
      // Redirect to login if not authenticated
      toast.add({
        title: "Authentication Required",
        description: "Please log in to subscribe to a plan",
        color: "blue",
      });
      await navigateTo("/login");
      return;
    }

    // Create Stripe checkout session
    if (plan.priceId) {
      await createCheckoutSession(plan.priceId, plan.title);
    } else {
      toast.add({
        title: "Error",
        description: "Price ID not configured for this plan",
        color: "red",
      });
    }
  } else if (plan.button.action === "signup") {
    if (!user.value) {
      await navigateTo("/signup");
    } else {
      await navigateTo("/dashboard");
    }
  }
};

// Check for success/cancel messages from Stripe
const route = useRoute();
onMounted(() => {
  if (route.query.success === "true") {
    toast.add({
      title: "Welcome to Commonfun!",
      description: "Your subscription has been activated successfully.",
      color: "green",
    });
  } else if (route.query.canceled === "true") {
    toast.add({
      title: "Subscription Canceled",
      description:
        "Your subscription was not completed. You can try again anytime.",
      color: "yellow",
    });
  }
});
</script>

<template>
  <UPageSection
    title="Join Commonfun for free today!"
    description="Flexible subscriptions for individuals and teams. Use Commonfun to start, grow and scale your brand."
  >
    <div class="space-y-8">
      <!-- Authentication Notice -->
      <div
        v-if="!user"
        class="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
      >
        <div class="flex items-center gap-3">
          <UIcon
            name="i-lucide-info"
            class="text-blue-600 dark:text-blue-400"
          />
          <div>
            <p class="text-sm font-medium text-blue-900 dark:text-blue-100">
              Sign up or log in to subscribe
            </p>
            <p class="text-sm text-blue-700 dark:text-blue-300">
              You need an account to access paid features and manage your
              subscription.
            </p>
          </div>
        </div>
      </div>

      <!-- Pricing Plans -->
      <UPricingPlans :plans="plans" @button-click="handleButtonClick" />
    </div>
  </UPageSection>
</template>
