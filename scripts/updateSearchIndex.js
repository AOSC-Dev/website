import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import Database from 'better-sqlite3';
import { MeiliSearch } from 'meilisearch';
import { nuxtI18nCodeMap } from '../i18n/config.ts';
import { generateSearchSections } from '../node_modules/@nuxt/content/dist/runtime/internal/search.js';
// Cannot import this directly because it uses `import { tables } from "#content/manifest";`
// import { collectionQueryBuilder } from '../node_modules/@nuxt/content/dist/runtime/internal/query.js';

const MEILI_INDEX_NAME = 'website-content';

const dbPath = resolve(process.cwd(), './.data/content/contents.sqlite');
if (!existsSync(dbPath))
  throw new Error(
    `${dbPath} doesn't exist, please run \`npm run generate\` first.`
  );
const db = new Database(dbPath, { readonly: true, fileMustExist: true });

const fakeFetchQuery = async (_event, _collection, sql) =>
  db
    .prepare(sql)
    .all()
    .map((row) => ({ ...row, body: JSON.parse(row.body) }));

// await queryBuilder.where("extension", "=", "md").select("path", "body", "description", "title", ...extraFields || []).all();
// SELECT "path", "body", "description", "title" FROM _content_zhCN WHERE ("extension" = 'md') ORDER BY stem ASC
const fakeQueryBuilder = (collection) => {
  const params = {
    conditions: [],
    selectedFields: []
  };
  const buildQuery = () =>
    `SELECT ${params.selectedFields.map((i) => `"${i}"`).join(', ')} ` +
    `FROM _content_${collection} ` +
    `${params.conditions.join('')} ` +
    `ORDER BY stem ASC`;
  const query = {
    select(...fields) {
      if (fields.length) params.selectedFields.push(...fields);
      return query;
    },
    where(field, operator, value) {
      params.conditions.push(`WHERE ("${field}" ${operator} '${value}')`);
      return query;
    },
    async all() {
      return await fakeFetchQuery(undefined, undefined, buildQuery());
    }
  };
  return query;
};

const meiliClient = new MeiliSearch({
  host: process.env.MEILI_HOST_URL ?? 'http://localhost:7700',
  apiKey: process.env.MEILI_UPDATE_KEY
});

const tmpIndex = `${MEILI_INDEX_NAME}-tmp`;
console.log(await meiliClient.deleteIndexIfExists(tmpIndex));
console.log(await meiliClient.createIndex(MEILI_INDEX_NAME));

for (const locale of Object.values(nuxtI18nCodeMap)) {
  const searchSections = await generateSearchSections(fakeQueryBuilder(locale));
  const documents = searchSections.map((i) => ({
    ...i,
    category: i.id.startsWith('/news')
      ? 'news'
      : i.id.startsWith('/support')
        ? 'support'
        : null,
    key: Buffer.from(i.id).toString('base64url'), // /[a-zA-Z0-9_-]/
    locale
  }));

  console.log(
    await meiliClient
      .index(tmpIndex)
      .addDocuments(documents, { primaryKey: 'key' })
  );
  console.log(
    await meiliClient
      .index(tmpIndex)
      .updateFilterableAttributes(['category', 'locale'])
  );
}

console.log(
  await meiliClient.swapIndexes([{ indexes: [MEILI_INDEX_NAME, tmpIndex] }])
);
