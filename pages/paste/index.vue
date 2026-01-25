<script setup>
const config = useRuntimeConfig();
const { t, tm } = useI18n();
const textValue = tm('paste.index');
// const linkValue = tm('allUniversalLink');
useHead({ title: t('paste.index.pageTitle') });

const languageList = ref(['plaintext']);

onMounted(() => {
  languageList.value = useMonaco()
    .languages.getLanguages()
    .map((lang) => lang.id)
    .filter((lang) => !lang.startsWith('freemarker2.'));
});

const router = useRouter();
const localePath = useLocalePath()

const getFutureDate = (days) =>
  new Date(new Date().setDate(new Date().getDate() + days))
    .toISOString()
    .split('T')[0];

const pasteFormData = ref({
  title: '',
  content: '',
  language: 'plaintext',
  // 如果不选择日期，默认保留一周
  expDate: import.meta.client ? getFutureDate(7) : ''
});
const getFormDataSize = () =>
  Object.values(pasteFormData.value).reduce(
    (size, value) =>
      size + (typeof value === 'string' ? value.length : value.size),
    0
  );

const getToailFileSize = () =>
  selectedFileList.value.reduce((size, value) => size + value.size, 0);

const pasteRes = ref(null);
const submiting = ref(false);
const submit = async () => {
  if (pasteFormData.value.content == '') {
    ElMessage.error(t('paste.index.promptContentEmpty'));
    return;
  }
  const formdataSize = getFormDataSize();
  const toailFileSize = getToailFileSize();
  if (getFormDataSize() + getToailFileSize() > 10485760) {
    ElMessage.error({
      showClose: true,
      duration: 10000,
      message: `${textValue.promptContentTooLarge[0]}${formdataSize}B (${BToMB(formdataSize)}MiB)${textValue.promptContentTooLarge[1]}${toailFileSize}B (${BToMB(toailFileSize)}MiB)`
    });
  }
  submiting.value = true;
  const formdata = new FormData();

  formdata.append('title', pasteFormData.value.title);
  formdata.append('content', pasteFormData.value.content);
  formdata.append('language', pasteFormData.value.language);
  selectedFileList.value.forEach((file) => {
    formdata.append('file', toRaw(file.raw), file.name);
  });
  formdata.append('expiration', Date.parse(pasteFormData.value.expDate) / 1000);
  const { data, error } = await useFetch(config.public.pasteApi, {
    method: 'post',
    timeout: 36000 + Math.ceil((formdataSize + toailFileSize) / 1048576) * 6000,
    body: formdata
  });
  if (data.value) {
    const results = data.value;
    if (results.code == 0) {
      pasteRes.value = results.msg.id;
      router.push({
        path: localePath('/paste/detail'),
        query: {
          id: results.msg.id
        }
      });
    } else {
      alert(results.msg);
    }
  } else if (error.status === 413) {
    ElMessage.error({
      showClose: true,
      duration: 10000,
      message: `${t('paste.index.promptContentServerSizeLimit')}`
    });
  } else {
    ElMessage.error(`${error.value.message}: ${error.value.data.msg}`);
  }
  submiting.value = false;
};

const selectedFileList = ref([]);

const handleChange = (uploadFile, uploadFiles) => {
  const formdataSize = getFormDataSize();
  const toailSize = uploadFiles.reduce((size, file) => size + file.size, 0);
  if (formdataSize + toailSize > 10485760) {
    ElMessage.error({
      showClose: true,
      duration: 10000,
      message: `${textValue.promptContentSizeTooLargeWithAttachment[0]}'${uploadFile.name}'${textValue.promptContentSizeTooLargeWithAttachment[1]}`
    });
    selectedFileList.value.pop();
    // showSize();
  } else
    ElMessage.success(
      `${t('paste.index.promptFileAddSuccess')}'${uploadFile.name}'`
    );
};
</script>

<template>
  <div v-loading="submiting">
    <category-second :title="t('paste.index.pageTitle')" />
    <div class="px-[10%] py-[30px]">
      <div class="mb-[10px] flex justify-between">
        <div class="flex">
          <select
            v-model="pasteFormData.language"
            filterable
            class="theme-border-primary mr-[20px] rounded-none border-2 px-2">
            <option v-for="item in languageList" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
          <ElPopover
            placement="top"
            :content="t('paste.expirationDateTooltip')">
            <template #reference>
              <input
                v-model="pasteFormData.expDate"
                required
                type="date"
                class="theme-border-primary rounded-none border-2"
                :min="getFutureDate(1)" />
            </template>
          </ElPopover>
        </div>
        <button
          class="theme-bg-color-secondary-primary rounded-none px-[50px] py-[10px] text-white"
          @click="submit">
          {{ t('paste.index.buttonSubmit') }}
        </button>
      </div>
      <input
        v-model="pasteFormData.title"
        type="text"
        class="theme-border-primary mb-[10px] w-full rounded-none border-2 py-[10px] px-2 outline-none"
        :placeholder="t('paste.index.placeholderTitle')" />
      <!-- 内容编辑器 -->
      <LazyMonacoEditor
        v-model="pasteFormData.content"
        hydrate-on-visible
        class="theme-border-primary h-[50vh] rounded-none border-2"
        :lang="pasteFormData.language" />
      <!-- 文件选择器 -->
      <el-upload
        v-model:file-list="selectedFileList"
        class="upload-demo my-[10px]"
        :auto-upload="false"
        :on-change="handleChange"
        drag
        multiple>
        <div class="my-[-26px] h-[26px]">
          <el-icon size="24"><el-icon-upload-filled /></el-icon>
          <div ref="div1" class="el-upload__text">
            <span>{{ textValue.promptAttachmentInstruction[0] }}</span>
            <em>{{ textValue.promptAttachmentInstruction[1] }}</em>
          </div>
        </div>
      </el-upload>
    </div>
  </div>
</template>
