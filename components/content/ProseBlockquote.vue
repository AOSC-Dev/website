<script setup lang="ts">
defineProps({
  borderColorClass: { type: String, default: 'border-(--secondary)' }
});
</script>

<template>
  <blockquote class="border-l-4" :class="borderColorClass">
    <slot />
  </blockquote>
</template>
