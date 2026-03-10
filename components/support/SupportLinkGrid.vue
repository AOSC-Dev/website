<script lang="ts" setup>
defineProps<{ items: Array<{ path: string; title: string }> | null }>();
</script>

<template>
  <div v-if="items" class="grid gap-y-1 gap-x-4 grid-flow-col grid-cols-2 grid-rows-4">
    <AppLink
      v-for="item in items"
      :key="item.path"
      :to="item.path"
      class="block truncate text-nowrap text-black">
      {{ item.title }}
    </AppLink>
  </div>
</template>
