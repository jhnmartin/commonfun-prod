<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Test Stripe Integration</h1>

    <div class="space-y-4">
      <UButton @click="testStripeConnection" :loading="loading">
        Test Stripe Connection
      </UButton>

      <div v-if="result" class="mt-4 p-4 bg-gray-100 rounded">
        <h3 class="font-semibold mb-2">Result:</h3>
        <pre class="text-sm">{{ JSON.stringify(result, null, 2) }}</pre>
      </div>

      <div v-if="error" class="mt-4 p-4 bg-red-100 rounded text-red-700">
        <h3 class="font-semibold mb-2">Error:</h3>
        <pre class="text-sm">{{ error }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(false);
const result = ref(null);
const error = ref(null);

async function testStripeConnection() {
  loading.value = true;
  error.value = null;
  result.value = null;

  try {
    const response = await $fetch("/api/test-stripe");
    result.value = response;
  } catch (err: any) {
    error.value = err.message || "An error occurred";
  } finally {
    loading.value = false;
  }
}
</script>

