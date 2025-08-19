export default defineEventHandler(async (event) => {
  try {
    const resend = useResend();

    const { data, error } = await resend.emails.send({
      from: "hello@commonfun.com", // Use the default Resend sender
      to: "john@commonfun.com", // Replace with your test email
      subject: "Test Email from Nuxt Resend",
      html: `
          <h1>Hello from Nuxt Resend!</h1>
          <p>This is a test email to verify that the Resend module is working correctly.</p>
          <p>Timestamp: ${new Date().toISOString()}</p>
        `,
    });

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to send email",
        data: error,
      });
    }

    return {
      success: true,
      message: "Email sent successfully!",
      data,
    };
  } catch (error) {
    console.error("Email sending error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
      data: error,
    });
  }
});
