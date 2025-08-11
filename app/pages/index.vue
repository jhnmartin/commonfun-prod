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
    >
      <img
        src="/images/hero.webp"
        alt="Hero Image"
        class="rounded-lg shadow-2xl ring ring-default"
      />
    </UPageHero>
    <UPageSection
      title="Upcoming Events"
      description="Find Upcoming Events Near You"
    >
      <UPageMarquee class="py-4">
        <UCard>
          <template #header>
            <img
              src="/images/hero.webp"
              alt="Hero Image"
              class="h-96 rounded-lg shadow-2xl ring ring-default p-0"
            />
          </template>
          <h3>Test</h3>
          <template #footer>
            <p>footer</p>
          </template>
        </UCard>

        <img
          src="/images/hero.webp"
          alt="Hero Image"
          class="h-96 rounded-lg shadow-2xl ring ring-default"
        />
        <img
          src="/images/hero.webp"
          alt="Hero Image"
          class="h-96 rounded-lg shadow-2xl ring ring-default"
        />
        <img
          src="/images/hero.webp"
          alt="Hero Image"
          class="h-96 rounded-lg shadow-2xl ring ring-default"
        />
      </UPageMarquee>
    </UPageSection>
  </div>
</template>
