<script lang="ts" setup>
defineProps<{
  title: string;
  linkTo: string;
  linkText: string;
}>();
</script>

<template>
  <div class="mb-2 flex items-center justify-between">
    <div class="text-xl font-medium">{{ title }}</div>
    <AppLink :to="linkTo" class="flex items-center text-black">
      <span>{{ linkText }}</span>
      <img src="/support/var-a.svg" class="ml-[0.3em] inline size-[1em]" />
    </AppLink>
  </div>
</template>
