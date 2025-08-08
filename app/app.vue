<script setup>
import { useGeolocation } from "@vueuse/core";
import { NuxtLayout } from "#components";

useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});

const title = "CommonFun";
const description =
  "A social platform that's actually social. We take the guesswork out of nightlife.";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage:
    "https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3VpLXByby1zdGFydGVyLm51eHQuZGV2IiwiaWF0IjoxNzM5NDYzMzk4fQ.XLzPkSW6nRbPW07QO1RkMwz_RAPA4KfeyrWrK3li9YI.jpg?theme=light",
  twitterImage:
    "https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3VpLXByby1zdGFydGVyLm51eHQuZGV2IiwiaWF0IjoxNzM5NDYzMzk4fQ.XLzPkSW6nRbPW07QO1RkMwz_RAPA4KfeyrWrK3li9YI.jpg?theme=light",
  twitterCard: "summary_large_image",
});

const { coords } = useGeolocation();
const user = useSupabaseUser();
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UMain>
        <NuxtPage />
      </UMain>
      <UseGeolocation>
        {{ coords }}
      </UseGeolocation>
      <pre>Is User: {{ user }}</pre>
      <USeparator />
    </NuxtLayout>
  </UApp>
</template>
