<script setup lang='ts'>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useSeoMeta({
  title: 'Billing & Subscription',
  description: 'Manage your Commonfun subscription and billing',
})

const user = useSupabaseUser()
const { isSubscribed } = useStripe()
const toast = useToast()

// Mock subscription data - replace with actual data from your database
const subscription = ref({
  status: 'active',
  plan: 'Grow',
  nextBilling: '2024-02-15',
  amount: '$10.00',
  cancelAtPeriodEnd: false,
})

const cancelSubscription = async () => {
  try {
    // TODO: Implement subscription cancellation logic
    toast.add({
      title: 'Subscription Canceled',
      description: 'Your subscription will end at the current billing period.',
      color: 'yellow',
    })
  } catch {
    toast.add({
      title: 'Error',
      description: 'Failed to cancel subscription. Please try again.',
      color: 'red',
    })
  }
}

const reactivateSubscription = async () => {
  try {
    // TODO: Implement subscription reactivation logic
    toast.add({
      title: 'Subscription Reactivated',
      description: 'Your subscription has been reactivated successfully.',
      color: 'green',
    })
  } catch {
    toast.add({
      title: 'Error',
      description: 'Failed to reactivate subscription. Please try again.',
      color: 'red',
    })
  }
}
</script>

<template>
  <div class="space-y-6">
    <UPageHeader
      title="Billing & Subscription"
      description="Manage your subscription and billing information"
    />

    <!-- Current Subscription -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">
            Current Subscription
          </h3>
          <UBadge
            :color="subscription.status === 'active' ? 'green' : 'red'"
            variant="soft"
          >
            {{ subscription.status === 'active' ? 'Active' : 'Inactive' }}
          </UBadge>
        </div>
      </template>

      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Plan</p>
            <p class="font-medium">{{ subscription.plan }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Amount</p>
            <p class="font-medium">{{ subscription.amount }}/month</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Next Billing</p>
            <p class="font-medium">{{ subscription.nextBilling }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Status</p>
            <p class="font-medium">{{ subscription.cancelAtPeriodEnd ? 'Canceling' : 'Renewing' }}</p>
          </div>
        </div>

        <div class="flex gap-3 pt-4">
          <UButton
            v-if="subscription.status === 'active' && !subscription.cancelAtPeriodEnd"
            color="red"
            variant="outline"
            @click="cancelSubscription"
          >
            Cancel Subscription
          </UButton>
          <UButton
            v-if="subscription.cancelAtPeriodEnd"
            color="green"
            variant="outline"
            @click="reactivateSubscription"
          >
            Reactivate Subscription
          </UButton>
        </div>
      </div>
    </UCard>

    <!-- Billing History -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">
          Billing History
        </h3>
      </template>

      <div class="text-center py-8 text-gray-500">
        <UIcon name="i-lucide-receipt" class="mx-auto h-12 w-12 mb-4" />
        <p>No billing history available</p>
        <p class="text-sm">Your billing history will appear here once you have active subscriptions.</p>
      </div>
    </UCard>

    <!-- Payment Methods -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">
          Payment Methods
        </h3>
      </template>

      <div class="text-center py-8 text-gray-500">
        <UIcon name="i-lucide-credit-card" class="mx-auto h-12 w-12 mb-4" />
        <p>No payment methods saved</p>
        <p class="text-sm">Payment methods are managed securely through Stripe.</p>
      </div>
    </UCard>
  </div>
</template>
