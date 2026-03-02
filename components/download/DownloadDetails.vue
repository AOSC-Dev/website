<script setup>
const { t } = useI18n();

const props = defineProps({
  isaInfo: {
    type: [
      {
        title: String,
        label: String,
        popoverData: { content: String, placement: String },
        installer: Object,
        livekit: Object
      }
    ],
    required: true
  },
  sources: {
    type: [{ name: String, loc: String, url: String }],
    required: true
  },
  initialTab: {
    type: String,
    default: 'installer'
  }
});

const dialogTab = ref(props.initialTab);
</script>

<template>
  <el-tabs v-model="dialogTab" class="pb-2 *:px-2">
    <el-tab-pane
      :disabled="!isaInfo.installer"
      :label="t('DownloadDetails.downloadInstallerName')"
      name="installer">
      <DownloadDetailsMain
        :arch="isaInfo.label"
        :content="isaInfo.popoverData.content"
        :path="isaInfo.installer?.path ?? ''"
        :sha256sum="isaInfo.installer?.sha256sum ?? ''"
        :sources="sources" />
    </el-tab-pane>
    <el-tab-pane
      :disabled="!isaInfo.livekit"
      :label="t('DownloadDetails.downloadLivekitName')"
      name="livekit">
      <DownloadDetailsMain
        :arch="isaInfo.label"
        :content="isaInfo.popoverData.content"
        :path="isaInfo.livekit?.path ?? ''"
        :sha256sum="isaInfo.livekit?.sha256sum ?? ''"
        :sources="sources" />
    </el-tab-pane>
    <el-tab-pane
      v-if="isaInfo.title === 'arm64'"
      :label="t('DownloadDetails.downloadAppleSiliconInstruction')"
      name="apple-silicon-instruction">
      <DownloadDetailsAppleSiliconInstruction />
    </el-tab-pane>
    <el-tab-pane
      v-if="isaInfo.title === 'arm64'"
      :label="t('DownloadDetails.downloadDeviceImages')"
      name="apple-silicon-image"
      disabled>
      <!-- TODO -->
    </el-tab-pane>
    <el-tab-pane
      :label="t('DownloadDetails.downloadDockerContainers')"
      name="docker">
      <DownloadDetailsDocker />
    </el-tab-pane>
    <el-tab-pane :label="t('DownloadDetails.downloadVmImages')" name="vm" disabled />
  </el-tabs>
</template>
