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

    // Get the request body
    const body = await readBody(event);
    const { priceId, planName, userId } = body;

    if (!priceId || !planName || !userId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: priceId, planName, userId",
      });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${
        getRequestURL(event).origin
      }/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getRequestURL(event).origin}/pricing?canceled=true`,
      metadata: {
        userId,
        planName,
      },
      customer_email: body.email, // Optional: pre-fill customer email
    });

    return {
      success: true,
      sessionId: session.id,
      url: session.url,
    };
  } catch (error) {
    console.error("Stripe checkout error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create checkout session",
      data: error,
    });
  }
});
