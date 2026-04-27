import { queryCollection } from '@nuxt/content/server';
import { Feed } from 'feed';
import { i18nCodeToContent } from '~/i18n/config';
import type { NuxtI18nCode } from '~/i18n/config';

const SITE_URL = 'https://aosc.io';
const RSS_FEED_LIMIT = 50;
const RSS_ALLOWED_CATEGORIES = [
  'advisories',
  'news',
  'journals',
  'minutes',
  'all'
] as const;

// 启用新 locale 时：在此键下添加对应 locale 的翻译
const RSS_CATEGORY_META: Record<
  string,
  Record<string, { title: string; description: string }>
> = {
  'zh-cn': {
    advisories: {
      title: '安同社区 - 用户公告',
      description: 'AOSC 社区门户用户公告 RSS 订阅源'
    },
    news: {
      title: '安同社区 - 社区新闻',
      description: 'AOSC 社区门户新闻 RSS 订阅源'
    },
    journals: {
      title: '安同社区 - 安记冰室',
      description: 'AOSC 社区门户安记冰室 RSS 订阅源'
    },
    minutes: {
      title: '安同社区 - 贡献者例会纪要',
      description: 'AOSC 社区门户贡献者例会纪要 RSS 订阅源'
    },
    all: {
      title: '安同社区 - 资讯订阅',
      description: 'AOSC 社区门户 RSS 订阅源'
    }
  }
};

// 当前仅支持默认 locale；启用多 locale 时需创建带前缀的路由
const RSS_LOCALE = 'zh-cn' as NuxtI18nCode;

const SELF_CLOSING = new Set([
  'br',
  'hr',
  'img',
  'input',
  'source',
  'track',
  'wbr'
]);

const SKIP_TAGS = new Set(['style', 'script']);

const INLINE_CONTEXT = new Set([
  'p',
  'li',
  'td',
  'th',
  'span',
  'a',
  'strong',
  'em',
  'del',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6'
]);

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderProps(props: Record<string, unknown>): string {
  return Object.entries(props)
    .filter(
      ([k, v]) =>
        v !== undefined &&
        v !== null &&
        v !== '' &&
        k !== '__ignoreMap' &&
        k !== 'meta' &&
        k !== 'code' &&
        k !== 'language'
    )
    .map(([k, v]) => {
      if (k === 'className') {
        const cls = Array.isArray(v) ? v.join(' ') : String(v);
        return ` class="${escapeXml(cls)}"`;
      }
      if (k === 'rel') {
        const rel = Array.isArray(v) ? v.join(' ') : String(v);
        return ` rel="${escapeXml(rel)}"`;
      }
      return ` ${k}="${escapeXml(String(v))}"`;
    })
    .join('');
}

type MinimarkNode =
  | string
  | [string, Record<string, unknown>, ...MinimarkNode[]];

type MinimarkBody = {
  type: string;
  value: MinimarkNode[];
};

function renderNode(child: MinimarkNode, parentTag?: string): string {
  if (typeof child === 'string') {
    const escaped = escapeXml(child);
    if (parentTag && !INLINE_CONTEXT.has(parentTag) && parentTag !== 'pre') {
      return escaped.replace(/\n/g, ' ');
    }
    return escaped;
  }

  const [tag, props, ...children] = child;

  if (SKIP_TAGS.has(tag)) {
    return '';
  }

  const attrStr = renderProps(props);

  if (SELF_CLOSING.has(tag)) {
    return `<${tag}${attrStr}>`;
  }

  if (tag === 'pre') {
    const codeProp = props.code as string | undefined;
    const lang = props.language as string | undefined;
    const langAttr = lang ? ` class="language-${escapeXml(lang)}"` : '';

    if (codeProp) {
      return `<pre${attrStr}><code${langAttr}>${escapeXml(codeProp)}</code></pre>`;
    }

    const codeChild = children.find((c) => Array.isArray(c) && c[0] === 'code');
    const inner = codeChild
      ? (codeChild as MinimarkNode[])
          .slice(2)
          .map((c) => renderNode(c, 'pre'))
          .join('')
      : children.map((c) => renderNode(c, 'pre')).join('');
    return `<pre${attrStr}><code${langAttr}>${inner}</code></pre>`;
  }

  const inner = children.map((c) => renderNode(c, tag)).join('');
  return `<${tag}${attrStr}>${inner}</${tag}>`;
}

function minimarkToHtml(body: MinimarkBody | null | undefined): string {
  if (!body?.value) return '';
  const children = body.value;
  let html = children.map((c) => renderNode(c)).join('');

  html = html.replace(/ src="\/assets\//g, ` src="${SITE_URL}/assets/`);
  html = html.replace(/ href="\/(?!\/)/g, ` href="${SITE_URL}/`);

  return html;
}

export default defineEventHandler(async (event) => {
  const match = event.path.match(/\/news\/feed\/([^.]+)\.xml$/);
  const category = match?.[1] ?? null;

  if (
    !category ||
    !RSS_ALLOWED_CATEGORIES.includes(
      category as (typeof RSS_ALLOWED_CATEGORIES)[number]
    )
  ) {
    throw createError({ statusCode: 404, statusMessage: 'Feed not found' });
  }

  const meta = RSS_CATEGORY_META[RSS_LOCALE]?.[category];
  if (!meta) {
    throw createError({ statusCode: 404, statusMessage: 'Feed not found' });
  }

  const collection = i18nCodeToContent(RSS_LOCALE);
  if (!collection) {
    throw createError({ statusCode: 404, statusMessage: 'Feed not found' });
  }

  const feed = new Feed({
    id: `${SITE_URL}${category === 'all' ? '/news' : '/news/list/' + category}`,
    title: meta.title,
    link: `${SITE_URL}${category === 'all' ? '/news' : '/news/list/' + category}`,
    description: meta.description,
    language: RSS_LOCALE,
    copyright: `© AOSC ${new Date().getFullYear()}`
  });

  let q = queryCollection(event, collection)
    .where('path', 'LIKE', '/news%')
    .order('date', 'DESC')
    .limit(RSS_FEED_LIMIT);

  if (category !== 'all') {
    q = q.where('categories', 'LIKE', `%"${category}"%`);
  }

  const articles = await q.all();

  for (const article of articles) {
    const htmlContent = minimarkToHtml(
      article.body as MinimarkBody | null | undefined
    );

    feed.addItem({
      title: article.title as string,
      id: `${SITE_URL}${article.path}`,
      link: `${SITE_URL}${article.path}`,
      date: new Date(article.date as string),
      description: htmlContent || (article.title as string),
      content: htmlContent || (article.title as string)
    });
  }

  setHeader(event, 'Content-Type', 'application/rss+xml');
  setHeader(event, 'Cache-Control', 'max-age=21600');

  return feed.rss2();
});
