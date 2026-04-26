import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { Feed } from 'feed';

const SITE_URL = 'https://aosc.io';
const RSS_FEED_LIMIT = 50;
const RSS_ALLOWED_CATEGORIES = [
  'advisories',
  'news',
  'journals',
  'minutes',
  'all'
] as const;

const RSS_CATEGORY_META: Record<
  string,
  { title: string; description: string }
> = {
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
};

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

function renderMinimarkChild(child: MinimarkNode): string {
  if (typeof child === 'string') {
    return escapeXml(child);
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
    const codeChild = children.find((c) => Array.isArray(c) && c[0] === 'code');
    const inner = codeChild
      ? (codeChild as MinimarkNode[]).slice(2).map(renderMinimarkChild).join('')
      : children.map(renderMinimarkChild).join('');
    return `<pre${attrStr}><code>${inner}</code></pre>`;
  }

  const inner = children.map(renderMinimarkChild).join('');
  return `<${tag}${attrStr}>${inner}</${tag}>`;
}

function minimarkToHtml(bodyJson: string): string {
  const ast = JSON.parse(bodyJson);
  const children: MinimarkNode[] = ast.value ?? [];
  let html = children.map(renderMinimarkChild).join('');

  html = html.replace(/ src="\/assets\//g, ` src="${SITE_URL}/assets/`);
  html = html.replace(/ href="\/(?!\/)/g, ` href="${SITE_URL}/`);

  return html;
}

interface Article {
  path: string;
  title: string;
  date: string;
  body: string;
}

function queryArticles(db: Database.Database, category: string): Article[] {
  if (category === 'all') {
    return db
      .prepare(
        `SELECT path, title, date, body
         FROM _content_zhCN
         WHERE path LIKE '/news%'
         ORDER BY date DESC
         LIMIT ?`
      )
      .all(RSS_FEED_LIMIT) as Article[];
  }

  return db
    .prepare(
      `SELECT path, title, date, body
       FROM _content_zhCN
       WHERE path LIKE '/news%'
         AND categories LIKE ?
       ORDER BY date DESC
       LIMIT ?`
    )
    .all(`%"${category}"%`, RSS_FEED_LIMIT) as Article[];
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

  const meta = RSS_CATEGORY_META[category]!;

  const feed = new Feed({
    id: `${SITE_URL}${category === 'all' ? '/news' : '/news/list/' + category}`,
    title: meta.title,
    link: `${SITE_URL}${category === 'all' ? '/news' : '/news/list/' + category}`,
    description: meta.description,
    language: 'zh-cn',
    copyright: `© AOSC ${new Date().getFullYear()}`
  });

  let dbPath = path.resolve('.data/content/contents.sqlite');
  if (!fs.existsSync(dbPath)) {
    dbPath = path.resolve('..', '.data/content/contents.sqlite');
  }
  if (!fs.existsSync(dbPath)) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Content database not found'
    });
  }

  const db = new Database(dbPath);
  let articles: Article[] = [];

  try {
    articles = queryArticles(db, category);
  } finally {
    db.close();
  }

  for (const article of articles) {
    const htmlContent = minimarkToHtml(article.body);

    feed.addItem({
      title: article.title,
      id: `${SITE_URL}${article.path}`,
      link: `${SITE_URL}${article.path}`,
      date: new Date(article.date),
      description: htmlContent || article.title,
      content: htmlContent || article.title
    });
  }

  setHeader(event, 'Content-Type', 'application/rss+xml');
  setHeader(event, 'Cache-Control', 'max-age=21600');

  return feed.rss2();
});
