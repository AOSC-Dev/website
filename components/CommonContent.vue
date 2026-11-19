<script lang="ts" setup>
import { textContent } from 'minimark'; // Nuxt Content v3 依赖
import { queryCollectionLocale } from '~/utils/content';

const props = defineProps<{ path?: string }>();

const route = useRoute();
const { locale, defaultLocale, t } = useI18n();

const contentPath = computed(() => {
  if (props.path) return props.path;

  // `prefix_except_default` 会移除默认语言的 URL 路径前缀
  // 但是请求时使用的路径对应文件夹路径，都有前缀
  const prefix = `/${locale.value}`;
  return route.path.startsWith(prefix)
    ? route.path.substring(prefix.length) || '/'
    : route.path;
});

const { data: page, error } = await useAsyncData(
  `${locale.value}:CommonContent:${contentPath.value}`,
  async () => {
    let content = await queryCollectionLocale(locale.value)
      .path(contentPath.value)
      .first();

    // 如果当前语言下没有对应文件就试试用默认语言的
    let fallback = false;
    if (!content && locale.value !== defaultLocale) {
      content = await queryCollectionLocale(defaultLocale)
        .path(contentPath.value)
        .first();

      if (content) fallback = true;
    }

    if (!content)
      throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
        data: {
          query: { locale: locale.value, path: contentPath.value },
          fallback: fallback
        }
      });

    // 第一个元素是 h2 的话就拿 h2 的内容作为标题（因为 Nuxt
    // Content 会从路径生成标题所以无法判断元数据里有无标题）
    if (content.body.value?.[0]?.[0] === 'h2') {
      // 有可能有嵌套，所以用一下 minimark 的函数
      // 如果 Nuxt Content 把 minimark 换了这里也要换
      content.title = textContent(content.body.value[0]);
      // 这个 h2，不需要了
      content.body.value.shift();
    }

    if (fallback)
      content.body.value.unshift([
        'info',
        {},
        ['p', {}, t('CommonContent.fallbackHint')]
      ]);

    return content;
  }
);
useHead({ title: page.value?.title });

if (error.value) throw error.value;
</script>

<template>
  <article v-if="page">
    <category-second
      :id="page.title"
      :title="page.title"
      :right-text="page.date?.substring(0, 10)"
      :title-url="`${route.path}#${page.title}`" />
    <ContentRenderer ref="contentRef" :value="page" class="heti" />
  </article>
</template>
