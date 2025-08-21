import Stripe from "stripe";

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();

    if (!config.stripe.secretKey) {
      throw createError({
        statusCode: 500,
        statusMessage: "Stripe secret key not configured",
      });
    }

    const stripe = new Stripe(config.stripe.secretKey, {
      apiVersion: "2024-12-18.acacia",
    });

    // Test Stripe connection by getting account info
    const account = await stripe.accounts.retrieve();

    return {
      success: true,
      message: "Stripe connection successful",
      account: {
        id: account.id,
        business_type: account.business_type,
        country: account.country,
        created: account.created,
      },
    };
  } catch (error) {
    console.error("Stripe test error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Stripe test failed",
      data: error,
    });
  }
});

