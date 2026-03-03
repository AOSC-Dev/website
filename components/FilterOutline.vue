<script lang="ts" setup>
const {
  filterId, // Should be unique in the final HTML
  color = 'white',
  radius = 3
} = defineProps<{ filterId: string; color?: string; radius?: number }>();
</script>

<template>
  <svg
    width="0"
    height="0"
    style="position: absolute; width: 0; height: 0; overflow: hidden">
    <filter :id="filterId">
      <feMorphology
        in="SourceAlpha"
        result="DILATED"
        operator="dilate"
        :radius />
      <feFlood :flood-color="color" flood-opacity="1" result="WHITE" />
      <feComposite in="WHITE" in2="DILATED" operator="in" result="OUTLINE" />
      <feMerge>
        <feMergeNode in="OUTLINE" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </svg>
</template>
