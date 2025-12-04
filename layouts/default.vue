<script setup lang="ts">
const { $mitt } = useNuxtApp();
const mainRef = useTemplateRef('mainBody');
const heightRef = useTemplateRef('dMainBody');

let observer: ResizeObserver | null = null;
onMounted(() => {
  observer = new ResizeObserver(() => {
    $mitt.emit('mainDomChange', mainRef.value?.clientHeight);
  });
  if (heightRef.value) observer.observe(heightRef.value);
});
onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <div>
    <div
      class="mb-[2.5rem] flex min-h-[calc(100vh-2.5rem)] min-w-[960px] flex-col">
      <BarHeader />
      <div class="content-container myShadow mx-auto flex flex-grow">
        <div
          class="sticky top-0 w-[15%] min-w-[12rem] bg-leftbar-bg *:text-nowrap">
          <BarLeft class="sticky top-0 min-w-[100%] *:text-nowrap" />
        </div>
        <!-- min-w-3xl needed here for pre in the content to shrink (allows flex item shrinking) -->
        <!-- if a smaller size is needed, use min-w-0 at least -->
        <div ref="mainBody" class="min-w-3xl flex-1">
          <div ref="dMainBody">
            <slot />
          </div>
        </div>
      </div>
    </div>
    <BarFooter class="fixed bottom-0 h-[2rem] min-w-[960px]" />
  </div>
</template>
