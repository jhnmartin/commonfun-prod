<script lang="ts" setup></script>

<template>
  <div class="flex gap-2">
    <UButton v-if="!user" to="/login" label="Login" />
    <UButton v-else to="/dashboard" label="Dashboard" />
    <UButton v-if="user" to="/logout" label="Logout" />
    <UButton v-if="!user" to="/signup" label="Signup" />
  </div>
</template>

<style></style>
