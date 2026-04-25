import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { parseMarkdown } from '@nuxtjs/mdc/runtime';

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

function getCategoryFromPath(feedPath: string): string | null {
  const match = feedPath.match(/\/news\/feed\/([^.]+)\.xml$/);
  return match?.[1] ?? null;
}

function removeFrontmatter(md: string): string {
  if (!md.startsWith('---')) return md;
  const end = md.indexOf('\n---', 3);
  if (end === -1) return md;
  return md.slice(end + 5);
}

function replaceRelativePaths(html: string): string {
  html = html.replace(/src="\/assets\//g, `src="${SITE_URL}/assets/`);
  html = html.replace(/href="\/(?!\/)/g, `href="${SITE_URL}/`);
  return html;
}

function readMarkdownFile(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

interface MdcNode {
  type: string;
  tag?: string;
  props?: Record<string, unknown>;
  children?: MdcNode[];
  value?: string;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderMdcNode(node: MdcNode): string {
  if (node.type === 'text' && node.value !== undefined) {
    return escapeXml(node.value);
  }

  if (node.type === 'element' && node.tag) {
    const tag = node.tag;
    const props = node.props ?? {};
    const children = node.children ?? [];

    // MDC components (e.g. :::info) become custom tags like "info"
    const htmlTagMap: Record<string, string> = {
      info: 'blockquote'
    };

    const htmlTag = htmlTagMap[tag] ?? tag;

    const attrStr = Object.entries(props)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => ` ${k}="${escapeXml(String(v))}"`)
      .join('');

    // Add class for mapped MDC components
    const classAttr =
      tag !== htmlTag
        ? ` class="${htmlTag === 'blockquote' ? 'info' : 'mdc-' + tag}"`
        : '';
    const mergedAttr = classAttr ? attrStr + classAttr : attrStr;

    const selfClosing = ['br', 'hr', 'img', 'input'].includes(htmlTag);
    if (selfClosing) return `<${htmlTag}${mergedAttr} />`;

    const inner = children.map(renderMdcNode).join('');
    return `<${htmlTag}${mergedAttr}>${inner}</${htmlTag}>`;
  }

  // Fallback for unknown node types
  if (node.children) {
    return node.children.map(renderMdcNode).join('');
  }
  return '';
}

async function renderMarkdownToHtml(md: string): Promise<string> {
  const parsed = await parseMarkdown(md);
  const children: MdcNode[] = parsed.body?.children ?? [];
  return children.map(renderMdcNode).join('');
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('feed:generate', async ({ feed, options }) => {
    const category = getCategoryFromPath(options.path);
    if (
      !category ||
      !RSS_ALLOWED_CATEGORIES.includes(
        category as (typeof RSS_ALLOWED_CATEGORIES)[number]
      )
    )
      return;

    const meta = RSS_CATEGORY_META[category];
    feed.options = {
      id: `${SITE_URL}${category === 'all' ? '/news' : '/news/list/' + category}`,
      title: meta.title,
      link: `${SITE_URL}${category === 'all' ? '/news' : '/news/list/' + category}`,
      description: meta.description,
      language: 'zh-cn',
      copyright: `© AOSC ${new Date().getFullYear()}`
    };

    const dbPath = path.resolve('.data/content/contents.sqlite');
    if (!fs.existsSync(dbPath)) {
      console.error('[feed] Content database not found:', dbPath);
      return;
    }

    const db = new Database(dbPath);
    let articles: Array<{
      path: string;
      title: string;
      date: string;
      stem: string;
    }> = [];

    try {
      if (category === 'all') {
        const stmt = db.prepare(`
          SELECT path, title, date, stem
          FROM _content_zhCN
          WHERE path LIKE '/news%'
          ORDER BY date DESC
          LIMIT ?
        `);
        articles = stmt.all(RSS_FEED_LIMIT) as Array<{
          path: string;
          title: string;
          date: string;
          stem: string;
        }>;
      } else {
        const stmt = db.prepare(`
          SELECT path, title, date, stem
          FROM _content_zhCN
          WHERE path LIKE '/news%'
            AND categories LIKE ?
          ORDER BY date DESC
          LIMIT ?
        `);
        articles = stmt.all(`%"${category}"%`, RSS_FEED_LIMIT) as Array<{
          path: string;
          title: string;
          date: string;
          stem: string;
        }>;
      }
    } finally {
      db.close();
    }

    for (const article of articles) {
      const mdFilePath = path.resolve(`content/zh-cn${article.path}.md`);
      let mdContent = readMarkdownFile(mdFilePath);

      let htmlContent: string | undefined;
      if (mdContent) {
        mdContent = removeFrontmatter(mdContent);
        htmlContent = replaceRelativePaths(
          await renderMarkdownToHtml(mdContent)
        );
      }

      feed.addItem({
        title: article.title,
        id: `${SITE_URL}${article.path}`,
        link: `${SITE_URL}${article.path}`,
        date: new Date(article.date),
        description: htmlContent || article.title,
        content: htmlContent || article.title
      });
    }

    console.log(
      `[feed] Generated ${options.path} with ${articles.length} items`
    );
  });
});
