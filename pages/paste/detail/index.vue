<script setup>
const config = useRuntimeConfig();
const route = useRoute();
const imgSuffixList = ['jpg', 'jpeg', 'png', 'gif'];
const { t, locale } = useI18n();

useHead({ title: t('paste.detail.pageTitle') });
// FIXME: `useRobotsRule({ noindex: true, nofollow: true })` generates
// `<meta name="robots" content="[object Object]">` currently
useRobotsRule('noindex, nofollow');

const isImg = (name) => {
  const suffixIndex = name.lastIndexOf('.');
  const suffix = name.substring(suffixIndex + 1);
  return imgSuffixList.find((v) => v === suffix) !== undefined;
};

const { data, status, error } = await useAsyncData(
  route.fullPath,
  () =>
    Promise.all([
      $fetch(`${config.public.pasteApi}/${route.query.id}`),
      $fetch(`${config.public.pasteApi}/${route.query.id}/content`)
    ]),
  { server: false }
);

const details = computed(() => data.value?.[0].msg);
const failReason = computed(() => {
  const code = error.value?.statusCode;
  switch (code) {
    case 404:
      return t('paste.detail.promptNotFoundError');
    case 500:
      return t('paste.detail.prompt500Error');
    default:
      return data.value?.[0].msg ?? t('paste.detail.promptError', { code });
  }
});

const returnHref = () => window.location.href;
</script>

<template>
  <ShowLoading
    :is-ready="status === 'success' || status === 'error'"
    class="w-[100%]">
    <div v-if="status === 'success' && data?.[0]?.code === 0">
      <category-second :title="t('paste.detail.pageTitle')" />
      <div class="flex flex-col p-[2em]">
        <div class="flex flex-col">
          <div class="flex justify-between">
            <div>
              <div ref="div1">
                {{ t('paste.detail.pasteTitle') + details.title }}
              </div>
              <div ref="div2">
                {{
                  t('paste.detail.pasteExpiration') +
                  new Date(details.expiration * 1000)
                    .toISOString()
                    .split('T')[0]
                }}
              </div>
            </div>
            <div>
              <button
                class="theme-bg-color-primary-static cursor-pointer px-[3em] py-[1em] text-white"
                @click="
                  copyToClipboard(
                    locale,
                    `${config.public.pasteApi}/${route.query.id}/content`,
                    t('paste.detail.pasteShareRawLink')
                  )
                ">
                {{ t('paste.detail.buttonCopyRawLink') }}
              </button>
              <button
                class="theme-bg-color-primary-static cursor-pointer px-[3em] py-[1em] text-white ml-2"
                @click="
                  copyToClipboard(
                    locale,
                    returnHref(),
                    t('paste.detail.pasteShareLink')
                  )
                ">
                {{ t('paste.detail.buttonCopyLink') }}
              </button>
            </div>
          </div>
          <ul class="el-upload-list el-upload-list--text">
            <li
              v-for="url in details.attachments"
              :key="url"
              class="el-upload-list__item is-ready">
              <div class="flex items-center">
                <el-icon class="mr-2">
                  <ElIconDocument />
                </el-icon>
                <span>
                  <img v-if="isImg(url)" :src="url" class="w-full" />
                  <AppLink v-else :to="url" target="_blank">
                    {{ url }}
                  </AppLink>
                </span>
              </div>
            </li>
          </ul>
        </div>
        <LazyMonacoEditor
          v-model="data[1]"
          :options="{ readOnly: true }"
          hydrate-on-visible
          class="theme-border-primary h-[50vh] rounded-none border-2"
          :lang="details.language" />
        <button
          class="theme-bg-color-primary-static mt-[10px] ml-auto cursor-pointer px-[3em] py-[1em] text-white"
          @click="
            copyToClipboard(locale, data[1], t('paste.detail.pasteFullContent'))
          ">
          {{ t('paste.detail.buttonCopyFullContent') }}
        </button>
      </div>
    </div>
    <el-result v-else icon="warning" :title="failReason" />
  </ShowLoading>
</template>

<style scoped></style>
