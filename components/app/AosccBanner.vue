<script setup lang="ts">
import { farts, Fart } from '~/assets/scripts/fart.js';
import { Close } from '@element-plus/icons-vue';
import { ElButton } from 'element-plus';
import { ref } from 'vue';

let fart: InstanceType<typeof Fart> | null = null;
onMounted(() => (fart = new Fart({})));
const randomFart = () => {
  if (!fart) return;
  fart.play(
    Object.values(farts)[
      Math.floor(Math.random() * (Object.keys(farts).length + 1))
    ],
    undefined
  );
};

const showBanner = ref(true);
const endTime = Date.parse('2026/4/2');
const deltaTime = (timestamp1 = Date.now(), timestamp2 = endTime) => {
  const totalSeconds = Math.max(
    0,
    Math.floor((timestamp2 - timestamp1) / 1000)
  );
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return days
    ? `${days} days ${hours} hours`
    : `${hours} hours ${minutes} minutes`;
};
</script>

<template>
  <div
    v-if="showBanner"
    class="relative flex h-16 items-center justify-center gap-8 bg-[#d9e2e4] text-center">
    <div>CONFERENCE OFFER</div>
    <img src="/public/aosc.svg" class="h-9" />
    <div class="text-[20px] font-bold">AOSCC 2026</div>
    <div class="px-2">
      <b>Get 0% OFF an AOSCC ticket</b>
      <br />
      Meet more AnAn Fumos than you can ever imagine
    </div>
    <el-button
      type="primary"
      size="large"
      round
      class="text-[16px]"
      @click="randomFart">
      Get Offer
    </el-button>
    <div>
      <div class="text-[11px]">ENDS IN</div>
      {{ deltaTime() }}
    </div>
    <el-button
      :icon="Close"
      circle
      class="absolute right-4"
      @click="
        () => {
          randomFart();
          showBanner = false;
        }
      " />
  </div>
</template>
