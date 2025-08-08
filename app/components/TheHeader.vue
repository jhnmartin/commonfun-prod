<template>
  <div>
    <UHeader>
      <template #left>
        <NuxtLink to="/">
          <LogoPro class="w-auto h-6 shrink-0" />
        </NuxtLink>
      </template>

      <UNavigationMenu>
        <UserHeaderButtons />
      </UNavigationMenu>
      <template #right>
        <UColorModeButton />
        <UserHeaderButtons />
      </template>
    </UHeader>
  </div>
</template>
