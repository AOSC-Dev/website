import { defineStore } from 'pinia';
import type { NuxtI18nCode } from '~/i18n/config';
import { i18nCodeToContent } from '~/i18n/config';
import type { SearchResponse } from 'meilisearch'

type State = 'idle' | 'searching' | 'success' | 'failed';
type Category = 'all' | 'news' | 'support';

export const useSearchStore = defineStore('searchStore', {
  state: () => ({
    query: '',
    category: 'all' as Category,
    status: 'idle' as State,
    result: null as null | SearchResponse,
    error: null as unknown
  }),
  actions: {
    async search(locale: NuxtI18nCode, query?: string, category?: Category) {
      if (query) this.query = query;
      if (category) this.category = category;
      if (!this.query) {
        this.status = 'idle';
        return;
      }

      this.status = 'searching';
      const { search: meiliSearch } = useMeiliSearch('website-content');

      const filter = [`locale=${i18nCodeToContent(locale)}`];
      if (this.category !== 'all') filter.push(`category=${this.category}`);

      try {
        const result = await meiliSearch(this.query, {
          filter,
          limit: 10,
          attributesToCrop: ['content'],
          attributesToHighlight: ['title', 'content'],
          cropLength: 10,
          highlightPreTag: '<u>',
          highlightPostTag: '</u>'
        });
        this.status = 'success';
        this.result = result
      } catch (e) {
        this.status = 'failed';
        this.error = e;
        console.error(e);
        this.result = null;
      }
    }
  }
});
