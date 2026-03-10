<script lang="ts" setup>
defineProps<{ imgSrc: string }>();
</script>

<template>
  <div class="support-section flex min-h-48 items-center pr-8">
    <img
      :src="imgSrc"
      class="anan-outline mx-[var(--anan-section-mx)] size-[calc(var(--left-anan-width)-2*var(--anan-section-mx))] shrink-0 self-end object-contain" />
    <div class="grow py-4">
      <slot />
    </div>
  </div>
</template>
