// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui-pro", "@vueuse/nuxt", "@nuxtjs/supabase"],

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      posthogPublicKey:
        process.env.NUXT_PUBLIC_POSTHOG_KEY ||
        "phc_3qrHlRg1xnc90W77VDvJoBm3kvxdPD8x5ucdaUKupAM",
      posthogHost:
        process.env.NUXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      posthogDefaults: "2025-05-24",
    },
  },

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2025-01-15",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },

  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      include: ["/dashboard(/*)?"],
    },
  },
});
