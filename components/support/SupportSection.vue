<script lang="ts" setup>
defineProps<{
  imgSrc: string;
  imgClass?: string;
}>();
</script>

<template>
  <div class="flex min-h-48 items-center pr-8">
    <img
      :src="imgSrc"
      :class="[
        'mx-[2rem] size-[calc(var(--left-anan-width)-2*2rem)] shrink-0 self-end',
        imgClass
      ]" />
    <div class="grow py-4">
      <slot />
    </div>
  </div>
</template>
