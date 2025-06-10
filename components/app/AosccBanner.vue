<script setup lang="ts">
import { Close } from '@element-plus/icons-vue';
import { ElButton } from 'element-plus';
import { ref } from 'vue';

const showBanner = ref(true);
const endTime = Date.parse('2026/7/6');
function deltaTime(timestamp1 = Date.now(), timestamp2 = endTime) {
  let delta = Math.abs(timestamp2 - timestamp1) / 1000;
  const days = Math.floor(delta / 86400);
  delta -= days * 86400;
  const hours = Math.floor(delta / 3600) % 24;
  return [days, hours];
}
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
    <el-button type="primary" size="large" round class="text-[16px]">
      Get Offer
    </el-button>
    <div>
      <div class="text-[11px]">ENDS IN</div>
      {{ deltaTime()[0] }} Days {{ deltaTime()[1] }} hours
    </div>
    <el-button
      :icon="Close"
      circle
      class="absolute right-4"
      @click="showBanner = false" />
  </div>
</template>
