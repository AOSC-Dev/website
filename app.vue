<script setup lang="ts">
import AosccBanner from './components/app/AosccBanner.vue';

useDefaultHead();
</script>

<template>
  <AosccBanner />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
