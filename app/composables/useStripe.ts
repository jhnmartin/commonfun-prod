export const useStripe = () => {
  const config = useRuntimeConfig()
  const user = useSupabaseUser()
  const toast = useToast()

  const createCheckoutSession = async (priceId: string, planName: string) => {
    try {
      if (!user.value) {
        toast.add({
          title: 'Authentication Required',
          description: 'Please log in to subscribe to a plan',
          color: 'red'
        })
        return null
      }

      const { data, error } = await $fetch('/api/create-checkout-session', {
        method: 'POST',
        body: {
          priceId,
          planName,
          userId: user.value.id,
          email: user.value.email
        }
      })

      if (error) {
        throw new Error(error)
      }

      if (data?.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url
      }

      return data
    } catch (error) {
      console.error('Error creating checkout session:', error)
      toast.add({
        title: 'Error',
        description: 'Failed to create checkout session. Please try again.',
        color: 'red'
      })
      return null
    }
  }

  const isSubscribed = computed(() => {
    // TODO: Implement subscription check logic
    // This would typically check against your database or Stripe customer data
    return false
  })

  return {
    createCheckoutSession,
    isSubscribed,
    publishableKey: config.public.stripePublishableKey
  }
}
