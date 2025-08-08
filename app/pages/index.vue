<script setup lang="ts">
const links = [
  {
    label: "Find an Event",
    to: "/events",
  },
  {
    label: "Create an Event",
    to: "/login",
  },
];
</script>

<template>
  <div>
    <UPageHero
      title="Online Interests... Offline Events."
      description="A Collision of Social Media and your Social Life."
      orientation="horizontal"
      class="font-display"
      :links="links"
    />
  </div>
</template>
