<script setup>
// #region Common

const { t,tm } = useI18n();
const textValue = tm('download.index');
const linkValue = tm('allUniversalLink');
const localLink = linkValue.local;
const route = useRoute();
useHead({ title: t('download.index.title') });
// #endregion

// #region Highlight
const aoscOsRef = useTemplateRef('aoscOsDownload');
const otherRef = useTemplateRef('otherDownload');
const afterglowRef = useTemplateRef('afterglowDownload');
const omaRef = useTemplateRef('omaDownload');

const switchHash = () => {
  switch (route.hash) {
    case '#aosc-os-download':
      highlightElement(aoscOsRef);
      break;
    case '#otherDownload':
      highlightElement(otherRef);
      break;
    case '#afterglow-download':
      highlightElement(afterglowRef);
      break;
    case '#oma-download':
      highlightElement(omaRef);
      break;
  }
};
useHighlightWatch(switchHash);
// #endregion

// #region remote
const recipe = ref({});
const recipeI18n = ref({});
const sources = ref(textValue.downloadSources);

const getAntongDate = () => {
  if (versionArch.value.length === 0) return '...';
  const dateStr = getNewVersionArch('amd64', 'installer').date;
  return `${dateStr.substring(0, 4)}/${parseInt(
    dateStr.substring(4, 6)
  )}/${parseInt(dateStr.substring(6, 8))}`;
};

const antongDate = computed(getAntongDate);
const appleSiliconDate = ref('...');
const omaVersion = ref('...');

/**
 * 比较 ISO 的日期（或版本）
 */
const isoVersionCmp = (v1, v2) => {
  const d1 = v1.date;
  const d2 = v2.date;
  let c;
  const l = d1.length > d2.length ? d2.length : d1.length;
  for (c = 0; c < l; c++) {
    if (d1[c] > d2[c]) {
      return -1;
    }
    if (d1[c] < d2[c]) {
      return 1;
    }
    if (c == l - 1) {
      if (d1.length > d2.length) {
        return -1;
      } else {
        return 1;
      }
    }
  }
  return 0;
};

const initSinglePopoverData = (items, index) => {
  let placement = 'bottom';
  switch (index) {
    case 1:
      placement = 'top';
      break;
    case 2:
      placement = 'bottom';
      break;
  }
  items.forEach((item) => {
    // 确保每个对象有 popoverData 对象
    if (item.popoverData) {
      item.popoverData.placement = placement;
    } else {
      // 如果 popoverData 不存在，创建它并添加指定的 key
      item.popoverData = { placement: placement };
    }
  });
  return items;
};
// #endregion

// #region AOSC OS
const aoscOsNavigationList = [
  {
    title: antongDate,
    notLink: true
  },
  localLink.aoscRelnote,
  useTIndex(localLink.aoscRequirements, 2)
];
const appleSiliconNavigationList = ref([
  {
    title: appleSiliconDate,
    notLink: true
  },
  localLink.aoscAsahiRelnote,
  linkValue.asahiRequirements
]);

const antong1List = ref(
  initSinglePopoverData(
    setNestedKeyValue(
      setNestedKeyValue(
        [
          {
            title: 'amd64'
          },
          {
            title: 'arm64'
          },
          {
            title: 'loongarch64'
          }
        ],
        textValue.helpContent.aoscOsIsaInfoPrimary,
        'popoverData.content'
      ),
      textValue.downloadButtons.aoscOsPrimary,
      'label'
    ),
    1
  )
);
const antong2List = ref(
  initSinglePopoverData(
    setNestedKeyValue(
      setNestedKeyValue(
        [
          {
            title: 'ppc64el'
          },
          {
            title: 'riscv64'
          },
          {
            title: 'loongson3'
          }
        ],
        textValue.helpContent.aoscOsIsaInfoSecondary,
        'popoverData.content'
      ),
      textValue.downloadButtons.aoscOsSecondary,
      'label'
    ),
    2
  )
);
// #endregion

/**
 * 根据架构找出最新的下载信息
 */
const getNewVersionArch = (arch, type) => {
  let list = versionArch.value.filter((v) => v.arch == arch);
  list = list.filter((v) => v.path.includes(type));
  list = list.sort(isoVersionCmp);
  return list[0];
};

// #region Afterglow OS
const afterglowOsNavigationList = ref([
  {
    title: t('download.index.afterglow.stayTuned'),
    notLink: true
  },
  localLink.afterglowRelnote,
  useTIndex(localLink.afterglowRequirements, 2)
]);
const xingxia1List = ref(
  setNestedKeyValue(
    setNestedKeyValue(
      [
        {
          title: 'i486'
        },
        {
          title: 'loongson2f'
        },
        {
          title: 'powerpc'
        }
      ],
      textValue.helpContent.afterglowIsaInfoPrimary,
      'popoverData.content'
    ),
    textValue.downloadButtons.afterglowPrimary,
    'label'
  )
);
const xingxia2List = ref(
  setNestedKeyValue(
    setNestedKeyValue(
      [
        {
          title: 'armv4'
        },
        {
          title: 'armv6hf'
        },
        {
          title: 'armv7hf'
        },
        {
          title: 'decAlpha'
        },
        {
          title: 'ia64'
        },
        {
          title: 'm68k'
        },
        {
          title: 'ppc64'
        },
        {
          title: 'sparc64'
        }
      ],
      textValue.helpContent.afterglowIsaInfoSecondary,
      'popoverData.content'
    ),
    textValue.downloadButtons.afterglowSecondary,
    'label'
  )
);
// #endregion

// #region WSL
const wslDialogState = ref(false);
onMounted(() => {
  // For ms-store-badge. Ref: https://github.com/microsoft/app-store-badge
  const msStoreScript = document.createElement('script');
  msStoreScript.setAttribute(
    'src',
    'https://get.microsoft.com/badge/ms-store-badge.bundled.js'
  );
  document.head.appendChild(msStoreScript);
});
// #endregion

// #region oma
const omaNavigationList = [
  {
    title: omaVersion,
    notLink: true
  },
  useTIndex(localLink.oma, 1),
  useTIndex(linkValue.omaSourceGithub, 2)
  // , {
  //   title: '下载 Debian/Ubuntu 安装包',
  //   url: 'https://github.com/AOSC-Dev/oma/releases/tag/v1.8.2'
  // }
];
const omaInstallScriptDistro = 'curl -sSf https://repo.aosc.io/get-oma.sh | sudo sh';
const omaInstallScriptTermux = 'pkg install oma';
// #endregion

// #region Fetch
// Installer and LiveKit
const { data, error } = await useAsyncData(() => {
  return Promise.all([
    $fetch('https://releases.aosc.io/manifest/livekit.json'),
    $fetch('https://releases.aosc.io/os-arm64/asahi/installer_data.json'),
    $fetch('https://packages.aosc.io/packages/oma?type=json'),
    $fetch('https://releases.aosc.io/manifest/recipe.json'),
    $fetch('https://releases.aosc.io/manifest/recipe-i18n.json')
  ]);
});

// SSG 时得有数据
if (error.value && import.meta.server) throw createError(error);

const versionArch = ref(data.value?.[0] ? data.value?.[0] : []);
const versionArchErr = error.value;
if (versionArch.value.length !== 0) {
  antong1List.value.forEach((v) => {
    v.installer = getNewVersionArch(v.title, 'installer');
    v.livekit = getNewVersionArch(v.title, 'livekit');
  });
  antong2List.value.forEach((v) => {
    v.installer = getNewVersionArch(v.title, 'installer');
    v.livekit = getNewVersionArch(v.title, 'livekit');
  });
  xingxia1List.value.forEach((v) => {
    v.livekit = getNewVersionArch(v.title, 'livekit');
  });
  xingxia2List.value.forEach((v) => {
    v.livekit = getNewVersionArch(v.title, 'livekit');
  });
} else if (versionArchErr) {
  console.warn(t('download.index.downloadErrors.aosc'));
}

// Apple silicon
const siliconRes = ref(data.value?.[1]);
const siliconError = error.value;
if (siliconError) {
  console.warn(t('download.index.downloadErrors.apple'));
} else if (siliconRes.value) {
  const appleSiliconDateRaw =
    siliconRes.value.os_list[0].name.match(/\((.*)\)/)[1];
  appleSiliconDate.value = `${appleSiliconDateRaw.substring(0, 4)}/${parseInt(
    appleSiliconDateRaw.substring(4, 6)
  )}/${parseInt(appleSiliconDateRaw.substring(6, 8))}`;
}

// oma
const omaRes = ref(data.value?.[2]);
const omaResError = error.value;
if (omaResError) {
  console.log(omaResError);
  console.warn(t('download.index.downloadErrors.oma'));
} else if (omaRes.value) {
  omaVersion.value = omaRes.value.pkg.version;
}

const recipeResponse = ref(data.value?.[3]);
const recipeError = error.value;
const recipeI18nResponse = ref(data.value?.[4]);
const recipeI18nError = error.value;
if (recipeError || recipeI18nError) {
  console.warn(t('download.index.downloadErrors.mirrors'));
  console.log(recipeError, recipeI18nError);
} else {
  recipe.value = recipeResponse.value;
  recipeI18n.value = recipeI18nResponse.value;
  sources.value = sources.value.concat(
    recipe.value.mirrors.map((mirror) => ({
      name: recipeI18n.value['zh-CN'][mirror['name-tr']],
      loc: recipeI18n.value['zh-CN'][mirror['loc-tr']],
      url: mirror.url
    }))
  );
}
// #endregion
</script>

<template>
  <div>
    <category-second id="aosc-os-download" :title="t('download.index.operatingSystemsTitle')" />

    <!-- AOSC OS -->
    <div
      ref="aoscOsDownload"
      class="aosc-os-container flex flex-wrap justify-between gap-6 p-[30px]">
      <TitleComponent
        :title="t('download.index.aoscOs.name')"
        :description="t('download.index.aoscOs.description')"
        :navigation-list="aoscOsNavigationList" />
      <div class="flex flex-col justify-end gap-2">
        <DownloadButtonGroup
          :title="t('download.index.portTierInfo.primaryIsa.name')"
          :description="t('download.index.portTierInfo.primaryIsa.description')"
          :button-props="
            antong1List.map((item) => ({
              archName: item.label,
              popoverData: item.popoverData,
              isaInfo: item,
              sources: sources
            }))
          " />
        <DownloadButtonGroup
          :title="t('download.index.portTierInfo.secondaryIsa.name')"
          :description="t('download.index.portTierInfo.secondaryIsa.description')"
          :button-props="
            antong2List.map((item) => ({
              archName: item.label,
              popoverData: item.popoverData,
              isaInfo: item,
              sources: sources
            }))
          " />
      </div>
    </div>
    <!-- WSL, Apple silicon -->
    <div ref="otherDownload" class="flex flex-wrap">
      <div
        class="wsl-container flex flex-col justify-between p-[24px_30px] text-white">
        <div>
          <TitleComponent
            :title="t('download.index.aoscOsWsl.name')"
            :description="t('download.index.aoscOsWsl.description')"
            small-title />
          <span
            class="cursor-pointer text-[11pt] hover:underline"
            @click="wslDialogState = true">
            {{ t('download.index.aoscOsWsl.detail') }}
          </span>
        </div>

        <el-dialog v-model="wslDialogState" width="80%">
          <download-wsl-details
            v-if="Object.keys(recipe).length > 0"
            :recipe-wsl="
              recipe.variants.find((variant) => variant.name === 'WSL')
            "
            :sources="sources" />
        </el-dialog>

        <ms-store-badge
          class="relative h-[65px] w-fit translate-y-[5.5px] [&::part(img)]:absolute [&::part(img)]:bottom-0 [&::part(img)]:h-[48px]"
          productid="9NMDF21NV65Z"
          window-mode="popup"
          theme="dark"
          animation="off" />
      </div>

      <div
        class="apple-silicon-container flex flex-1 flex-col justify-between p-[24px_30px]">
        <TitleComponent
          :title="t('download.index.aoscOsAppleSilicon.name')"
          :description="t('download.index.aoscOsAppleSilicon.description')"
          :navigation-list="appleSiliconNavigationList"
          small-title />
        <div class="self-end">
          <DownloadButton
            :arch-name="t('download.index.aoscOsAppleSilicon.download')"
            :popover-data="
              antong1List.filter((i) => i.title === 'arm64')[0].popoverData
            "
            :isa-info="antong1List.filter((i) => i.title === 'arm64')[0]"
            :sources="sources"
            initial-dialog-tab="apple-silicon-instruction" />
        </div>
      </div>
    </div>

    <!-- Afterglow -->
    <div
      id="afterglow-download"
      ref="afterglowDownload"
      class="afterglow-container flex flex-wrap justify-between gap-6 p-[30px] text-white">
      <TitleComponent
        :title="t('download.index.afterglow.name')"
        :description="t('download.index.afterglow.description')"
        :navigation-list="afterglowOsNavigationList" />
      <div class="flex flex-col justify-end gap-2">
        <DownloadButtonGroup
          :title="t('download.index.portTierInfo.primaryIsa.name')"
          :description="t('download.index.portTierInfo.primaryIsa.description')"
          :button-props="
            xingxia1List.map((item) => ({
              archName: item.label,
              popoverData: item.popoverData,
              isaInfo: item,
              sources: sources,
              disabled: true
            }))
          " />
        <DownloadButtonGroup
          :title="t('download.index.portTierInfo.secondaryIsa.name')"
          :description="t('download.index.portTierInfo.secondaryIsa.description')"
          :button-props="
            xingxia2List.map((item) => ({
              archName: item.label,
              popoverData: item.popoverData,
              isaInfo: item,
              sources: sources,
              disabled: true
            }))
          " />
      </div>
    </div>

    <category-second
      id="oma-download"
      class="highlight"
      :title="t('download.index.utilitiesTitle')" />

    <!-- oma -->
    <div id="oma-download" ref="omaDownload" class="oma-container p-[30px]">
      <TitleComponent
        :title="t('download.index.omaTitle')"
        :description="t('download.index.omaTagLine')"
        :navigation-list="omaNavigationList" />
      <CopyCodeHighlight
        class="mt-4 w-fit bg-black/60 py-2 pr-6"
        language="bash"
        :use-hljs="false"
        code-class="text-white"
        button-class="ml-6 mt-[2px] bg-white"
        :code-text="omaInstallScriptDistro" />
      <p class="mt-[6px] text-[10pt]">
        <span>{{ textValue.omaSystemSupportInfo[0] }}</span>
        <br />
        <span>{{ textValue.omaSystemSupportInfo[1] }}</span>
      </p>
      <CopyCodeHighlight
        class="mt-4 w-fit bg-black/60 py-2 pr-6"
        language="bash"
        :use-hljs="false"
        code-class="text-white"
        button-class="ml-6 mt-[2px] bg-white"
        :code-text="omaInstallScriptTermux" />
      <p class="mt-[6px] text-[10pt]">
        <span>{{ textValue.omaSystemSupportInfo[2] }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* For dialogs in this page */
:deep(.el-dialog) {
  max-width: 800px;
}

/* These background styles are too complicated for inline tailwindcss */
.aosc-os-container {
  background-image: url(/public/backgrounds/aosc-os.webp);
  background-position: 0 -40px;
  background-size: 2000px;
}

.wsl-container {
  background-image: url(/public/backgrounds/aosc-os-wsl.webp);
  background-size: 100%;
}

.apple-silicon-container {
  background-image: url(/public/backgrounds/aosc-os-asahi.jpg);
  background-position: 0 -40px;
  background-size: 800px;
}

.afterglow-container {
  background-image: url(/public/backgrounds/afterglow.webp);
  background-size: 1100px;
}

.oma-container {
  background:
    url(/public/download/oma-mascot.svg) right 40px bottom -4px / 160px auto
      no-repeat,
    url(/public/download/oma.svg) left/ auto 250%,
    rgb(218 206 187 / 100%);
}
</style>
